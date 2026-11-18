/**
 * Shared Markdown → TipTap JSON for ASV Learn course lessons.
 * Emits real TipTap table nodes (not code blocks) and preserves **bold** / `code` / *italic*.
 */
export function markdownToTipTap(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n')
  const content = []
  let i = 0
  let para = []
  let inCode = false
  let codeLang = 'plaintext'
  let codeLines = []

  const flushPara = () => {
    if (!para.length) return
    const text = para.join(' ').trim()
    para = []
    if (!text) return
    content.push({ type: 'paragraph', content: parseInline(text) })
  }

  const flushCode = () => {
    content.push({
      type: 'codeBlock',
      attrs: { language: codeLang || 'plaintext' },
      content: codeLines.length ? [{ type: 'text', text: codeLines.join('\n') }] : undefined,
    })
    codeLines = []
    inCode = false
    codeLang = 'plaintext'
  }

  const cellParagraph = (text) => ({
    type: 'paragraph',
    content: text ? parseInline(text) : undefined,
  })

  const parseTableRow = (line) =>
    line
      .trim()
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((c) => c.trim())

  const isSeparatorRow = (cells) =>
    cells.length > 0 && cells.every((c) => /^:?-{3,}:?$/.test(c.replace(/\s+/g, '')))

  const flushTable = (tableLines) => {
    const rows = tableLines.map(parseTableRow).filter((cells) => cells.length && !isSeparatorRow(cells))
    if (!rows.length) return

    const colCount = Math.max(...rows.map((r) => r.length))
    const normalized = rows.map((r) => {
      const copy = [...r]
      while (copy.length < colCount) copy.push('')
      return copy.slice(0, colCount)
    })

    const [header, ...body] = normalized
    const tipTapRows = []

    tipTapRows.push({
      type: 'tableRow',
      content: header.map((text) => ({
        type: 'tableHeader',
        attrs: { colspan: 1, rowspan: 1, colwidth: null },
        content: [cellParagraph(text)],
      })),
    })

    for (const row of body) {
      tipTapRows.push({
        type: 'tableRow',
        content: row.map((text) => ({
          type: 'tableCell',
          attrs: { colspan: 1, rowspan: 1, colwidth: null },
          content: [cellParagraph(text)],
        })),
      })
    }

    content.push({
      type: 'table',
      content: tipTapRows,
    })
    content.push({ type: 'paragraph' })
  }

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('```')) {
      flushPara()
      if (inCode) flushCode()
      else {
        inCode = true
        codeLang = line.slice(3).trim() || 'plaintext'
        codeLines = []
      }
      i += 1
      continue
    }

    if (inCode) {
      codeLines.push(line)
      i += 1
      continue
    }

    if (/^\|/.test(line)) {
      flushPara()
      const tableLines = []
      while (i < lines.length && /^\|/.test(lines[i])) {
        tableLines.push(lines[i])
        i += 1
      }
      flushTable(tableLines)
      continue
    }

    const heading = /^(#{1,3})\s+(.+)$/.exec(line)
    if (heading) {
      flushPara()
      content.push({
        type: 'heading',
        attrs: { level: heading[1].length },
        content: parseInline(heading[2].trim()),
      })
      i += 1
      continue
    }

    if (/^[-*]\s+/.test(line) || /^- \[[ xX]\]\s+/.test(line)) {
      flushPara()
      const items = []
      while (
        i < lines.length &&
        (/^[-*]\s+/.test(lines[i]) || /^- \[[ xX]\]\s+/.test(lines[i]))
      ) {
        const text = lines[i]
          .replace(/^- \[[ xX]\]\s+/, '')
          .replace(/^[-*]\s+/, '')
          .trim()
        items.push({
          type: 'listItem',
          content: [{ type: 'paragraph', content: parseInline(text) }],
        })
        i += 1
      }
      content.push({ type: 'bulletList', content: items })
      continue
    }

    if (/^\d+\.\s+/.test(line)) {
      flushPara()
      const items = []
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        items.push({
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: parseInline(lines[i].replace(/^\d+\.\s+/, '').trim()),
            },
          ],
        })
        i += 1
      }
      content.push({ type: 'orderedList', content: items })
      continue
    }

    if (!line.trim()) {
      flushPara()
      i += 1
      continue
    }

    // Keep raw markdown markers so flushPara/parseInline can apply marks
    // across soft-wrapped lines joined with spaces.
    para.push(line.trim())
    i += 1
  }

  flushPara()
  if (inCode) flushCode()
  if (!content.length) {
    content.push({ type: 'paragraph', content: [{ type: 'text', text: '(empty lesson)' }] })
  }
  return { type: 'doc', content }
}

/** Parse a markdown inline string into TipTap text nodes with marks. */
export function parseInline(text) {
  if (!text) return undefined
  const nodes = []
  // Order: **bold**, `code`, then *italic* (single asterisks)
  const re = /\*\*([^*]+)\*\*|`([^`]+)`|\*([^*]+)\*/g
  let last = 0
  let m
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      nodes.push({ type: 'text', text: text.slice(last, m.index) })
    }
    if (m[1] != null) {
      nodes.push({ type: 'text', text: m[1], marks: [{ type: 'bold' }] })
    } else if (m[2] != null) {
      nodes.push({ type: 'text', text: m[2], marks: [{ type: 'code' }] })
    } else if (m[3] != null) {
      nodes.push({ type: 'text', text: m[3], marks: [{ type: 'italic' }] })
    }
    last = m.index + m[0].length
  }
  if (last < text.length) {
    nodes.push({ type: 'text', text: text.slice(last) })
  }
  // Also rewrite bare markdown links [label](url) into plain "label (url)" text
  // without dropping other nodes — applied per text node without marks.
  return nodes.length
    ? nodes.flatMap((n) => {
        if (n.marks || !/\[([^\]]+)\]\(([^)]+)\)/.test(n.text)) return [n]
        const parts = []
        const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g
        let li = 0
        let lm
        while ((lm = linkRe.exec(n.text)) !== null) {
          if (lm.index > li) parts.push({ type: 'text', text: n.text.slice(li, lm.index) })
          parts.push({
            type: 'text',
            text: lm[1],
            marks: [{ type: 'link', attrs: { href: lm[2], target: '_blank' } }],
          })
          li = lm.index + lm[0].length
        }
        if (li < n.text.length) parts.push({ type: 'text', text: n.text.slice(li) })
        return parts.length ? parts : [n]
      })
    : [{ type: 'text', text: '' }]
}
