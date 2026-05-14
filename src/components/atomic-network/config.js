
export const NODES_DATA = [
  { id: "mobile", label: "Mobile Dev", sub: "Android, Kotlin", icon: "/icons/android_ico.png", color: "#8b5cf6" },
  { id: "devops", label: "DevOps", sub: "Docker, CI/CD", icon: "/icons/devOps_ico.png", color: "#38bdf8" },
  { id: "arch", label: "Architecture", sub: "Scalable Systems", icon: "/icons/azure_ico.png", color: "#34d399" },
  { id: "backend", label: "Backend", sub: "Java, Spring", icon: "/icons/spring_ico.png", color: "#f472b6" },
  { id: "cloud", label: "Cloud Native", sub: "Azure, AWS", icon: "/icons/cloud_ico.png", color: "#60a5fa" },
  { id: "docker", label: "Container", sub: "Docker, K8s", icon: "/icons/docker_ico.png", color: "#fb923c" },
];

export const THEMES = {
  dark: {
    bg: "#020617",
    cardBg: "rgba(15,23,42,0.88)",
    textMain: "rgba(229,231,235,0.95)",
    textSub: "rgba(226,232,240,0.70)",
    line: "rgba(148,163,184,0.30)",
    coreAura: "rgba(37,99,235,0.24)",
  },
  light: {
    bg: "#f8fafc",
    cardBg: "rgba(255,255,255,0.92)",
    textMain: "rgba(15,23,42,0.92)",
    textSub: "rgba(15,23,42,0.60)",
    line: "rgba(51,65,85,0.22)",
    coreAura: "rgba(37,99,235,0.18)",
  },
};

export const CONFIG = {
  core: { radius: 28, color: "#2563eb" },
  node: {
    radius: 14,
    mass: () => 1 + Math.random(),
    frictionAir: () => 0.02 + Math.random() * 0.02,
  },
  spring: {
    stiffnessCore: 0.008,
    stiffnessNode: 0.004,
    damping: 0.12,
  },
  organicForce: {
    strength: 0.00004,
    speed: 0.001,
  },
  visual: {
    glow: 16,
    hoverGlow: 26,
  },
};
