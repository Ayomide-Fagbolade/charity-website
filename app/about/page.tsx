import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Heart, TrendingUp, Award, Sun, Shield, Lightbulb, Leaf } from "lucide-react"
import HeroCarousel from "@/components/HeroCarousel"

export const metadata = {
  title: "About Us - BridgeSeed Foundation",
  description: "Building sustainable campus communities by redistributing usable items to students and families in need.",
}

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Emmanuel Osei",
      role: "Operations & Administration Manager",
      image: "/Emma.jpg",
    },
    {
      name: "Uzoma Owuama",
      role: "Finance & Logistics Manager",
      image: "/Uzoma.jpg",
    },
    {
      name: "Adeoluwa Adeyemi",
      role: "Outreach, Communications & Partnerships Officer",
      image: "/Ade.jpg",
    },

    {
      name: "Sarfoah Addo Jochebed",
      role: "Programs & Project Manager",
      image: "/Joe.jpg",
    },
    {
      name: "Ayomide Fagbolade",
      role: "Technology & Data Officer",
      image: "/Ayo.jpg",
    },

  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-linear-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Transforming Excess into Opportunity
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Building sustainable campus communities by redistributing usable items to students and families in need.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg group">
              <HeroCarousel variant="minimal" className="h-full w-full" />
            </div>
            <div className="space-y-10">
              <div className="border-l-2 border-primary/30 pl-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">About BridgeSeed</h2>
                <p className="text-muted-foreground leading-relaxed">
                  BridgeSeed Foundation (BSF) is a youth-led, non-profit organization that builds sustainable campus communities by redistributing usable items to students and families in need, transforming excess into opportunity and reducing waste with dignity and purpose.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8">
                <div className="border-l-2 border-primary/30 pl-6">
                  <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    BridgeSeed Foundation connects students who have items they no longer need with those students and families who need them most. Through a dignified, accessible, and sustainable donation and thrift system, we transform excess into opportunity and waste into relief, ensuring belongings keep serving and stories keep unfolding.
                  </p>
                </div>
                <div className="border-l-2 border-primary/30 pl-6">
                  <h3 className="text-2xl font-bold mb-3">Our Vision</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To build a campus community where no usable item goes to waste, every belonging finds a new chapter and continues its journey of value and purpose.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-4 bg-muted/30" id="values">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-6 justify-center">
            <Card className="bg-background lg:col-span-2">
              <CardHeader>
                <Sun className="h-10 w-10 text-foreground mb-3" />
                <CardTitle className="text-lg text-foreground">Hope</CardTitle>
                <CardDescription className="leading-relaxed">
                  We nurture belief in better tomorrows.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-background lg:col-span-2">
              <CardHeader>
                <Shield className="h-10 w-10 text-foreground mb-3" />
                <CardTitle className="text-lg text-foreground">Integrity</CardTitle>
                <CardDescription className="leading-relaxed">
                  We act honestly and transparently, ensuring every donation serves its true purpose.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-background lg:col-span-2">
              <CardHeader>
                <Heart className="h-10 w-10 text-foreground mb-3" />
                <CardTitle className="text-lg text-foreground">Empathy</CardTitle>
                <CardDescription className="leading-relaxed">
                  We listen, care, and act with compassion.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-background lg:col-span-2 lg:col-start-2">
              <CardHeader>
                <Lightbulb className="h-10 w-10 text-foreground mb-3" />
                <CardTitle className="text-lg text-foreground">Innovation</CardTitle>
                <CardDescription className="leading-relaxed">
                  We use creativity and collective action to solve social challenges.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-background md:col-span-2 md:w-1/2 md:mx-auto lg:col-span-2 lg:w-auto lg:mx-0">
              <CardHeader>
                <Leaf className="h-10 w-10 text-foreground mb-3" />
                <CardTitle className="text-lg text-foreground">Sustainability</CardTitle>
                <CardDescription className="leading-relaxed">
                  We plant seeds for growth that lasts beyond us.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-muted/30" id="team">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Team</h2>
            <p className="text-lg text-muted-foreground">
              Dedicated professionals committed to maximizing charitable impact
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card className="bg-background" key={member.name}>
                <CardHeader className="text-center">
                  <div className="relative h-48 w-48 mx-auto mb-4 rounded-full overflow-hidden">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-gray-500 text-sm italic flex items-center justify-center h-full">
                        No image available for “{member.name}”
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-foreground">{member.name}</CardTitle>
                  <CardDescription className="text-foreground">{member.role}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
