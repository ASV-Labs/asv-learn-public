import { useEffect, useState } from 'react'
import { Editor } from '@tiptap/react'
import { Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface TableOfContentsProps {
  editor: Editor | null
}

interface HeadingItem {
  level: number
  text: string
  id: string
}

const TableOfContents = ({ editor }: TableOfContentsProps) => {
  const { t } = useTranslation()
  const [headings, setHeadings] = useState<HeadingItem[]>([])
  const [seenIds, setSeenIds] = useState<Set<string>>(() => new Set())

  useEffect(() => {
    if (!editor) return

    const updateHeadings = () => {
      const items: HeadingItem[] = []
      editor.state.doc.descendants((node) => {
        if (node.type.name.startsWith('heading')) {
          const level = node.attrs.level || 1
          const headingText = node.textContent || ''

          const slug = headingText
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '')

          const id = slug ? `heading-${slug}` : `heading-${Math.random().toString(36).substr(2, 9)}`

          items.push({
            level,
            text: node.textContent,
            id,
          })
        }
      })
      setHeadings(items)
    }

    editor.on('update', updateHeadings)
    updateHeadings()

    return () => {
      editor.off('update', updateHeadings)
    }
  }, [editor])

  // Mark a heading as seen once its section has scrolled into view.
  // TOC checks mean "visited on this page", not activity completion.
  useEffect(() => {
    if (typeof window === 'undefined' || headings.length === 0) return

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        setSeenIds((prev) => {
          let changed = false
          const next = new Set(prev)
          for (const entry of entries) {
            if (entry.isIntersecting && entry.target.id && !next.has(entry.target.id)) {
              next.add(entry.target.id)
              changed = true
            }
          }
          return changed ? next : prev
        })
      },
      { root: null, rootMargin: '0px 0px -55% 0px', threshold: 0.05 }
    )

    for (const el of elements) observer.observe(el)
    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <div className="w-full bg-none border-none shadow-none p-0 m-0 font-[inherit] flex flex-col items-stretch h-fit">
      <p className="toc-on-this-page text-[10px] uppercase tracking-widest font-bold text-neutral-400 mb-1 px-0">
        {t('activities.on_this_page', { defaultValue: 'On this page' })}
      </p>
      <ul className="!list-none !p-0 m-0">
        {headings.map((heading, index) => {
          const visited = seenIds.has(heading.id)
          return (
            <li
              key={index}
              className="toc-item my-2 !list-none flex items-start gap-2"
              style={{ paddingLeft: `${(heading.level - 1) * 1.2}rem` }}
            >
              <span
                className={`toc-check ${visited ? 'toc-check-seen' : 'toc-check-pending'}`}
                aria-hidden
              >
                {visited ? <Check size={13} strokeWidth={2} /> : null}
              </span>
              <a className={`toc-link toc-link-h${heading.level}`} href={`#${heading.id}`}>
                {heading.text}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default TableOfContents
