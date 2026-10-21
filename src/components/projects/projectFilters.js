export const ALL_CATEGORY = "all";

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
