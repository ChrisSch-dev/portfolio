export interface Testimonial {
    id: string;
    name: string;
    position: string;
    company: string;
    content: string;
    rating?: number;
    profilePicture?: string | null | undefined
}

export const testimonials: Testimonial[] = [
    {
        id: "1",
        name: "Ghost4318",
        position: "Owner/Founder",
        company: "Epoch Studio Ltd.",
        content: "Chris is an exceptional developer with a deep understanding of backend systems. His work on our Discord bot infrastructure was outstanding, and he consistently delivered high-quality solutions under tight deadlines.",
        rating: 5,
        profilePicture: "https://cdn.discordapp.com/avatars/747870498221719592/a_d1697ac795329e20976ebaa431f1a4ab.gif?size=2048"
    },
    {
        id: "2",
        name: "Michael Chen",
        position: "Project Manager",
        company: "The Church of Christ in China, Kei Pun Church Ltd.",
        content: "Working with Chris on our church scheduling application was a pleasure. He brought innovative solutions to complex problems and his technical leadership skills are remarkable.",
        rating: 5
    },
    {
        id: "3",
        name: "Sujal1048D",
        position: "Product Owner",
        company: "Former Client",
        content: "Chris's ability to manage a cross-functional team while maintaining high code quality is impressive. His expertise in Rust and Kotlin helped elevate our entire development process.",
        rating: 5,
        profilePicture: "https://cdn.discordapp.com/avatars/668090704601415691/92b2052f01c31961e5dc43f98d491855.png?size=2048"
    },
    {
        id: "4",
        name: "N1nsoka",
        position: "Product Owner",
        company: "Former Client",
        content: "During Chris's freelancing period, he delivered over 7 projects for me. His reliability, technical skills, and communication made him my go-to developer for complex tasks.",
        rating: 5,
        profilePicture: "https://cdn.discordapp.com/avatars/209490561378418699/15762e934f56cd023259736efe0aa9b8.png?size=2048"
    }
]
