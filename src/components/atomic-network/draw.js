import { CONFIG, NODES_DATA, THEMES } from "./config";

/* ================= CONFIG ================= */
const SOFT_LIMIT_RADIUS = 360;
const HALO_INNER = 0.82;
const HALO_OUTER = 1.0;

/* ================= IMAGE CACHE ================= */
const imageCache = {};

export function preloadImages() {
  NODES_DATA.forEach((node) => {
    if (node.icon && !imageCache[node.icon]) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        imageCache[node.icon] = img;
      };
      img.onerror = () => {
        imageCache[node.icon] = null;
      };
      img.src = node.icon;
    }
  });
}

/* ================= THEME ================= */
function currentTheme() {
  const isLight = document.body.classList.contains("light");
  return isLight ? THEMES.light : THEMES.dark;
}

/* ================= UTILS ================= */
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/* ================= CARD ================= */
function drawCard(ctx, x, y, data, isHover, compact, theme) {
  const w = compact ? 110 : 132;
  const h = 52;
  const r = 14;

  ctx.save();

  ctx.shadowBlur = isHover ? 26 : 14;
  ctx.shadowColor = data.color;

  ctx.fillStyle = theme.cardBg;
  roundRect(ctx, x - w / 2, y - h / 2, w, h, r);
  ctx.fill();

  ctx.shadowBlur = 0;

  /* icon bg */
  ctx.fillStyle = "rgba(37,99,235,0.12)";
  roundRect(ctx, x - w / 2 + 10, y - 16, 30, 30, 12);
  ctx.fill();

  /* icon image from cache */
  const img = imageCache[data.icon];
  if (img) {
    const iconSize = 22;
    ctx.drawImage(
      img,
      x - w / 2 + 14,
      y - iconSize / 2,
      iconSize,
      iconSize
    );
  }

  /* title */
  ctx.textAlign = "left";
  ctx.font = "12.5px Inter, system-ui, sans-serif";
  ctx.fillStyle = theme.textMain;
  ctx.fillText(data.label, x - w / 2 + 48, y - 2);

  if (!compact) {
    ctx.font = "10px Inter, system-ui, sans-serif";
    ctx.fillStyle = theme.textSub;
    ctx.fillText(data.sub, x - w / 2 + 48, y + 14);
  }

  ctx.restore();
}

/* ===================================================== */
/* ===================== DRAW SCENE ==================== */
/* ===================================================== */

export function drawScene(
  ctx,
  { core, nodes, hoveredNode, constraints, width, height, renderOptions }
) {
  const theme = currentTheme();
  const expanded = renderOptions?.expanded ?? true;
  const compact = !expanded;

  ctx.clearRect(0, 0, width, height);

  /* ================= HALO LÍMITE INVISIBLE ================= */
  ctx.save();

  const gradient = ctx.createRadialGradient(
    core.position.x,
    core.position.y,
    SOFT_LIMIT_RADIUS * HALO_INNER,
    core.position.x,
    core.position.y,
    SOFT_LIMIT_RADIUS * HALO_OUTER
  );

  gradient.addColorStop(0, "rgba(37,99,235,0)");
  gradient.addColorStop(1, "rgba(37,99,235,0.10)");

  ctx.strokeStyle = gradient;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(
    core.position.x,
    core.position.y,
    SOFT_LIMIT_RADIUS,
    0,
    Math.PI * 2
  );
  ctx.stroke();
  ctx.restore();

  /* ================= LÍNEAS ================= */
  ctx.save();
  ctx.setLineDash([3, 7]);
  ctx.lineWidth = 1;
  ctx.strokeStyle = theme.line;
  ctx.lineDashOffset = -(core.position.x + core.position.y) * 0.02;

  constraints.forEach((c) => {
    if (!c.bodyA || !c.bodyB) return;
    ctx.beginPath();
    ctx.moveTo(c.bodyA.position.x, c.bodyA.position.y);
    ctx.lineTo(c.bodyB.position.x, c.bodyB.position.y);
    ctx.stroke();
  });

  ctx.restore();

  /* ================= CARDS ================= */
  nodes.forEach((n, i) => {
    const data = NODES_DATA[i];
    if (!data) return;
    drawCard(
      ctx,
      n.position.x,
      n.position.y,
      data,
      hoveredNode === n,
      compact,
      theme
    );
  });

  /* ================= CORE ================= */
  const pulse = 1 + Math.sin(core.position.x * 0.01) * 0.03;
  const r = CONFIG.core.radius * 1.35;
  const cx = core.position.x;
  const cy = core.position.y;

  ctx.save();

  const outerGlow = ctx.createRadialGradient(cx, cy, r * 0.5, cx, cy, r * 2.5);
  outerGlow.addColorStop(0, "rgba(37,99,235,0.3)");
  outerGlow.addColorStop(0.5, "rgba(37,99,235,0.1)");
  outerGlow.addColorStop(1, "rgba(37,99,235,0)");
  ctx.fillStyle = outerGlow;
  ctx.beginPath();
  ctx.arc(cx, cy, r * 2.5 * pulse, 0, Math.PI * 2);
  ctx.fill();

  const coreGradient = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, 0, cx, cy, r * 1.8);
  coreGradient.addColorStop(0, "#60a5fa");
  coreGradient.addColorStop(0.5, CONFIG.core.color);
  coreGradient.addColorStop(1, "#1e3a8a");
  ctx.shadowBlur = 48;
  ctx.shadowColor = CONFIG.core.color;
  ctx.fillStyle = coreGradient;
  ctx.beginPath();
  ctx.arc(cx, cy, r * pulse, 0, Math.PI * 2);
  ctx.fill();

  ctx.shadowBlur = 0;
  const innerRing = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 0.9);
  innerRing.addColorStop(0, "rgba(255,255,255,0.25)");
  innerRing.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = innerRing;
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.85 * pulse, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(255,255,255,0.15)";
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.6 * pulse, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.restore();

  /* ================= CORE TEXT ================= */
  ctx.save();
  ctx.textAlign = "center";
  ctx.shadowBlur = 8;
  ctx.shadowColor = "rgba(0,0,0,0.5)";
  ctx.font = "bold 16px Inter, system-ui, sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.fillText("CAPV", cx, cy - 2);

  ctx.font = "8px Inter, system-ui, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.fillText("◉ NEXUS ◉", cx, cy + 16);
  ctx.restore();
}
