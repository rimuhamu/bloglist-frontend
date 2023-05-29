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

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Wrong credentials')
    }
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
        
        {blogs.map((blog) =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>}

    </div>
  )
}

export default App