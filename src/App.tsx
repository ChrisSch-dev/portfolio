import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Portfolio from './pages/Main/Portfolio.tsx'
import Blog from './pages/Blog/Blog.tsx'
import BlogPost from './pages/Blog/BlogPost.tsx'
import BlogAdmin from './pages/Blog/BlogAdmin.tsx'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Portfolio />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/post/:id" element={<BlogPost />} />
                <Route path="/blog/admin" element={<BlogAdmin />} />
            </Routes>
        </Router>
    )
}

export default App
