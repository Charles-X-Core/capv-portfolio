import { useEffect, useState } from 'react'

import './Navbar.css'

export default function Navbar({ hidden , atTop }) {
  const [theme, setTheme] = useState('dark')
  const [identity, setIdentity] = useState('personal')
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 900);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);


const closeMenu = () => setMenuOpen(false);


  useEffect(() => {
    document.body.classList.toggle('light', theme === 'light')
    document.body.classList.toggle('dark', theme === 'dark')

    document.body.classList.toggle(
      'identity-redsparrow',
      identity === 'dev'
    )
    document.body.classList.toggle(
      'identity-personal',
      identity === 'personal'
    )
  }, [theme, identity])


  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add('menu-open');
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove('menu-open');
    }
  }, [menuOpen]);


  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  const toggleIdentity = () => {
    setIdentity(prev => (prev === 'personal' ? 'dev' : 'personal'))
  }

const goTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

  return (
<header
  className={`navbar
    ${menuOpen ? "navbar-disabled" : ""}
    ${hidden && !menuOpen ? "navbar-hidden" : ""}
    ${atTop && !menuOpen ? "navbar-top" : "navbar-scrolled"}
  `}
>



      {/* LOGO */}
      <div className="navbar-left">
        <div className="navbar-logo"  onClick={() => goTo('hero')}>
          {identity === 'dev' ? (
            <>
              <img src="/img/logo.png" alt="RedSparrow" />
              <span>RedSparrow</span>
            </>
          ) : (
            <>
              <img src="/img/logo.png" alt="CAPV" />
              <span>CAPV</span>
            </>
          )}
        </div>
      </div>

      {/* LINKS */}
      <nav
  className={`navbar-links ${isMobile ? "is-hidden" : ""}`}
>

        <button onClick={() => goTo('about')}>Sobre mí</button>
        <button onClick={() => goTo('experience')}>Experiencia</button>
        <button onClick={() => goTo('projects')}>Proyectos</button>
      </nav>

      {/* ACTIONS */}
      <div className="navbar-actions">

        {/* MODO DEV */}
       { /*<button
          className={`identity-toggle ${
            identity === 'dev' ? 'active' : ''
          }`}
          onClick={toggleIdentity}
        >
          {identity === 'dev' ? 'DEV MODE' : 'PERSONAL'}
        </button>*/}

        {/* THEME */}
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Cambiar tema"
        >
          {theme === 'dark' ? '☀︎' : '☾'}
        </button>

        <button className="navbar-cta" onClick={() => goTo('contact')}>
          Contactame
        </button>

        {isMobile && (
  <button
    className="nav-hamburger"
    aria-label="Abrir menú"
    onClick={() => setMenuOpen(true)}
  >
    ☰
  </button>
)}


      </div>

      {/* MOBILE MENU */}
<div className={`nav-mobile ${menuOpen ? 'open' : ''}`}>
  <div className="nav-mobile-backdrop" onClick={closeMenu} />

  <div className="nav-mobile-panel">
    <button className="nav-mobile-close" onClick={closeMenu}>
      ✕
    </button>

    <nav className="nav-mobile-links">
      <button onClick={() => { goTo('about'); closeMenu(); }}>
        Sobre mí
      </button>
      <button onClick={() => { goTo('experience'); closeMenu(); }}>
        Experiencia
      </button>
      <button onClick={() => { goTo('projects'); closeMenu(); }}>
        Proyectos
      </button>
      <button onClick={() => { goTo('contact'); closeMenu(); }}>
        Contacto
      </button>
    </nav>
  </div>
</div>

    </header>
  )
  
}
