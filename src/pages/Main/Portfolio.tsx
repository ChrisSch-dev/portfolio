import {useEffect, useState, useRef} from 'react'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet'
import {ExternalLink, Github, Instagram, Mail, Menu, Moon, Sun, Twitter} from 'lucide-react'
import { skills, timeline, projects } from '@/assets/experiences'
import { testimonials } from '@/assets/testimonials.ts'
import { navItems } from '@/components/menu/navItems.ts'
import { DiscordIcon } from "@/assets/icons/discord.tsx"
import InteractiveBackground from '@/components/background/InteractiveBackground'
import { useNavigate } from 'react-router-dom'

function Portfolio() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [darkMode, setDarkMode] = useState(true)
    const [terminalVisible, setTerminalVisible] = useState(false)
    const [typedText, setTypedText] = useState('')
    const [showProjects, setShowProjects] = useState(false)
    const aboutRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [darkMode])

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !terminalVisible) {
                    setTerminalVisible(true)
                }
            },
            {
                threshold: 0.3,
            }
        )

        if (aboutRef.current) {
            observer.observe(aboutRef.current)
        }

        return () => {
            if (aboutRef.current) {
                observer.unobserve(aboutRef.current)
            }
        }
    }, [terminalVisible])

    useEffect(() => {
        if (terminalVisible) {
            const command = 'projects ls'
            let currentIndex = 0

            const typeInterval = setInterval(() => {
                if (currentIndex <= command.length) {
                    setTypedText(command.substring(0, currentIndex))
                    currentIndex++
                } else {
                    clearInterval(typeInterval)
                    // Show projects after typing is complete
                    setTimeout(() => setShowProjects(true), 500)
                }
            }, 100)

            return () => clearInterval(typeInterval)
        }
    }, [terminalVisible])

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({behavior: 'smooth'})
        }
        setIsMenuOpen(false)
    }

    return (
        <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
            <div className="bg-background text-foreground relative">
                <InteractiveBackground darkMode={darkMode} />
                {/* Navigation */}
                <nav className="fixed top-0 left-0 right-0 w-full bg-background/80 backdrop-blur-md border-b z-50"
                     style={{ position: 'fixed' }}>
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
                                <button
                                    onClick={() => navigate('/blog')}
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Blog
                                </button>
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
                                            <button
                                                onClick={() => navigate('/blog')}
                                                className="text-left text-lg text-muted-foreground hover:text-foreground transition-colors"
                                            >
                                                Blog
                                            </button>
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section id="home" className="pt-16 min-h-screen flex items-center relative z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                        <div className="text-center">
                            <img
                                src="/assets/christsang.jpg"
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
                                <Button size="lg" asChild>
                                    <a
                                        href="/assets/chris-tsang-resume.html"
                                        download="Chris-Tsang-Resume.pdf"
                                        className="flex items-center gap-2"
                                    >
                                        <svg
                                            className="h-4 w-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            />
                                        </svg>
                                        Download Resume
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="py-20 bg-muted/50 relative z-10" ref={aboutRef}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Learn more about my background, experience, and what drives my passion for development.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                {/* Terminal Box */}
                                <div className="bg-gray-900 rounded-lg shadow-xl overflow-hidden border border-gray-700 max-w-md mx-auto">
                                    {/* Terminal Header */}
                                    <div className="bg-gray-800 px-4 py-3 flex items-center gap-2">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                            <div className="w-3 h-3 rounded-full bg-green-500" />
                                        </div>
                                        <div className="text-gray-400 text-sm ml-4">terminal</div>
                                    </div>

                                    {/* Terminal Content */}
                                    <div className="p-4 font-mono text-sm h-96 overflow-y-auto">
                                        <div className="text-green-400 mb-2">
                                            chris@portfolio:~$ <span className="text-white">{typedText}</span>
                                            {!showProjects && <span className="animate-pulse text-white">|</span>}
                                        </div>

                                        {showProjects && (
                                            <div className="mt-4 space-y-2">
                                                <div className="text-gray-400 mb-3">
                                                    Found {projects.length} projects:
                                                </div>
                                                {projects.map((project, index) => (
                                                    <div
                                                        key={project.name}
                                                        className="border-l-2 border-gray-600 pl-3 mb-3"
                                                        style={{
                                                            animationDelay: `${index * 200}ms`,
                                                            animation: 'fadeInUp 0.5s ease-out forwards',
                                                            opacity: 0
                                                        }}
                                                    >
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className={`w-2 h-2 rounded-full ${
                                                                project.status === 'active' ? 'bg-green-400' :
                                                                    project.status === 'completed' ? 'bg-blue-400' :
                                                                        'bg-gray-500'
                                                            }`} />
                                                            <span className="text-blue-300 text-xs uppercase">{project.type}</span>
                                                            <span className="text-gray-400 text-xs">{project.period}</span>
                                                        </div>
                                                        <div className="text-white font-medium">{project.name}</div>
                                                        <div className="text-gray-400 text-xs mt-1 leading-relaxed">
                                                            {project.description}
                                                        </div>
                                                        <div className={`text-xs px-2 py-1 rounded mt-2 inline-block ${
                                                            project.status === 'active' ? 'bg-green-900 text-green-300' :
                                                                project.status === 'completed' ? 'bg-blue-900 text-blue-300' :
                                                                    'bg-gray-700 text-gray-400'
                                                        }`}>
                                                            {project.status}
                                                        </div>
                                                    </div>
                                                ))}
                                                <div className="mt-4 text-gray-400">
                                                    <div className="mt-2">chris@portfolio:~$ <span className="animate-pulse text-white">|</span></div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
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

                {/* Skills Section */}
                <section id="skills" className="py-20 relative z-10">
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
                                    <CardContent className="pt-2">
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

                {/* Timeline Section */}
                <section id="timeline" className="py-20 bg-muted/50 relative z-10">
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
                                                <CardHeader className="pb-2">
                                                    <div className="flex flex-col">
                                                        <div className={`mb-2 ${
                                                            index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                                                        }`}>
                                                            <Badge variant="outline" className="w-fit">
                                                                {item.period}
                                                            </Badge>
                                                        </div>
                                                        <CardTitle className="text-xl">{item.title}</CardTitle>
                                                        <CardDescription
                                                            className="text-lg font-medium text-blue-600 dark:text-blue-400">
                                                            {item.company}
                                                        </CardDescription>
                                                    </div>
                                                </CardHeader>
                                                <CardContent className="pt-0">
                                                    <p className="text-muted-foreground mb-2">
                                                        {item.description}
                                                    </p>
                                                    {item.bulletPoints && (
                                                        <ul className="text-muted-foreground mb-4 space-y-2">
                                                            {item.bulletPoints.map((point) => (
                                                                <li key={point} className="flex items-baseline gap-3">
                                                                    <span className="text-blue-600 dark:text-blue-400 flex-shrink-0 text-lg">•</span>
                                                                    <span className="text-sm leading-relaxed flex-1 text-left">{point}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
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

                {/* Testimonials Section */}
                <section id="testimonials" className="py-20 relative z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">What People Say</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Testimonials from colleagues, clients, and team members I've had the pleasure to work with.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                            {testimonials.map((testimonial) => (
                                <Card key={testimonial.id} className="hover:shadow-lg transition-all duration-300">
                                    <CardContent className="p-6">
                                        <div className="flex mb-4">
                                            {[...Array(testimonial.rating || 5)].map((_, i) => (
                                                <span key={`star-${testimonial.id}-${i}`} className="text-yellow-400 text-lg">★</span>
                                            ))}
                                        </div>
                                        <blockquote className="text-muted-foreground mb-6 italic leading-relaxed">
                                            "{testimonial.content}"
                                        </blockquote>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full overflow-hidden">
                                                {testimonial.profilePicture ? (
                                                    <img
                                                        src={testimonial.profilePicture}
                                                        alt={`${testimonial.name} profile`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                                                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-foreground">{testimonial.name}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {testimonial.position} at {testimonial.company}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>


                {/* Contact Section */}
                <section id="contact" className="py-20 bg-muted/50 relative z-10">
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
                                    <span><a href="mailto:christsang0913@gmail.com">christsang0913@gmail.com</a></span>
                                </div>
                                <div className="flex gap-4 justify-center mt-6">
                                    <Button variant="outline" size="icon" asChild>
                                        <a href="https://github.com/ChrisSch-dev" target="_blank"
                                           rel="noopener noreferrer">
                                            <Github className="h-5 w-5"/>
                                        </a>
                                    </Button>
                                    <Button variant="outline" size="icon" asChild>
                                        <a href="https://discord.com/users/592663451978039298" target="_blank"
                                           rel="noopener noreferrer">
                                            <DiscordIcon className="h-5 w-5"/>
                                        </a>
                                    </Button>
                                    <Button variant="outline" size="icon" asChild>
                                        <a href="https://x.com/chris_searches" target="_blank"
                                           rel="noopener noreferrer">
                                            <Twitter className="h-5 w-5"/>
                                        </a>
                                    </Button>
                                    <Button variant="outline" size="icon" asChild>
                                        <a href="https://instagram.com/cm._tchris" target="_blank"
                                           rel="noopener noreferrer">
                                            <Instagram className="h-5 w-5"/>
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-8 relative z-10">
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

export default Portfolio
