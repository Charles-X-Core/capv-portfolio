import './Hero.css'
import AtomicNetwork from "../atomic-network/AtomicNetwork";
import HeroTechCarousel from "../hero-tech/HeroTechCarousel";


const go = (index) => {
  window.dispatchEvent(
    new CustomEvent('progressive:navigate', { detail: index })
  )
}


export default function Hero() {
  return (
    <section id="hero" className="hero">

      {/* GRID BACKGROUND */}
      <div className="hero-grid" />

      {/* CONTENIDO */}
      <div className="hero-content">

        {/* IZQUIERDA */}
        <div className="hero-left">
          <span className="hero-tagline">Ingeniero de Sistemas · Arquitecto Cloud</span>

          <h1 className="hero-title">
  Carlos Alonso <br />
  <span className="hero-title-accent">Picho Vargas</span>
</h1>


          <div className="hero-roles">
  <span className="hero-role">
    <img src="/icons/cloud_ico.png" alt="Cloud Architect" />
    Cloud Architect
  </span>

  <span className="hero-role">
    <img src="/icons/devOps_ico.png" alt="DevOps" />
    DevOps
  </span>

  <span className="hero-role">
    <img src="/icons/android_ico.png" alt="Android" />
    Android
  </span>

  <span className="hero-role">
    <img src="/icons/spring_ico.png" alt="Spring Boot" />
    Spring Boot
  </span>

  <span className="hero-role">
    <img src="/icons/react_ico.png" alt="React" />
    React
  </span>
</div>


          <p className="hero-description">
            Ingeniero de Sistemas especializado en arquitecturas escalables y
            soluciones cloud. Transformo requerimientos complejos en sistemas
            backend robustos y eficientes utilizando Azure y el ecosistema Java.
          </p>

          <div className="hero-actions">
            <button className="btn-primary" onClick={() => go(3)}>
              Ver Proyectos →
            </button>

            <a
              href="/cv/CV-2025-Carlos Alonso Picho Vargas.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              ⬇ Descargar CV
            </a>

          </div>
          {/* CAROUSEL TECNOLÓGICO */}
          <div className="hero-tech-wrapper">
  <HeroTechCarousel />
</div>

        </div>

        {/* DERECHA */}
          <div className="hero-right">
            <AtomicNetwork />
          </div>



      </div>
    </section>
  )
}
