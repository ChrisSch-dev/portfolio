import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Save, Trash2, Edit, Plus, Moon, Sun, Github, Key, AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import InteractiveBackground from '@/components/background/InteractiveBackground'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { githubService, type BlogPost } from '@/lib/github'
import { calculateReadTime } from "@/lib/calculateReadTime"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CodeProps = any

function BlogAdmin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [password, setPassword] = useState('')
    const [githubToken, setGithubToken] = useState('')
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [darkMode, setDarkMode] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        excerpt: '',
        author: 'Chris Tsang',
        tags: ''
    })

    const navigate = useNavigate()

    useEffect(() => {
        // Check if already authenticated
        const authStatus = sessionStorage.getItem('blogAdminAuth')
        if (authStatus === 'true') {
            setIsAuthenticated(true)
            loadPosts()
        }

        // Check if GitHub token is available
        if (githubService.hasToken()) {
            setGithubToken('••••••••••••••••')
        }
    }, [])

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [darkMode])

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD
        if (!adminPassword) {
            setError('Admin password not configured. Please set VITE_ADMIN_PASSWORD environment variable.')
            return
        }
        if (password === adminPassword) {
            setIsAuthenticated(true)
            sessionStorage.setItem('blogAdminAuth', 'true')
            setPassword('')
            loadPosts()
        } else {
            setError('Incorrect password')
        }
    }

    const handleLogout = () => {
        setIsAuthenticated(false)
        sessionStorage.removeItem('blogAdminAuth')
    }

    const handleSetGithubToken = () => {
        if (githubToken && githubToken !== '••••••••••••••••') {
            githubService.setToken(githubToken)
            setGithubToken('••••••••••••••••')
            setSuccess('GitHub token saved successfully!')
            setTimeout(() => setSuccess(null), 3000)
            loadPosts()
        }
    }

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

    const handleSavePost = async () => {
        if (!formData.title || !formData.content) {
            setError('Title and content are required')
            return
        }

        if (!githubService.hasToken()) {
            setError('GitHub token is required to save posts')
            return
        }

        try {
            setLoading(true)
            setError(null)

            const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
            const readTime = calculateReadTime(formData.content)

            const post: BlogPost = {
                id: editingPost?.id || `${Date.now()}-${formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
                title: formData.title,
                content: formData.content,
                excerpt: formData.excerpt || `${formData.content.slice(0, 200)}...`,
                author: formData.author,
                publishedAt: editingPost?.publishedAt || new Date().toISOString(),
                tags: tagsArray,
                readTime
            }

            await githubService.savePost(post, !!editingPost)

            setSuccess(editingPost ? 'Post updated successfully!' : 'Post created successfully!')
            setTimeout(() => setSuccess(null), 3000)

            // Reset form
            setFormData({
                title: '',
                content: '',
                excerpt: '',
                author: 'Chris Tsang',
                tags: ''
            })
            setIsEditing(false)
            setEditingPost(null)

            // Reload posts
            await loadPosts()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to save post')
            console.error('Error saving post:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleEditPost = (post: BlogPost) => {
        setFormData({
            title: post.title,
            content: post.content,
            excerpt: post.excerpt,
            author: post.author,
            tags: post.tags.join(', ')
        })
        setEditingPost(post)
        setIsEditing(true)
    }

    const handleDeletePost = async (postId: string) => {
        if (!githubService.hasToken()) {
            setError('GitHub token is required to delete posts')
            return
        }

        if (confirm('Are you sure you want to delete this post?')) {
            try {
                setLoading(true)
                setError(null)
                await githubService.deletePost(postId)
                setSuccess('Post deleted successfully!')
                setTimeout(() => setSuccess(null), 3000)
                await loadPosts()
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to delete post')
                console.error('Error deleting post:', err)
            } finally {
                setLoading(false)
            }
        }
    }

    const handleNewPost = () => {
        setFormData({
            title: '',
            content: '',
            excerpt: '',
            author: 'Chris Tsang',
            tags: ''
        })
        setEditingPost(null)
        setIsEditing(true)
    }

    const handleCancel = () => {
        setIsEditing(false)
        setEditingPost(null)
        setFormData({
            title: '',
            content: '',
            excerpt: '',
            author: 'Chris Tsang',
            tags: ''
        })
    }

    if (!isAuthenticated) {
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
                                    <div className="font-bold text-xl">Blog Admin</div>
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
                        <Card className="w-full max-w-md">
                            <CardHeader>
                                <CardTitle>Admin Login</CardTitle>
                                <CardDescription>Enter password to access blog admin</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleLogin} className="space-y-4">
                                    <div>
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    {error && (
                                        <div className="text-red-500 text-sm">{error}</div>
                                    )}
                                    <Button type="submit" className="w-full">
                                        Login
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
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
                                <div className="font-bold text-xl">Blog Admin</div>
                            </div>

                            <div className="flex items-center space-x-4">
                                {!isEditing && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleNewPost}
                                        className="flex items-center gap-2"
                                    >
                                        <Plus className="h-4 w-4" />
                                        New Post
                                    </Button>
                                )}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setDarkMode(!darkMode)}
                                >
                                    {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                                </Button>
                                <Button variant="outline" size="sm" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="pt-24 pb-12 relative z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* GitHub Token Setup */}
                        {!import.meta.env.VITE_GITHUB_ACCESS_TOKEN && !githubService.hasToken() && (
                            <Card className="mb-6 border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Github className="h-5 w-5" />
                                        GitHub Token Required
                                    </CardTitle>
                                    <CardDescription>
                                        To save posts to your GitHub repository, you need to provide a GitHub Personal Access Token.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="github-token">GitHub Personal Access Token</Label>
                                            <Input
                                                id="github-token"
                                                type="password"
                                                value={githubToken}
                                                onChange={(e) => setGithubToken(e.target.value)}
                                                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                                            />
                                            <p className="text-sm text-muted-foreground mt-1">
                                                Create a token at GitHub Settings → Developer settings → Personal access tokens → Fine-grained tokens
                                            </p>
                                        </div>
                                        <Button onClick={handleSetGithubToken} className="flex items-center gap-2">
                                            <Key className="h-4 w-4" />
                                            Save Token
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Environment Variable Info */}
                        {import.meta.env.VITE_GITHUB_ACCESS_TOKEN && (
                            <Card className="mb-6 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Github className="h-5 w-5" />
                                        GitHub Token Configured
                                    </CardTitle>
                                    <CardDescription>
                                        GitHub Personal Access Token is configured via environment variable.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        )}

                        {/* Success/Error Messages */}
                        {success && (
                            <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg">
                                {success}
                            </div>
                        )}

                        {error && (
                            <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg flex items-center gap-2">
                                <AlertCircle className="h-4 w-4" />
                                {error}
                            </div>
                        )}

                        {isEditing ? (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h1 className="text-3xl font-bold">
                                        {editingPost ? 'Edit Post' : 'New Post'}
                                    </h1>
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={handleSavePost}
                                            className="flex items-center gap-2"
                                            disabled={loading}
                                        >
                                            <Save className="h-4 w-4" />
                                            {loading ? 'Saving...' : 'Save'}
                                        </Button>
                                        <Button variant="outline" onClick={handleCancel}>
                                            Cancel
                                        </Button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="title">Title</Label>
                                            <Input
                                                id="title"
                                                value={formData.title}
                                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                                placeholder="Enter post title"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="excerpt">Excerpt (optional)</Label>
                                            <Textarea
                                                id="excerpt"
                                                value={formData.excerpt}
                                                onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                                                placeholder="Brief description of the post"
                                                rows={3}
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="author">Author</Label>
                                                <Input
                                                    id="author"
                                                    value={formData.author}
                                                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="tags">Tags (comma separated)</Label>
                                                <Input
                                                    id="tags"
                                                    value={formData.tags}
                                                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                                                    placeholder="tag1, tag2, tag3"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <Label htmlFor="content">Content (Markdown supported)</Label>
                                            <Textarea
                                                id="content"
                                                value={formData.content}
                                                onChange={(e) => setFormData({...formData, content: e.target.value})}
                                                placeholder="Write your post content in Markdown..."
                                                rows={20}
                                                className="font-mono"
                                            />
                                        </div>
                                    </div>

                                    <div className="lg:border-l lg:pl-6">
                                        <h3 className="text-lg font-semibold mb-4">Preview</h3>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="text-2xl">
                                                    {formData.title || 'Untitled Post'}
                                                </CardTitle>
                                                <CardDescription>
                                                    {formData.excerpt || 'No excerpt provided'}
                                                </CardDescription>
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag).map((tag) => (
                                                        <Badge key={tag} variant="secondary" className="text-xs">
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-em:text-foreground prose-code:text-foreground prose-pre:text-foreground prose-a:text-blue-500 prose-blockquote:text-muted-foreground prose-li:text-foreground">
                                                    <ReactMarkdown
                                                        remarkPlugins={[remarkGfm]}
                                                        components={{
                                                            code({node, inline, className, children, ...props}: CodeProps) {
                                                                const match = /language-(\w+)/.exec(className || '')
                                                                return !inline && match ? (
                                                                    <SyntaxHighlighter
                                                                        style={tomorrow as Record<string, React.CSSProperties>}
                                                                        language={match[1]}
                                                                        PreTag="div"
                                                                        className="rounded-md"
                                                                        {...props}
                                                                    >
                                                                        {String(children).replace(/\n$/, '')}
                                                                    </SyntaxHighlighter>
                                                                ) : (
                                                                    <code className={`${className} bg-muted px-1 py-0.5 rounded text-sm font-mono`} {...props}>
                                                                        {children}
                                                                    </code>
                                                                )
                                                            },
                                                            h1: ({children}) => <h1 className="text-3xl font-bold mt-6 mb-4 text-foreground">{children}</h1>,
                                                            h2: ({children}) => <h2 className="text-2xl font-semibold mt-5 mb-3 text-foreground">{children}</h2>,
                                                            h3: ({children}) => <h3 className="text-xl font-medium mt-4 mb-2 text-foreground">{children}</h3>,
                                                            h4: ({children}) => <h4 className="text-lg font-medium mt-3 mb-2 text-foreground">{children}</h4>,
                                                            h5: ({children}) => <h5 className="text-base font-medium mt-2 mb-1 text-foreground">{children}</h5>,
                                                            h6: ({children}) => <h6 className="text-sm font-medium mt-2 mb-1 text-foreground">{children}</h6>,
                                                            p: ({children}) => <p className="mb-4 text-foreground leading-relaxed">{children}</p>,
                                                            ul: ({children}) => <ul className="mb-4 ml-6 list-disc text-foreground">{children}</ul>,
                                                            ol: ({children}) => <ol className="mb-4 ml-6 list-decimal text-foreground">{children}</ol>,
                                                            li: ({children}) => <li className="mb-1 text-foreground">{children}</li>,
                                                            blockquote: ({children}) => <blockquote className="border-l-4 border-muted-foreground pl-4 my-4 italic text-muted-foreground">{children}</blockquote>,
                                                            a: ({children, href}) => <a href={href} className="text-blue-500 hover:text-blue-600 underline" target="_blank" rel="noopener noreferrer">{children}</a>,
                                                            strong: ({children}) => <strong className="font-semibold text-foreground">{children}</strong>,
                                                            em: ({children}) => <em className="italic text-foreground">{children}</em>,
                                                            hr: () => <hr className="my-6 border-border" />,
                                                        }}
                                                    >
                                                        {formData.content || 'Start writing your content...'}
                                                    </ReactMarkdown>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h1 className="text-3xl font-bold">Manage Posts</h1>
                                    <div className="text-muted-foreground">
                                        {posts.length} post{posts.length !== 1 ? 's' : ''}
                                    </div>
                                </div>

                                {loading && (
                                    <div className="text-center py-8">
                                        <div className="text-muted-foreground">Loading posts...</div>
                                    </div>
                                )}

                                {!loading && posts.length === 0 ? (
                                    <div className="text-center py-20">
                                        <div className="text-muted-foreground text-lg mb-4">No blog posts yet</div>
                                        <Button onClick={handleNewPost} className="flex items-center gap-2">
                                            <Plus className="h-4 w-4" />
                                            Create Your First Post
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {posts.map((post) => (
                                            <Card key={post.id} className="hover:shadow-lg transition-all duration-300">
                                                <CardHeader>
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                                                            <CardDescription className="mb-2">
                                                                {post.excerpt}
                                                            </CardDescription>
                                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                                                                <span>{post.readTime} min read</span>
                                                                <span>{post.author}</span>
                                                            </div>
                                                            <div className="flex flex-wrap gap-2 mt-2">
                                                                {post.tags.map((tag) => (
                                                                    <Badge key={tag} variant="secondary" className="text-xs">
                                                                        {tag}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2 ml-4">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => handleEditPost(post)}
                                                                className="flex items-center gap-1"
                                                            >
                                                                <Edit className="h-3 w-3" />
                                                                Edit
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => handleDeletePost(post.id)}
                                                                className="flex items-center gap-1 text-red-600 hover:text-red-700"
                                                                disabled={loading}
                                                            >
                                                                <Trash2 className="h-3 w-3" />
                                                                Delete
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </CardHeader>
                                            </Card>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogAdmin
