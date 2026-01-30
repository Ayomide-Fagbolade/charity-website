"use client";

import { useState } from "react";
import { useAuth } from "@/lib/firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { LogIn, UserPlus, Mail, Lock, ShieldCheck, RefreshCw } from "lucide-react";

export default function AuthPage() {
    const [loading, setLoading] = useState(false);
    const [resetLoading, setResetLoading] = useState(false);
    const { signup, login, resetPassword } = useAuth();
    const router = useRouter();
    const { toast } = useToast();

    const getErrorMessage = (error: any) => {
        const code = error?.code || error?.message;
        console.log("Auth error code:", code);

        switch (code) {
            case 'auth/wrong-password':
            case 'auth/invalid-credential':
                return "The password you entered is incorrect. Please try again.";
            case 'auth/user-not-found':
                return "No account found with this email. Please register first.";
            case 'auth/invalid-email':
                return "Please enter a valid UM6P email address.";
            case 'auth/too-many-requests':
                return "Too many failed attempts. Your account is temporarily locked. Please try again later or reset your password.";
            case 'auth/email-already-in-use':
                return "An account with this email already exists. Please login instead.";
            case 'auth/weak-password':
                return "Password is too weak. Please use at least 6 characters.";
            default:
                return error.message || "An unexpected error occurred. Please try again.";
        }
    };

    const handleAuth = async (e: React.FormEvent<HTMLFormElement>, type: 'login' | 'signup') => {
        console.log(`Auth started: ${type}`);
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            if (type === 'signup') {
                await signup(email, password);
                toast({
                    title: "Account created!",
                    description: "Please check your email to verify your account.",
                });
                router.push("/dashboard");
            } else {
                await login(email, password);
                toast({
                    title: "Logged in successfully",
                });
                router.push("/dashboard");
            }
        } catch (error: any) {
            toast({
                title: "Authentication Failed",
                description: getErrorMessage(error),
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        const emailInput = document.getElementById('login-email') as HTMLInputElement;
        const email = emailInput?.value;

        if (!email) {
            toast({
                title: "Email Required",
                description: "Please enter your email address first to reset your password.",
                variant: "destructive",
            });
            emailInput?.focus();
            return;
        }

        setResetLoading(true);
        try {
            await resetPassword(email);
            toast({
                title: "Reset link sent!",
                description: `A password reset link has been sent to ${email}. Please check your inbox.`,
            });
        } catch (error: any) {
            toast({
                title: "Error resetting password",
                description: getErrorMessage(error),
                variant: "destructive",
            });
        } finally {
            setResetLoading(false);
        }
    };

    return (
        <div className="container mx-auto min-h-[calc(100vh-200px)] flex items-center justify-center p-4">
            <Card className="w-full max-w-md border-none shadow-2xl bg-background/60 backdrop-blur-xl">
                <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <ShieldCheck className="text-primary" size={24} />
                    </div>
                    <CardTitle className="text-2xl font-bold">UM6P BridgeSeed</CardTitle>
                    <CardDescription>Join the student-led foundation community.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="login" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-8">
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="signup">Register</TabsTrigger>
                        </TabsList>

                        <TabsContent value="login" className="space-y-4">
                            <form onSubmit={(e) => handleAuth(e, 'login')} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="login-email">UM6P Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 text-muted-foreground" size={18} />
                                        <Input id="login-email" name="email" type="email" placeholder="name@student.um6p.ma" className="pl-10" required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="login-password">Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 text-muted-foreground" size={18} />
                                        <Input id="login-password" name="password" type="password" className="pl-10" required />
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            onClick={handleForgotPassword}
                                            disabled={resetLoading}
                                            className="text-xs text-primary hover:underline font-medium disabled:opacity-50"
                                        >
                                            {resetLoading ? "Sending..." : "Forgot Password?"}
                                        </button>
                                    </div>
                                </div>
                                <Button type="submit" className="w-full h-11" disabled={loading}>
                                    {loading ? "Logging in..." : "Sign In"}
                                </Button>
                            </form>
                        </TabsContent>

                        <TabsContent value="signup" className="space-y-4">
                            <form
                                onSubmit={(e) => {
                                    console.log("Signup form submitted");
                                    handleAuth(e, 'signup');
                                }}
                                className="space-y-4"
                            >
                                <div className="space-y-2">
                                    <Label htmlFor="signup-email">UM6P Institutional Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 text-muted-foreground" size={18} />
                                        <Input id="signup-email" name="email" type="email" placeholder="name@student.um6p.ma" className="pl-10" required />
                                    </div>
                                    <p className="text-[10px] text-muted-foreground px-1">Must be @um6p.ma or @student.um6p.ma</p>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="signup-password">Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 text-muted-foreground" size={18} />
                                        <Input id="signup-password" name="password" type="password" className="pl-10" required />
                                    </div>
                                </div>
                                <Button type="submit" className="w-full h-11" disabled={loading}>
                                    {loading ? "Creating Account..." : "Join Community"}
                                </Button>
                            </form>
                        </TabsContent>
                    </Tabs>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 text-center pb-8">
                    <p className="text-xs text-muted-foreground">
                        By continuing, you agree to our terms of service and community guidelines.
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
