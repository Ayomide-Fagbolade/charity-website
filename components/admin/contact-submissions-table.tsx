"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase/config";
import {
    collection, query, onSnapshot, doc,
    updateDoc, deleteDoc, orderBy
} from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Trash2, Loader2, CheckCircle2, Circle } from "lucide-react";
import { useAuth } from "@/lib/firebase/auth";
import { useToast } from "@/hooks/use-toast";

export function ContactSubmissionsTable() {
    const { profile, loading: authLoading } = useAuth();
    const [submissions, setSubmissions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        if (authLoading || !profile || profile.role !== 'admin') {
            if (!authLoading) setLoading(false);
            return;
        }

        setLoading(true);
        const q = query(collection(db, "contact_submissions"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setSubmissions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        }, (error) => {
            console.error("Error fetching submissions:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [profile, authLoading]);

    const handleToggleRead = async (id: string, currentStatus: string) => {
        try {
            const newStatus = currentStatus === 'unread' ? 'read' : 'unread';
            await updateDoc(doc(db, "contact_submissions", id), {
                status: newStatus
            });
            toast({
                title: `Marked as ${newStatus}`,
                description: "Submission status updated successfully.",
            });
        } catch (error: any) {
            toast({
                title: "Update failed",
                description: error.message,
                variant: "destructive",
            });
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this submission?")) return;

        try {
            await deleteDoc(doc(db, "contact_submissions", id));
            toast({
                title: "Submission deleted",
                description: "The message has been removed from the database.",
            });
        } catch (error: any) {
            toast({
                title: "Delete failed",
                description: error.message,
                variant: "destructive",
            });
        }
    };

    if (loading) {
        return <div className="flex justify-center p-12"><Loader2 className="animate-spin" /></div>;
    }

    return (
        <Card className="border-primary/20 shadow-lg overflow-hidden mt-8">
            <CardHeader className="bg-primary/5">
                <div className="flex items-center gap-2 text-primary">
                    <Mail size={24} />
                    <CardTitle>Contact Submissions</CardTitle>
                </div>
                <CardDescription>Messages sent via the website contact form.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="relative w-full overflow-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b text-muted-foreground uppercase text-xs tracking-wider">
                                <th className="h-10 px-4 text-left">Status</th>
                                <th className="h-10 px-4 text-left">Date</th>
                                <th className="h-10 px-4 text-left">From</th>
                                <th className="h-10 px-4 text-left">Subject</th>
                                <th className="h-10 px-4 text-left">Message</th>
                                <th className="h-10 px-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submissions.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="h-24 text-center text-muted-foreground">
                                        No submissions found.
                                    </td>
                                </tr>
                            )}
                            {submissions.map((sub) => (
                                <tr key={sub.id} className={`border-b hover:bg-muted/50 transition-colors ${sub.status === 'unread' ? 'bg-primary/5 font-medium' : ''}`}>
                                    <td className="p-4 text-center">
                                        <button
                                            onClick={() => handleToggleRead(sub.id, sub.status)}
                                            className="focus:outline-none"
                                            title={sub.status === 'unread' ? "Mark as read" : "Mark as unread"}
                                        >
                                            {sub.status === 'unread' ? (
                                                <Circle className="h-4 w-4 fill-primary text-primary" />
                                            ) : (
                                                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                                            )}
                                        </button>
                                    </td>
                                    <td className="p-4 whitespace-nowrap text-muted-foreground">
                                        {sub.createdAt?.toDate ? sub.createdAt.toDate().toLocaleDateString() : 'Just now'}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-col">
                                            <span className="font-bold">{sub.name}</span>
                                            <span className="text-xs text-muted-foreground">{sub.email}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 font-semibold">{sub.subject}</td>
                                    <td className="p-4">
                                        <p className="line-clamp-2 max-w-md text-muted-foreground" title={sub.message}>
                                            {sub.message}
                                        </p>
                                    </td>
                                    <td className="p-4 text-right space-x-2">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="text-muted-foreground hover:text-red-500 hover:bg-red-50"
                                            onClick={() => handleDelete(sub.id)}
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}
