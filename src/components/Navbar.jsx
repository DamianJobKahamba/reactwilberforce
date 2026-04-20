import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'Home', to: '/', hash: '' },
  { label: 'About', to: '/#about', hash: 'about' },
  { label: 'Products', to: '/#products', hash: 'products' },
  { label: 'Contact', to: '/#contact', hash: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setOpen(false) }, [location.pathname])

  const handleHashNav = useCallback((e, hash) => {
    if (location.pathname === '/' && hash) {
      e.preventDefault()
      const el = document.getElementById(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      setOpen(false)
    } else {
      setOpen(false)
    }
  }, [location.pathname])

  const s = {
    nav: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: scrolled ? '14px 0' : '22px 0',
      background: scrolled ? 'rgba(14,14,14,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border-subtle)' : 'none',
      transition: 'all 0.35s var(--ease-out)',
    },
    inner: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      textDecoration: 'none',
    },
    logoImg: {
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '1.5px solid var(--gold)',
    },
    logoText: {
      fontFamily: 'var(--font-display)',
      fontSize: '1.15rem',
      fontWeight: '600',
      color: 'var(--cream)',
      letterSpacing: '0.02em',
    },
    menu: {
      display: 'flex',
      alignItems: 'center',
      gap: '36px',
    },
    link: {
      fontFamily: 'var(--font-body)',
      fontSize: '0.875rem',
      fontWeight: '400',
      color: 'var(--cream-dim)',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      transition: 'color 0.2s',
      cursor: 'pointer',
    },
    hamburger: {
      display: 'none',
      flexDirection: 'column',
      gap: '5px',
      cursor: 'pointer',
      padding: '6px',
      background: 'none',
      border: 'none',
    },
    bar: {
      width: '22px',
      height: '2px',
      background: 'var(--cream)',
      borderRadius: '2px',
      transition: 'all 0.25s',
    },
    mobileMenu: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(14,14,14,0.98)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '40px',
      zIndex: 99,
      opacity: open ? 1 : 0,
      pointerEvents: open ? 'all' : 'none',
      transition: 'opacity 0.3s',
    },
    mobileLink: {
      fontFamily: 'var(--font-display)',
      fontSize: '2.5rem',
      fontWeight: '300',
      color: 'var(--cream)',
      letterSpacing: '0.04em',
    }
  }

  return (
    <>
      <nav style={s.nav}>
        <div className="container" style={s.inner}>
          <Link to="/" style={s.logo}>
            <img src="/logo.jpeg" alt="Wilberforce Technologies" style={s.logoImg} />
            <span style={s.logoText}>Wilberforce Technologies</span>
          </Link>

          {/* Desktop Menu */}
          <ul style={{ ...s.menu, listStyle: 'none' }} className="desktop-menu">
            {navLinks.map(({ label, to, hash }) => (
              <li key={label}>
                <Link
                  to={to}
                  style={s.link}
                  onClick={(e) => handleHashNav(e, hash)}
                  onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                  onMouseLeave={e => e.target.style.color = 'var(--cream-dim)'}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Hamburger */}
          <button
            style={s.hamburger}
            className="hamburger"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span style={{ ...s.bar, transform: open ? 'rotate(45deg) translateY(7px)' : 'none' }} />
            <span style={{ ...s.bar, opacity: open ? 0 : 1 }} />
            <span style={{ ...s.bar, transform: open ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div style={s.mobileMenu}>
        {navLinks.map(({ label, to, hash }) => (
          <Link
            key={label}
            to={to}
            style={s.mobileLink}
            onClick={(e) => handleHashNav(e, hash)}
          >
            {label}
          </Link>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}
