import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context, server } from "../main"
import axios from 'axios';
import { toast } from 'react-hot-toast';


const Header = () => {

  const {isAuthenticated, setIsAuthenticated, loading, setLoading} = useContext(Context)

  const logOutHandler = async (e) => {
    setLoading(true)
    
    try {
        const { data } = await axios.get(`${server}/users/logout`,
        {
        withCredentials: true
    })
    toast.success("Logged Out successfully!")
    setIsAuthenticated(false)
    setLoading(false)
    } catch (error) {
        toast.error("Some error !!")
        console.log(error)
    setIsAuthenticated(true)
    }
}

  return (
    <nav className='header'>
      <div>
        <h2>Todo App.</h2>
      </div>
      <article>
      <Link to={"/"}>Home</Link>
      <Link to={"/profile"}>Profile</Link>
      {
        isAuthenticated ? ( 
          <button disabled={loading} onClick={logOutHandler} className='btn'>Logout</button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )
      }
      </article>
    </nav>
  )
}

export default Header
