
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Blog from './pages/Blog'
import Blogs from './pages/Blogs'
import CreateBlog from './pages/CreateBlog'
function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route element={<Signin/>} path='/signin'></Route>
      <Route element={<Signup/>} path='/signup'></Route>
      <Route element={<Blog/>} path='/blog/:id'></Route>
      <Route element={<Blogs/>} path='/blogs'></Route>
      <Route element={<CreateBlog></CreateBlog>} path='/publish'></Route>
    </Routes>
    
    </BrowserRouter>

    </>
  )
}

export default App
