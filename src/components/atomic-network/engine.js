import Matter from "matter-js";
import { CONFIG, NODES_DATA } from "./config";
import { drawScene, preloadImages } from "./draw";

const {
  Engine,
  World,
  Bodies,
  Constraint,
  Mouse,
  MouseConstraint,
  Events,
  Body,
  Vector,
} = Matter;

/* ================= CONSTANTES ================= */
const CARD_WIDTH = 138;
const CARD_HEIGHT = 54;

const BASE_RADIUS_DESKTOP = 170;
const BASE_RADIUS_MOBILE = 130;

/* 🔥 NUEVO: compresión hacia el centro */
const CENTER_COMPRESSION = 0.78;

const SOFT_LIMIT_RADIUS = 360;
const MAGNET_RANGE = 140;
const MAGNET_STRENGTH = 0.000012;

const GRAB_PADDING = 30;
const DRAW_INTERVAL = 1000 / 40;

/* ===== ORBIT PHYSICS ===== */
const ORBIT_FORCE = 0.000018;
const RADIAL_FORCE = 0.000035; // 🔥 un poco más firme
const ANGULAR_DAMPING = 0.985;

/* ===== INTRO ===== */
const INTRO_DURATION = 1200;
const INTRO_PULL = 0.00006;

/* ================= HELPERS ================= */
const clamp01 = (v) => Math.max(0, Math.min(1, v));
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

export function initEngine(container, opts = {}) {
  preloadImages();

  const width = container.clientWidth;
  const height = container.clientHeight;

  const cx = width / 2;
  const cy = height / 2;

  const isMobile = window.innerWidth < 768;
  const nodeCount = isMobile ? 4 : NODES_DATA.length;

  const baseRadius =
    (isMobile ? BASE_RADIUS_MOBILE : BASE_RADIUS_DESKTOP) *
    CENTER_COMPRESSION;

  const engine = Engine.create();
  engine.gravity.y = 0;

  /* ================= CANVAS ================= */
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  container.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  /* ================= CORE ================= */
  const core = Bodies.circle(cx, cy, CONFIG.core.radius, {
    isStatic: true,
    inertia: Infinity,
  });

  /* ================= NODES ================= */
  const nodes = [];
  const nodeMeta = [];

  for (let i = 0; i < nodeCount; i++) {
    const angle = (Math.PI * 2 * i) / nodeCount;

    const spawnRadius = baseRadius * 2.4;
    const x = cx + Math.cos(angle) * spawnRadius;
    const y = cy + Math.sin(angle) * spawnRadius;

    const node = Bodies.rectangle(x, y, CARD_WIDTH, CARD_HEIGHT, {
      density: 0.0018,
      frictionAir: 0.02,
      chamfer: { radius: 10 },
      render: { visible: false },
    });

    nodes.push(node);
    nodeMeta.push({ angle });
  }

  /* ================= CONSTRAINTS ================= */
  const constraints = [];

  // core → nodo
  nodes.forEach((node) => {
    constraints.push(
      Constraint.create({
        bodyA: core,
        bodyB: node,
        stiffness: 0.0026, // 🔥 un poco más tenso
        damping: 0.16,
        length: baseRadius,
      })
    );
  });

  // red nodo ↔ nodo
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      constraints.push(
        Constraint.create({
          bodyA: nodes[i],
          bodyB: nodes[j],
          stiffness: 0.0007,
          damping: 0.14,
        })
      );
    }
  }

  World.add(engine.world, [core, ...nodes, ...constraints]);

  /* ================= MOUSE ================= */
  const mouse = Mouse.create(canvas);
  mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
  mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

  const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: { stiffness: 0.25, render: { visible: false } },
  });
  World.add(engine.world, mouseConstraint);

  let hoveredNode = null;

  const toLocal = (e) => {
    const r = canvas.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const hitNodeIndex = (x, y) =>
    nodes.findIndex(
      (n) =>
        x >= n.position.x - CARD_WIDTH / 2 - GRAB_PADDING &&
        x <= n.position.x + CARD_WIDTH / 2 + GRAB_PADDING &&
        y >= n.position.y - CARD_HEIGHT / 2 - GRAB_PADDING &&
        y <= n.position.y + CARD_HEIGHT / 2 + GRAB_PADDING
    );

  canvas.addEventListener("mousemove", (e) => {
    const { x, y } = toLocal(e);
    hoveredNode = hitNodeIndex(x, y) >= 0 ? nodes[hitNodeIndex(x, y)] : null;
    canvas.style.cursor = hoveredNode ? "grab" : "default";
  });

  /* ================= INTRO / PHYSICS ================= */
  const startTime = performance.now();

  Events.on(engine, "beforeUpdate", () => {
    const now = performance.now();
    const elapsed = now - startTime;
    const introT = clamp01(elapsed / INTRO_DURATION);
    const introEase = easeOutCubic(introT);

    nodes.forEach((node) => {
      const toCenter = Vector.sub(core.position, node.position);
      const dist = Vector.magnitude(toCenter);
      const dir = Vector.normalise(toCenter);
      const tangent = Vector.perp(dir);

      if (introT < 1) {
        const targetR = baseRadius * introEase;
        Body.applyForce(
          node,
          node.position,
          Vector.mult(dir, (dist - targetR) * INTRO_PULL)
        );
        return;
      }

      // resorte radial
      Body.applyForce(
        node,
        node.position,
        Vector.mult(dir, (dist - baseRadius) * RADIAL_FORCE)
      );

      // órbita
      Body.applyForce(
        node,
        node.position,
        Vector.mult(tangent, ORBIT_FORCE)
      );

      // damping
      Body.setVelocity(
        node,
        Vector.mult(node.velocity, ANGULAR_DAMPING)
      );

      // límite invisible
      if (dist > SOFT_LIMIT_RADIUS - MAGNET_RANGE) {
        const k = clamp01(
          (dist - (SOFT_LIMIT_RADIUS - MAGNET_RANGE)) / MAGNET_RANGE
        );
        Body.applyForce(
          node,
          node.position,
          Vector.mult(dir, k * MAGNET_STRENGTH)
        );
      }
    });
  });

  /* ================= LOOP ================= */
  let raf;
  let lastDraw = 0;

  const loop = (now) => {
    Engine.update(engine, 1000 / 60);

    if (now - lastDraw > DRAW_INTERVAL) {
      drawScene(ctx, {
        core,
        nodes,
        hoveredNode,
        constraints,
        width,
        height,
        renderOptions: opts.getRenderOptions?.(),
      });
      lastDraw = now;
    }

    raf = requestAnimationFrame(loop);
  };

  raf = requestAnimationFrame(loop);

  return {
    engine,
    canvas,
    stop() {
      cancelAnimationFrame(raf);
    },
  };
}

export function destroyEngine(instance) {
  if (!instance) return;
  instance.stop();
  Matter.Engine.clear(instance.engine);
  instance.canvas.remove();
}
