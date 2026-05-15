import React, { useState } from "react";
import "./About.css";
import SkillGrid from "../SkillCard/SkillGrid";
import { skillsPrimary } from "../../data/skillsData/skillsPrimary.js";
import { motion } from "framer-motion";
import { useAppleReveal } from "../../hooks/useAppleReveal";
import AdvancedRadar from "./AdvancedRadar";
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
              <AdvancedRadar />
            </div>
        </motion.div>
        </div>
        </div>
      </div>
    </motion.section>
    
  );
}
