export interface Project {
    name: string;
    type: string;
    status: string;
    period: string;
    description: string;
}

export const projects: Project[] = [
    {
        name: "Epoch Studio - Galaxies",
        type: "bot",
        status: "active",
        period: "2024 August ~ Present",
        description: "A new managing team is now in-charge of Galaxies. With a new direction and new goals in mind."
    },
    {
        name: "Portfolio Website",
        type: "web-app",
        status: "active",
        period: "2025",
        description: "Personal portfolio showcasing projects and professional experience. You are looking at it now!"
    },
    {
        name: "Church Schedule Management App",
        type: "web-app",
        status: "completed",
        period: "2024-2024",
        description: "Custom scheduling app to handle to keep track of all duty schedule within the church."
    },
    {
        name: "Freelance Projects",
        type: "various",
        status: "completed",
        period: "2020-2021",
        description: "300+ commissioned projects including websites and Discord bots"
    },
    {
        name: "Mini-SQL",
        type: "Software",
        status: "completed",
        period: "2025 June",
        description: "A mini-sql software coded in C as part of my journey in learning C. (Project is a very simple version of SQL, and is not suitable for production.)"
    },
    {
        name: "Note-Taking App",
        type: "Software",
        status: "completed",
        period: "2025 February",
        description: "A simple note taking app written in Rust for when I was learning Rust."
    },
    {
        name: "Task Manager",
        type: "software",
        status: "completed",
        period: "2025 May",
        description: "A task manager app that monitors hardware resources consumption, inspired by Windows Task Manager. Made in Rust"
    },
    {
        name: "Budget Tracking App",
        type: "software",
        status: "completed",
        period: "2025 May",
        description: "A budget tracking app that helps keep track of your spendings. Made in Rust."
    },
    {
        name: "api-client",
        type: "api / software",
        status: "completed",
        period: "2025 May",
        description: "An advanced api client written in Javascript with properly defined Status Code, and auto-routing for newly implemented paths, focusing on ease-to-use and maintainability."
    },
    {
        name: "socket.io Message Broker",
        type: "software",
        status: "completed",
        period: "2024 October",
        description: "A Message Broker written in Javascript that utilizes socket.io for communication between appplications on a server."
    },
    {
        name: "Point System",
        type: "bot",
        status: "completed",
        period: "2023 July",
        description: "A simple Discord Bot written in Javascript that tracks points across server members."
    },
    {
        name: "Kei Pun Church Website",
        type: "website",
        status: "completed",
        period: "2025 June",
        description: "Developed the website used by Kei Pun Church. Contains a Blog Section."
    },
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
    }
]
