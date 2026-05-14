import React, { useState } from "react";
import "./About.css";
import SkillGrid from "../SkillCard/SkillGrid";
import { skillsPrimary } from "../../data/skillsData/skillsPrimary.js";
import { motion } from "framer-motion";
import { useAppleReveal } from "../../hooks/useAppleReveal";
import {
  appleContainer,
  appleItem,
  appleItemRight,
} from "../../animations/appleReveal";

const go = (index) => {
  window.dispatchEvent(
    new CustomEvent("progressive:navigate", { detail: index })
  );
};
const goTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};
export default function About() {
  const { ref, isInView } = useAppleReveal();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.section
  id="about"
  ref={ref}
  className="about"
  variants={appleContainer}
  initial="hidden"
  animate={isInView ? "visible" : "hidden"}
>
      {/* BACKGROUND */}
      <img src="/img/tuerca.png" className="about-bg-gear" alt="" />


{/* 🔥 CONTENEDOR CENTRADO */}
  <div className="about-container">
      {/* HEADER */}
      <motion.div className="about-header" variants={appleItem}>
        <span className="about-eyebrow">PERFIL PROFESIONAL</span>
        <h2>Sobre Mí</h2>
        <div className="about-line" />
      </motion.div>

      <div className="about-hero">
        {/* IZQUIERDA */}
        <motion.div
          className="about-intro"
          variants={appleContainer}
        >
          <motion.h3 className="about-title" variants={appleItem}>
            Ingeniería de Sistemas:
            <span> Arquitectura, Automatización y Escala</span>
          </motion.h3>

          <motion.div className="about-profile" variants={appleItem}>
            <img
              className="about-avatar"
              src="/img/image_perfil.jpg"
              alt="Carlos Alonso"
            />
            <div>
              <h4>Carlos Alonso Picho Vargas</h4>
              <span>Ingeniero de Sistemas</span>
              <p>Backend · Cloud · DevOps · Android · Azure</p>
            </div>
          </motion.div>

          <motion.div
            className={`about-description-container ${
              isExpanded ? "expanded" : "collapsed"
            }`}
            variants={appleItem}
          >
            <p className="about-description">
              Profesional en tecnologías de la información con enfoque en{" "}
              <strong>Backend Engineering</strong>,{" "}
              <strong>Cloud Computing</strong> y{" "}
              <strong>automatización DevOps</strong>. Me especializo en diseñar arquitecturas 
              estables, seguras y escalables, integrando servicios bien estructurados, APIs 
              robustas y modelos de despliegue optimizados. Mi trabajo se basa en principios de 
              arquitectura limpia, buenas prácticas, calidad de código y una comprensión profunda 
              de cómo cada capa del sistema afecta el rendimiento, la disponibilidad y la 
              experiencia final del usuario.
              <br /><br />
              Poseo una alta capacidad de análisis, adaptación y resolución de problemas 
              técnicos complejos, lo que me permite transformar requerimientos en soluciones 
              eficientes y mantenibles. Además, combino conocimientos en infraestructura, 
              bases de datos, contenedorización, automatización y observabilidad, manteniendo 
              siempre un enfoque orientado a confiabilidad, seguridad y escalabilidad real en 
              entornos productivos.
            </p>

          </motion.div>

          <motion.button
            className="btn-read-more"
            onClick={() => setIsExpanded(!isExpanded)}
            variants={appleItem}
          >
            {isExpanded ? "Ver menos ↑" : "Ver más ↓"}
          </motion.button>

          <motion.div className="about-actions" variants={appleItem}>
            <button className="btn-primary" onClick={() => goTo('projects')}>
              Explorar Proyectos
            </button>
            <button className="btn-secondary" onClick={() => goTo('contact')}>
              Contactar Ahora
            </button>
            <a
              className="about-cv"
              href="/cv/CV-2025-Carlos Alonso Picho Vargas.pdf"
              target="_blank"
            >
              Ver CV en PDF
            </a>
          </motion.div>
        </motion.div>

        {/* DERECHA */}

        <div className="about-right"> 
        <motion.div
          className="about-panels"
          variants={appleItemRight}
        >
          <div className="panels-section">
            <h4 className="about-section-title">
              <span className="title-dot" /> Fortalezas Técnicas Clave
            </h4>
            <SkillGrid skills={skillsPrimary} variant="primary" />
          </div>

            <div className="engineering-focus">
              <h2 className="section-title">Engineering Core</h2>
              <div className={`radar-chart-container ${isInView ? 'visible' : ''}`}>
                <svg className="radar-chart" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(37,99,235,0.1)" stroke-width="2"/>
                  <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(37,99,235,0.1)" stroke-width="2"/>
                  <circle cx="100" cy="100" r="40" fill="none" stroke="rgba(37,99,235,0.1)" stroke-width="2"/>
                  <circle cx="100" cy="100" r="20" fill="none" stroke="rgba(37,99,235,0.1)" stroke-width="2"/>
                  
                  <g className="radar-axes">
                    <line x1="100" y1="20" x2="100" y2="180" stroke="rgba(37,99,235,0.2)" stroke-width="1"/>
                    <line x1="20" y1="100" x2="180" y2="100" stroke="rgba(37,99,235,0.2)" stroke-width="1"/>
                    <line x1="150" y1="30" x2="50" y2="170" stroke="rgba(37,99,235,0.2)" stroke-width="1"/>
                    <line x1="40" y1="40" x2="160" y2="160" stroke="rgba(37,99,235,0.2)" stroke-width="1"/>
                    <line x1="160" y1="40" x2="40" y2="160" stroke="rgba(37,99,235,0.2)" stroke-width="1"/>
                    <line x1="30" y1="100" x2="170" y2="100" stroke="rgba(37,99,235,0.2)" stroke-width="1"/>
                  </g>
                  
                  <g className="radar-labels" font-family="Inter, system-ui, sans-serif" font-size="12" fill="rgba(229,231,235,0.8)">
                    <text x="100" y="10" text-anchor="middle">System Design</text>
                    <text x="190" y="100" text-anchor="start" dy="4">Code Quality</text>
                    <text x="175" y="185" text-anchor="end">Performance</text>
                    <text x="100" y="190" text-anchor="middle">Reliability</text>
                    <text x="25" y="185" text-anchor="start">Security</text>
                    <text x="10" y="100" text-anchor="end" dy="4">Innovation</text>
                  </g>
                  
                  <polygon className="radar-skill" points="100,20 140,80 160,120 100,160 40,120 60,80" 
                           fill="rgba(37,99,235,0.15)" stroke="rgba(37,99,235,0.4)" stroke-width="2"/>
                          
                  <g className="radar-points">
                    <circle cx="100" cy="20" r="4" fill="rgba(37,99,235,0.8)"/>
                    <circle cx="140" cy="80" r="4" fill="rgba(37,99,235,0.8)"/>
                    <circle cx="160" cy="120" r="4" fill="rgba(37,99,235,0.8)"/>
                    <circle cx="100" cy="160" r="4" fill="rgba(37,99,235,0.8)"/>
                    <circle cx="40" cy="120" r="4" fill="rgba(37,99,235,0.8)"/>
                    <circle cx="60" cy="80" r="4" fill="rgba(37,99,235,0.8)"/>
                  </g>
                </svg>
              </div>
              
              <div className="impact-metrics">
                <div className="metric-item">
                  <h3>40%</h3>
                  <p>ETL processing time reduction</p>
                </div>
                <div className="metric-item">
                  <h3>99.9%</h3>
                  <p>Uptime SLA maintained</p>
                </div>
                <div className="metric-item">
                  <h3>5+</h3>
                  <p>Scalable systems architected</p>
                </div>
              </div>
            </div>
        </motion.div>
        </div>
        </div>
      </div>
    </motion.section>
    
  );
}
