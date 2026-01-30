"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, ShoppingBag } from "lucide-react";
import { useAuthContext } from "@/hooks/use-auth-context";

export function MarketplaceImpactSection() {
    const { user, loading } = useAuthContext();

    if (loading || !user) return null;

    return (
        <section className="py-24 px-4 bg-gradient-to-br from-primary/5 to-background">
            <div className="container mx-auto max-w-6xl">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                            <Shield className="h-3 w-3" /> Student-Led Community
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none">
                            More Than Just <br /><span className="text-primary">Giving.</span>
                        </h2>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            Unlock the full BSF experience. Buy and sell pre-loved items in our student marketplace, verify your impact, and earn badges as you grow with us.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button size="lg" asChild className="rounded-full px-8 h-14 text-lg font-bold shadow-xl hover:scale-105 transition-transform">
                                <Link href="/marketplace">Explore Marketplace</Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild className="rounded-full px-8 h-14 text-lg font-bold hover:bg-muted/50 transition-colors">
                                <Link href="/dashboard">Track Your Impact</Link>
                            </Button>
                        </div>
                    </div>
                    <div className="relative aspect-square md:aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-muted rotate-2 hover:rotate-0 transition-transform duration-500">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                        <div className="absolute bottom-8 left-8 z-20 text-white">
                            <p className="text-3xl font-black mb-2">UM6P Marketplace</p>
                            <p className="text-white/80 font-medium">Built by students, for students.</p>
                        </div>
                        <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                            <ShoppingBag size={120} className="text-primary/40 animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
