
import { useState } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import { useNavbarScroll } from "./hooks/useNavbarScroll";
import Hero from './components/hero/Hero'
import About from './components/about/About'
import Experience from './components/experience/Experience'
import Projects from './components/projects/Projects'
import Contact from './components/contact/Contact'

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { hidden, atTop } = useNavbarScroll({
    threshold: 5,
    menuOpen,
  });

  return (
    <>
      <Navbar
        hidden={hidden}
        atTop={atTop}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <main style={{ paddingTop: '72px' }}>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </>
  )
}

export default App
