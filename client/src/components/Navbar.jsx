import React, { useContext, useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { AuthContext } from '../contects/AuthProvider'

// react icons
import { FaBlog, FaBars, FaXmark, FaBarsStaggered, FaCartShopping } from "react-icons/fa6"
import { useCart } from '../pages/CartContext' // ✅ import cart context

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false)

  const { user } = useContext(AuthContext)
  const { cartItems } = useCart(); // ✅ access cart
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0); // ✅ count total quantity

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const navItems = [
    { link: "Home", path: "/" },
    { link: "About", path: "/about" },
    { link: "Shop", path: "/shop" },
    {
      link: "Sell Your Book",
      path: user ? "/admin/dashboard" : "/sign-up",
    },
    { link: "Blog", path: "/blog" },
    { link: "My Orders", path: "/my-orders" },
  ]

  return (
    <header className='w-full bg-transparent fixed top-0 left-0 right-0 transition-all ease-in duration-300 z-50'>
      <nav className={`py-4 lg:px-24 px-4 ${isSticky ? "sticky top-0 bg-blue-300" : ""}`}>
        <div className='flex justify-between items-center text-base gap-8'>

          {/* Logo */}
          <Link to="/" className='text-2xl font-bold text-blue-700 flex items-center gap-2'>
            <FaBlog className='inline-block' />Books
          </Link>

          {/* Nav items for large devices */}
          <ul className='md:flex space-x-12 hidden'>
            {navItems.map(({ link, path }) => (
              <li key={path}>
                <Link
                  to={path}
                  className='block text-base text-black uppercase cursor-pointer hover:text-blue-700'
                >
                  {link}
                </Link>
              </li>
            ))}

            {/* ✅ Cart icon with count */}
            <li>
              <Link
                to="/cart"
                className='relative text-black uppercase hover:text-blue-700 flex items-center gap-1'
              >
                <FaCartShopping className="text-lg" />
                Cart
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>

          {/* User Info */}
          <div className='space-x-6 hidden lg:flex items-center'>
            <button><FaBars className='w-5 hover:text-blue-700' /></button>
            {user && <span className='text-black text-sm'>{user.email}</span>}
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden'>
            <button onClick={toggleMenu} className='text-black focus:outline-none'>
              {isMenuOpen ? (
                <FaXmark className='h-5 w-5 text-black' />
              ) : (
                <FaBarsStaggered className='h-5 w-5 text-black' />
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav items */}
        <div className={`space-y-4 px-4 mt-16 py-7 bg-blue-700 ${isMenuOpen ? "block fixed top-0 right-0 left-0 z-40" : "hidden"}`}>
          {navItems.map(({ link, path }) => (
            <Link
              key={path}
              to={path}
              className='block text-base text-white uppercase cursor-pointer hover:text-blue-300'
              onClick={() => setIsMenuOpen(false)}
            >
              {link}
            </Link>
          ))}

          {/* ✅ Mobile cart link with count */}
          <Link
            to="/cart"
            className='block text-base text-white uppercase cursor-pointer hover:text-blue-300 relative'
            onClick={() => setIsMenuOpen(false)}
          >
            <FaCartShopping className="inline-block mr-1" />
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-3 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
