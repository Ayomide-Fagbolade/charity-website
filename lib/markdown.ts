export interface Project {
  slug: string
  title: string
  description: string
  tags: string[]
  published: boolean
  content: string
  images: string[]
  canDonate: boolean
  canSell: boolean
  impact_metrics?: {
    amount: number
    label: string
    description: string
  }[]
}

export interface Post {
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  content: string
  images?: string[]
}

// Sample projects data
const projectsData: Project[] = [
  {
    slug: "disaster-relief",
    title: "Disaster Relief & Emergency Support",
    description: "providing immediate aid, food, and shelter to victims of natural disasters and catastrophic events",
    tags: ["Emergency", "Relief", "Humanitarian"],
    published: true,

    content: `When disaster strikes, gathering resources often takes time, delaying critical support to those affected. Natural emergencies such as earthquakes and floods can disrupt access to basic necessities, especially for vulnerable students and families.
By continuously collecting and organizing usable donations, we ensure resources are readily available before emergencies occur. This proactive approach allows for a rapid, coordinated response, providing timely and practical assistance when it is needed most.`,
    images: ["/disaster-relief.jpg"],
    canDonate: true,
    canSell: false,

  },
  {
    slug: "orphanage-support",
    title: "Orphanage Support Program",
    description: "empowering orphaned children with essential care, education supplies, and a loving community environment",
    tags: ["Children", "Care", "Education"],
    published: true,

    content: `The BridgeSeed Foundation believes that the journey of a belonging should extend beyond the campus gates. Through our Orphanage Support Programme, we strategically channel a portion of the high-quality, unused materials gathered from our student community, including clothing, study materials, and hygiene products, to local orphanages. This initiative transforms student surplus into essential support, ensuring that our commitment to strategic giving creates measurable impact for the most vulnerable members of our wider community. Every item donated by a student helps write a new chapter of hope and dignity for a child in need.`,
    images: ["/orphanage-support.jpg"],
    canDonate: true,
    canSell: false,

  },
  {
    slug: "student-marketplace",
    title: "Student Thrift & Marketplace",
    description: "a sustainable campus hub for redistributing usable items, promoting circular economy and peer-to-peer support",
    tags: ["Sustainability", "Students", "Community"],
    published: true,

    content: `A student-led circular economy initiative that collects, restores, and redistributes gently used furniture, books, and electronics on campus. The marketplace helps students access essential items affordably while reducing waste and keeping usable goods out of landfills.`,
    images: ["/student-marketplace.jpg"],
    canDonate: false,
    canSell: true,
  },
  {
    slug: "community-impact-fund",
    title: "Community Impact Fund",
    description: "flexible funding to address the most urgent needs across all our initiatives, ensuring resources go where they are needed most",
    tags: ["General", "Flexible", "Impact"],
    published: true,
    content: `Flexibility is Power
Sometimes the most urgent need isn't part of a pre-defined project. A sudden medical emergency for a community member, a broken water pump in a remote village, or a unique scholarship opportunity for a bright student—these are the "gaps" that the Community Impact Fund fills.

Where the Money Goes
This fund acts as our rapid-response resource. It allows us to:
- Triage: Respond to the most critical needs within 24 hours.
- Innovate: Fund pilot programs that, if successful, can grow into full projects.
- Sustain: Ensure that no ongoing project fails due to temporary funding shortfalls.

 Why it Matters
By donating to the general fund, you are trusting BridgeSeed's experts to direct your contribution to where it will generate its maximum mathematical impact at that specific moment.`,
    images: ["/community-impact-fund.jpg"],
    canDonate: true,
    canSell: false,

  },
]

// Sample blog posts data
const postsData: Post[] = [
  {
    slug: "inaugural-outreach-um6p",
    title: "The Spark of Connection: BridgeSeed Foundation’s Inaugural Outreach at UM6P",
    excerpt:
      "On November 26th, 2025, the BridgeSeed Foundation team embarked on its first-ever outreach, taking to the pathways of the Benguerir UM6P campus to introduce strategic giving.",
    date: "2026-01-18",
    author: "BridgeSeed Foundation Team",
    content: `In the bustling heart of our university, where innovation and ambition converge, a new story of community and connection is unfolding. On November 26th, 2025, the BridgeSeed Foundation team embarked on its first-ever outreach, taking to the pathways of the Benguerir UM6P campus to introduce a project born from a simple yet profound idea: that our belongings have a journey, and their stories don’t have to end with us.

As a student-led initiative and a key project for our Leadership Lab course module, BridgeSeed Foundation was founded on the principle of “strategic giving.” Our mission is to create a sustainable bridge between students who have items they no longer need and those who are in search of them. In a world of excess, we see an opportunity to foster a culture of sharing and support, transforming potential waste into valuable resources for our peers.

The day was filled with meaningful conversations and enthusiastic encounters. As we walked through the campus, we shared our vision with fellow students: a community where no usable item goes to waste, and every belonging finds a new chapter. The response was overwhelmingly positive. We heard from students who were excited about the prospect of a centralized, dignified system for giving and receiving items, from textbooks and clothing to household goods and electronics.

One of the most rewarding aspects of the day was seeing the immediate spark of connection. Students were not just interested in the concept; they were eager to be a part of it. Many readily joined our WhatsApp community, a growing digital space where the spirit of giving can flourish. This immediate buy-in from the student body was a powerful affirmation of our mission and a testament to the inherent generosity within our campus community.

This first outreach was more than just an announcement; it was a listening tour. We learned about the needs of our fellow students, the items that are most sought after, and the desire for a more sustainable and community-oriented campus life. These conversations are the bedrock of our foundation, and they will continue to guide our efforts as we grow.

As students in the Leadership Lab, this experience has been a profound lesson in turning vision into action. It’s one thing to theorize about leadership and community building in a classroom, but it’s another to see it come to life in the real world. The smiles, the words of encouragement, and the willingness of our peers to join us on this journey have been the most valuable takeaways.

We are incredibly grateful to everyone who took the time to speak with us, to listen to our story, and to join our cause. This is just the beginning of the BridgeSeed Foundation’s story, and we are excited to write the next chapter with all of you.

What’s next?

We are actively collecting donations and building our inventory. If you have items you’d like to donate, or if you’re in need of something, please don’t hesitate to reach out. Together, we can build a more connected and resourceful campus community, one belonging at a time.

Join the conversation and be a part of the movement. Connect with us on our WhatsApp community and visit our website to learn more.`,
    images: [
      "/blog 1/A man with 2 ladies during bengurir outreach.jpg",
      "/blog 1/Media (6).jpg",
      "/blog 1/a lady and a man in outreach bengurir.jpg",
      "/blog 1/a man and 3 ladies during bengurir outreach.jpg",
      "/blog 1/a man with two men during bengurir oureach.jpg",
      "/blog 1/teamimage.jpg"
    ]
  },
  {
    slug: "journey-of-belongings",
    title: "The Journey of Belonging(s): A Story of Connection and Leadership",
    excerpt:
      "Every object has a story. At BridgeSeed Foundation, we believe these stories don't have to end when an item is no longer needed.",
    date: "2026-01-18",
    author: "BridgeSeed Foundation Team",
    content: `Every object has a story. A textbook that fuelled late-night study sessions, a warm coat that braved the winter winds, a coffee mug that witnessed countless conversations. At BridgeSeed Foundation, we believe these stories don't have to end when an item is no longer needed. They can be passed on, creating new chapters of value and purpose. This was the heart of our message at the \"Neuroscience of Storytelling\" event on December 21st, 2025, an inspiring gathering organized by the Collective Intelligence Consortium.

As part of our Leadership Lab coursework, we were tasked not only with building a project but also with communicating its essence in a way that would resonate and inspire. The opportunity to present at this event was a perfect alignment of our academic and practical goals. We took the stage to share the \"Journey of Belonging(s),\" a narrative that weaves together the stories of our peers, the lifecycle of their possessions, and the vision of a more connected and sustainable campus community.

Our presentation was more than just a description of our foundation; it was an invitation to see the world of \"stuff\" through a different lens. We told the story of Jerry, a young architecture graduate who had just completed his studies at UM6P and was preparing to return to his home country. As he packed his belongings, Jerry faced a dilemma that many graduating students encounter: what to do with the items that had become part of his university journey? Rather than leave them behind or discard them, Jerry wondered if his possessions could continue to serve a purpose within the campus community he was leaving.

We then introduced Ahlam, a student whose community had recently been devastated by devastating floods. In the aftermath of this natural disaster, Ahlam and a dedicated group of fellow students mobilized to gather relief materials for the flood victims. They needed everything from clothing and blankets to hygiene products and household essentials. Yet sourcing these items quickly and sustainably presented a significant challenge.

These two stories: Jerry's abundance and Ahlam's urgent need, illustrated the exact gap that BridgeSeed Foundation exists to bridge. Through their narratives, we explored the dual meaning of \"belonging\": the sense of community and connection we all seek, and the \"belongings\" that are a part of our daily lives. Jerry's items found new purpose in serving those affected by the floods, transforming what could have been waste into relief and hope for a community in crisis.

The response from the audience was electric. The storytelling approach allowed us to connect with our peers on an emotional level, sparking a genuine interest in our mission. We saw heads nodding in agreement, eyes lighting up with understanding, and a palpable sense of shared purpose in the room. The event was a powerful reminder that stories are the currency of connection and that a well-told story can be a catalyst for change.

For our team, this experience was a masterclass in leadership and communication. It challenged us to distill our complex vision into a simple, compelling narrative rooted in real human experiences. It taught us the importance of empathy, of understanding the needs and motivations of our audience, and of crafting a message that speaks to both the head and the heart. The \"Neuroscience of Storytelling\" event was not just a platform for our project; it was a laboratory for our leadership skills.

We are immensely grateful to the Collective Intelligence Consortium for giving us this opportunity and to everyone who attended and engaged with our story. The conversations that followed our presentation have been invaluable, and the new members who have joined our community are a testament to the power of a shared narrative grounded in real impact.

BridgeSeed Foundation is more than just a project; it's a movement. A movement of students who believe in the power of community, the value of sustainability, and the enduring journey of our belongings. We invite you to join us in this story, whether you are like Jerry, looking to pass on what you no longer need, or like Ahlam, seeking to gather resources for those in need.

Get involved!

Do you have a story to share? Items to donate? A community in need that we can help support? Visit our website and join our WhatsApp community to become a part of the BridgeSeed story. Together, we can transform excess into opportunity and belongings into hope.`,
    images: [
      "/blog 2/Media (2).jpg",
      "/blog 2/Media (3).jpg",
      "/blog 2/Media (4).jpg",
      "/blog 2/Media (5).jpg",
      "/blog 2/Media (7).jpg",
      "/blog 2/groupimage.jpg"
    ]
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projectsData.find((project) => project.slug === slug)
}

export function getAllProjects(): Project[] {
  return projectsData.filter((project) => project.published)
}

export function getPostBySlug(slug: string): Post | undefined {
  return postsData.find((post) => post.slug === slug)
}

export function getAllPosts(): Post[] {
  return postsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
