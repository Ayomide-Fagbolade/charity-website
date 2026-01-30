"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase/config";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { UserProfile } from "@/lib/types";
import { Trophy, Medal, Crown, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuthContext } from "@/hooks/use-auth-context";

export function Leaderboard() {
    const { user } = useAuthContext();
    const [topUsers, setTopUsers] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;
        const q = query(
            collection(db, "users"),
            orderBy("dps_balance", "desc"),
            limit(5)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const users = snapshot.docs.map(doc => doc.data() as UserProfile);
            setTopUsers(users);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    if (!user) return null;

    if (loading) return (
        <div className="h-[400px] flex items-center justify-center">
            <div className="animate-pulse text-primary font-bold">Loading Champions...</div>
        </div>
    );

    return (
        <section className="py-20 px-4">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Community Champions</h2>
                    <p className="text-muted-foreground text-lg italic">Recognizing the seeds that grew the tallest this month.</p>
                </div>

                <div className="grid gap-4">
                    {topUsers.map((profile, index) => (
                        <Card key={profile.uid} className={`border-none shadow-lg transition-all hover:scale-[1.02] ${index === 0 ? 'bg-gradient-to-r from-yellow-500/10 to-transparent border-l-4 border-l-yellow-500' :
                            index === 1 ? 'bg-gradient-to-r from-slate-400/10 to-transparent border-l-4 border-l-slate-400' :
                                index === 2 ? 'bg-gradient-to-r from-amber-600/10 to-transparent border-l-4 border-l-amber-600' :
                                    'bg-background/50'
                            }`}>
                            <CardContent className="p-6 flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <div className="w-12 flex justify-center text-3xl font-black italic text-muted-foreground/30">
                                        #{index + 1}
                                    </div>
                                    <div className="relative">
                                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                                            {index === 0 ? <Crown size={28} className="text-yellow-600" /> :
                                                index === 1 ? <Medal size={28} className="text-slate-500" /> :
                                                    index === 2 ? <Trophy size={28} className="text-amber-700" /> :
                                                        <Star size={24} className="text-primary/40" />
                                            }
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold flex items-center gap-2">
                                            {profile.isAnonymous ? "Anonymous Seed" : (profile.displayName || profile.email.split('@')[0])}
                                            {index === 0 && <Badge className="bg-yellow-500/20 text-yellow-700 border-none">TOP SEED</Badge>}
                                        </h4>
                                        <p className="text-sm text-muted-foreground font-medium">Community Member</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-black text-primary">{Math.floor(profile.dps_balance)}</p>
                                    <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">DPS EARNED</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
