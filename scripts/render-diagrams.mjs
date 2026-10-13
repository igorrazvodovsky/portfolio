// Renders every src/diagrams/**/*.mmd and *.tldr to the matching
// src/images/**/*.svg: Mermaid with beautiful-mermaid
// (https://github.com/lukilabs/beautiful-mermaid), tldraw with tldraw-cli
// (https://github.com/kitschpatrol/tldraw-cli).
//
// beautiful-mermaid is a library, not a CLI, so this script is the entry point:
// `npm run diagrams`. It lays out with elkjs rather than dagre and takes its
// look from render options rather than a `%%{init}%%` directive, so a `.mmd`
// here is plain Mermaid with no theme block. What it does read from the source
// is `classDef`, `class`, `style` on nodes and `linkStyle` — those override the
// theme below, and that is where a diagram's own colour belongs. Two things it
// ignores: `style` on a subgraph, and `stroke-dasharray` in a node's classDef.
//
// It also inlines an `@import` for a Google font that this site does not use
// and should not fetch, so the import is stripped after rendering.

import { readdirSync, readFileSync, writeFileSync, mkdirSync, mkdtempSync, statSync } from 'node:fs'
import { join, relative, dirname } from 'node:path'
import { tmpdir } from 'node:os'
import { fileURLToPath } from 'node:url'
import { renderMermaidSVG } from 'beautiful-mermaid'
import { tldrawToImage } from '@kitschpatrol/tldraw-cli'
import puppeteer from 'puppeteer'

// tldraw draws a dashed or dotted line solid when the editor is zoomed out
// past 0.25 (`isForceSolid` in its ArrowShapeUtil), and the export reads that
// from the live editor. tldraw-cli zooms to fit in Puppeteer's default
// 800×600 window, which puts a large drawing well below that, so every dash
// comes out solid. A window about the size of the drawing keeps the zoom near
// 1. tldraw-cli exposes no viewport option; it shares this Puppeteer instance,
// so the launch is wrapped instead.
const launch = puppeteer.launch.bind(puppeteer)
puppeteer.launch = (options = {}) =>
  launch({ ...options, defaultViewport: { width: 4000, height: 2400 } })

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const srcDir = join(root, 'src/diagrams')
const outDir = join(root, 'src/images')

// The site's own palette and sans stack, so a diagram reads as part of the page
// rather than as a screenshot of a diagramming tool. Spacing is tight on
// purpose: it keeps a wide figure near the 1000px the case frames allow, which
// is what stops the labels from being scaled down to illegibility.
const theme = {
  font: 'system-ui',
  fg: '#1a1a1a',
  line: '#c4c4c4',
  transparent: true,
  padding: 8,
  nodeSpacing: 16,
  layerSpacing: 16,
}

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return walk(path)
    return /\.(mmd|tldr)$/.test(name) ? [path] : []
  })

const renderMermaid = (path) =>
  renderMermaidSVG(readFileSync(path, 'utf8'), theme).replace(
    /^\s*@import url\('https:\/\/fonts\.googleapis\.com[^\n]*\n/m,
    '',
  )

const renderTldraw = async (path) => {
  const [svgPath] = await tldrawToImage(path, {
    format: 'svg',
    transparent: true,
    output: mkdtempSync(join(tmpdir(), 'tldraw-')),
  })
  return useSiteFont(readFileSync(svgPath, 'utf8'), fittedLabels(path))
}

// tldraw embeds its own font (IBM Plex Sans, three faces, about a megabyte).
// The faces are dropped and the text set in the site's system-ui stack, which
// an SVG loaded through <img> can reach because it needs no download.
//
// A text shape set to auto-size, and an arrow label, sits in a box tldraw sized
// to fit it in Plex, so wrapping is switched off there: a label a little wider
// than its box overflows rather than breaking onto a second line. Everything
// else, a rectangle's label or a text shape given a fixed width, sits in a box
// the author sized, and keeps wrapping. The SVG does not say which is which, so
// the fitted labels are read from the snapshot and matched by their text.
const plainText = (node) =>
  node.text ?? (node.content ?? []).map(plainText).join(node.type === 'doc' ? '\n' : '')

const normalise = (text) => text.replace(/\s+/g, '')

const fittedLabels = (path) =>
  new Set(
    JSON.parse(readFileSync(path, 'utf8'))
      .records.filter(
        (r) =>
          r.typeName === 'shape' &&
          (r.type === 'arrow' || (r.type === 'text' && r.props.autoSize)) &&
          r.props.richText,
      )
      .map((r) => normalise(plainText(r.props.richText)))
      .filter(Boolean),
  )

const decode = (html) =>
  html
    .replace(/<[^>]+>/g, '')
    .replace(/&#x([\da-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(dec))
    .replaceAll('&quot;', '"')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&nbsp;', ' ')
    .replaceAll('&amp;', '&')

const useSiteFont = (svg, fitted) =>
  svg
    .replace(/@font-face \{[^}]*\}\s*/g, '')
    .replaceAll(
      'font-family: tldraw_sans, sans-serif',
      "font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    )
    .replace(/<foreignObject [^>]*>[\s\S]*?<\/foreignObject>/g, (label) =>
      fitted.has(normalise(decode(label)))
        ? label
            .replaceAll('white-space: pre-wrap', 'white-space: pre')
            .replaceAll('text-wrap: wrap', 'text-wrap: nowrap')
        : label,
    )

let changed = 0
for (const path of walk(srcDir)) {
  const svg = path.endsWith('.tldr') ? await renderTldraw(path) : renderMermaid(path)
  const out = join(outDir, relative(srcDir, path).replace(/\.(mmd|tldr)$/, '.svg'))
  const before = (() => {
    try {
      return readFileSync(out, 'utf8')
    } catch {
      return null
    }
  })()

  const [, w, h] = svg.match(/width="([\d.]+)" height="([\d.]+)"/)
  const size = `${Math.round(w)}×${Math.round(h)}`
  if (before === svg) {
    console.log(`  unchanged  ${relative(root, out)}  ${size}`)
    continue
  }
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, svg)
  changed++
  console.log(`  written    ${relative(root, out)}  ${size}`)
}

if (changed) console.log(`\n${changed} diagram(s) rendered. Check the img width/height attributes against the sizes above.`)
