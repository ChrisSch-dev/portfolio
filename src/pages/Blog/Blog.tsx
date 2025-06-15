import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, User, ArrowLeft, Edit, Sun, Moon, AlertCircle } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import InteractiveBackground from '@/components/background/InteractiveBackground'
import { githubService, type BlogPost } from '@/lib/github'
import { formatDate } from '@/lib/formatDate'

function Blog() {
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [darkMode, setDarkMode] = useState(true)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        loadPosts()
    }, [])

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [darkMode])

    const loadPosts = async () => {
        try {
            setLoading(true)
            setError(null)
            const fetchedPosts = await githubService.getAllPosts()
            setPosts(fetchedPosts)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load posts')
            console.error('Error loading posts:', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
            <div className="bg-background text-foreground relative">
                <InteractiveBackground darkMode={darkMode} />

                {/* Navigation */}
                <nav className="fixed top-0 left-0 right-0 w-full bg-background/80 backdrop-blur-md border-b z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center gap-4">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => navigate('/')}
                                    className="flex items-center gap-2"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Back to Main
                                </Button>
                                <div className="font-bold text-xl">Chris's Blog</div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => navigate('/blog/admin')}
                                    className="flex items-center gap-2"
                                >
                                    <Edit className="h-4 w-4" />
                                    Admin
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setDarkMode(!darkMode)}
                                >
                                    {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                                </Button>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="pt-24 pb-12 relative z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                <span className="text-blue-600 dark:text-blue-400">Blog</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                                Thoughts, experiences, and insights from my journey in software development
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Posts are stored and managed through GitHub
                            </p>
                        </div>
                    </div>
                </section>

                {/* Blog Posts */}
                <section className="py-12 relative z-10">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        {loading ? (
                            <div className="text-center py-20">
                                <div className="text-muted-foreground text-lg">Loading posts...</div>
                            </div>
                        ) : error ? (
                            <div className="text-center py-20">
                                <div className="flex items-center justify-center gap-2 text-red-500 mb-4">
                                    <AlertCircle className="h-5 w-5" />
                                    <span className="text-lg">Error loading posts</span>
                                </div>
                                <p className="text-muted-foreground mb-4">{error}</p>
                                <Button onClick={loadPosts} variant="outline">
                                    Try Again
                                </Button>
                            </div>
                        ) : posts.length === 0 ? (
                            <div className="text-center py-20">
                                <div className="text-muted-foreground text-lg mb-4">No blog posts yet</div>
                                <p className="text-muted-foreground">
                                    Check back soon for new content, or{' '}
                                    <Link to="/blog/admin" className="text-blue-600 dark:text-blue-400 hover:underline">
                                        create your first post
                                    </Link>
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                {posts.map((post) => (
                                    <Card key={post.id} className="hover:shadow-lg transition-all duration-300">
                                        <CardHeader>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                                <Calendar className="h-4 w-4" />
                                                <span>{formatDate(post.publishedAt)}</span>
                                                <Clock className="h-4 w-4 ml-4" />
                                                <span>{post.readTime} min read</span>
                                                <User className="h-4 w-4 ml-4" />
                                                <span>{post.author}</span>
                                            </div>
                                            <CardTitle className="text-2xl mb-2">
                                                <Link
                                                    to={`/blog/post/${post.id}`}
                                                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                                >
                                                    {post.title}
                                                </Link>
                                            </CardTitle>
                                            <CardDescription className="text-base leading-relaxed">
                                                {post.excerpt}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {post.tags.map((tag) => (
                                                    <Badge key={tag} variant="secondary" className="text-xs">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                            <Button variant="outline" asChild>
                                                <Link to={`/blog/post/${post.id}`}>
                                                    Read More
                                                </Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-8 relative z-10 border-t">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p className="text-muted-foreground">
                            © 2025 Chris Tsang | <Link to="/" className="hover:underline">Back to Portfolio</Link>
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default Blog
