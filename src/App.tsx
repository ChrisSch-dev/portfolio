import {useEffect, useState} from 'react'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet'
import {ExternalLink, Github, Mail, Menu, Moon, Sun} from 'lucide-react'

function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [darkMode, setDarkMode] = useState(true)

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [darkMode])

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({behavior: 'smooth'})
        }
        setIsMenuOpen(false)
    }

    const navItems = [
        { name: 'Home', id: 'home' },
        { name: 'About', id: 'about' },
        { name: 'Experience', id: 'timeline' },
        { name: 'Skills', id: 'skills' },
        { name: 'Contact', id: 'contact' }
    ]

    const timeline = [
        {
            period: "2020 - 2021",
            title: "Freelancer",
            company: "Self-Employed",
            description: "300+ commissions received during this period, projects ranging from websites, discord bots etc.",
            technologies: ["Javascript", "Typescript", "NodeJS", "HTML5", "CSS", "Boostrap", "Next.js", "discord.js"]
        },
        {
            period: "2021 ~ 2021",
            title: "Bot Developer",
            company: "Celendi",
            description: "Celendi is a multi-functional discord bot designed to be the only bot you need in your server, containing a wide selection of commands from fun to moderation, we have it all!",
            technologies: ["Discord.js", "Javascript", "MongoDB", "NodeJS"]
        },
        {
            period: "2021 ~ 2022",
            title: "Bot Developer",
            company: "Galaxies Ltd.",
            description: "Galaxies - The all-in-one multipurpose discord bot at your disposal. Invite me today to freshen up your Discord Experience!",
            technologies: ["Discord.js", "Javascript", "PostgreSQL", "Redis", "NodeJS"]
        },
        {
            period: "2022 ~ 2022",
            title: "Maintainer/Contributor",
            company: "PrismaCord",
            description: "Me and a couple of my friends started on a project called PrismaCord. Which is a Discord API Wrapper for Javascript and Typescript, since we hated how Discord.js worked behind the scenes in terms of their development.",
            technologies: ["Javascript", "Typescript", "NodeJS"]
        },
        {
            period: "2020 ~ 2024 July",
            title: "Founder",
            company: "EternalGaius Ltd.",
            description: "EternalGaius is a multi-purpose discord bot which is now shut down, and has been merged with the discord bot Galaxies.",
            technologies: ["Discord.js", "PostgreSQL", "Redis", "NodeJS", "Javascript"]
        },
        {
            period: "2024 January ~ 2025 March",
            title: "Information and Communication Technology (ICT.) Department Supervisor",
            company: "The Church of Christ in China, Kei Pun Church Ltd.",
            description: "During my stay, I was in-charged of the ICT Department, managing the daily operation of the department, and facilitating manpower and tech support in the Church.",
            technologies: ["Rust", "Kotlin", "PostgreSQL", "MonogDB"]
        },
        {
            period: "2024 August ~ 2025 June",
            title: "Lead Developer, System Administrator - Galaxies Branch",
            company: "Epoch Studio Ltd.",
            description: "Galaxies - The all-in-one multipurpose discord bot at your disposal. Invite me today to freshen up your Discord Experience!",
            technologies: ["Discord.js", "PostgreSQL", "Redis", "NodeJS", "Javascript", "Message Broker"]
        }
    ]

    const skills = [
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
                { name: "Nginx", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" }
            ]
        }
    ]

    return (
        <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
            <div className="bg-background text-foreground">
                {/* Navigation */}
                <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="font-bold text-xl">ChrisSch.dv</div>

                            {/* Desktop Navigation */}
                            <div className="hidden md:flex space-x-8">
                                {navItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className="text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {item.name}
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center space-x-4">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setDarkMode(!darkMode)}
                                >
                                    {darkMode ? <Sun className="h-5 w-5"/> : <Moon className="h-5 w-5"/>}
                                </Button>

                                {/* Mobile Navigation */}
                                <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                                    <SheetTrigger asChild className="md:hidden">
                                        <Button variant="ghost" size="icon">
                                            <Menu className="h-6 w-6"/>
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent>
                                        <div className="flex flex-col space-y-4 mt-8">
                                            {navItems.map((item) => (
                                                <button
                                                    key={item.id}
                                                    onClick={() => scrollToSection(item.id)}
                                                    className="text-left text-lg text-muted-foreground hover:text-foreground transition-colors"
                                                >
                                                    {item.name}
                                                </button>
                                            ))}
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section id="home" className="pt-16 min-h-screen flex items-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                        <div className="text-center">
                            <img
                                src="https://images-ext-1.discordapp.net/external/iyOUlPLcHNFdNYepEmEkTZ3Q1rwupCJyicCOG11kAVE/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/592663451978039298/a_3eb974f350dac86106ea06b0662d2f01.gif?width=386&height=386"
                                alt="Chris Tsang Profile"
                                className="w-32 h-32 mx-auto mb-8 rounded-full object-cover shadow-lg ring-4 ring-blue-500/20"
                            />
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                Hello, I'm <span className="text-blue-600 dark:text-blue-400">Chris Tsang</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                                A Back End Developer from Hong Kong passionate about building engaging,
                                feature-rich experiences and making solutions that makes a difference!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button variant="outline" size="lg" onClick={() => scrollToSection('contact')}>
                                    Get In Touch
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="py-20 bg-muted/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Learn more about my background, experience, and what drives my passion for development.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <img
                                    src="https://media.discordapp.net/attachments/1382680041132920872/1383134462396596244/IMG_20250508_125803_837.webp?ex=684dafd9&is=684c5e59&hm=e3617a3b83e49d49aaa826e1a33e9970e08d455dda600021c8035b82c56330c5&=&format=webp&width=921&height=921"
                                    alt="Profile"
                                    className="rounded-lg shadow-lg w-full max-w-md mx-auto"
                                />
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold mb-4">My Journey</h3>
                                <p className="text-muted-foreground mb-6">
                                    I've been programming for over 5 years and started with Javascript, however quickly
                                    switched off of it as my main language in favor of Rust and Kotlin, in hopes of
                                    pursuing an app-development journey. Nowadays I mostly stick with Rust/Kotlin due to
                                    work reasons, outside of work, I often play around with languages such as
                                    Javascript, Typescript and Python for my personal projects. Currently, I am learning
                                    C and C++ to expand my skill set.
                                </p>
                                <p className="text-muted-foreground mb-6">
                                    As of recently, I have taken a step back in programming outside of work to try to
                                    discover other fields outside of tech which I am interested in. However, fret-not,
                                    the tech industry will always have a special place in my heart!
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {['Problem Solving', 'Team Leadership', 'Agile Development', 'Fast Learner'].map((trait) => (
                                        <Badge key={trait} variant="secondary">{trait}</Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Timeline Section */}
                <section id="timeline" className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience Timeline</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                My professional journey and the experiences that have shaped my career in back-end
                                development.
                            </p>
                        </div>
                        <div className="max-w-4xl mx-auto">
                            <div className="relative">
                                {/* Timeline line */}
                                <div
                                    className="absolute left-4 md:left-1/2 transform md:-translate-x-0.5 w-0.5 h-full bg-border"/>

                                {timeline.map((item, index) => (
                                    <div key={item.company + item.period}
                                         className={`relative flex items-center mb-12 ${
                                             index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                         }`}>
                                        {/* Timeline dot */}
                                        <div
                                            className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-background z-10"/>

                                        {/* Content */}
                                        <div className={`flex-1 ml-12 md:ml-0 ${
                                            index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'
                                        }`}>
                                            <Card className="hover:shadow-lg transition-shadow duration-300">
                                                <CardHeader>
                                                    <div className="flex flex-col">
                                                        <Badge variant="outline" className="w-fit mb-2">
                                                            {item.period}
                                                        </Badge>
                                                        <CardTitle className="text-xl mb-1">{item.title}</CardTitle>
                                                        <CardDescription
                                                            className="text-lg font-medium text-blue-600 dark:text-blue-400">
                                                            {item.company}
                                                        </CardDescription>
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <p className="text-muted-foreground mb-4">
                                                        {item.description}
                                                    </p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {item.technologies.map((tech) => (
                                                            <Badge key={tech} variant="secondary" className="text-xs">
                                                                {tech}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>

                                        {/* Spacer for alternating layout */}
                                        <div className="hidden md:block flex-1"/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Skills Section */}
                {/* Skills Section */}
                <section id="skills" className="py-20 bg-muted/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Technologies</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                The technologies and tools I work with to build modern, scalable applications.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            {skills.map((skillGroup) => (
                                <Card key={skillGroup.category} className="hover:shadow-lg transition-all duration-300">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-3 text-xl">
                                            <span className="text-2xl">{skillGroup.icon}</span>
                                            {skillGroup.category}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2">
                                            {skillGroup.technologies.map((tech) => (
                                                <Badge key={tech.name} variant="secondary" className="flex items-center gap-2 px-3 py-1 text-sm">
                                                    {tech.icon.startsWith('http') ? (
                                                        <img
                                                            src={tech.icon}
                                                            alt={`${tech.name} icon`}
                                                            className="w-4 h-4"
                                                            onError={(e) => {
                                                                e.currentTarget.style.display = 'none'
                                                            }}
                                                        />
                                                    ) : (
                                                        <span className="text-sm">{tech.icon}</span>
                                                    )}
                                                    {tech.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                I'm always open to discussing new opportunities, interesting projects, or just having a
                                chat.
                            </p>
                        </div>
                        <div className="max-w-2xl mx-auto text-center">
                            <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
                            <p className="text-muted-foreground mb-8">
                                Whether you have a project in mind, want to collaborate, or just want to say hello, I'd
                                love to hear from you.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center justify-center gap-4">
                                    <Mail className="h-5 w-5 text-blue-600"/>
                                    <span>Coming Soon</span>
                                </div>
                                <div className="flex gap-4 justify-center mt-6">
                                    <Button variant="outline" size="icon" asChild>
                                        <a href="https://github.com/ChrisSch-dev" target="_blank"
                                           rel="noopener noreferrer">
                                            <Github className="h-5 w-5"/>
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-8 border-t bg-muted/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p className="text-muted-foreground">
                            © 2025 Chris Tsang | Built with React, TypeScript, and Tailwind CSS | <a href="https://github.com/ChrisSch-dev/portfolio">Source Code</a>
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default App
