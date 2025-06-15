import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Calendar, Clock, User, Moon, Sun, AlertCircle } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import InteractiveBackground from '@/components/background/InteractiveBackground'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { githubService, type BlogPost } from '@/lib/github'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CodeProps = any

function BlogPostPage() {
    const [post, setPost] = useState<BlogPost | null>(null)
    const [darkMode, setDarkMode] = useState(true)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        if (id) {
            loadPost(id)
        }
    }, [id])

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [darkMode])

    const loadPost = async (postId: string) => {
        try {
            setLoading(true)
            setError(null)
            const fetchedPost = await githubService.getPost(postId)
            if (fetchedPost) {
                setPost(fetchedPost)
            } else {
                setError('Post not found')
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load post')
            console.error('Error loading post:', err)
        } finally {
            setLoading(false)
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    if (loading) {
        return (
            <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
                <div className="bg-background text-foreground relative">
                    <InteractiveBackground darkMode={darkMode} />
                    <div className="pt-24 min-h-screen flex items-center justify-center relative z-10">
                        <div className="text-center">
                            <div className="text-muted-foreground">Loading post...</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (error || !post) {
        return (
            <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
                <div className="bg-background text-foreground relative">
                    <InteractiveBackground darkMode={darkMode} />

                    <nav className="fixed top-0 left-0 right-0 w-full bg-background/80 backdrop-blur-md border-b z-50">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center h-16">
                                <div className="flex items-center gap-4">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => navigate('/blog')}
                                        className="flex items-center gap-2"
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                        Back to Blog
                                    </Button>
                                    <div className="font-bold text-xl">Post Not Found</div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setDarkMode(!darkMode)}
                                >
                                    {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                                </Button>
                            </div>
                        </div>
                    </nav>

                    <div className="pt-24 min-h-screen flex items-center justify-center relative z-10">
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 text-red-500 mb-4">
                                <AlertCircle className="h-5 w-5" />
                                <h1 className="text-4xl font-bold">Post Not Found</h1>
                            </div>
                            <p className="text-muted-foreground mb-8">
                                {error || "The blog post you're looking for doesn't exist or has been removed."}
                            </p>
                            <Button onClick={() => navigate('/blog')}>
                                Return to Blog
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
            <div className="bg-background text-foreground relative">
                <InteractiveBackground darkMode={darkMode} />

                <nav className="fixed top-0 left-0 right-0 w-full bg-background/80 backdrop-blur-md border-b z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center gap-4">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => navigate('/blog')}
                                    className="flex items-center gap-2"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Back to Blog
                                </Button>
                                <div className="font-bold text-xl">Chris's Blog</div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setDarkMode(!darkMode)}
                            >
                                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                            </Button>
                        </div>
                    </div>
                </nav>

                <article className="pt-24 pb-12 relative z-10">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Card className="border-none shadow-none bg-transparent">
                            <CardHeader className="px-0 pb-8">
                                {/* Meta information */}
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                                    <Calendar className="h-4 w-4" />
                                    <span>{formatDate(post.publishedAt)}</span>
                                    <Clock className="h-4 w-4 ml-4" />
                                    <span>{post.readTime} min read</span>
                                    <User className="h-4 w-4 ml-4" />
                                    <span>{post.author}</span>
                                </div>

                                {/* Title */}
                                <CardTitle className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                                    {post.title}
                                </CardTitle>

                                {/* Excerpt */}
                                {post.excerpt && (
                                    <CardDescription className="text-xl text-muted-foreground leading-relaxed mb-6">
                                        {post.excerpt}
                                    </CardDescription>
                                )}

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary" className="text-sm">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </CardHeader>

                            <CardContent className="px-0">
                                {/* Article content */}
                                <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic">
                                    <ReactMarkdown
                                        components={{
                                            code({className, children, ...props}: CodeProps) {
                                                const match = /language-(\w+)/.exec(className || '')
                                                const inline = !match
                                                return !inline && match ? (
                                                    <SyntaxHighlighter
                                                        style={tomorrow as Record<string, React.CSSProperties>}
                                                        language={match[1]}
                                                        PreTag="div"
                                                        className="rounded-lg"
                                                        {...props}
                                                    >
                                                        {String(children).replace(/\n$/, '')}
                                                    </SyntaxHighlighter>
                                                ) : (
                                                    <code className={className} {...props}>
                                                        {children}
                                                    </code>
                                                )
                                            },
                                            h1: ({children}) => (
                                                <h1 className="text-3xl font-bold mt-12 mb-6 first:mt-0">{children}</h1>
                                            ),
                                            h2: ({children}) => (
                                                <h2 className="text-2xl font-bold mt-10 mb-4">{children}</h2>
                                            ),
                                            h3: ({children}) => (
                                                <h3 className="text-xl font-bold mt-8 mb-3">{children}</h3>
                                            ),
                                            p: ({children}) => (
                                                <p className="mb-6 leading-relaxed">{children}</p>
                                            ),
                                            ul: ({children}) => (
                                                <ul className="mb-6 space-y-2">{children}</ul>
                                            ),
                                            ol: ({children}) => (
                                                <ol className="mb-6 space-y-2">{children}</ol>
                                            ),
                                            blockquote: ({children}) => (
                                                <blockquote className="border-l-4 border-blue-500 pl-6 my-6 italic text-muted-foreground">
                                                    {children}
                                                </blockquote>
                                            )
                                        }}
                                    >
                                        {post.content}
                                    </ReactMarkdown>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Navigation */}
                        <div className="mt-12 pt-8 border-t">
                            <div className="flex justify-between items-center">
                                <Button
                                    variant="outline"
                                    onClick={() => navigate('/blog')}
                                    className="flex items-center gap-2"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Back to All Posts
                                </Button>

                                <div className="text-sm text-muted-foreground">
                                    Published on {formatDate(post.publishedAt)}
                                </div>
                            </div>
                        </div>
                    </div>
                </article>

                {/* Footer */}
                <footer className="py-8 relative z-10 border-t">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p className="text-muted-foreground">
                            © 2025 Chris Tsang | <Button variant="link" onClick={() => navigate('/')} className="p-0 h-auto">Back to Portfolio</Button>
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default BlogPostPage
