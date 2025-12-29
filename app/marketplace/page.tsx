"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase/config";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { MarketplaceItem } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, ArrowRight, Loader2, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PurchaseDialog } from "@/components/marketplace/purchase-dialog";

export default function MarketplacePage() {
    const [items, setItems] = useState<MarketplaceItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, "marketplace"), where("status", "==", "available"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setItems(snapshot.docs.map(doc => ({ itemId: doc.id, ...doc.data() } as MarketplaceItem)));
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-black tracking-tight mb-2">UM6P Student Marketplace</h1>
                    <p className="text-muted-foreground text-lg">Buy and sell pre-loved items. All proceeds can be seeds for change.</p>
                </div>
                <Button asChild className="rounded-full px-6 py-6 text-lg font-bold shadow-xl hover:scale-105 transition-transform">
                    <Link href="/marketplace/new">
                        <Plus className="mr-2" /> List Item
                    </Link>
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center p-20"><Loader2 className="animate-spin text-primary" size={48} /></div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {items.length === 0 && (
                        <div className="col-span-full py-20 text-center bg-muted/20 rounded-3xl border-2 border-dashed border-muted-foreground/20">
                            <ShoppingBag className="mx-auto text-muted-foreground mb-4" size={48} />
                            <h3 className="text-xl font-bold">No items available yet</h3>
                            <p className="text-muted-foreground">Be the first to list something!</p>
                        </div>
                    )}
                    {items.map((item) => (
                        <Card key={item.itemId} className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 bg-background/50 backdrop-blur-sm">
                            <div className="relative aspect-square overflow-hidden">
                                <Image
                                    src={item.imageUrl}
                                    alt={item.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-3 left-3">
                                    <Badge className="bg-white/90 text-black backdrop-blur-md border-none">{item.category}</Badge>
                                </div>
                            </div>
                            <CardHeader className="p-4">
                                <div className="flex justify-between items-start mb-1">
                                    <CardTitle className="text-lg font-bold line-clamp-1">{item.title}</CardTitle>
                                    <span className="text-xl font-black text-primary">{item.price} MAD</span>
                                </div>
                                <p className="text-xs text-muted-foreground">Seller: {item.sellerName}</p>
                            </CardHeader>
                            <CardContent className="px-4 pb-4">
                                <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                            </CardContent>
                            <CardFooter className="p-4 pt-0">
                                <PurchaseDialog item={item} />
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
