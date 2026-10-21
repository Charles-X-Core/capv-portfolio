#!/usr/bin/env node

import { mkdir, rename, rm, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { generateContributionSnapshot } from '../lib/githubContributions.js'

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(SCRIPT_DIR, '..')
const DEFAULT_OUTPUT = resolve(
  REPO_ROOT,
  'public/data/github-contributions.json'
)

async function writeSnapshot(snapshot, outputPath) {
  await mkdir(dirname(outputPath), { recursive: true })

  const temporaryPath = `${outputPath}.${process.pid}.tmp`

  try {
    await writeFile(
      temporaryPath,
      `${JSON.stringify(snapshot, null, 2)}\n`,
      'utf8'
    )
    await rename(temporaryPath, outputPath)
  } finally {
    await rm(temporaryPath, { force: true })
  }
}

async function main() {
  const token = process.env.CONTRIBUTIONS_TOKEN?.trim()
  const login = process.env.GITHUB_LOGIN?.trim() || 'Charles-X-Core'
  const outputPath = process.env.CONTRIBUTIONS_OUTPUT_PATH
    ? resolve(process.cwd(), process.env.CONTRIBUTIONS_OUTPUT_PATH)
    : DEFAULT_OUTPUT

  const snapshot = await generateContributionSnapshot({ token, login })
  await writeSnapshot(snapshot, outputPath)

  console.log(
    `Snapshot actualizado: ${snapshot.totalContributions} contribuciones, ${snapshot.period.from} a ${snapshot.period.to}.`
  )
}

const isMain =
  process.argv[1] &&
  pathToFileURL(resolve(process.argv[1])).href === import.meta.url

if (isMain) {
  main().catch((error) => {
    console.error(`No se pudo generar el snapshot: ${error.message}`)
    process.exitCode = 1
  })
}
