import { computed, type Ref } from 'vue'
import type { CVData, CVExperience } from '../types/cv'

export interface PageDescriptor {
  id: string
  pageIndex: number
  pageNumber: number
  totalCount: number
  type: 'cover' | 'skills' | 'projects' | 'letter'
  tagText: string
  projectChunk?: CVExperience[]
  chunkIndex?: number
  totalChunks?: number
}

export function usePagination(cv: Ref<CVData>) {
  const PROJECTS_PER_PAGE = 2

  const rawProjects = computed(() => cv.value.page3?.experiences || [])

  const projectChunks = computed<CVExperience[][]>(() => {
    const list = rawProjects.value
    if (!list.length) return [[]]
    const chunks: CVExperience[][] = []
    for (let i = 0; i < list.length; i += PROJECTS_PER_PAGE) {
      chunks.push(list.slice(i, i + PROJECTS_PER_PAGE))
    }
    return chunks
  })

  const pages = computed<PageDescriptor[]>(() => {
    const result: PageDescriptor[] = []
    const isThreePage = (cv.value.pageCount || 3) === 3

    // P1: Cover
    result.push({
      id: 'page-1',
      pageIndex: 0,
      pageNumber: 1,
      totalCount: 0,
      type: 'cover',
      tagText: 'Page 01 · About Me / Cover'
    })

    // P2: Skills & Architecture (4+ pages) or Work Experience (3 pages)
    result.push({
      id: 'page-2',
      pageIndex: 1,
      pageNumber: 2,
      totalCount: 0,
      type: 'skills',
      tagText: isThreePage ? 'Page 02 · Resume / CV' : 'Page 02 · Skills & Architecture'
    })

    // P3+ Dynamic Project Pages (Only for multi-page mode with projects)
    if (!isThreePage) {
      const chunks = projectChunks.value
      chunks.forEach((chunk, idx) => {
        const pNum = 3 + idx
        const padNum = String(pNum).padStart(2, '0')
        result.push({
          id: idx === 0 ? 'page-3' : `page-3-cont-${idx}`,
          pageIndex: result.length,
          pageNumber: pNum,
          totalCount: 0,
          type: 'projects',
          tagText: idx === 0
            ? `Page ${padNum} · Work Experience & Projects`
            : `Page ${padNum} · Production Projects (Cont.)`,
          projectChunk: chunk,
          chunkIndex: idx,
          totalChunks: chunks.length
        })
      })
    }

    // Final Page: Cover Letter
    const letterPageNum = result.length + 1
    const padLetterNum = String(letterPageNum).padStart(2, '0')
    result.push({
      id: 'page-letter',
      pageIndex: result.length,
      pageNumber: letterPageNum,
      totalCount: 0,
      type: 'letter',
      tagText: `Page ${padLetterNum} · Cover Letter`
    })

    // Backfill totalCount
    const total = result.length
    result.forEach(p => (p.totalCount = total))
    return result
  })

  const totalPages = computed(() => pages.value.length)

  return {
    pages,
    totalPages,
    projectChunks
  }
}
