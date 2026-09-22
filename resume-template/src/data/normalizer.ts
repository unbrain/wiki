import type { CVData, CVExperience, CVEducationItem } from '../types/cv'

function cleanHtml(html?: string): string {
  if (!html) return ''
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

function htmlToBullets(html?: string): string[] {
  if (!html) return []
  const matches = html.match(/<li><p[^>]*>(.*?)<\/p><\/li>|<li>(.*?)<\/li>/gs)
  if (matches) {
    return matches.map(m => m.replace(/<\/?li>|<\/?p[^>]*>/g, '').trim()).filter(Boolean)
  }
  return []
}

export function normalizeCvData(input: any): CVData {
  if (!input) throw new Error('空的简历数据')

  // 1. Native format
  if (input.person && input.meta && input.page2) {
    return input as CVData
  }

  // 2. Wrapped in presets dict
  if (input.unbrain_full && input.unbrain_full.person) {
    return input.unbrain_full as CVData
  }
  if (input.original && input.original.person) {
    return input.original as CVData
  }

  // 3. Reactive Resume (rxresu.me) standard export schema
  if (input.basics || input.sections) {
    const basics = input.basics || {}
    const sections = input.sections || {}
    const rawName = basics.name || '刘朝阳'
    const nameParts = rawName.split(/[·\s/|]/).map((s: string) => s.trim()).filter(Boolean)
    const nameMain = nameParts[0] || '刘朝阳'
    const roleMain = nameParts.slice(1).join(' ') || basics.headline || '资深前端开发工程师'

    const summaryHtml = input.summary?.content || ''
    const introBio = cleanHtml(summaryHtml.split('<ul>')[0]) || '多年一线大型生产工程沉淀，具备深厚的前端架构与性能调优实战经验。'
    const summaryBullets = htmlToBullets(summaryHtml)

    const expItems = sections.experience?.items || sections.work?.items || []
    const experiences: CVExperience[] = expItems.map((item: any) => ({
      title: `${item.company || ''} / ${item.period || item.date || ''}`,
      company: item.location ? `${item.company} · ${item.location}` : item.company,
      summary: cleanHtml(item.description?.split('<ul>')[0]) || '',
      bullets: htmlToBullets(item.description)
    }))

    const projItems = sections.projects?.items || []
    const projects: CVExperience[] = projItems.map((item: any) => ({
      title: item.name || '',
      company: item.name,
      summary: cleanHtml(item.description?.split('<ul>')[0]) || '',
      bullets: htmlToBullets(item.description)
    }))

    const eduItems = sections.education?.items || []
    const educationList: CVEducationItem[] = eduItems.map((item: any) => ({
      degree: item.school || '本科 / 计算机科学与技术',
      school: item.degree || item.area || '学士学位',
      year: item.period || item.date || '2015 - 2019'
    }))

    const hasRichProjects = projects.length > 0
    const pageCount = hasRichProjects ? 4 : 3

    return {
      id: 'imported_cv',
      label: '📥 导入的简历: ' + rawName,
      pageCount: pageCount,
      meta: {
        year: 'Year 2028',
        website: basics.website?.url?.replace(/^https?:\/\//, '') || 'blog.callmejesus.com',
        addressTitle: 'ADDRESS :',
        addressLines: [
          basics.phone ? `(+86) ${basics.phone}` : '',
          basics.email || '',
          basics.location || '',
          basics.website?.url?.replace(/^https?:\/\//, '') || ''
        ].filter(Boolean).join('<br>'),
        coverLetterContacts: [
          basics.phone ? `P | (+86) ${basics.phone}` : '',
          basics.location ? `L | ${basics.location}` : '',
          basics.email ? `E | ${basics.email}` : ''
        ].filter(Boolean).join('<br>')
      },
      person: {
        nameFirst: 'LIU',
        nameLast: 'ZHAOYANG',
        nameCn: rawName,
        role: roleMain,
        roleCn: roleMain,
        photo: 'https://ssl.gstatic.com/gb/images/ring/pr_56px_2x_asknjuyerc.png',
        photoFit: 'contain',
        photoPosition: 'center center',
        photoScale: 1.0,
        greeting: `Hello I'm<br>${nameMain}`,
        aboutStamp: 'About Me.',
        introBio: introBio
      },
      page2: {
        badge: 'Skills & Architecture',
        profileTitle: 'Technical<br>Overview',
        profileOverview: introBio,
        expTitle: 'Work Experience',
        experiences: experiences.length ? experiences : projects.slice(0, 3),
        skills: experiences.length ? experiences : projects.slice(0, 3),
        referenceCard: {
          title: 'Capability Radar',
          header: '工程能力六维评级',
          role: 'Production Capability',
          items: summaryBullets.length ? summaryBullets.slice(0, 6) : [
            'Vue 3 响应式与内核: 96%',
            '亿级高并发与性能: 94%',
            '大型前端工程规范: 92%',
            'Node.js 服务端架构: 88%'
          ]
        },
        education: {
          title: 'Education',
          items: educationList.length ? educationList : [
            { degree: '计算机科学与技术·学士', school: '本科', year: '2015.09 - 2019.07' }
          ]
        }
      },
      page3: {
        badge: 'Production Projects',
        profileTitle: 'Engineering<br>Track Record',
        profileOverview: '主导并参与了多条核心主干业务线的架构升级与性能治理，具备超大型复杂业务场景下的技术破局与高标准交付能力。',
        expTitle: 'Production Projects',
        experiences: projects.length ? projects : experiences,
        referenceCard: {
          title: 'Reference',
          name: '微博技术委员会',
          role: '技术总监 / 研发部负责人',
          phone: basics.phone ? `P | (+86) ${basics.phone}` : 'P | (+86) 183-4910-8862',
          email: basics.email ? `E | ${basics.email}` : 'E | marsorsun@gmail.com'
        },
        infrastructureBlock: {
          title: 'Infrastructure & Tools',
          items: [
            { degree: '工程化与微前端基建', school: 'Vite + Monorepo + CI 自动化', year: 'Core Tools' },
            { degree: '多端同构与动态组件', school: '小程序 / PC 端跨端方案', year: 'Architecture' }
          ]
        },
        manifesto: {
          title: 'Engineering Manifesto',
          quote: '『追求每一行代码的可验证性与工业级健壮性。没有证据就不说完成。』'
        }
      },
      page4: {
        badge: 'Cover Letter',
        yearBadge: 'Year 2028',
        dateTitle: 'Cover Letter.',
        date: '2028 年 3 月',
        recipient: {
          label: 'TO',
          name: '招聘团队 / 技术评委会',
          role: '前端技术部 / 架构委员会',
          address: 'A | 目标公司创新研发中心,<br>前端技术架构组'
        },
        letterTitle: `应聘岗位：${roleMain}`,
        letterBody: [
          `尊敬的招聘负责人及技术评委团队：<br><br>您好！非常荣幸能借由此信向贵团队自荐应聘“${roleMain}”岗位。具备多年一线大型互联网生产工程沉淀，主导并参与了数亿级访问量大型门户主站、创作者中心、以及高并发消息中心等多条核心业务线的架构升级与性能治理，拥有成熟的高并发脉冲流量护航经验与全链路技术破局实力。`,
          '我始终坚持『追求每一行代码的可验证性与工业级健壮性，没有证据就不说完成』的工程信条。非常期待能有机会与您展开深入交流！'
        ],
        sincerely: 'Sincerely',
        signatureText: 'Zhaoyang Liu',
        signerName: `${nameMain.toUpperCase()} (${basics.email?.split('@')[0]?.toUpperCase() || 'UNBRAIN'})`
      }
    }
  }

  throw new Error('未识别的简历数据结构，请检查 JSON 格式')
}
