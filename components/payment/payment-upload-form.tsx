"use client";

import { useState } from "react";
import { storage, db } from "@/lib/firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, collection, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, Upload, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PaymentUploadFormProps {
    type: "donation" | "purchase";
    donationMethod?: "cash" | "item";
    itemDescription?: string;
    targetId: string; // projetId or itemId
    targetName: string;
    amount: number;
    userId: string;
    userName: string;
    sellerWhatsApp?: string;
    onSuccess?: () => void;
}

export function PaymentUploadForm({
    type,
    donationMethod = "cash",
    itemDescription,
    targetId,
    targetName,
    amount,
    userId,
    userName,
    sellerWhatsApp,
    onSuccess
}: PaymentUploadFormProps) {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [referenceId] = useState(`BS-${Math.random().toString(36).toUpperCase().substring(2, 8)}`);
    const { toast } = useToast();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            toast({
                title: "Missing proof of payment",
                description: "Please upload a receipt or screenshot of your transfer.",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);
        try {
            // 1. Upload to ImgBB
            const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
            if (!apiKey) throw new Error("ImgBB API key is missing");

            const uploadFormData = new FormData();
            uploadFormData.append("image", file);

            const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                method: "POST",
                body: uploadFormData,
            });

            if (!response.ok) throw new Error("Failed to upload proof to ImgBB");

            const result = await response.json();
            const downloadURL = result.data.url;
            console.log("Proof uploaded to ImgBB successfully:", downloadURL);

            // 2. Create Transaction Record in Firestore
            const collectionName = type === "donation" ? "donations" : "purchases";
            const docRef = doc(collection(db, collectionName));

            const transactionData = {
                transactionId: docRef.id,
                userId,
                userName,
                amount: donationMethod === "item" ? 0 : amount,
                type: type === "donation" ? donationMethod : "purchase",
                itemDescription: donationMethod === "item" ? itemDescription : null,
                targetId,
                targetName,
                status: "pending",
                referenceId,
                receiptUrl: downloadURL,
                createdAt: serverTimestamp(),
            };

            await setDoc(docRef, transactionData);

            // 3. If purchase, update item status to 'pending'
            if (type === "purchase") {
                const itemRef = doc(db, "marketplace", targetId);
                await setDoc(itemRef, { status: "pending", receiptUrl: downloadURL, buyerId: userId }, { merge: true });
            }

            setSubmitted(true);
            toast({
                title: "Receipt Uploaded!",
                description: `Your ${type} is awaiting admin verification. Ref: ${referenceId}`,
            });
        } catch (error: any) {
            console.error("Upload error:", error);
            toast({
                title: "Upload failed",
                description: error.message || "Something went wrong.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <Card className="w-full max-w-md mx-auto overflow-hidden border-none shadow-2xl bg-background p-8 text-center animate-in zoom-in-95 duration-300">
                <div className="flex flex-col items-center space-y-6">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                        <div className="relative p-6 bg-primary text-white rounded-full shadow-2xl">
                            <CheckCircle2 size={48} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-3xl font-black tracking-tight">Got It!</h2>
                        <p className="text-muted-foreground font-medium">Your donation is now in the queue.</p>
                    </div>

                    <div className="w-full p-4 bg-muted/50 rounded-2xl border-2 border-dashed border-muted-foreground/20">
                        <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Log Reference</p>
                        <p className="text-2xl font-mono font-black text-primary">{referenceId}</p>
                    </div>

                    <div className="text-sm text-muted-foreground leading-relaxed">
                        <p>Our team verifies all manual transfers within <strong>24-48 hours</strong>.</p>
                        <p className="mt-2">You'll see your DPS points update in your dashboard as soon as it's approved.</p>
                    </div>

                    <Button onClick={() => onSuccess?.()} className="w-full h-12 text-lg font-bold rounded-2xl">
                        Done
                    </Button>

                    {type === "purchase" && sellerWhatsApp && (
                        <div className="pt-4 border-t w-full">
                            <p className="text-sm font-bold text-muted-foreground mb-4">Coordinate with Seller</p>
                            <Button asChild variant="outline" className="w-full h-12 border-2 border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700 font-bold rounded-2xl">
                                <a
                                    href={`https://wa.me/${sellerWhatsApp.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi! I just initiated the purchase for "${targetName}" on BridgeSeed. My reference is ${referenceId}. Let's coordinate the exchange!`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2"
                                >
                                    Message Seller on WhatsApp
                                </a>
                            </Button>
                        </div>
                    )}
                </div>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-md mx-auto overflow-hidden border-2 border-primary/20 shadow-xl bg-background/50 backdrop-blur-sm">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-primary/20 rounded-lg text-primary">
                        <CreditCard size={20} />
                    </div>
                    <CardTitle className="text-xl">Complete Your {type === "donation" ? "Donation" : "Purchase"}</CardTitle>
                </div>
                <CardDescription>
                    Follow the instructions below to complete your payment manually.
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
                {/* Payment Instructions */}
                {donationMethod === "cash" ? (
                    <div className="p-4 rounded-xl bg-muted/50 border border-muted-foreground/10 space-y-3">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Amount:</span>
                            <span className="font-bold text-lg">{amount} MAD</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Reference ID:</span>
                            <span className="font-mono bg-primary/10 px-2 py-0.5 rounded text-primary font-bold">{referenceId}</span>
                        </div>
                        <div className="pt-2 border-t border-muted-foreground/10">
                            <Label className="text-xs text-muted-foreground uppercase tracking-wider">Foundation RIB</Label>
                            <p className="font-mono text-sm break-all mt-1">007 123 0001234567890123 45</p>
                            <p className="text-[10px] text-muted-foreground mt-2 italic">
                                * Please include the Reference ID in the bank transfer motif.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-3">
                        <div className="flex items-center gap-2 text-primary">
                            <CheckCircle2 size={18} />
                            <span className="font-bold">Item Donation</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Thank you for donating physical goods! Please upload a photo of the item(s) below.
                            Our team will contact you at <strong>{userName}</strong> to arrange collection/drop-off.
                        </p>
                        <div className="flex justify-between items-center text-xs pt-2 border-t border-primary/10">
                            <span className="text-muted-foreground">Log Ref:</span>
                            <span className="font-mono font-bold">{referenceId}</span>
                        </div>
                    </div>
                )}

                {/* Upload Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="receipt">
                            {donationMethod === "cash" ? "Upload Proof of Payment (PDF/Image)" : "Upload Photo of Item(s)"}
                        </Label>
                        <div className="relative">
                            <Input
                                id="receipt"
                                type="file"
                                accept="image/*,application/pdf"
                                onChange={handleFileChange}
                                disabled={loading}
                                className="hidden"
                            />
                            <label
                                htmlFor="receipt"
                                className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all
                  ${file ? 'border-primary bg-primary/5' : 'border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/30'}`}
                            >
                                {file ? (
                                    <div className="flex flex-col items-center gap-2">
                                        <CheckCircle2 className="text-primary" size={32} />
                                        <span className="text-sm font-medium">{file.name}</span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                        <Upload size={32} />
                                        <span className="text-sm font-medium">Click to upload or drag & drop</span>
                                        <span className="text-xs">PNG, JPG or PDF (max. 5MB)</span>
                                    </div>
                                )}
                            </label>
                        </div>
                    </div>

                    <Button type="submit" className="w-full h-12 text-lg font-semibold" disabled={!file || loading}>
                        {loading ? "Verifying & Uploading..." : "Submit for Verification"}
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="bg-muted/20 border-t border-muted-foreground/10 p-4">
                <div className="flex items-start gap-2 text-[11px] text-muted-foreground leading-tight">
                    <AlertCircle size={14} className="shrink-0 mt-0.5" />
                    <p>
                        Your transaction will be processed once an admin verifies the uploaded receipt.
                        Points (DPS) and badges will be awarded upon verification.
                    </p>
                </div>
            </CardFooter>
        </Card>
    );
}
