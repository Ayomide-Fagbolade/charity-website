import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, MapPin, Phone } from "lucide-react"

export const metadata = {
  title: "Contact Us - BridgeSeed Foundation",
  description: "Get in touch with our team to learn more about our work or discuss partnership opportunities.",
}

export default function ContactPage() {
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
            <Card>
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you within 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input id="name" name="name" placeholder="Your full name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" name="email" type="email" placeholder="your.email@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input id="subject" name="subject" placeholder="What is this regarding?" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="shrink-0">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-muted-foreground">info@bridgeseed.org</p>
                      <p className="text-muted-foreground">partnerships@bridgeseed.org</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="shrink-0">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                      <p className="text-sm text-muted-foreground">Mon-Fri, 9am-5pm EST</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="shrink-0">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Office</h3>
                      <p className="text-muted-foreground">123 Charity Lane</p>
                      <p className="text-muted-foreground">San Francisco, CA 94102</p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-lg">Media Inquiries</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    For press and media inquiries, please contact our communications team:
                  </p>
                  <p className="text-sm font-medium">media@bridgeseed.org</p>
                </CardContent>
              </Card>

              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-lg">Partnership Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Interested in partnering with us? We're always looking for like-minded organizations to collaborate
                    with.
                  </p>
                  <p className="text-sm font-medium">partnerships@bridgeseed.org</p>
                </CardContent>
              </Card>

              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-lg">Join Our Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Connect with our community, stay updated on our initiatives, and be part of the movement.
                  </p>
                  <a href="https://chat.whatsapp.com/JxE9u64joH00V1RFesiejj" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline">
                    Join us on WhatsApp →
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
