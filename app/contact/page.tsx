"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, MapPin, Phone, Send, CheckCircle2, Loader2 } from "lucide-react"
import { db } from "@/lib/firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      createdAt: serverTimestamp(),
      status: 'unread'
    };

    try {
      await addDoc(collection(db, "contact_submissions"), data);
      setIsSubmitted(true);
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you soon.",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Submission failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-20 px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 mb-4 text-4xl animate-in zoom-in duration-300">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-bold">Message Sent!</h1>
          <p className="text-muted-foreground text-lg">
            Thank you for reaching out. We've received your message and will get back to you at <strong>bridgeseedfoundation@gmail.com</strong> as soon as possible.
          </p>
          <Button onClick={() => setIsSubmitted(false)} variant="outline" className="mt-4 rounded-full px-8">
            Send Another Message
          </Button>
          <div className="pt-8">
            <Button asChild variant="ghost" className="rounded-full">
              <a href="/">Return to Home</a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-linear-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Get In Touch</h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Have questions about our work? Interested in partnering with us? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Send Us a Message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you as soon as possible</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input id="name" name="name" placeholder="Your full name" required disabled={isSubmitting} className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" name="email" type="email" placeholder="your.email@example.com" required disabled={isSubmitting} className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input id="subject" name="subject" placeholder="What is this regarding?" required disabled={isSubmitting} className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      required
                      disabled={isSubmitting}
                      className="rounded-xl resize-none"
                    />
                  </div>
                  <Button type="submit" className="w-full rounded-xl py-6 text-lg font-bold shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-black mb-8 tracking-tight">Contact Information</h2>
                <div className="space-y-10">
                  <div className="flex gap-6 group">
                    <div className="shrink-0">
                      <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Mail className="h-8 w-8 text-primary group-hover:text-inherit" />
                      </div>
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="font-bold text-xl mb-1">Email Us</h3>
                      <p className="text-lg text-muted-foreground font-medium">bridgeseedfoundation@gmail.com</p>
                      <p className="text-sm text-muted-foreground/60 italic mt-1">Direct support and inquiries</p>
                    </div>
                  </div>

                  <div className="flex gap-6 items-start">
                    <div className="shrink-0">
                      <div className="h-16 w-16 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                        <CheckCircle2 className="h-8 w-8 text-blue-500" />
                      </div>
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="font-bold text-xl mb-1">Fast Response</h3>
                      <p className="text-lg text-muted-foreground font-medium italic">"We aim to respond to all inquiries within 24-48 business hours."</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-6">
                <Card className="bg-muted/30 border-none shadow-none rounded-3xl overflow-hidden relative group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 transition-opacity group-hover:opacity-20">
                    <Send size={80} />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">Join Our Community</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Connect with our community, stay updated on our initiatives, and be part of the movement.
                    </p>
                    <Button asChild className="rounded-full px-8 font-bold" variant="default">
                      <a href="https://chat.whatsapp.com/JxE9u64joH00V1RFesiejj" target="_blank" rel="noopener noreferrer">
                        Join us on WhatsApp →
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

