import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { projects } from "../src/components/projects/projects.data.js";
import {
  ALL_CATEGORY,
  filterProjects,
  getCategoryOptions,
  sortProjects,
} from "../src/components/projects/projectFilters.js";

const publicDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "public",
);

const ids = (result) => result.map((project) => project.id);

test("el catálogo mantiene identificadores únicos y campos obligatorios", () => {
  const uniqueIds = new Set(projects.map((project) => project.id));

  assert.equal(uniqueIds.size, projects.length, "hay ids duplicados");

  for (const project of projects) {
    assert.ok(project.id, `${project.id} sin id`);
    assert.ok(project.title, `${project.id} sin title`);
    assert.ok(project.subtitle, `${project.id} sin subtitle`);
    assert.ok(
      project.categories?.length > 0,
      `${project.id} sin categorías`,
    );
    assert.ok(project.stack?.length > 0, `${project.id} sin stack`);
  }
});

test("las categorías se derivan con contadores correctos", () => {
  const categories = getCategoryOptions(projects);
  const all = categories.find((category) => category.id === ALL_CATEGORY);

  assert.equal(all.count, projects.length, "el total de 'Todos' no coincide");

  for (const category of categories.filter((c) => c.id !== ALL_CATEGORY)) {
    const expected = projects.filter((project) =>
      project.categories.includes(category.id),
    ).length;

    assert.equal(
      category.count,
      expected,
      `contador incorrecto para ${category.id}`,
    );
  }
});

test("el filtro por categoría devuelve los proyectos esperados", () => {
  const categories = getCategoryOptions(projects);

  for (const category of categories) {
    const result = filterProjects(projects, { category: category.id });

    assert.equal(
      result.length,
      category.count,
      `filtro incorrecto para ${category.id}`,
    );
  }
});

test("la búsqueda encuentra por nombre, descripción y tecnología", () => {
  assert.deepEqual(
    ids(filterProjects(projects, { query: "odontograma" })),
    ["clinica-dental-pro"],
  );
  assert.deepEqual(
    ids(filterProjects(projects, { query: "discord" })),
    ["batimusic"],
  );
  assert.deepEqual(
    ids(filterProjects(projects, { query: "angular" })),
    ["track-pays"],
  );
  assert.deepEqual(
    ids(filterProjects(projects, { query: "packet tracer" })),
    ["packet-tracer-mcp-mitm"],
  );
});

test("la búsqueda ignora acentos y admite varios términos", () => {
  assert.deepEqual(
    ids(filterProjects(projects, { query: "musica" })).sort(),
    ["albumica", "batimusic"],
  );
  assert.deepEqual(
    ids(filterProjects(projects, { query: "clinica dental" })),
    ["clinica-dental-pro"],
  );
});

test("categoría y búsqueda se combinan", () => {
  assert.equal(
    filterProjects(projects, { category: "Salud", query: "electron" }).length,
    1,
  );
  assert.equal(
    filterProjects(projects, { category: "Bots", query: "odontograma" }).length,
    0,
  );
});

test("sin coincidencias la lista queda vacía", () => {
  assert.deepEqual(
    filterProjects(projects, { query: "proyecto-inexistente-xyz" }),
    [],
  );
});

test("los medios y las demos apuntan a archivos existentes en public/", () => {
  const assets = [];

  for (const project of projects) {
    if (project.media?.src) assets.push(project.media.src);
    if (project.demoVideo?.src) assets.push(project.demoVideo.src);
    if (project.demoVideo?.poster) assets.push(project.demoVideo.poster);
    for (const extra of project.demosExtra ?? []) {
      assets.push(extra.src);
      if (extra.poster) assets.push(extra.poster);
    }
  }

  assert.ok(assets.length > 0, "no hay assets declarados");

  for (const asset of assets) {
    assert.ok(asset.startsWith("/"), `${asset} no es una ruta pública`);
    assert.ok(
      existsSync(path.join(publicDir, asset)),
      `falta el archivo ${asset}`,
    );
  }
});

test("los enlaces externos son URLs absolutas http(s) o null", () => {
  const urlKeys = ["repo", "demo", "release"];

  for (const project of projects) {
    for (const key of urlKeys) {
      const value = project.links?.[key];
      if (value === null || value === undefined) continue;
      assert.match(
        value,
        /^https:\/\//,
        `${project.id}.links.${key} no es una URL https`,
      );
    }
  }
});

test("solo los proyectos con video verificado exponen demoVideo", () => {
  for (const project of projects) {
    if (!project.demoVideo) continue;

    assert.ok(
      project.demoVideo.src && project.demoVideo.title,
      `${project.id} tiene demoVideo incompleto`,
    );
    assert.ok(
      project.demoVideo.src.endsWith(".mp4"),
      `${project.id} apunta a un video no mp4`,
    );
  }
});

test("presentation.hero apunta a un archivo existente en public/", () => {
  for (const project of projects) {
    const hero = project.presentation?.hero;
    if (!hero) continue;

    assert.ok(hero.src, `${project.id} presentation.hero sin src`);
    assert.ok(hero.alt, `${project.id} presentation.hero sin alt`);
    assert.ok(
      existsSync(path.join(publicDir, hero.src)),
      `falta el archivo ${hero.src}`,
    );
  }
});

test("presentation.demo declara orientación y aspecto coherentes", () => {
  const allowed = new Set(["landscape", "portrait"]);

  for (const project of projects) {
    const demo = project.presentation?.demo;
    if (!demo) continue;

    assert.ok(
      allowed.has(demo.orientation),
      `${project.id} orientation inválida: ${demo.orientation}`,
    );
    assert.equal(
      typeof demo.aspect,
      "number",
      `${project.id} aspect no es numérico`,
    );
    assert.ok(demo.aspect > 0, `${project.id} aspect no positivo`);

    if (demo.orientation === "portrait") {
      assert.ok(demo.aspect < 1, `${project.id} portrait con aspect >= 1`);
    } else {
      assert.ok(demo.aspect >= 1, `${project.id} landscape con aspect < 1`);
    }

    assert.ok(
      existsSync(path.join(publicDir, demo.src)),
      `falta el video ${demo.src}`,
    );
    if (demo.poster) {
      assert.ok(
        existsSync(path.join(publicDir, demo.poster)),
        `falta el poster ${demo.poster}`,
      );
    }
  }
});

test("layout phone solo con demo vertical y sin marco duplicado", () => {
  for (const project of projects) {
    const presentation = project.presentation;
    if (presentation?.layout !== "phone") continue;

    assert.ok(presentation.demo, `${project.id} phone sin demo`);
    assert.equal(
      presentation.demo.orientation,
      "portrait",
      `${project.id} layout phone con demo no vertical`,
    );
    assert.equal(
      typeof presentation.demo.hasDeviceFrame,
      "boolean",
      `${project.id} phone sin hasDeviceFrame declarado`,
    );
  }
});

test("las variantes de presentación tienen hero, demo y descripción", () => {
  for (const project of projects) {
    const variants = project.presentation?.variants;
    if (!variants) continue;

    assert.ok(variants.length >= 2, `${project.id} con menos de 2 variantes`);

    const ids = new Set();
    for (const variant of variants) {
      assert.ok(variant.id, `${project.id} variante sin id`);
      assert.ok(!ids.has(variant.id), `${project.id} variante ${variant.id} duplicada`);
      ids.add(variant.id);

      assert.ok(variant.label, `${project.id}.${variant.id} sin label`);
      assert.ok(
        variant.description,
        `${project.id}.${variant.id} sin descripción`,
      );
      assert.ok(
        variant.hero?.src,
        `${project.id}.${variant.id} sin hero`,
      );
      assert.ok(
        existsSync(path.join(publicDir, variant.hero.src)),
        `falta el hero ${variant.hero.src}`,
      );
      assert.ok(
        variant.demo?.src,
        `${project.id}.${variant.id} sin demo`,
      );
      assert.ok(
        existsSync(path.join(publicDir, variant.demo.src)),
        `falta el video ${variant.demo.src}`,
      );
    }
  }
});

test("cada proyecto declara una imagen principal utilizable", () => {
  for (const project of projects) {
    const src = project.presentation?.hero?.src ?? project.media?.src;

    if (!src) {
      assert.equal(
        project.media,
        null,
        `${project.id} sin imagen principal pero con media`,
      );
      continue;
    }

    assert.ok(
      existsSync(path.join(publicDir, src)),
      `falta la imagen principal ${src}`,
    );
  }
});

test("la imagen principal resuelve a un tipo que ProjectMedia sabe pintar", () => {
  // Regresión: `presentation.hero` no declara `type`, y ProjectMedia solo
  // pintaba la imagen cuando `type === "image"`. Eso dejaba la tarjeta vacía.
  const renderable = new Set(["image", "video", undefined]);

  for (const project of projects) {
    const chosen = project.presentation?.hero ?? project.media;
    if (!chosen) continue;

    assert.ok(
      renderable.has(chosen.type),
      `${project.id} declara un tipo no soportado: ${chosen.type}`,
    );

    // Sin `type`, ProjectMedia debe asumir imagen.
    const effectiveType = chosen.type ?? "image";
    assert.equal(
      effectiveType,
      "image",
      `${project.id} no renderizaría su imagen principal`,
    );
  }
});

test("el orden por featuredRank es determinista y no pierde proyectos", () => {
  const ordered = sortProjects(projects);

  assert.equal(
    ordered.length,
    projects.length,
    "el orden pierde o duplica proyectos",
  );

  assert.deepEqual(
    [...ordered.map((p) => p.id)].sort(),
    [...projects.map((p) => p.id)].sort(),
  );

  for (let i = 1; i < ordered.length; i += 1) {
    const prev = ordered[i - 1].featuredRank ?? Infinity;
    const curr = ordered[i].featuredRank ?? Infinity;
    assert.ok(
      prev <= curr,
      `orden roto entre ${ordered[i - 1].id} y ${ordered[i].id}`,
    );
  }

  assert.deepEqual(
    sortProjects(projects).map((p) => p.id),
    sortProjects(projects).map((p) => p.id),
  );
});

test("sortProjects no muta el array original", () => {
  const before = projects.map((p) => p.id);
  sortProjects(projects);
  assert.deepEqual(
    projects.map((p) => p.id),
    before,
    "sortProjects mutó el catálogo",
  );
});

test("los featuredRank son numéricos y únicos", () => {
  const ranks = [];

  for (const project of projects) {
    if (project.featuredRank === undefined) continue;
    assert.equal(
      typeof project.featuredRank,
      "number",
      `${project.id} featuredRank no numérico`,
    );
    ranks.push(project.featuredRank);
  }

  assert.equal(
    new Set(ranks).size,
    ranks.length,
    "hay featuredRank duplicados",
  );
});

test("details solo contiene campos soportados y con contenido", () => {
  const allowed = new Set([
    "problem",
    "objective",
    "features",
    "architecture",
  ]);

  for (const project of projects) {
    const details = project.details;
    if (!details) continue;

    for (const key of Object.keys(details)) {
      assert.ok(
        allowed.has(key),
        `${project.id} usa details.${key} no soportado`,
      );
    }

    for (const key of ["problem", "objective"]) {
      if (details[key] === undefined) continue;
      assert.equal(
        typeof details[key],
        "string",
        `${project.id}.details.${key} no es texto`,
      );
      assert.ok(
        details[key].trim().length > 0,
        `${project.id}.details.${key} está vacío`,
      );
    }

    for (const key of ["features", "architecture"]) {
      if (details[key] === undefined) continue;
      assert.ok(
        Array.isArray(details[key]) && details[key].length > 0,
        `${project.id}.details.${key} debe ser un array no vacío`,
      );
      for (const item of details[key]) {
        assert.equal(
          typeof item,
          "string",
          `${project.id}.details.${key} con item no textual`,
        );
        assert.ok(
          item.trim().length > 0,
          `${project.id}.details.${key} con item vacío`,
        );
      }
    }
  }
});

test("las miniaturas verificadas existen y son imágenes reales", () => {
  const thumbs = [
    "/demos/thumbs/clinica-dental-pro.jpg",
    "/demos/thumbs/optimal-erp.jpg",
    "/demos/thumbs/optimal-web.jpg",
    "/demos/thumbs/track-pays.jpg",
    "/demos/thumbs/fakelove-pdf-tools.jpg",
    "/demos/thumbs/albumica.jpg",
    "/demos/thumbs/tubetoalbum.jpg",
  ];

  for (const thumb of thumbs) {
    const full = path.join(publicDir, thumb);
    assert.ok(existsSync(full), `falta la miniatura ${thumb}`);
    assert.ok(statSync(full).size > 1024, `${thumb} está vacío o truncado`);
  }
});
