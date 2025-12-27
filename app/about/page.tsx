import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Heart, TrendingUp, Award, Sun, Shield, Lightbulb, Leaf, CreditCard, Megaphone, Briefcase, Cpu, UserCheck } from "lucide-react"
import HeroCarousel from "@/components/herocarousel"

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

  const values = [
    { title: "Hope", desc: "We nurture belief in better tomorrows.", icon: Sun },
    { title: "Integrity", desc: "We act honestly and transparently, ensuring every donation serves its true purpose.", icon: Shield },
    { title: "Empathy", desc: "We listen, care, and act with compassion.", icon: Heart },
    { title: "Innovation", desc: "We use creativity and collective action to solve social challenges.", icon: Lightbulb },
    { title: "Sustainability", desc: "We plant seeds for growth that lasts beyond us.", icon: Leaf },
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 justify-center items-stretch">
            {values.map((v) => {
              const Icon = v.icon
              return (
                <Card key={v.title} className="bg-background lg:col-span-2 h-full">
                  <CardHeader className="flex flex-col items-center text-center p-6">
                    <Icon className="h-8 w-8 md:h-10 md:w-10 text-foreground mb-3" />
                    <CardTitle className="text-lg text-foreground">{v.title}</CardTitle>
                    <CardDescription className="leading-relaxed text-sm md:text-base">{v.desc}</CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Organization Ecosystem */}
      <section className="py-24 px-4 overflow-hidden bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Our Ecosystem</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              How we coordinate to turn excess into opportunity, with you at the heart of our mission.
            </p>
          </div>

          <div className="relative flex items-center justify-center min-h-[450px] md:min-h-[650px]">
            {/* Connection Lines (SVG) - Visible on lg screens */}
            <svg className="absolute inset-0 w-full h-full hidden md:block pointer-events-none opacity-20" viewBox="0 0 800 600">
              <circle cx="400" cy="300" r="220" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" className="text-primary" />
              {/* Radial lines from center */}
              {[270, 330, 30, 90, 150, 210].map((angle) => (
                <line
                  key={angle}
                  x1="400"
                  y1="300"
                  x2={400 + 220 * Math.cos((angle * Math.PI) / 180)}
                  y2={300 + 220 * Math.sin((angle * Math.PI) / 180)}
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-primary"
                />
              ))}
            </svg>

            {/* Central Hub */}
            <div className="relative z-10 flex flex-col items-center justify-center w-32 h-32 md:w-52 md:h-52 rounded-full bg-primary text-primary-foreground shadow-2xl border-4 border-background animate-pulse">
              <div className="relative h-12 w-12 md:h-20 md:w-20 mb-2">
                <Image src="/logo-icon.png" alt="BridgeSeed" fill className="object-contain brightness-0 invert" />
              </div>
              <span className="text-xs md:text-sm font-bold tracking-widest uppercase">Foundation</span>
            </div>

            {/* Outer Nodes - Circular Layout */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {[
                { name: "Operations", role: "Manager", icon: Shield, angle: 270 },
                { name: "Finance", role: "Manager", icon: CreditCard, angle: 330 },
                { name: "Outreach", role: "Officer", icon: Megaphone, angle: 30 },
                { name: "Programs", role: "Manager", icon: Briefcase, angle: 90 },
                { name: "Technology", role: "Officer", icon: Cpu, angle: 150 },
                { name: "You", role: "Our Partner", icon: Heart, angle: 210, highlight: true },
              ].map((node) => {
                const rad = (node.angle * Math.PI) / 180;
                // Base distance for nodes
                const dist = 220;

                return (
                  <div
                    key={node.name}
                    className="absolute flex flex-col items-center pointer-events-auto transition-all duration-500 hover:scale-110"
                    style={{
                      left: `calc(50% + ${dist * Math.cos(rad)}px)`,
                      top: `calc(50% + ${dist * Math.sin(rad)}px)`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <div className={`w-14 h-14 md:w-20 md:h-20 rounded-2xl flex items-center justify-center shadow-lg transition-colors border-2
                      ${node.highlight
                        ? "bg-secondary text-secondary-foreground border-secondary animate-bounce"
                        : "bg-background text-primary border-primary/20 hover:bg-primary hover:text-primary-foreground"
                      }`}>
                      <node.icon className="w-6 h-6 md:w-10 md:h-10" />
                    </div>
                    <div className="mt-3 text-center bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full border border-border shadow-sm whitespace-nowrap">
                      <p className="text-[10px] md:text-xs font-bold leading-tight uppercase tracking-tighter">{node.name}</p>
                      <p className="text-[8px] md:text-[10px] text-muted-foreground leading-tight">{node.role}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4">
        <div className="h-px bg-primary/10 w-full" />
      </div>

      {/* Team Section */}
      <section className="py-20 px-4 bg-muted/30" id="team">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Team</h2>
            <p className="text-lg text-muted-foreground">
              Dedicated professionals committed to maximizing charitable impact
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {teamMembers.map((member) => (
              <Card className="bg-background w-full md:w-80" key={member.name}>
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
