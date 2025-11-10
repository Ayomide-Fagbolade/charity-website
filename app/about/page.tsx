import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Heart, TrendingUp, Award } from "lucide-react"

export const metadata = {
  title: "About Us - Impact Charity",
  description: "Learn about our mission, approach, and commitment to evidence-based philanthropy.",
}

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Adeoluwa Adeyemi",
      role: "Executive Director",
      image: "/Ade.jpg",
    },
    {
      name: "Uzoma Owuama",
      role: "Director of Programs",
      image: "/Uzoma.jpg",
    },
    {
      name: "Sarfoah Addo Jochebed",
      role: "Research Director",
      image: "/Joe.jpg",
    },
       {
      name: "Ayomide Fagbolade",
      role: "Research Director",
      image: "/Ayo.jpg",
    },
    {
      name: "Emmanuel Osei",
      role: "Research Director",
      image: "/Emma.jpg",
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-linear-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-4">
            Our Mission
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Together we rise, together they thrive.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            To bridge opportunity gaps by mobilizing collective compassion connecting individuals, students, and communities
            to provide education, mentorship, and essential support for orphaned and underprivileged children.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/team-of-diverse-professionals-working-together-on-.jpg"
                alt="Our team working on impact measurement"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed">
                Founded in 2018, Impact Charity was born from a simple question: How can we ensure that charitable
                donations create the most good possible?
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We discovered that not all charitable interventions are equally effective. Some programs can be 10x,
                even 100x more impactful than others. By focusing on evidence-based giving, we help donors maximize
                their positive impact on the world.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, we've helped direct over $10 million to high-impact programs, improving the lives of more than
                50,000 people across 8 countries.
              </p>
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <Target className="h-10 w-10 text-primary mb-3" />
                <CardTitle className="text-lg">Evidence-Based</CardTitle>
                <CardDescription className="leading-relaxed">
                  We rely on rigorous research and data to identify the most effective interventions
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-primary mb-3" />
                <CardTitle className="text-lg">Impact-Focused</CardTitle>
                <CardDescription className="leading-relaxed">
                  We measure success by the real-world outcomes we achieve for those we serve
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Heart className="h-10 w-10 text-primary mb-3" />
                <CardTitle className="text-lg">Transparent</CardTitle>
                <CardDescription className="leading-relaxed">
                  We provide complete visibility into where donations go and what they achieve
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Award className="h-10 w-10 text-primary mb-3" />
                <CardTitle className="text-lg">Accountable</CardTitle>
                <CardDescription className="leading-relaxed">
                  We hold ourselves to the highest standards of financial and operational excellence
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
