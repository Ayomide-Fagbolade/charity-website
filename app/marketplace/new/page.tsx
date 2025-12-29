"use client";

import { CreateListingForm } from "@/components/marketplace/create-listing-form";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NewListingPage() {
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
