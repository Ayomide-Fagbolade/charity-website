"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { Shield, CreditCard, Megaphone, Briefcase, Cpu, Heart } from "lucide-react"

export default function Ecosystem() {
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            const container = scrollRef.current
            const scrollWidth = container.scrollWidth
            const clientWidth = container.clientWidth
            container.scrollLeft = (scrollWidth - clientWidth) / 2
        }
    }, [])

    const nodes = [
        { name: "Operations", role: "Manager", icon: Shield, angle: 270 },
        { name: "Finance", role: "Manager", icon: CreditCard, angle: 330 },
        { name: "Outreach", role: "Officer", icon: Megaphone, angle: 30 },
        { name: "Programs", role: "Manager", icon: Briefcase, angle: 90 },
        { name: "Technology", role: "Officer", icon: Cpu, angle: 150 },
        { name: "You", role: "Our Partner", icon: Heart, angle: 210, highlight: true },
    ]

    return (
        <section className="py-24 px-4 overflow-hidden bg-background">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Our Ecosystem</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        How we coordinate to turn excess into opportunity, with you at the heart of our mission.
                    </p>
                </div>

                <div ref={scrollRef} className="overflow-x-auto scrollbar-hide py-8 md:py-0">
                    <div className="relative flex items-center justify-center min-h-[450px] md:min-h-[650px] min-w-[600px] md:min-w-0">
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
                            {nodes.map((node) => {
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
            </div>
        </section>
    )
}
