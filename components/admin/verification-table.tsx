"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase/config";
import {
    collection, query, where, onSnapshot, doc,
    updateDoc, increment, getDoc, addDoc, serverTimestamp, deleteDoc
} from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Check, X, Loader2, Award, Info } from "lucide-react";
import { useAuth } from "@/lib/firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { BadgeRequest } from "@/lib/types";

export function AdminVerificationTable() {
    const { profile, loading: authLoading } = useAuth();
    const [donations, setDonations] = useState<any[]>([]);
    const [purchases, setPurchases] = useState<any[]>([]);
    const [badgeRequests, setBadgeRequests] = useState<BadgeRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        // Guard: Only start listeners if user is verified as admin
        if (authLoading || !profile || profile.role !== 'admin') {
            if (!authLoading) setLoading(false);
            return;
        }

        setLoading(true);
        // Listen for pending donations
        const qDonations = query(collection(db, "donations"), where("status", "==", "pending"));
        const unsubDonations = onSnapshot(qDonations, (snapshot) => {
            setDonations(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        // Listen for pending marketplace purchases
        const qPurchases = query(collection(db, "marketplace"), where("status", "==", "pending"));
        const unsubPurchases = onSnapshot(qPurchases, (snapshot) => {
            setPurchases(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        // Listen for pending badge requests
        const qBadges = query(collection(db, "badge_requests"), where("status", "==", "pending"));
        const unsubBadges = onSnapshot(qBadges, (snapshot) => {
            setBadgeRequests(snapshot.docs.map(doc => ({ requestId: doc.id, ...doc.data() } as BadgeRequest)));
            setLoading(false);
        });

        return () => {
            unsubDonations();
            unsubPurchases();
            unsubBadges();
        };
    }, [profile, authLoading]);

    const handleVerify = async (id: string, type: "donation" | "purchase", userId: string, amount: number) => {
        try {
            const collectionName = type === "donation" ? "donations" : "marketplace";
            const docRef = doc(db, collectionName, id);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) throw new Error("Document not found");
            const data = docSnap.data();

            // 1. Update status to verified/sold
            await updateDoc(docRef, {
                status: type === "donation" ? "verified" : "sold",
                verifiedAt: new Date().toISOString()
            });

            // 2. Update user stats and DPS
            const userRef = doc(db, "users", userId);
            const dpsEarned = type === "donation" ? Math.floor(amount / 10) : 0; // 10 MAD = 1 DPS

            await updateDoc(userRef, {
                dps_balance: increment(dpsEarned),
                "stats.total_donated": type === "donation" ? increment(amount) : increment(0),
                "stats.total_purchases": type === "purchase" ? increment(1) : increment(0),
                "stats.total_items_donated": type === "donation" && (data?.type === "item") ? increment(1) : increment(0),
            });

            // 3. Logic to check for badge eligibility and SEND TO ADMIN FOR APPROVAL
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
                const userData = userSnap.data();
                const totalDonated = userData.stats?.total_donated || 0;
                const totalPurchases = userData.stats?.total_purchases || 0;
                const totalSales = userData.stats?.total_sales || 0;

                // Donor Track
                let eligDonorBadge = "";
                if (totalDonated >= 1000) eligDonorBadge = "Gold Donor";
                else if (totalDonated >= 500) eligDonorBadge = "Silver Donor";
                else if (totalDonated >= 100) eligDonorBadge = "Bronze Donor";

                if (eligDonorBadge && eligDonorBadge !== userData.badges?.donor) {
                    await createBadgeRequest(userId, userData.email, 'donor', eligDonorBadge);
                }

                // Buyer Track
                if (totalPurchases >= 5 && userData.badges?.buyer !== "Community Supporter") {
                    await createBadgeRequest(userId, userData.email, 'buyer', 'Community Supporter');
                }
            }

            toast({
                title: "Transaction Verified",
                description: `Successfully verified ${type} for user.`,
            });
        } catch (error: any) {
            toast({
                title: "Verification failed",
                description: error.message,
                variant: "destructive",
            });
        }
    };

    const createBadgeRequest = async (userId: string, email: string, type: any, name: string) => {
        // Check if a pending request already exists for this exact badge
        // (In production you might want a more robust check)
        await addDoc(collection(db, "badge_requests"), {
            userId,
            userName: email.split('@')[0],
            badgeType: type,
            badgeName: name,
            status: "pending",
            createdAt: serverTimestamp()
        });
    };

    const handleBadgeAction = async (requestId: string, userId: string, badgeType: string, badgeName: string, action: 'approve' | 'reject') => {
        try {
            if (action === 'approve') {
                const userRef = doc(db, "users", userId);
                await updateDoc(userRef, {
                    [`badges.${badgeType}`]: badgeName
                });

                await updateDoc(doc(db, "badge_requests", requestId), { status: 'approved' });
                toast({ title: "Badge Granted!", description: `${badgeName} assigned to user.` });
            } else {
                await updateDoc(doc(db, "badge_requests", requestId), { status: 'rejected' });
                toast({ title: "Request Rejected", description: "Badge request was declined." });
            }
        } catch (error: any) {
            toast({ title: "Action failed", description: error.message, variant: "destructive" });
        }
    };

    const handleReject = async (id: string, type: "donation" | "purchase") => {
        try {
            const collectionName = type === "donation" ? "donations" : "marketplace";
            const docRef = doc(db, collectionName, id);

            let reason = null;
            if (type === "donation") {
                reason = window.prompt("Enter rejection reason (e.g. Invalid receipt, Amount mismatch):");
                if (reason === null) return; // Cancelled
            }

            await updateDoc(docRef, {
                status: type === "donation" ? "rejected" : "available",
                rejectionReason: reason,
                receiptUrl: null,
            });

            toast({
                title: "Transaction Rejected",
                description: reason ? `Rejected with reason: ${reason}` : "The receipt was marked as invalid.",
            });
        } catch (error: any) {
            toast({ title: "Action failed", description: error.message, variant: "destructive" });
        }
    };

    if (loading) {
        return <div className="flex justify-center p-12"><Loader2 className="animate-spin" /></div>;
    }

    return (
        <div className="space-y-8">
            {/* Badge Approvals Section (NEW) */}
            <Card className="border-primary/20 shadow-lg overflow-hidden">
                <CardHeader className="bg-primary/5">
                    <div className="flex items-center gap-2 text-primary">
                        <Award size={24} />
                        <CardTitle>Badge Approval Queue</CardTitle>
                    </div>
                    <CardDescription>New badge achievements require manual sign-off.</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b text-muted-foreground uppercase text-xs tracking-wider">
                                    <th className="h-10 px-2 text-left">User</th>
                                    <th className="h-10 px-2 text-left">Track</th>
                                    <th className="h-10 px-2 text-left">Badge Level</th>
                                    <th className="h-10 px-2 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {badgeRequests.length === 0 && (
                                    <tr><td colSpan={4} className="h-20 text-center text-muted-foreground">No pending badge notifications.</td></tr>
                                )}
                                {badgeRequests.map((br) => (
                                    <tr key={br.requestId} className="border-b hover:bg-muted/50 transition-colors">
                                        <td className="p-4 font-medium">{br.userName}</td>
                                        <td className="p-4"><Badge variant="outline" className="capitalize">{br.badgeType}</Badge></td>
                                        <td className="p-4 font-bold text-primary">{br.badgeName}</td>
                                        <td className="p-4 text-right space-x-2">
                                            <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-red-500" onClick={() => handleBadgeAction(br.requestId, br.userId, br.badgeType, br.badgeName, 'reject')}>
                                                Ignore
                                            </Button>
                                            <Button size="sm" className="bg-primary" onClick={() => handleBadgeAction(br.requestId, br.userId, br.badgeType, br.badgeName, 'approve')}>
                                                Grant Badge
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Donations Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Pending Donations</CardTitle>
                    <CardDescription>Verify manual transfers for relief projects.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="relative w-full overflow-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b text-muted-foreground">
                                    <th className="h-10 px-2 text-left">Ref ID</th>
                                    <th className="h-10 px-2 text-left">User</th>
                                    <th className="h-10 px-2 text-left">Project</th>
                                    <th className="h-10 px-2 text-left">Type</th>
                                    <th className="h-10 px-2 text-left">Value/Item</th>
                                    <th className="h-10 px-2 text-left">Proof/Photo</th>
                                    <th className="h-10 px-2 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donations.length === 0 && (
                                    <tr><td colSpan={6} className="h-24 text-center">No pending donations.</td></tr>
                                )}
                                {donations.map((d) => (
                                    <tr key={d.id} className="border-b hover:bg-muted/50 transition-colors">
                                        <td className="p-2 font-mono text-xs">{d.referenceId}</td>
                                        <td className="p-2">{d.userName}</td>
                                        <td className="p-2 truncate max-w-[120px]">{d.targetName}</td>
                                        <td className="p-2">
                                            <Badge variant={d.type === 'cash' ? 'default' : 'secondary'} className="text-[10px]">
                                                {d.type || 'cash'}
                                            </Badge>
                                        </td>
                                        <td className="p-2">
                                            {d.type === 'item' ? (
                                                <span className="text-xs italic line-clamp-1" title={d.itemDescription}>
                                                    {d.itemDescription}
                                                </span>
                                            ) : (
                                                <span className="font-bold">{d.amount} MAD</span>
                                            )}
                                        </td>
                                        <td className="p-2">
                                            <a href={d.receiptUrl} target="_blank" className="text-primary flex items-center gap-1 hover:underline text-xs">
                                                {d.type === 'item' ? 'Photo' : 'Receipt'} <ExternalLink size={12} />
                                            </a>
                                        </td>
                                        <td className="p-2 text-right space-x-2">
                                            <Button size="sm" variant="outline" className="text-red-500 h-8 w-8 p-0" onClick={() => handleReject(d.id, "donation")}>
                                                <X size={14} />
                                            </Button>
                                            <Button size="sm" className="bg-green-600 hover:bg-green-700 h-8" onClick={() => handleVerify(d.id, "donation", d.userId, d.type === 'item' ? 50 : d.amount)}>
                                                <Check size={14} className="mr-1" /> {d.type === 'item' ? 'Verify Item' : 'Verify'}
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Marketplace Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Pending Marketplace Sales</CardTitle>
                    <CardDescription>Verify student payments for marketplace items.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="relative w-full overflow-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b text-muted-foreground">
                                    <th className="h-10 px-2 text-left">Item</th>
                                    <th className="h-10 px-2 text-left">Seller</th>
                                    <th className="h-10 px-2 text-left">Price</th>
                                    <th className="h-10 px-2 text-left">Receipt</th>
                                    <th className="h-10 px-2 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {purchases.length === 0 && (
                                    <tr><td colSpan={5} className="h-24 text-center">No pending marketplace sales.</td></tr>
                                )}
                                {purchases.map((p) => (
                                    <tr key={p.id} className="border-b hover:bg-muted/50 transition-colors">
                                        <td className="p-2">{p.title}</td>
                                        <td className="p-2">{p.sellerName || "Unknown"}</td>
                                        <td className="p-2 font-bold">{p.price} MAD</td>
                                        <td className="p-2">
                                            <a href={p.receiptUrl} target="_blank" className="text-primary flex items-center gap-1 hover:underline">
                                                View <ExternalLink size={14} />
                                            </a>
                                        </td>
                                        <td className="p-2 text-right space-x-2">
                                            <Button size="sm" variant="outline" className="text-red-500" onClick={() => handleReject(p.id, "purchase")}>
                                                <X size={14} />
                                            </Button>
                                            <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleVerify(p.id, "purchase", p.buyerId, p.price)}>
                                                <Check size={14} /> Confirm Sale
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
