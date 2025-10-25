import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Shield, TrendingUp } from "lucide-react"

export const metadata = {
  title: "Donate - Impact Charity",
  description: "Make a donation to support high-impact charity projects that create measurable change.",
}

export default function DonatePage() {
  const donationAmounts = [25, 50, 100, 250, 500, 1000]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-4">
            Make an Impact
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Your Donation Creates Real Change</h1>
          <p className="text-lg md:text-xl opacity-90 leading-relaxed">
            Every dollar you donate is directed to evidence-based programs that maximize positive impact in the world.
          </p>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Choose Your Donation Amount</CardTitle>
              <CardDescription>All donations are tax-deductible</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {donationAmounts.map((amount) => (
                  <Button key={amount} variant="outline" size="lg" className="h-20 text-xl font-bold bg-transparent">
                    ${amount}
                  </Button>
                ))}
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">Or enter a custom amount</p>
                <div className="flex gap-4 max-w-md mx-auto">
                  <div className="flex-1 relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <input
                      type="number"
                      placeholder="Custom amount"
                      className="w-full h-12 pl-8 pr-4 border rounded-md"
                      min="1"
                    />
                  </div>
                  <Button size="lg" className="px-8">
                    Donate <Heart className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Donate */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Donate With Us?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your donation goes further when directed to the most effective programs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="text-center">
                <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Maximum Impact</CardTitle>
                <CardDescription className="leading-relaxed">
                  95% of your donation goes directly to programs, ensuring maximum impact per dollar
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Full Transparency</CardTitle>
                <CardDescription className="leading-relaxed">
                  Track exactly where your money goes with detailed reports and impact metrics
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Evidence-Based</CardTitle>
                <CardDescription className="leading-relaxed">
                  Every program is selected based on rigorous research and proven effectiveness
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Examples */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Impact</h2>
            <p className="text-lg text-muted-foreground">See what your donation can achieve</p>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>$25 Donation</CardTitle>
                    <CardDescription className="mt-2 leading-relaxed">
                      Provides clean water access for one family for an entire year
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    $25
                  </Badge>
                </div>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>$100 Donation</CardTitle>
                    <CardDescription className="mt-2 leading-relaxed">
                      Supplies educational materials for 20 students for one semester
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    $100
                  </Badge>
                </div>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>$500 Donation</CardTitle>
                    <CardDescription className="mt-2 leading-relaxed">
                      Funds a complete malaria prevention program for one village
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    $500
                  </Badge>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
