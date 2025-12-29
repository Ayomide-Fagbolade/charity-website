"use client"

import { useState } from "react"
import { useAuthContext } from "@/hooks/use-auth-context"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ShoppingBag, ArrowRight } from "lucide-react"
import { PaymentUploadForm } from "@/components/payment/payment-upload-form"
import { MarketplaceItem } from "@/lib/types"
import Link from "next/link"

interface PurchaseDialogProps {
    item: MarketplaceItem
}

export function PurchaseDialog({ item }: PurchaseDialogProps) {
    const { user, profile } = useAuthContext()
    const [step, setStep] = useState<"confirm" | "upload">("confirm")
    const [open, setOpen] = useState(false)

    const resetForm = () => {
        setOpen(false)
        setStep("confirm")
    }

    if (!user) {
        return (
            <Button asChild className="w-full font-bold">
                <Link href="/auth">Sign in to Purchase</Link>
            </Button>
        )
    }

    return (
        <Dialog open={open} onOpenChange={(val) => {
            setOpen(val)
            if (!val) setTimeout(resetForm, 300)
        }}>
            <DialogTrigger asChild>
                <Button className="w-full font-bold group" variant="secondary">
                    Purchase <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden border-none shadow-2xl">
                {step === "confirm" ? (
                    <div className="p-6 space-y-6">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold">Confirm Purchase</DialogTitle>
                            <DialogDescription>
                                You are about to purchase <strong>{item.title}</strong> from {item.sellerName}.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="bg-muted/50 p-6 rounded-2xl flex flex-col items-center gap-4 border border-border">
                            <div className="text-center">
                                <p className="text-sm text-muted-foreground uppercase tracking-wider font-bold">Price</p>
                                <p className="text-5xl font-black text-primary">{item.price} <span className="text-2xl">MAD</span></p>
                            </div>
                            <div className="w-full border-t border-border pt-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Item:</span>
                                    <span className="font-bold">{item.title}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Button
                                onClick={() => setStep("upload")}
                                className="w-full h-12 text-lg font-bold shadow-xl bg-primary hover:bg-primary/90"
                            >
                                Proceed to Payment
                            </Button>
                            <p className="text-[10px] text-center text-muted-foreground">
                                By clicking proceed, you'll be shown the foundation's bank details to complete the transfer.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="max-h-[85vh] overflow-y-auto">
                        <PaymentUploadForm
                            type="purchase"
                            targetId={item.itemId}
                            targetName={item.title}
                            amount={item.price}
                            userId={user.uid}
                            userName={profile?.displayName || user.email || "Student"}
                            sellerWhatsApp={item.sellerWhatsApp}
                            onSuccess={resetForm}
                        />
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
