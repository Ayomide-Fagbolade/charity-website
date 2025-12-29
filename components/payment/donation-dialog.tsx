"use client"

import { useState } from "react"
import { useAuthContext } from "@/hooks/use-auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Coins, Shirt, Banknote } from "lucide-react"
import { PaymentUploadForm } from "./payment-upload-form"
import Link from "next/link"

interface DonationDialogProps {
    projects: { slug: string; title: string }[]
    defaultProject?: string
}

export function DonationDialog({ projects, defaultProject }: DonationDialogProps) {
    const { user, profile } = useAuthContext()
    const [step, setStep] = useState<"details" | "upload">("details")
    const [method, setMethod] = useState<"cash" | "item">("cash")
    const [amount, setAmount] = useState<string>("")
    const [itemDescription, setItemDescription] = useState<string>("")
    const [selectedProject, setSelectedProject] = useState<string>(defaultProject || projects[0]?.slug || "")
    const [open, setOpen] = useState(false)

    const selectedProjectName = projects.find(p => p.slug === selectedProject)?.title || "General Fund"

    const handleNext = () => {
        if (method === "cash") {
            if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) return
        } else {
            if (!itemDescription || itemDescription.length < 5) return
        }
        setStep("upload")
    }

    const resetForm = () => {
        setOpen(false)
        setStep("details")
        setAmount("")
        setItemDescription("")
    }

    if (!user) {
        return (
            <Button asChild className="rounded-full px-8">
                <Link href="/auth">Donate Now</Link>
            </Button>
        )
    }

    return (
        <Dialog open={open} onOpenChange={(val) => {
            setOpen(val)
            if (!val) setTimeout(resetForm, 300)
        }}>
            <DialogTrigger asChild>
                <Button className="rounded-full px-8 shadow-lg hover:scale-105 transition-transform">
                    Donate Now <Heart className="ml-2 h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden border-none shadow-2xl">
                {step === "details" ? (
                    <div className="p-6 space-y-6">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold">Make a Contribution</DialogTitle>
                            <DialogDescription>
                                Supporting BridgeSeed Foundation can be done in many ways.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-6 py-2">
                            <div className="space-y-2">
                                <Label htmlFor="project">Select Project</Label>
                                <Select value={selectedProject} onValueChange={setSelectedProject}>
                                    <SelectTrigger id="project" className="h-12 border-2 focus:ring-primary/20">
                                        <SelectValue placeholder="Select a project" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {projects.map((p) => (
                                            <SelectItem key={p.slug} value={p.slug}>
                                                {p.title}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <Tabs value={method} onValueChange={(v) => setMethod(v as any)} className="w-full">
                                <TabsList className="grid w-full grid-cols-2 mb-4 h-11">
                                    <TabsTrigger value="cash" className="gap-2">
                                        <Banknote size={16} /> Cash
                                    </TabsTrigger>
                                    <TabsTrigger value="item" className="gap-2">
                                        <Shirt size={16} /> Physical Items
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="cash" className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="amount">Donation Amount (MAD)</Label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">MAD</span>
                                            <Input
                                                id="amount"
                                                type="number"
                                                placeholder="0.00"
                                                className="pl-14 h-12 text-lg font-bold border-2 focus:ring-primary/20"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                            />
                                        </div>
                                        <div className="flex gap-2 pt-1">
                                            {[50, 100, 200, 500].map((val) => (
                                                <button
                                                    key={val}
                                                    onClick={() => setAmount(val.toString())}
                                                    className="flex-1 py-1.5 px-2 text-xs font-semibold rounded-md border-2 border-primary/10 hover:border-primary hover:bg-primary/5 transition-colors"
                                                >
                                                    {val} MAD
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-primary/5 p-4 rounded-xl flex items-start gap-3 border border-primary/10">
                                        <Coins className="text-primary mt-0.5 shrink-0" size={18} />
                                        <div className="text-xs space-y-1">
                                            <p className="font-bold text-primary">Earn DPS Points</p>
                                            <p className="text-muted-foreground leading-relaxed">
                                                You'll earn <span className="font-bold text-foreground">{Math.floor(Number(amount) / 10) || 0} DPS</span> for this donation.
                                            </p>
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="item" className="space-y-4 pt-4">
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between text-sm">
                                            <Label htmlFor="description">Item Description & Condition</Label>
                                            <span className="text-[10px] text-muted-foreground uppercase font-bold px-2 py-0.5 bg-muted rounded-full">Non-Cash</span>
                                        </div>
                                        <Textarea
                                            id="description"
                                            placeholder="e.g. 5 winter jackets in good condition, 3 textbooks for computer science (L1)..."
                                            className="min-h-[120px] border-2 focus:ring-primary/20 bg-muted/20"
                                            value={itemDescription}
                                            onChange={(e) => setItemDescription(e.target.value)}
                                        />
                                    </div>
                                    <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-lg">
                                        <p className="text-[10px] text-amber-700 dark:text-amber-300 leading-tight">
                                            <strong>Note:</strong> We accept clothes, books, furniture, and electronics. Please ensure items are usable and clean.
                                        </p>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>

                        <Button
                            onClick={handleNext}
                            className="w-full h-12 text-lg font-bold shadow-xl"
                            disabled={method === 'cash' ? (!amount || Number(amount) <= 0) : (!itemDescription || itemDescription.length < 5)}
                        >
                            Next: {method === 'cash' ? 'Payment Proof' : 'Item Photo'}
                        </Button>
                    </div>
                ) : (
                    <div className="max-h-[85vh] overflow-y-auto">
                        <PaymentUploadForm
                            type="donation"
                            donationMethod={method}
                            itemDescription={itemDescription}
                            targetId={selectedProject}
                            targetName={selectedProjectName}
                            amount={method === 'cash' ? Number(amount) : 0}
                            userId={user.uid}
                            userName={profile?.displayName || user.email || "Student"}
                            onSuccess={resetForm}
                        />
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
