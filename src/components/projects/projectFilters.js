export const ALL_CATEGORY = "all";

/**
 * Orden de presentación del catálogo.
 *
 * `featuredRank` es un campo numérico editable: menor valor aparece primero.
 * Es un orden PROVISIONAL, no una puntuación de calidad. Refleja el criterio
 * de presentación acordado (producto entregado y verificable primero) y debe
 * ajustarse a mano cuando el usuario confirme su propio orden.
 *
 * Los proyectos sin `featuredRank` se colocan al final, conservando el orden
 * del array original. El desempate es siempre por `id` para que el resultado
 * sea determinista e independiente del motor de JavaScript.
 */
export function sortProjects(projects) {
  return [...projects].sort((a, b) => {
    const rankA = Number.isFinite(a.featuredRank) ? a.featuredRank : Infinity;
    const rankB = Number.isFinite(b.featuredRank) ? b.featuredRank : Infinity;

    if (rankA !== rankB) return rankA - rankB;

    return String(a.id).localeCompare(String(b.id));
  });
}

function normalizeText(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es")
    .trim();
}

export function getCategoryOptions(projects) {
  const counts = new Map();

  for (const project of projects) {
    for (const category of project.categories ?? []) {
      counts.set(category, (counts.get(category) ?? 0) + 1);
    }
  }

  return [
    { id: ALL_CATEGORY, label: "Todos", count: projects.length },
    ...Array.from(counts, ([id, count]) => ({
      id,
      label: id,
      count,
    })),
  ];
}

export function filterProjects(
  projects,
  { category = ALL_CATEGORY, query = "" } = {},
) {
  const searchTokens = normalizeText(query).split(/\s+/).filter(Boolean);

  return projects.filter((project) => {
    if (
      category !== ALL_CATEGORY &&
      !(project.categories ?? []).includes(category)
    ) {
      return false;
    }

    if (searchTokens.length === 0) return true;

    const searchableText = normalizeText(
      [
        project.short,
        project.title,
        project.subtitle,
        project.shortDescription,
        project.longDescription,
        ...(project.stack ?? []),
        ...(project.categories ?? []),
        ...(project.description ?? []),
      ]
        .filter(Boolean)
        .join(" "),
    );

    return searchTokens.every((token) => searchableText.includes(token));
  });
}
