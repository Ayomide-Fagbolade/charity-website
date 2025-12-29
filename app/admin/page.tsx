"use client";

import { useAuth } from "@/lib/firebase/auth";
import { AdminVerificationTable } from "@/components/admin/verification-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
    const { profile, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && (!profile || profile.role !== 'admin')) {
            // router.push('/'); // Uncomment to enable redirect
        }
    }, [profile, loading, router]);

    if (loading) return <div className="p-10 text-center">Loading...</div>;

    // For demo purposes, we show a warning if not admin instead of redirecting
    const isAdmin = profile?.role === 'admin';

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                    <ShieldCheck size={32} />
                </div>
                <div>
                    <h1 className="text-4xl font-bold tracking-tight">Admin Control Center</h1>
                    <p className="text-muted-foreground">Manage donations, marketplace listings, and user verifications.</p>
                </div>
            </div>

            {!isAdmin && (
                <div className="mb-8 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center gap-3 text-amber-600 dark:text-amber-400">
                    <AlertTriangle size={20} />
                    <p className="text-sm font-medium">
                        <strong>Access Limited:</strong> You are viewing this page in preview mode. Only accounts with the "Admin" role can perform these actions in production.
                    </p>
                </div>
            )}

            <AdminVerificationTable />
        </div>
    );
}
