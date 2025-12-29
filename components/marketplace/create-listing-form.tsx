"use client";

import { useState } from "react";
import { db, storage } from "@/lib/firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/firebase/auth";
import { PackagePlus, Upload } from "lucide-react";
import { useRouter } from "next/navigation";

export function CreateListingForm() {
    const { user, profile, resendEmail } = useAuth();
    const { toast } = useToast();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [image, setImage] = useState<File | null>(null);

    const handleResend = async () => {
        setResending(true);
        try {
            await resendEmail();
            toast({
                title: "Email Sent!",
                description: "A fresh verification link has been sent to your inbox.",
            });
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setResending(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user) return;

        if (user && !user.emailVerified) {
            toast({
                title: "Verification required",
                description: "Please check your inbox and verify your email address to list items.",
                variant: "destructive"
            });
            return;
        }

        const formData = new FormData(e.currentTarget);
        const title = formData.get("title") as string;
        const price = Number(formData.get("price"));
        const description = formData.get("description") as string;
        const category = formData.get("category") as string;
        const whatsapp = formData.get("whatsapp") as string;

        if (!image) {
            toast({ title: "Image required", variant: "destructive" });
            return;
        }

        if (loading) return;

        // Validation
        if (image.size > 5 * 1024 * 1024) {
            toast({ title: "Image too large", description: "Please upload an image smaller than 5MB.", variant: "destructive" });
            return;
        }

        setLoading(true);
        console.log("Starting ImgBB upload...");

        try {
            // 1. Upload to ImgBB
            const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
            if (!apiKey) throw new Error("ImgBB API key is missing");

            const uploadFormData = new FormData();
            uploadFormData.append("image", image);

            const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                method: "POST",
                body: uploadFormData,
            });

            if (!response.ok) throw new Error("Failed to upload image to ImgBB");

            const result = await response.json();
            const imageUrl = result.data.url;
            console.log("Image uploaded to ImgBB successfully:", imageUrl);

            // 2. Add to Firestore
            console.log("Writing to Firestore...");
            const listingData = {
                title,
                price,
                description,
                category,
                imageUrl,
                sellerId: user.uid,
                sellerName: profile?.displayName || user.displayName || user.email?.split('@')[0] || "Anonymous",
                sellerWhatsApp: whatsapp,
                status: "available",
                createdAt: serverTimestamp(),
            };

            await addDoc(collection(db, "marketplace"), listingData);
            console.log("Firestore document created.");

            toast({ title: "Item listed successfully!" });
            router.push("/marketplace");
        } catch (error: any) {
            console.error("Listing creation failed:", error);
            toast({
                title: "Failed to create listing",
                description: error.message || "An unexpected error occurred. Please check your connection.",
                variant: "destructive"
            });
            setLoading(false); // Reset loading on error
        }
    };

    return (
        <Card className="max-w-2xl mx-auto shadow-2xl border-none bg-background/60 backdrop-blur-xl transition-all">
            {user && !user.emailVerified && (
                <div className="bg-red-500/10 border-b border-red-500/20 p-4 text-center">
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-sm font-bold text-red-600 flex items-center justify-center gap-2">
                            <span>⚠️ Verification Required:</span>
                            <span className="font-medium">Check {user.email} for a verification link.</span>
                        </p>
                        <Button
                            variant="link"
                            size="sm"
                            className="text-red-700 font-bold hover:text-red-800 p-0 h-auto underline"
                            onClick={handleResend}
                            disabled={resending}
                        >
                            {resending ? "Sending..." : "Resend Verification Email"}
                        </Button>
                    </div>
                </div>
            )}
            <CardHeader className="text-center pb-2">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <PackagePlus className="text-primary" size={24} />
                </div>
                <CardTitle className="text-2xl font-bold">List an Item</CardTitle>
                <p className="text-muted-foreground">Turn your pre-loved items into seeds for the community.</p>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Item Title</Label>
                            <Input id="title" name="title" placeholder="e.g., Organic Chemistry Textbook" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="price">Price (MAD)</Label>
                            <Input id="price" name="price" type="number" placeholder="0" required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <select
                            id="category"
                            name="category"
                            className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
                            required
                        >
                            <option value="books">Books</option>
                            <option value="electronics">Electronics</option>
                            <option value="supplies">School Supplies</option>
                            <option value="clothing">Clothing</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="whatsapp">WhatsApp Number</Label>
                        <Input id="whatsapp" name="whatsapp" placeholder="e.g., +212 600 000 000" required />
                        <p className="text-[10px] text-muted-foreground italic">Buyers will use this to coordinate the item exchange.</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Tell us about the item's condition..."
                            className="min-h-[100px] resize-none"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Item Image</Label>
                        <div className="relative border-2 border-dashed border-muted-foreground/20 rounded-xl p-4 hover:border-primary/50 transition-all text-center">
                            <Input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                id="item-image"
                                onChange={(e) => setImage(e.target.files?.[0] || null)}
                            />
                            <label htmlFor="item-image" className="cursor-pointer">
                                {image ? (
                                    <div className="flex flex-col items-center gap-2">
                                        <p className="text-sm font-medium">{image.name}</p>
                                        <p className="text-xs text-muted-foreground">Click to change</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2">
                                        <Upload className="text-muted-foreground" size={24} />
                                        <span className="text-sm">Upload Photo</span>
                                    </div>
                                )}
                            </label>
                        </div>
                    </div>

                    <Button type="submit" className="w-full h-12 text-lg font-bold" disabled={loading}>
                        {loading ? "Creating Listing..." : "Post Item"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
