import { useEffect, useState } from 'react'
import './Navbar.css'

export default function Navbar({ hidden , atTop }) {
  const [theme, setTheme] = useState('dark')
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 899px)')
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('light', theme === 'light')
    document.body.classList.toggle('dark', theme === 'dark')
  }, [theme])

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('menu-open')
    } else {
      document.body.classList.remove('menu-open')
    }
  }, [menuOpen])

  // Cerrar menú cuando se cambia de móvil a desktop
  useEffect(() => {
    if (!isMobile && menuOpen) {
      setMenuOpen(false)
    }
  }, [isMobile])

  const closeMenu = () => setMenuOpen(false)

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  const goTo = (id) => {
    closeMenu()
    requestAnimationFrame(() => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  }

  return (
    <>
      <header
        className={`navbar
          ${hidden && !menuOpen ? 'navbar-hidden' : ''}
          ${atTop && !menuOpen ? 'navbar-top' : 'navbar-scrolled'}
        `}
      >
        <div className="navbar-inner">
          <div className="navbar-left">
            <div className="navbar-logo" onClick={() => goTo('hero')}>
              <img src="/img/logo.png" alt="CAPV" />
              <span>CAPV</span>
            </div>
          </div>

          {!isMobile && (
            <nav className="navbar-links">
              <button onClick={() => goTo('about')}>Sobre mí</button>
              <button onClick={() => goTo('experience')}>Experiencia</button>
              <button onClick={() => goTo('projects')}>Proyectos</button>
            </nav>
          )}

          <div className="navbar-actions">
            {!isMobile && (
              <>
                <button
                  className={`theme-toggle-dynamic ${theme === 'dark' ? 'is-dark' : 'is-light'}`}
                  onClick={toggleTheme}
                  aria-label="Cambiar tema"
                >
                  <span className="theme-icon star">✦</span>
                  <span className="theme-icon moon">☾</span>
                </button>
                <button className="navbar-cta" onClick={() => goTo('contact')}>
                  Contactame
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Theme toggle - solo móvil (fuera del header) */}
      {isMobile && (
        <button
          className={`theme-toggle-dynamic ${theme === 'dark' ? 'is-dark' : 'is-light'}`}
          onClick={toggleTheme}
          aria-label="Cambiar tema"
        >
          <span className="theme-icon star">✦</span>
          <span className="theme-icon moon">☾</span>
        </button>
      )}

      {/* Hamburger - solo móvil */}
      {isMobile && (
        <button
          className={`nav-hamburger ${menuOpen ? 'hamburger-open' : ''}`}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setMenuOpen(v => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      )}

      {/* Drawer overlay + panel */}
      <div
        className={`drawer-overlay ${menuOpen ? 'open' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />
      <div className={`drawer-panel ${menuOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <span className="drawer-title">Menú</span>
        </div>
        <nav className="drawer-links">
          <button onClick={() => goTo('about')}>Sobre mí</button>
          <button onClick={() => goTo('experience')}>Experiencia</button>
          <button onClick={() => goTo('projects')}>Proyectos</button>
          <button onClick={() => goTo('contact')}>Contacto</button>
        </nav>
      </div>
    </>
  )
}
