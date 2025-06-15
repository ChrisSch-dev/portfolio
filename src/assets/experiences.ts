export interface Project {
    name: string;
    type: string;
    status: string;
    period: string;
    description: string;
}

export interface TimelineItem {
    period: string;
    title: string;
    company: string;
    description: string;
    bulletPoints?: string[];
    technologies: string[];
}

export interface Technology {
    name: string;
    icon: string;
}

export interface SkillGroup {
    category: string;
    icon: string;
    technologies: Technology[];
}

export const projects: Project[] = [
    {
        name: "EternalGaius Discord Bot",
        type: "bot",
        status: "archived",
        period: "2020-2024",
        description: "EternalGaius is a multi-purpose discord bot which has now shut down due to internal reasons, and has been merged with the discord bot Galaxies."
    },
    {
        name: "Galaxies Discord Bot",
        type: "bot",
        status: "archived",
        period: "2021-2022",
        description: "All-in-one multipurpose Discord bot with comprehensive server management"
    },
    {
        name: "Epoch Studio - Galaxies",
        type: "bot",
        status: "active",
        period: "2024 August ~ Present",
        description: "A new managing team is now in-charge of Galaxies. With a new direction and new goals in mind."
    },
    {
        name: "Celendi Discord Bot",
        type: "bot",
        status: "archived",
        period: "2021",
        description: "Feature-rich Discord bot with moderation and entertainment commands"
    },
    {
        name: "PrismaCord API Wrapper",
        type: "library",
        status: "archived",
        period: "2022-2022",
        description: "JavaScript/TypeScript Discord API wrapper alternative to Discord.js"
    },
    {
        name: "Church Schedule Management App",
        type: "web-app",
        status: "completed",
        period: "2024-2024",
        description: "Custom scheduling app to handle to keep track of all duty schedule within the church."
    },
    {
        name: "Portfolio Website",
        type: "web-app",
        status: "active",
        period: "2025",
        description: "Personal portfolio showcasing projects and professional experience. You are looking at it now!"
    },
    {
        name: "Freelance Projects",
        type: "various",
        status: "completed",
        period: "2020-2021",
        description: "300+ commissioned projects including websites and Discord bots"
    }
]

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
    }
]

export const skills: SkillGroup[] = [
    {
        category: "Frontend Development",
        icon: "🎨",
        technologies: [
            { name: "Javascript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
            { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
            { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
            { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
            { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
            { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
            { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
        ]
    },
    {
        category: "Backend Development",
        icon: "⚙️",
        technologies: [
            { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
            { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
            { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
            { name: "Kotlin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
            { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
            { name: "Rust", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg" },
            { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
            { name: "C++", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1822px-ISO_C%2B%2B_Logo.svg.png" }
        ]
    },
    {
        category: "Database & Cloud",
        icon: "🗄️",
        technologies: [
            { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
            { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
            { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
            { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
            { name: "Google Cloud", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
            { name: "Heroku", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-original.svg" }
        ]
    },
    {
        category: "Tools & DevOps",
        icon: "🛠️",
        technologies: [
            { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
            { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
            { name: "Vite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" },
            { name: "GitHub Actions", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
            { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
            { name: "Ubuntu", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-original.svg" },
            { name: "Nginx", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" },
            { name: "RabbitMQ", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rabbitmq/rabbitmq-original.svg" }
        ]
    }
]
