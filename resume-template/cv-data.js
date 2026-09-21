/**
 * RESUME DATA SCHEMA & PRESETS (DATA-DRIVEN ENGINE)
 * 基于现有工程履历深度丰富，支持多页自由拓展（3页紧凑版 / 4页深度全景版 / 原版设计稿）
 */

window.CV_DATABASE = {
  // 1. 用户当前项目完整 4 页技术全景与深度履历版（刘朝阳 · 新浪微博资深前端架构）
  unbrain_full: {
    id: "unbrain_full",
    label: "✨ 刘朝阳 · 完整 4 页深度技术档案版 (含全景技能与大厂标杆工程)",
    pageCount: 4,
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
      photoPosition: "center 18%",
      photoScale: 1.15,
      greeting: "Hello I'm<br>Liu Zhaoyang",
      aboutStamp: "About Me.",
      introBio: "2019 年毕业至今长期任职于新浪微博核心 Web 前端团队，7 年一线大型生产工程沉淀。主导并参与了微博 PC 旗舰主站、PC 创作者中心、高并发私信消息箱（WebChat）等多条核心主干业务线的架构升级与性能治理，稳定护航数亿级用户的高并发与突发热点脉冲流量。"
    },
    
    // Page 2: 核心技术全景矩阵与工程深度 (Skills & Architecture)
    page2: {
      badge: "Skills & Architecture",
      profileTitle: "Technical<br>Overview",
      profileOverview: "深耕 Vue 3 核心运作机制与响应式内核（独立手写实现 Reactive、Effect、Readonly、Diff 算法与模板编译器全流程）；精通 TypeScript 高级类型体操与企业级大型项目模块规范；具备亿级访问量高并发系统架构与生产级性能调优实战经验，结合 Node.js (Egg.js) 胶水层与 Redis 缓存限流，追求每一行代码的可验证性与工业级健壮性。",
      expTitle: "Core Technical Pillars",
      skills: [
        {
          title: "Vue 3 响应式内核与底层机制",
          summary: "深入剖析 Vue 3 源码实现原理，手写实现完备的 Reactive、Effect 依赖收集与调度机制、双端对比 Diff 算法与 AST 模板编译流程，具备深厚的前端框架底层攻坚能力。"
        },
        {
          title: "亿级高并发渲染与性能治理",
          summary: "专精千万级会话长列表双向虚拟滚动引擎研发（极致压缩 85% DOM 节点与内存白屏），结合 HTTP 强缓存/协商缓存体系、资源分包懒加载与 Retina 多倍屏 1px 像素自适应规范。"
        },
        {
          title: "企业级服务端架构与高频网络通信",
          summary: "熟练运用 Node.js (Egg.js) 胶水层构建高可用中间层；精通 Redis (ioredis) 高频分布式会话鉴权与限流降级；精通 WebSocket 双向长链接与高频消息防抖解耦。"
        },
        {
          title: "DSA 数据结构与算法沉淀",
          summary: "系统化沉淀 130+ LeetCode DSA 高频真题推导，涵盖图论、动态规划、双指针、二叉树与贪心策略，建立系统的算法解题体系；持续探索 WebGL Shader 材质与 Canvas 图形动力学。"
        }
      ],
      referenceCard: {
        title: "Capability Radar",
        header: "工程能力六维评级",
        role: "Production Capability",
        items: [
          "Vue 3 响应式与内核: 96%",
          "亿级高并发与性能: 94%",
          "大型前端工程规范: 92%",
          "DSA 算法推导体系: 90%",
          "Node.js 服务端架构: 88%",
          "WebGL / 图形学渲染: 86%"
        ]
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
            school: "130+ DSA 题解 / Vue3 源码剖析",
            year: "2019 - 2026"
          }
        ]
      }
    },

    // Page 3: 标杆级生产项目与架构复盘 (Projects & Experience)
    page3: {
      badge: "Work Experience",
      profileTitle: "Engineering<br>Track Record",
      profileOverview: "7+ 年专注新浪微博核心 Web 团队主力开发，作为骨干主导并深度攻坚了微博 PC 旗舰主站、PC 创作者运营中台、高并发 WebChat 消息箱等多项核心系统的架构演进与全链路工程治理，具备复杂业务场景下的技术破局与交付能力。",
      expTitle: "Production Projects",
      experiences: [
        {
          title: "Senior Frontend Engineer / 2021 - Present",
          company: "新浪微博 · PC 微博旗舰主站（旗舰门户架构）",
          summary: "数亿级访问量的新浪微博核心旗舰门户系统，负责核心发布流重构与热点脉冲高频渲染治理。",
          bullets: [
            "独立负责微博主站核心富媒体发布器的重构与演进，稳定支撑图文、超长博文、表情包体系与高可用草稿箱机制",
            "构建大文件切片直传管线，实现断点续传、分片校验与异步并发控制，文件上传成功率提升至 99.8%",
            "攻克海量动态 Feed 流与消息抽屉高频虚拟渲染，保障全网突发热点脉冲峰值期间界面平滑零卡顿"
          ]
        },
        {
          title: "Core Frontend Developer / 2020 - 2021",
          company: "新浪微博 · PC 微博创作者中心（全链路内容资产中台）",
          summary: "面向全网创作者的一站式数据分析、商业化运营矩阵与内容变现平台。",
          bullets: [
            "主导抽奖运营中心、视频资产托管中心、定时发博调度流与商业变现收益看板全链路业务落地",
            "构建高吞吐量数据指标监控大盘，支持多维度时序数据动态聚合分析与即时可视化图表渲染",
            "推进微前端体系与通用组件物料规范化，大幅降低团队跨模块协作与长期维护摩擦"
          ]
        },
        {
          title: "Frontend Architect / 2019 - 2020",
          company: "新浪微博 · WebChat 高并发即时通讯消息中心",
          summary: "微博全网用户私信即时通讯、群聊与多维通知聚合中心。",
          bullets: [
            "全面架构重构：推行模块化拆分与状态机解耦，彻底根治旧版长会话内存泄漏与卡顿严重痛点",
            "研发高性能双向虚拟滚动组件，极致压缩 DOM 树占用，万级历史记录首屏渲染耗时降低 60%",
            "抽离核心通信协议层与消息状态中心，实现 PC 端与移动端轻量同构复用"
          ]
        }
      ],
      referenceCard: {
        title: "Reference",
        name: "新浪微博技术委员会",
        role: "技术总监 / 研发部负责人",
        phone: "P | (+86) 183-4910-8862",
        email: "E | marsorsun@gmail.com"
      },
      materialBlock: {
        title: "Cross-Platform Material",
        items: [
          {
            degree: "瀑布流自适应物料库",
            school: "支持动态高度预估与列平衡算法",
            year: "Vite + Tailwind CSS"
          },
          {
            degree: "历史技术手记归档",
            school: "收录 78 篇早期原创博客与真题",
            year: "朝花夕拾知识专区"
          }
        ]
      }
    },

    // Page 4: 求职自荐信与签名 (Cover Letter)
    page4: {
      badge: "Cover Letter",
      yearBadge: "Year 2028",
      dateTitle: "Cover Letter.",
      date: "2028 年 3 月",
      recipient: {
        label: "TO",
        name: "招聘团队 / 技术评委会",
        role: "前端技术部 / 架构委员会",
        address: "A | 目标公司创新研发中心,<br>前端技术架构组"
      },
      letterTitle: "应聘岗位：资深前端开发工程师 / 前端架构师",
      letterBody: [
        "尊敬的招聘负责人及技术评委团队：<br><br>您好！非常荣幸能借由此信向贵团队自荐应聘“资深前端开发工程师 / 前端架构师”岗位。自 2019 年毕业至今，我始终全职深耕于新浪微博核心 Web 前端团队。7 年一线实战沉淀中，我主导并深度参与了微博 PC 旗舰主站、创作者运营中台、以及高并发 WebChat 消息箱等多条核心主干线的重构治理与性能攻坚，拥有成熟的数亿级高并发脉冲流量护航经验。",
        "我始终坚持『追求每一行代码的可验证性与工业级健壮性，没有证据就不说完成』的工程信条。在业务主战场之外，我深入剖析并独立手写了 Vue 3 核心响应式与模板编译内核，系统化推导了 130+ 道核心算法真题。贵团队对技术卓越、严谨工程规范与极致用户体验的追求令我倍感共鸣。我相信自身深厚的大厂亿级系统架构积累、敏锐的工程直觉与全链路极客探索精神，能够为团队的关键技术攻坚与业务突破创造切实的价值。非常期待能有机会与您展开深入交流！"
      ],
      sincerely: "Sincerely",
      signatureText: "Zhaoyang Liu",
      signerName: "ZHAOYANG LIU (UNBRAIN)"
    }
  },

  // 2. 原版设计稿数据集：Jane Wilkins (原版 3 页英文模板)
  original: {
    id: "original",
    label: "🎨 Jane Wilkins (原版设计稿 · 3 页英文标准版)",
    pageCount: 3,
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
      referenceCard: {
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
