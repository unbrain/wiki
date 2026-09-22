import type { CVDatabase, CVData } from '../types/cv'
import rawCvJson from '../../cv.json'

export const PRESETS: CVDatabase = {
  // 1. 用户真实完整档案：刘朝阳 · 前端开发工程师（100% 原始数据保真，直接绑定 cv.json）
  unbrain_full: rawCvJson as unknown as CVData,

  // 2. 原版设计稿数据集：Jane Wilkins (原版 3 页英文标准版)
  original: {
    id: 'original',
    label: ' Jane Wilkins (原版设计稿 · 3 页英文标准版)',
    pageCount: 3,
    meta: {
      year: 'Year 2028',
      website: 'www.example.com',
      addressTitle: 'ADDRESS :',
      addressLines: '(311) 555-2368<br>123 Street Name City Name,<br>State Country 12345.<br>www.example.com',
      coverLetterContacts: 'P | (311) 555-2368<br>L | 123 Street Name City Name<br>E | www.user@mail.com'
    },
    person: {
      nameFirst: 'JANE',
      nameLast: 'WILKINS',
      nameCn: 'JANE WILKINS',
      role: 'Promotion Manager',
      roleCn: 'Promotion Manager',
      photo: 'assets/hero-model-cycling-clean.jpg',
      photoFit: 'cover',
      photoPosition: 'center center',
      photoScale: 1.0,
      greeting: "Hello I'm<br>Jane Wilkins",
      aboutStamp: 'About Me.',
      introBio: 'Caboribusquidusam, cum sitisciaest repro et que pra vent harioribus ant laborep ratGentia perchitas magnatia nonesti imenihil il mod quatquis eos simoluptam comnimusae nossi rectibus'
    },
    page2: {
      badge: 'Resume',
      showHeader: true,
      profileTitle: 'Profile<br>Overview',
      profileOverview: 'Cabor rempelese labori nimpor aliqui culparis iurest quat et facepel estia nobitibus iliquo tempernaturi cus quiam qui id quis aceperum iducit quatem eum doluptas con net est eatas explit moluptam, vent modi reped quam venimpor sinctiae ipist fugiatiatur',
      expTitle: 'Work Experience',
      experiences: [
        {
          title: 'Senior Graphic Designer / 2028 Present',
          company: 'Company Name Here',
          summary: 'Harchici picaborem inienditat quo quas nimendit quidignam in ea sit quter cuptam et plis consecto beraesti corem',
          bullets: [
            'Ratur aut excestorem in re consect urenihil idit',
            'optur si id quis eatis verrum eosant que volorer epedignatur audit optat',
            'ipsa dolore strum quamus et a venis aperum etur sin rerias'
          ]
        },
        {
          title: 'Web Developer / 2025 - 2027',
          company: 'Company Name Here',
          summary: 'Harchici picaborem inienditat quo quas nimendit quidignam in ea sit quter cuptam et plis consecto beraesti corem',
          bullets: [
            'Ratur aut excestorem in re consect urenihil idit',
            'optur si id quis eatis verrum eosant que volorer epedignatur audit optat',
            'ipsa dolore strum quamus et a venis aperum etur sin rerias'
          ]
        },
        {
          title: 'Senior UI / UX Designer / 2023 - 2025',
          company: 'Company Name Here',
          summary: 'Harchici picaborem inienditat quo quas nimendit quidignam in ea sit quter cuptam et plis consecto beraesti corem',
          bullets: [
            'Ratur aut excestorem in re consect urenihil idit',
            'optur si id quis eatis verrum eosant que volorer epedignatur audit optat',
            'ipsa dolore strum quamus et a venis aperum etur sin rerias'
          ]
        }
      ],
      referenceCard: {
        title: 'Reference',
        name: 'Wilkins Elizabeth',
        role: 'Position / Company Name',
        phone: '(311) 555-2368',
        email: 'www.user@mail.com'
      },
      education: {
        title: 'Education',
        items: [
          {
            degree: 'Bachelor Of Science',
            school: 'Name Of University / Location',
            year: '2024 - 2028'
          },
          {
            degree: 'Masters Of Degree',
            school: 'Name Of University / Location',
            year: '2029 - 2032'
          }
        ]
      }
    },
    page3: {
      badge: 'Cover Letter',
      yearBadge: 'Year 2028',
      dateTitle: 'Cover Letter.',
      date: '12 March 2028',
      recipient: {
        label: 'TO',
        name: 'Linda Brown',
        role: 'Office Manager',
        address: 'A | 123 Street Name City Name,<br>Country 121345.'
      },
      letterTitle: 'Office Manager',
      letterBody: [
        'Cabor rempelese labori nimpor aliqui culparis iurest quat et facepel estia nobitibus iliquo tempernaturi cus quiam qui id quis aceperum iducit quatem eum doluptas con net est eatas explit moluptam, vent modi reped quam venimpor sinctiae ipist fugiatiatur',
        'Usiter con es simaiorrovid qui voluptdel earcit reperum cone nonetui squo beate dipsa ducim volupta coriand ellaccus quae conet anduscimus escient. Harum non net quas ut que ped que dolorerum fuga. Et et endem essit asped maximolum as si sit hitatium viduntiorem net, nam volorum facearciis explaborem. Tis et re venis cus doluptat et volupta temporepudi dus sim autem. Ximus volor alit di consequia dundam dolorem hictis dolum imincipsam sequate nimenihil eaqui omnis et, ut maioreici dus eosam volest apidebi taturis atur, alia ipit, que prae eiumquo tem. Accum, ut quo is mi, essi officipsam derovit rempore si untiati dolorenia vid que quature henihicer illecep eribusda ipit pro volor soluptur.'
      ],
      sincerely: 'Sincerely',
      signatureText: 'Signature',
      signerName: 'JANE WILKINS'
    }
  }
}
