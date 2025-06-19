export interface TimelineItem {
    period: string;
    title: string;
    company: string;
    description: string;
    bulletPoints: string[];
    technologies: string[];
}

export const timeline: TimelineItem[] = [
    {
        period: "2020 - 2021",
        title: "Freelancer",
        company: "Self-Employed",
        description: "300+ commissions received during this period, projects ranging from websites, discord bots etc.",
        bulletPoints: [
            "Completed 300+ custom projects from different clients across the globe",
            "Gained experience with diverse client requirements and project scopes",
            "Developed strong communication and project management skills",
            "Built expertise in JavaScript ecosystem and web technologies"
        ],
        technologies: ["Javascript", "Typescript", "NodeJS", "HTML5", "CSS", "Boostrap", "Next.js", "discord.js"]
    },
    {
        period: "2021 ~ 2021",
        title: "Bot Developer",
        company: "Celendi",
        description: "Developed and maintained Discord bot features for community management and entertainment.",
        bulletPoints: [
            "Implemented moderation and entertainment commands",
            "Optimized bot performance and user experience",
            "Collaborated with team on feature development",
            "Maintained code quality and documentation"
        ],
        technologies: ["Discord.js", "Javascript", "MongoDB", "NodeJS"]
    },
    {
        period: "2021 ~ 2022",
        title: "Bot Developer",
        company: "Galaxies Ltd.",
        description: "Galaxies - The all-in-one multipurpose discord bot at your disposal. Invite me today to freshen up your Discord Experience!",
        bulletPoints: [
            "Developed comprehensive Discord bot with multiple features",
            "Implemented database integration with PostgreSQL and Redis",
            "Created scalable architecture for high-traffic servers",
            "Collaborated on user experience improvements and feature additions"
        ],
        technologies: ["Discord.js", "Javascript", "PostgreSQL", "MongoDB", "Redis", "NodeJS"]
    },
    {
        period: "2022 ~ 2022",
        title: "Maintainer/Contributor",
        company: "PrismaCord",
        description: "A Javascript/Typescript API Wrapper for Discord designed by developers for developers.",
        bulletPoints: [
            "Co-founded alternative Discord API wrapper project",
            "Designed improved developer experience over existing solutions",
            "Implemented TypeScript support and modern JavaScript features",
            "Contributed to open-source community with innovative approach"
        ],
        technologies: ["Javascript", "Typescript", "NodeJS"]
    },
    {
        period: "2020 ~ 2024 July",
        title: "Founder",
        company: "EternalGaius Ltd.",
        description: "EternalGaius is a multi-purpose discord bot that focuses on enhancing your Discord Experience.",
        bulletPoints: [
            "Founded and led development of multi-purpose Discord bot",
            "Managed project lifecycle from conception to merger",
            "Built scalable infrastructure supporting thousands of users",
            "Implemented service interactions on server with RabbitMQ"
        ],
        technologies: ["Discord.js", "PostgreSQL", "Redis", "NodeJS", "Javascript", "RabbitMQ"]
    },
    {
        period: "2024 January ~ 2025 March",
        title: "Information and Communication Technology Department Supervisor",
        company: "The Church of Christ in China, Kei Pun Church Ltd.",
        description: "The department is responsible for developing and maintaining digital solutions for church operations and community management.",
        bulletPoints: [
            "Supervised the ICT department operations and strategic planning",
            "Developed custom scheduling application for church management",
            "Implemented modern technology solutions for community needs",
            "Transitioned to Rust and Kotlin for performance-critical applications"
        ],
        technologies: ["Rust", "Kotlin", "PostgreSQL", "MongoDB", "RabbitMQ"]
    },
    {
        period: "2024 August ~ 2025 June",
        title: "Lead Developer, System Administrator",
        company: "Epoch Studio Ltd. - Galaxies Branch",
        description: "Epoch Studio - Galaxies is an all-in-one multipurpose discord bot at your disposal. Invite me today to freshen up your Discord Experience.",
        bulletPoints: [
            "Led cross-functional team of 6 developers across multiple specializations",
            "Architected and implemented scalable bot infrastructure",
            "Introduced message broker systems for improved performance",
            "Coordinated development cycles and technical decision-making",
            "Mentored junior developers and established coding standards"
        ],
        technologies: ["Discord.js", "PostgreSQL", "Redis", "NodeJS", "Javascript", "Message Broker"]
    },
    {
        period: "2025 June ~ Present",
        title: "Lead Web Developer",
        company: "The Church of Christ in China, Kei Pun Church Ltd.",
        description: "I am responsible for developing and maintaining the Church's Website.",
        bulletPoints: [
            "Collaborated with colleagues to develop the site.",
            "Leaded the Web Dev Team composed of 4 people.",
            "Designed and implemented responsive and accessible user interfaces."
        ],
        technologies: ["Typescript", "React", "Vite", "TailwindCSS", "NodeJS", "Vercel"]
    }

]
