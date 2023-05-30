import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  // const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchBlog = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }

      fetchBlog()

    }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Wrong credentials')
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    console.log('logged out')
  }
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input type='text' value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit">login</button>
    </form>
  )


  

  return (
    <div>
      <h1>Blogs</h1>
      {user === null && <div>
        <h2>Log in to application</h2>
        {loginForm()}
      </div>}
      {user && <div>
        <h2>blogs</h2>
        <p>logged in as {user.name}</p>
        <button onClick={handleLogout}>logout</button>
        {blogs.map((blog) =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>}

    </div>
  )
}

export default App