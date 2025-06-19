export interface BlogPost {
    id: string
    title: string
    content: string
    excerpt: string
    author: string
    publishedAt: string
    tags: string[]
    readTime: number
}

interface GitHubFile {
    name: string
    path: string
    sha: string
    size: number
    url: string
    html_url: string
    git_url: string
    download_url: string
    type: string
    content: string
    encoding: string
}

class GitHubService {
    private readonly owner = 'ChrisSch-dev'
    private readonly repo = 'Blog'
    private readonly branch = 'main'
    private token: string | null = null

    constructor() {
        this.token = import.meta.env.VITE_GITHUB_ACCESS_TOKEN || null
    }

    setToken(token: string) {
        // Environment variable takes precedence, but allow manual override for development
        this.token = token
    }

    removeToken() {
        this.token = import.meta.env.VITE_GITHUB_ACCESS_TOKEN || null
    }

    hasToken(): boolean {
        return !!this.token
    }

    private async makeRequest(endpoint: string, options: RequestInit = {}) {
        const url = `https://api.github.com/repos/${this.owner}/${this.repo}${endpoint}`

        const headers = {
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
            ...(this.token && { 'Authorization': `token ${this.token}` }),
            ...options.headers,
        }

        const response = await fetch(url, {
            ...options,
            headers,
        })

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Unauthorized. Please check your GitHub token.')
            }
            if (response.status === 404) {
                throw new Error('Repository not found or no access.')
            }
            throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
        }

        return response.json()
    }

    async getFiles(): Promise<GitHubFile[]> {
        try {
            const data = await this.makeRequest('/contents/')
            return Array.isArray(data) ? data.filter(file => file.name.endsWith('.md')) : []
        } catch (error) {
            console.error('Error fetching files:', error)
            return []
        }
    }

    async getFile(path: string): Promise<string> {
        try {
            const data = await this.makeRequest(`/contents/${path}`)
            if (data.content && data.encoding === 'base64') {
                return atob(data.content)
            }
            throw new Error('File content not found')
        } catch (error) {
            console.error(`Error fetching file ${path}:`, error)
            throw error
        }
    }

    async createOrUpdateFile(path: string, content: string, message: string, sha?: string): Promise<void> {
        const body: {
            message: string
            content: string
            branch: string
            sha?: string
        } = {
            message,
            content: btoa(content),
            branch: this.branch,
        }

        if (sha) {
            body.sha = sha
        }

        await this.makeRequest(`/contents/${path}`, {
            method: 'PUT',
            body: JSON.stringify(body),
        })
    }

    async deleteFile(path: string, sha: string, message: string): Promise<void> {
        await this.makeRequest(`/contents/${path}`, {
            method: 'DELETE',
            body: JSON.stringify({
                message,
                sha,
                branch: this.branch,
            }),
        })
    }

    private parseMarkdownPost(filename: string, content: string): BlogPost | null {
        try {
            // Extract frontmatter
            const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
            if (!frontmatterMatch) {
                return null
            }

            const [, frontmatter, markdownContent] = frontmatterMatch
            const metadata: Record<string, string | string[]> = {}

            for (const line of frontmatter.split('\n')) {
                const [key, ...valueParts] = line.split(':')
                if (key && valueParts.length > 0) {
                    const value = valueParts.join(':').trim()
                    if (key.trim() === 'tags') {
                        metadata[key.trim()] = value.split(',').map(tag => tag.trim())
                    } else {
                        metadata[key.trim()] = value.replace(/^["']|["']$/g, '')
                    }
                }
            }

            const id = filename.replace('.md', '')
            const wordsPerMinute = 200
            const wordCount = markdownContent.split(/\s+/).length
            const readTime = Math.ceil(wordCount / wordsPerMinute)

            return {
                id,
                title: (typeof metadata.title === 'string' ? metadata.title : id),
                content: markdownContent.trim(),
                excerpt: (typeof metadata.excerpt === 'string' ? metadata.excerpt : `${markdownContent.slice(0, 200)}...`),
                author: (typeof metadata.author === 'string' ? metadata.author : 'Chris Tsang'),
                publishedAt: (typeof metadata.publishedAt === 'string' ? metadata.publishedAt : new Date().toISOString()),
                tags: Array.isArray(metadata.tags) ? metadata.tags : [],
                readTime: typeof metadata.readTime === 'string' ? Number.parseInt(metadata.readTime, 10) || readTime : readTime
            }
        } catch (error) {
            console.error(`Error parsing markdown file ${filename}:`, error)
            return null
        }
    }

    private createMarkdownContent(post: BlogPost): string {
        return [
            '---',
            `title: "${post.title}"`,
            `excerpt: "${post.excerpt}"`,
            `author: "${post.author}"`,
            `publishedAt: "${post.publishedAt}"`,
            `tags: ${post.tags.join(', ')}`,
            `readTime: ${post.readTime}`,
            '---',
            '',
            post.content
        ].join('\n')
    }

    async getAllPosts(): Promise<BlogPost[]> {
        try {
            const files = await this.getFiles()
            const posts: BlogPost[] = []

            for (const file of files) {
                try {
                    const content = await this.getFile(file.name)
                    const post = this.parseMarkdownPost(file.name, content)
                    if (post) {
                        posts.push(post)
                    }
                } catch (error) {
                    console.error(`Error processing file ${file.name}:`, error)
                }
            }

            // Sort by published date (newest first)
            return posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        } catch (error) {
            console.error('Error fetching all posts:', error)
            return []
        }
    }

    async getPost(id: string): Promise<BlogPost | null> {
        try {
            const filename = `${id}.md`
            const content = await this.getFile(filename)
            return this.parseMarkdownPost(filename, content)
        } catch (error) {
            console.error(`Error fetching post ${id}:`, error)
            return null
        }
    }

    async savePost(post: BlogPost, isUpdate = false): Promise<void> {
        try {
            const filename = `${post.id}.md`
            const content = this.createMarkdownContent(post)
            const message = isUpdate ? `Update post: ${post.title}` : `Add new post: ${post.title}`

            let sha: string | undefined
            if (isUpdate) {
                try {
                    const existingFile = await this.makeRequest(`/contents/${filename}`)
                    sha = existingFile.sha
                } catch (error) {
                    // File doesn't exist, create new one
                }
            }

            await this.createOrUpdateFile(filename, content, message, sha)
        } catch (error) {
            console.error('Error saving post:', error)
            throw error
        }
    }

    async deletePost(id: string): Promise<void> {
        try {
            const filename = `${id}.md`
            const file = await this.makeRequest(`/contents/${filename}`)
            await this.deleteFile(filename, file.sha, `Delete post: ${id}`)
        } catch (error) {
            console.error(`Error deleting post ${id}:`, error)
            throw error
        }
    }
}

export const githubService = new GitHubService()
