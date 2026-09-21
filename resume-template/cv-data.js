/**
 * RESUME DATA SCHEMA & PRESETS
 * 结构化简历数据源，支持多套数据切换与外部 JSON 导入导出拓展
 */

window.CV_DATABASE = {
  // 1. 用户当前项目真实数据：刘朝阳 (unbrain) · 7年新浪微博核心团队资深前端工程师
  unbrain: {
    id: "unbrain",
    label: "刘朝阳 (新浪微博 · 资深前端架构)",
    meta: {
      year: "Year 2028",
      website: "github.com/unbrain",
      addressTitle: "ADDRESS :",
      addressLines: "(+86) 183-4910-8862<br>marsorsun@gmail.com<br>北京市海淀区中关村软件园<br>rxresu.me/unbrain/cv",
      coverLetterContacts: "P | (+86) 183-4910-8862<br>L | 北京市海淀区新浪总部大厦<br>E | marsorsun@gmail.com"
    },
    person: {
      nameFirst: "LIU",
      nameLast: "ZHAOYANG",
      nameCn: "刘朝阳 (unbrain)",
      role: "Senior Frontend Engineer / Web Architect",
      roleCn: "资深前端开发工程师 · 前端架构师",
      photo: "assets/avatar.jpg",
      photoFit: "cover",
      photoPosition: "center 20%",
      photoScale: 1.15,
      greeting: "Hello I'm<br>Liu Zhaoyang",
      aboutStamp: "About Me.",
      introBio: "2019 年毕业至今长期任职于新浪微博核心前端团队，7 年一线工程沉淀。主导并参与了微博 PC 旗舰主站、PC 创作者中心、高并发私信消息箱（WebChat）等多条核心业务线的架构升级与工程治理，稳定护航数亿级用户的高并发与脉冲流量。"
    },
    page2: {
      badge: "Resume",
      profileTitle: "Profile<br>Overview",
      profileOverview: "深耕 Vue 3 核心运作机制与响应式内核（独立手写实现 Reactive、Effect、Diff 与编译全流程）、TypeScript 企业级大型模块规范与现代前端工程化。具备亿级访问量高并发系统架构与生产级性能调优实战经验，结合 Node.js 胶水层与 Redis 缓存限流，追求每一行代码的可验证性与工业级健壮性。",
      expTitle: "Work Experience",
      experiences: [
        {
          title: "Senior Frontend Engineer / 2021 - Present",
          company: "新浪微博 · PC 微博旗舰主站",
          summary: "数亿级访问量的新浪微博核心旗舰门户系统，负责核心发布流重构与热点脉冲高频渲染治理。",
          bullets: [
            "独立负责微博主站核心富媒体发布器重构，支撑图文、超长博文、表情体系与高可用草稿箱机制",
            "构建音视频切片直传管线，实现大文件断点续传、分片校验与异步并发控制，上传成功率提升至 99.8%",
            "攻克海量实时消息抽屉与动态 Feed 高频虚拟滚动渲染，保障全网突发热点脉冲峰值期间平滑零卡顿"
          ]
        },
        {
          title: "Core Frontend Developer / 2020 - 2021",
          company: "新浪微博 · PC 微博创作者中心",
          summary: "面向全网创作者的一站式数据分析、商业化运营矩阵与内容变现中台。",
          bullets: [
            "主导抽奖运营中心、视频媒体资产托管中心、定时发博调度流与商业变现收益看板全链路落地",
            "构建高吞吐量数据指标监控大盘，支持多维度时序数据动态聚合分析与即时图表渲染",
            "抽离推进微前端集成方案与通用基础组件物料规范，降低跨团队多模块协同摩擦"
          ]
        },
        {
          title: "Frontend Architect / 2019 - 2020",
          company: "新浪微博 · WebChat 高并发即时通讯消息中心",
          summary: "微博全网用户私信即时通讯与多维通知聚合中心。",
          bullets: [
            "全面架构重构：推行模块化拆分与状态机解耦，彻底根治旧版长会话内存泄漏与卡顿痛点",
            "研发高性能双向虚拟滚动组件，极致压缩 DOM 树占用，万级历史记录首屏渲染耗时降低 60%",
            "抽离核心通信协议层与消息状态中心，实现 PC 与移动端轻量同构复用"
          ]
        }
      ],
      reference: {
        title: "Reference",
        name: "新浪微博技术委员会",
        role: "技术总监 / 研发部负责人",
        phone: "P | (+86) 183-4910-8862",
        email: "E | marsorsun@gmail.com"
      },
      education: {
        title: "Education",
        items: [
          {
            degree: "Bachelor Of Science",
            school: "计算机科学与技术 / 本科",
            year: "2015 - 2019"
          },
          {
            degree: "DSA & Core Architecture",
            school: "130+ LeetCode DSA / Vue3 内核探究",
            year: "2019 - 2026"
          }
        ]
      }
    },
    page3: {
      badge: "Cover Letter",
      yearBadge: "Year 2028",
      dateTitle: "Cover Letter.",
      date: "2028 年 3 月",
      recipient: {
        label: "TO",
        name: "招聘团队 / 技术评委会",
        role: "前端技术部 / 架构委员会",
        address: "A | 目标公司创新研发中心,<br>前端架构团队"
      },
      letterTitle: "应聘岗位：资深前端开发工程师 / 前端架构师",
      letterBody: [
        "尊敬的招聘负责人及技术团队：<br><br>您好！非常高兴能借由此封求职信向贵团队自荐“资深前端开发工程师 / 前端架构师”职位。自 2019 年毕业至今，我始终深耕于新浪微博核心 Web 前端团队。7 年一线实战沉淀中，我主导并深度参与了微博 PC 旗舰主站、创作者运营中台、以及高并发 WebChat 消息箱等多条核心主干线的重构治理，拥有成熟的亿级高并发脉冲流量护航与复杂交互系统攻坚经验。",
        "我始终坚持『追求每一行代码的可验证性与工业级健壮性，没有证据就不说完成』的工程信条。在业务主战场之外，我深入剖析并独立手写了 Vue 3 核心响应式与模板编译内核，并系统化推导了 130+ 道数据结构与算法真题。贵团队对技术卓越与工程规范的追求令我深感契合，期待能以我扎实的大厂系统架构积累、敏锐的工程直觉与全链路技术探索精神，为贵团队的业务发展与基础设施建设贡献力量。非常期待能与您展开深入交流！"
      ],
      sincerely: "Sincerely",
      signatureText: "Zhaoyang Liu",
      signerName: "ZHAOYANG LIU (UNBRAIN)"
    }
  },

  // 2. 原图设计稿数据集：Jane Wilkins (原版英文模板)
  original: {
    id: "original",
    label: "Jane Wilkins (原版设计稿 · 英文)",
    meta: {
      year: "Year 2028",
      website: "www.example.com",
      addressTitle: "ADDRESS :",
      addressLines: "(311) 555-2368<br>123 Street Name City Name,<br>State Country 12345.<br>www.example.com",
      coverLetterContacts: "P | (311) 555-2368<br>L | 123 Street Name City Name<br>E | www.user@mail.com"
    },
    person: {
      nameFirst: "JANE",
      nameLast: "WILKINS",
      nameCn: "JANE WILKINS",
      role: "Promotion Manager",
      roleCn: "Promotion Manager",
      photo: "assets/hero-model-cycling.jpg",
      photoFit: "cover",
      photoPosition: "47% 10%",
      photoScale: 1.9,
      greeting: "Hello I'm<br>Jane Wilkins",
      aboutStamp: "About Me.",
      introBio: "Caboribusquidusam, cum sitisciaest repro et que pra vent harioribus ant laborep ratGentia perchitas magnatia nonesti imenihil il mod quatquis eos simoluptam comnimusae nossi rectibus"
    },
    page2: {
      badge: "Resume",
      profileTitle: "Profile<br>Overview",
      profileOverview: "Cabor rempelese labori nimpor aliqui culparis iurest quat et facepel estia nobitibus iliquo tempernaturi cus quiam qui id quis aceperum iducit quatem eum doluptas con net est eatas explit moluptam, vent modi reped quam venimpor sinctiae ipist fugiatiatur",
      expTitle: "Work Experience",
      experiences: [
        {
          title: "Senior Graphic Designer / 2028 Present",
          company: "Company Name Here",
          summary: "Harchici picaborem inienditat quo quas nimendit quidignam in ea sit quter cuptam et plis consecto beraesti corem",
          bullets: [
            "Ratur aut excestorem in re consect urenihil idit",
            "optur si id quis eatis verrum eosant que volorer epedignatur audit optat",
            "ipsa dolore strum quamus et a venis aperum etur sin rerias"
          ]
        },
        {
          title: "Web Developer / 2025 - 2027",
          company: "Company Name Here",
          summary: "Harchici picaborem inienditat quo quas nimendit quidignam in ea sit quter cuptam et plis consecto beraesti corem",
          bullets: [
            "Ratur aut excestorem in re consect urenihil idit",
            "optur si id quis eatis verrum eosant que volorer epedignatur audit optat",
            "ipsa dolore strum quamus et a venis aperum etur sin rerias"
          ]
        },
        {
          title: "Senior UI / UX Designer / 2023 - 2025",
          company: "Company Name Here",
          summary: "Harchici picaborem inienditat quo quas nimendit quidignam in ea sit quter cuptam et plis consecto beraesti corem",
          bullets: [
            "Ratur aut excestorem in re consect urenihil idit",
            "optur si id quis eatis verrum eosant que volorer epedignatur audit optat",
            "ipsa dolore strum quamus et a venis aperum etur sin rerias"
          ]
        }
      ],
      reference: {
        title: "Reference",
        name: "Wilkins Elizabeth",
        role: "Position / Company Name",
        phone: "P | (311) 555-2368",
        email: "E | www.user@mail.com"
      },
      education: {
        title: "Education",
        items: [
          {
            degree: "Bachelor Of Science",
            school: "Name Of University / Location",
            year: "2024 - 2028"
          },
          {
            degree: "Masters Of Degree",
            school: "Name Of University / Location",
            year: "2029 - 2032"
          }
        ]
      }
    },
    page3: {
      badge: "Cover Letter",
      yearBadge: "Year 2028",
      dateTitle: "Cover Letter.",
      date: "12 March 2028",
      recipient: {
        label: "TO",
        name: "Linda Brown",
        role: "Office Manager",
        address: "A | 123 Street Name City Name,<br>Country 121345."
      },
      letterTitle: "Office Manager",
      letterBody: [
        "Cabor rempelese labori nimpor aliqui culparis iurest quat et facepel estia nobitibus iliquo tempernaturi cus quiam qui id quis aceperum iducit quatem eum doluptas con net est eatas explit moluptam, vent modi reped quam venimpor sinctiae ipist fugiatiatur",
        "Usiter con es simaiorrovid qui volupidel earcit reperum cone nonetui squo beate dipsa ducim volupta coriand ellaccus quae conet anduscimus escient. Harum non net quas ut que ped que dolorerum fuga. Et et endem essit asped maximolum as si sit hitatium vidiuntiorem net, nam volorum facearciis explaborem. Tis et re venis cus doluptat et volupta temporepudi dus sim autem. Ximus volor alit di consequia dundam dolorem hictis dolum imincipsam sequate nimenihil eaqui omnis et, ut maioreici dus eosam volest apidebi taturis atur, alia ipit, que prae eiumquo tem. Accum, ut quo is mi, essi officipsam derovit rempore si untiati dolorenia vid que quature henihicer illecep eribusda ipit pro volor soluptur."
      ],
      sincerely: "Sincerely",
      signatureText: "Signature",
      signerName: "JANE WILKINS"
    }
  }
};
