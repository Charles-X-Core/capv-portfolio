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
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Cambiar tema"
            >
              {theme === 'dark' ? '☀︎' : '☾'}
            </button>

            {!isMobile && (
              <button className="navbar-cta" onClick={() => goTo('contact')}>
                Contactame
              </button>
            )}

            <button
              className={`nav-hamburger ${menuOpen ? 'hamburger-open' : ''}`}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              onClick={() => setMenuOpen(v => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Drawer overlay + panel - FUERA del header para que no se mueva con el navbar */}
      <div
        className={`drawer-overlay ${menuOpen ? 'open' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />
      <div className={`drawer-panel ${menuOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <span className="drawer-title">Menú</span>
          <button className="drawer-close" onClick={closeMenu} aria-label="Cerrar menú">
            ✕
          </button>
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
