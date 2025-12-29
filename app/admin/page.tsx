"use client";

import { useAuth } from "@/lib/firebase/auth";
import { AdminVerificationTable } from "@/components/admin/verification-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
    const { profile, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && (!profile || profile.role !== 'admin')) {
            router.push('/');
        }
    }, [profile, loading, router]);

    if (loading) return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-muted-foreground font-medium animate-pulse">Checking credentials...</p>
        </div>
    );

    if (!profile || profile.role !== 'admin') {
        return (
            <div className="container mx-auto py-20 px-4 text-center">
                <div className="max-w-md mx-auto space-y-6 bg-muted/30 p-12 rounded-3xl border-2 border-dashed border-muted-foreground/20">
                    <div className="w-20 h-20 bg-red-500/10 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <AlertTriangle size={40} />
                    </div>
                    <h2 className="text-3xl font-black tracking-tight">Access Denied</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        This area is restricted to BridgeSeed Foundation administrators only. Your account does not have the necessary permissions to access this page.
                    </p>
                    <div className="pt-4">
                        <Button asChild className="rounded-full px-8">
                            <a href="/">Return Home</a>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div className="flex items-center gap-4">
                    <div className="p-4 bg-primary text-primary-foreground rounded-2xl shadow-lg">
                        <ShieldCheck size={32} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black tracking-tight leading-none mb-1 text-foreground">Admin Center</h1>
                        <p className="text-muted-foreground font-medium italic">BridgeSeed Foundation Control</p>
                    </div>
                </div>
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-green-500/10 text-green-600 rounded-full border border-green-500/20">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-widest">Active Security</span>
                </div>
            </div>

            <AdminVerificationTable />
        </div>
    );
}
