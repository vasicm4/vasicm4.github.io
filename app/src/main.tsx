import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import Home from './pages/Home.tsx'
import About from './pages/About.tsx'
// import Blog from './pages/Blog.tsx'
// import Projects from './pages/Projects.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App/>}>
          <Route path="" element={<Home/>}/>
          <Route path="about" element={<About/>}/>
          {/* <Route path="blog" element={<Blog/>}/> */}
          {/* <Route path="projects" element={<Projects/>}/> */}
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>,
)
