"use client";

import { CreateListingForm } from "@/components/marketplace/create-listing-form";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NewListingPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-muted-foreground font-medium animate-pulse">Verifying access...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="container mx-auto py-20 px-4 text-center">
                <div className="max-w-md mx-auto space-y-6 bg-muted/30 p-12 rounded-3xl border-2 border-dashed border-muted-foreground/20">
                    <div className="w-20 h-20 bg-amber-500/10 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShieldAlert size={40} />
                    </div>
                    <h2 className="text-3xl font-black tracking-tight">Authentication Required</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        You need to be signed in to create a new marketplace listing.
                    </p>
                    <div className="pt-4">
                        <Button asChild className="rounded-full px-8">
                            <Link href="/auth">Sign In to Continue</Link>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="mb-8">
                <Button variant="ghost" asChild className="mb-4">
                    <Link href="/marketplace">
                        <ChevronLeft className="mr-2" /> Back to Marketplace
                    </Link>
                </Button>
            </div>
            <CreateListingForm />
        </div>
    );
}
