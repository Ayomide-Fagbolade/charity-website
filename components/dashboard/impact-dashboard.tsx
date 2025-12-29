import { useEffect, useState } from "react";
import { useAuth } from "@/lib/firebase/auth";
import { db } from "@/lib/firebase/config";
import { collection, query, where, onSnapshot, orderBy, updateDoc, doc } from "firebase/firestore";
import { Donation } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Coins, ShoppingBag, Heart, Star, Award, Shirt, ExternalLink, Clock, Eye, EyeOff } from "lucide-react";

export function ImpactDashboard() {
    const { profile, loading: authLoading, user } = useAuth();
    const [donations, setDonations] = useState<Donation[]>([]);
    const [loadingDonations, setLoadingDonations] = useState(true);

    useEffect(() => {
        if (!user) return;

        const q = query(
            collection(db, "donations"),
            where("userId", "==", user.uid),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            setDonations(snapshot.docs.map(doc => ({ donationId: doc.id, ...doc.data() } as Donation)));
            setLoadingDonations(false);
        });

        return unsubscribe;
    }, [user]);

    const handleToggleAnonymity = async () => {
        if (!user) return;
        try {
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
                isAnonymous: !profile?.isAnonymous
            });
        } catch (error) {
            console.error("Failed to toggle anonymity:", error);
        }
    };

    const pendingDonations = donations.filter(d => d.status === "pending");

    if (authLoading) return <div className="animate-pulse space-y-4">
        <div className="h-32 bg-muted rounded-xl"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => <div key={i} className="h-24 bg-muted rounded-xl"></div>)}
        </div>
    </div>;

    if (!profile) return <div>Please log in to view your impact.</div>;

    return (
        <div className="space-y-8">
            {/* Hero Stats */}
            <div className="relative overflow-hidden p-8 rounded-3xl bg-gradient-to-br from-primary to-primary-foreground text-white shadow-2xl">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="space-y-2 text-center md:text-left">
                        <h2 className="text-3xl font-bold font-black tracking-tight">Welcome back, {profile.displayName || profile.email.split('@')[0]}!</h2>
                        <p className="text-primary-foreground/80">You're making a real difference in the community.</p>
                    </div>
                    <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                        <Coins className="text-amber-400" size={32} />
                        <div>
                            <p className="text-xs uppercase tracking-wider font-bold text-white/60">DPS Balance</p>
                            <p className="text-3xl font-black">{profile.dps_balance}</p>
                        </div>
                    </div>
                </div>
                <div className="absolute -right-8 -bottom-8 opacity-10">
                    <Heart size={200} fill="currentColor" />
                </div>
            </div>

            {/* Verification Status Alert */}
            {pendingDonations.length > 0 && (
                <Card className="border-none shadow-xl bg-amber-500/10 border-l-4 border-l-amber-500 overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-amber-500 text-white rounded-2xl animate-pulse">
                                <Clock size={24} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-black text-amber-700 dark:text-amber-400 uppercase tracking-tight">Verification in Progress</h3>
                                <p className="text-sm text-amber-600/80 font-medium">
                                    You have {pendingDonations.length} contribution{pendingDonations.length > 1 ? 's' : ''} awaiting admin review.
                                    Points will be added to your balance once verified.
                                </p>
                            </div>
                            <div className="hidden md:block">
                                <Badge variant="outline" className="border-amber-500/50 text-amber-600 font-black">PENDING</Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Grid Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <Card className="border-none shadow-lg bg-background/50 hover:bg-background transition-all">
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Donated</p>
                                <p className="text-2xl font-black">{profile.stats.total_donated} <span className="text-xs">MAD</span></p>
                            </div>
                            <div className="p-2 bg-pink-500/10 text-pink-500 rounded-lg">
                                <Heart size={20} />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg bg-background/50 hover:bg-background transition-all">
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Items Given</p>
                                <p className="text-2xl font-black">{profile.stats.total_items_donated || 0}</p>
                            </div>
                            <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg">
                                <Shirt size={20} />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg bg-background/50 hover:bg-background transition-all">
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Sales</p>
                                <p className="text-2xl font-black">{profile.stats.total_sales}</p>
                            </div>
                            <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                                <ShoppingBag size={20} />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg bg-background/50 hover:bg-background transition-all">
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Purchases</p>
                                <p className="text-2xl font-black">{profile.stats.total_purchases}</p>
                            </div>
                            <div className="p-2 bg-indigo-500/10 text-indigo-500 rounded-lg">
                                <Trophy size={20} />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Privacy Settings Section */}
            <Card className="border-none shadow-xl bg-gradient-to-r from-muted/50 to-background border-l-4 border-l-primary/30">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 text-primary rounded-2xl">
                                {profile.isAnonymous ? <EyeOff size={24} /> : <Eye size={24} />}
                            </div>
                            <div>
                                <h3 className="font-black uppercase tracking-tight text-lg">Leaderboard Privacy</h3>
                                <p className="text-sm text-muted-foreground">
                                    {profile.isAnonymous
                                        ? "Your name is currently hidden from the public leaderboard."
                                        : "Your name is visible to the community champions ranking."}
                                </p>
                            </div>
                        </div>
                        <Button
                            variant={profile.isAnonymous ? "default" : "outline"}
                            className="font-bold rounded-xl h-11 px-6 shadow-md transition-all active:scale-95"
                            onClick={handleToggleAnonymity}
                        >
                            {profile.isAnonymous ? "Show My Name" : "Go Anonymous"}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Badges Section */}
            <Card className="border-none shadow-xl bg-background/40 backdrop-blur-sm">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Award className="text-primary font-bold" />
                        <CardTitle className="text-xl font-bold">Your Achievements</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <BadgeTrack
                        title="Donor Track"
                        activeBadge={profile.badges.donor}
                        icon={<Heart className="text-pink-500" />}
                    />
                    <BadgeTrack
                        title="Sales Track"
                        activeBadge={profile.badges.seller}
                        icon={<ShoppingBag className="text-blue-500" />}
                    />
                    <BadgeTrack
                        title="Buyer Track"
                        activeBadge={profile.badges.buyer}
                        icon={<Trophy className="text-amber-500" />}
                    />
                </CardContent>
            </Card>

            {/* History Section */}
            <Card className="border-none shadow-xl bg-background/40 backdrop-blur-sm overflow-hidden">
                <CardHeader className="border-b bg-muted/20">
                    <div className="flex items-center gap-2">
                        <Clock className="text-primary" />
                        <CardTitle className="text-xl font-bold">Contribution History</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-muted/30 text-muted-foreground uppercase text-[10px] tracking-widest font-black">
                                    <th className="h-12 px-6 text-left">Project</th>
                                    <th className="h-12 px-6 text-left">Type</th>
                                    <th className="h-12 px-6 text-left">Value/Item</th>
                                    <th className="h-12 px-6 text-left">Status</th>
                                    <th className="h-12 px-6 text-right">Reference</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loadingDonations ? (
                                    <tr><td colSpan={5} className="h-24 text-center animate-pulse">Loading donations...</td></tr>
                                ) : donations.length === 0 ? (
                                    <tr><td colSpan={5} className="h-32 text-center text-muted-foreground py-10">
                                        You haven't made any donations yet. Start making an impact today!
                                    </td></tr>
                                ) : donations.map((d) => (
                                    <tr key={d.donationId} className="border-b hover:bg-muted/30 transition-colors">
                                        <td className="px-6 py-4 font-bold">{d.projectName}</td>
                                        <td className="px-6 py-4">
                                            <Badge variant={d.type === 'cash' ? 'outline' : 'secondary'} className="capitalize font-bold text-[10px]">
                                                {d.type || 'cash'}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 font-medium">
                                            {d.type === 'item' ? (
                                                <span className="italic text-muted-foreground" title={d.itemDescription}>{d.itemDescription}</span>
                                            ) : (
                                                <span className="text-primary font-bold">{d.amount} MAD</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className={`h-2 w-2 rounded-full ${d.status === 'verified' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' :
                                                    d.status === 'rejected' ? 'bg-red-500' : 'bg-amber-500 animate-pulse'
                                                    }`} />
                                                <span className={`font-bold capitalize text-[11px] ${d.status === 'verified' ? 'text-green-600' :
                                                    d.status === 'rejected' ? 'text-red-600' : 'text-amber-600'
                                                    }`}>{d.status}</span>
                                            </div>
                                            {d.status === 'rejected' && d.rejectionReason && (
                                                <p className="text-[10px] text-red-500/80 mt-1 italic leading-tight max-w-[150px]">
                                                    {d.rejectionReason}
                                                </p>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex flex-col items-end">
                                                <span className="font-mono text-[10px] text-muted-foreground">{d.referenceId}</span>
                                                {d.receiptUrl && (
                                                    <a href={d.receiptUrl} target="_blank" className="text-[10px] text-primary flex items-center gap-1 hover:underline mt-0.5">
                                                        Proof <ExternalLink size={10} />
                                                    </a>
                                                )}
                                            </div>
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

function BadgeTrack({ title, activeBadge, icon }: { title: string, activeBadge: string, icon: React.ReactNode }) {
    const isNone = activeBadge === "None" || !activeBadge;

    return (
        <div className="p-4 rounded-2xl bg-muted/30 border border-muted-foreground/10 space-y-4">
            <div className="flex items-center gap-3">
                {icon}
                <h4 className="font-bold text-sm tracking-tight">{title}</h4>
            </div>
            <div className="flex flex-col gap-2">
                {isNone ? (
                    <p className="text-xs text-muted-foreground italic">No badges earned yet. Keep going!</p>
                ) : (
                    <div className="flex items-center gap-2 bg-primary/10 p-2 rounded-lg border border-primary/20">
                        <Star className="text-amber-400 fill-amber-400" size={16} />
                        <span className="text-sm font-bold text-primary">{activeBadge}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
