import type { Messages } from './schema'

/**
 * 繁體中文文案（香港／澳門書面語）。
 * 以 src/i18n/zh.ts 的簡體文案為底本，先用 OpenCC（s2hk）轉換成初稿，再由人手逐句審校：
 * 修正一對多字、改用港澳詞彙與標點，使行文自然；鍵名與結構與 zh.ts 完全一致。
 * 用詞與字形標準見 src/i18n/GLOSSARY_zh-Hant.md，改動記錄見 research/zh-hant/EDITOR_LOG.md。
 * 標題中的「|」標記唯一允許斷行的位置（見 src/components/Headline.tsx），渲染時不會顯示。
 * 中英文之間、中文與數字之間保留空格；使用全形標點，引號用「」『』。
 */
export const zhHant: Messages = {
  meta: {
    home: {
      title: '卡爾加里大學中國研究生協會 · UCalgary CGSA',
      description: '卡爾加里大學中國研究生協會（CGSA）官方網站：活動、會員福利、學生資源與社區。',
    },
    events: {
      title: '活動 · UCalgary CGSA',
      description: 'CGSA 近期與往期活動，含日期、地點與 Eventbrite 報名連結。',
    },
    benefits: {
      title: '會員福利 · UCalgary CGSA',
      description: '由 CGSA 與卡大中國校友圈（CAN）聯合推出的卡爾加里大學學生校友年度折扣一卡通。',
    },
    resources: {
      title: '學生資源 · UCalgary CGSA',
      description: '新生與在校同學常用的官方資源索引：卡爾加里大學、學生會、卡爾加里市與加拿大政府。',
    },
    about: {
      title: '關於我們 · UCalgary CGSA',
      description: '卡爾加里大學中國研究生協會，服務在校的中國學生與學者。',
    },
    team: {
      title: '團隊 · UCalgary CGSA',
      description: 'UCalgary CGSA 執行團隊。',
    },
    join: {
      title: '加入我們 · UCalgary CGSA',
      description: '參與 CGSA 的方式：參加活動、成為義工、加入執行團隊或開展合作。',
    },
    contact: {
      title: '聯絡我們 · UCalgary CGSA',
      description: '微信號 UCalgaryCGSA，電郵 ucalgarycgsa@gmail.com。',
    },
    notFound: {
      title: '頁面不存在 · UCalgary CGSA',
      description: '找不到這個頁面。',
    },
  },

  common: {
    skipToContent: '跳至主要內容',
    opensInNewTab: '（在新分頁開啟）',
    comingSoon: '敬請期待',
    sample: '示例',
    copy: '複製',
    copied: '已複製',
    copyFailed: '複製失敗，請手動選取後複製',
    source: '來源',
    backHome: '返回首頁',
    readMore: '了解更多',
    photoPlaceholder: '照片佔位：請替換為已獲授權的圖片',
  },

  nav: {
    home: '主頁',
    events: '活動',
    benefits: '會員福利',
    resources: '學生資源',
    about: '關於我們',
    team: '團隊',
    join: '加入我們',
    contact: '聯絡我們',
    primaryLabel: '主要導覽',
    footerLabel: '頁尾導覽',
    menu: '選單',
    openMenu: '開啟選單',
    closeMenu: '關閉選單',
    close: '關閉',
    languageLabel: '語言',
    homeLink: 'UCalgary CGSA 首頁',
  },

  hero: {
    eyebrow: '卡爾加里大學中國研究生協會',
    words: ['連接', '成長', '歸屬'],
    stop: '。',
    altLine: 'Connect · Grow · Belong',
    intro: '服務卡爾加里大學的|中國學生與學者。|從學術、職業發展|到社區生活，|支持你在卡大的|每一段成長。',
    ctaPrimary: '查看近期活動',
    ctaSecondary: '加入我們',
    indexLabel: '從這裏開始',
    index: [
      { title: '最新活動', note: '近期安排與報名方式' },
      { title: '會員福利', note: '年度折扣一卡通' },
      { title: '學生資源', note: '官方資訊，一站查找' },
      { title: '加入我們', note: '微信、電郵與參與方式' },
    ],
  },

  home: {
    events: {
      label: '最新活動',
      title: '近期活動',
      all: '全部活動',
    },
    pillars: {
      label: '我們做什麼',
      title: '四個方向，|陪你在卡大成長',
      items: [
        {
          title: '學術',
          body: '支持你研究生階段學術成長的各類活動與資源。',
        },
        {
          title: '職業發展',
          body: '職業發展相關的活動，加上校內職業服務的直達連結，幫你邁出下一步。',
        },
        {
          title: '社區',
          body: '把卡大的中國學生與學者聯繫在一起——有事有人問，有空有人約。',
        },
        {
          title: '日常生活',
          body: '會員福利，以及在卡大與卡城生活所需的官方資源索引。',
        },
      ],
    },
    benefits: {
      label: '會員福利',
      title: '一卡通在手，|全年享優惠。',
      body: '卡爾加里大學學生校友年度折扣一卡通（UCalgary Student & Alumni Annual Discount Pass）由 CGSA 與卡大中國校友圈（CAN）聯合推出。持卡人全年享有合作商家折扣、活動專屬價格與優先參與資格。',
      cta: '查看會員福利',
      secondary: '了解使用方式',
      facts: [
        { k: '發起方', v: 'CGSA × CAN 聯合推出' },
        { k: '有效期', v: '1 月 1 日至 12 月 31 日' },
        { k: '適用', v: '卡大社區：學生、校友、學者、教職員與訪客' },
        { k: '形式', v: 'Eventbrite 電子門票' },
      ],
    },
    career: {
      label: '職業發展與社交',
      title: '讀書之餘，|也累積人脈。',
      body: '職業發展與社交活動都會發佈在活動頁。想要一對一的指導，可以直接使用卡大的職業服務與研究生專業發展項目。',
      eventsLink: '職業發展與社交活動',
      resourcesLink: '職業資源',
    },
    community: {
      label: '社區與文化',
      title: '離家很遠，|在這裏也能找到歸屬。',
      body: '社區生活，與學術、職業發展一樣，是 CGSA 想要支持的成長。我們希望卡大不只是一座校園，也是一個社區。',
      cta: '參與方式',
    },
    resources: {
      label: '學生資源',
      title: '需要什麼，|從這裏找。',
      body: '大學、學生會、卡爾加里市與加拿大政府官方頁面的精簡索引，按同學們最常查找的需求分類。',
      all: '查看完整索引',
    },
    about: {
      label: '關於 CGSA',
      quote: '卡爾加里大學|中國研究生協會|（簡稱 CGSA）|致力於更好地服務|在校的中國學生與學者。',
      body: '我們支持大家在學術、職業發展與社區生活等方面的成長，希望透過多元的活動與資源，幫助成員在卡爾加里大學度過一段充實、有支持、有歸屬感的求學時光。',
      cta: '進一步了解 CGSA',
    },
    partners: {
      label: '合作夥伴',
      title: '歡迎合作。',
      body: '學生組織、校內部門、校友與社區組織，以及服務學生的企業，都歡迎與我們聯絡。',
      cta: '與 CGSA 合作',
    },
    join: {
      label: '加入我們',
      title: '因一場活動相識，|因一群人留下。',
      body: '參與 CGSA，從打個招呼開始。加我們的微信，或者發一封電郵，我們幫你找到合適的參與方式。',
      cta: '參與方式',
    },
  },

  events: {
    label: '活動',
    title: '活動',
    intro: 'CGSA 活動會在這裏發佈，附日期、地點與報名連結。報名一般透過 Eventbrite 進行，本站不售票。',
    filterLabel: '按類別篩選',
    countLabel: '{n} 個即將舉行的活動',
    all: '全部',
    featured: '重點活動',
    upcoming: '即將舉行',
    past: '往期活動',
    emptyTitle: '新活動正在籌備中。',
    emptyBody: '活動確定後會第一時間發佈在這裏，並附 Eventbrite 報名連結。想更早知道？歡迎加 CGSA 微信。',
    emptyFiltered: '這個類別暫時沒有即將舉行的活動。',
    pastEmpty: '往期活動將歸檔在這裏。',
    homeEmpty: '近期暫無已發佈的活動，新活動會先在微信上公佈。',
    typesLabel: '活動類別',
    typesTitle: '活動如何分類',
    types: [
      { title: '職業發展與社交', body: '求職、技能、專業發展，以及結識同領域的人。' },
      { title: '學術', body: '與研究、學習和卡大學術生活相關。' },
      { title: '社區與聯誼', body: '認識更多同學與學者，在卡城安頓下來。' },
      { title: '文化', body: '慶祝與分享文化，也和更多同學交流。' },
    ],
    howLabel: '如何報名',
    how: [
      { title: '找到活動', body: '每項活動都會列出日期、時間、地點；開放報名後附上報名連結。' },
      { title: '透過連結報名', body: '一般在 Eventbrite 上報名，活動詳情與票價（如有）以該頁面為準。' },
      { title: '保存確認資訊', body: 'Eventbrite 會發送確認電郵，參加活動時請備好，以便需要時出示。' },
    ],
    showAllCategories: '查看全部類別',
    dateLabel: '日期',
    timeLabel: '時間',
    venueLabel: '地點',
    timeTBA: '時間待定',
    venueTBA: '地點待定',
    partnersLabel: '合作機構',
    categories: {
      CAREER: '職業發展',
      NETWORKING: '拓展人脈',
      CULTURE: '文化',
      SOCIAL: '聯誼',
      ACADEMIC: '學術',
      COMMUNITY: '社區',
    },
    status: {
      UPCOMING: '即將舉行',
      'REGISTRATION OPEN': '報名中',
      FULL: '名額已滿',
      COMPLETED: '已結束',
      'COMING SOON': '敬請期待',
    },
    cta: {
      register: '在 Eventbrite 報名',
      rsvp: '報名',
      noRegistration: '免費 · 無需報名',
      comingSoon: '報名即將開放',
      full: '名額已滿',
    },
  },

  benefits: {
    label: '會員福利',
    title: '一卡通在手，|全年享優惠。',
    intro: '卡爾加里大學學生校友年度折扣一卡通，由 CGSA 與卡大中國校友圈（UCalgary Chinese Alumni Network，簡稱 CAN）聯合推出。',
    whatLabel: '這是什麼',
    whatTitle: '合作商家折扣、|活動專屬價格、|優先參與資格，|整整一年。',
    whatBody:
      '一卡通有效期為每年 1 月 1 日至 12 月 31 日。合作商家與最新優惠以 CAN 福利頁面為準（持續更新），本站不另行列出。',
    whoLabel: '適用人士',
    whoTitle: '開放予整個卡大社區',
    who: [
      '卡大在校學生（本科生與研究生）',
      '卡大校友（不限畢業年份與院系）',
      '訪問學者與博士後研究員',
      '卡大教職員',
      '卡大社區成員與訪客',
    ],
    howLabel: '如何購買與使用',
    how: [
      {
        title: '開啟福利頁面',
        body: '前往 CAN 福利頁面，查看當年的一卡通、合作商家與購買連結。',
      },
      {
        title: '在 Eventbrite 購買',
        body: '一卡通透過 Eventbrite 購買，購買後會收到電子門票。',
      },
      {
        title: '出示電子門票',
        body: '在合作商家出示電子門票即可。建議加入手機錢包，截圖無效。',
      },
    ],
    cta: '查看會員福利',
    ctaNote: '將開啟 CAN 福利頁面（ucalgarycan.ca），一卡通與合作商家資訊以該頁面為準。',
    questions: '對一卡通有疑問？',
    questionsBody: '歡迎發電郵或透過微信聯絡 CGSA。',
  },

  resources: {
    label: '學生資源',
    title: '學生資源',
    intro: '這裏只收錄官方頁面，讓你直接找到資訊源頭。CGSA 不轉述學校政策，連結直達負責部門。',
    jump: '跳至',
    checked: '連結核對於 2026 年 11 月。',
    reportLink: '發現失效連結？請告訴我們。',
    groups: {
      new: { title: '新生指南', intro: '入學迎新、|簽證移民|與最初幾週。' },
      academic: { title: '學術', intro: '研究生院、|圖書館|與學業支援。' },
      career: { title: '職業發展', intro: '專業發展|與職業服務。' },
      life: { title: '卡城生活', intro: '交通、住宿，|在卡城安頓下來。' },
      community: { title: '社區', intro: '校內學生會|與學生團體。' },
      contacts: { title: '重要聯絡方式', intro: '安全、身心健康|與緊急情況。' },
    },
    emergencyTitle: '遇到緊急情況，請撥打 911。',
    emergencyBody: 'CGSA 是學生協會，不提供緊急救助或心理輔導服務。以下號碼摘自對應的官方頁面，如有出入，以官方頁面為準。',
    phones: {
      security: '校園保安 Campus Security（含 Safewalk 護送服務）',
      wellness: '學生健康服務 Student Wellness Services',
      distress: '危機支援中心 Distress Centre（24 小時，由學生健康服務頁面列出）',
    },
  },

  about: {
    label: '關於我們',
    title: '在卡大，|中國學生與學者|有個落腳處。',
    lead: '卡爾加里大學|中國研究生協會|（簡稱 CGSA）|致力於更好地服務|在校的中國學生與學者。',
    body: '我們支持大家在學術、職業發展與社區生活等方面的成長，希望透過多元的活動與資源，幫助成員在卡爾加里大學度過一段充實、有支持、有歸屬感的求學時光。',
    whatLabel: '我們做什麼',
    whoLabel: '我們是誰',
    whoBody: 'CGSA 是由學生自主營運的協會，已列入卡爾加里大學研究生會（GSA）的研究生團體名錄。',
    whoNote: 'CGSA 並非卡爾加里大學或研究生會（GSA）的官方機構，本網站內容亦未經其背書。',
    gsaLink: 'GSA 研究生團體名錄',
    wechatLink: '在微信上了解 CGSA',
    workLabel: '攜手合作',
    workBody: 'CGSA 與卡大中國校友圈（CAN）聯合推出了卡爾加里大學學生校友年度折扣一卡通，這是 CGSA 為成員帶來資源的方式之一。',
    workCta: '了解一卡通',
    teamLabel: '團隊',
    teamBody: 'CGSA 由學生組成的執行團隊負責營運。',
    teamCta: '認識我們的團隊',
  },

  team: {
    label: '團隊',
    title: '撐起 CGSA 的一群人。',
    intro: 'CGSA 由學生組成的執行團隊營運：策劃活動、建立合作關係，也一起經營這個社區。',
    emptyPageTitle: '和我們一起，|帶領 CGSA。',
    emptyPageIntro: 'CGSA 由學生組成的執行團隊營運，團隊介紹將在這裏發佈。如果你想參與策劃活動、建立合作關係，或一起經營這個社區，歡迎聯絡我們。',
    emptyTitle: '團隊介紹即將上線。',
    emptyBody: '執行團隊成員的職位與照片將在這裏介紹。',
    joinTitle: '想一起帶領 CGSA？',
    joinBody: '歡迎聯絡我們，了解如何加入執行團隊。',
    joinCta: '參與方式',
    linkedin: 'LinkedIn',
    email: '電郵',
  },

  join: {
    label: '加入我們',
    title: '從打個招呼|開始。',
    intro: '參與 CGSA 的方式不止一種：來參加活動、出一分力，或者一起帶領協會。不知道從哪裏開始？直接給我們發訊息就好。',
    contactLabel: '聯絡我們',
    wechatLabel: '微信',
    wechatHow: '在微信中搜尋此微信號，即可加我們。',
    copyWechat: '複製微信號',
    emailLabel: '電郵',
    emailHow: '查詢、合作，或者一兩句話說不完的事。',
    emailCta: '發電郵給 CGSA',
    copyEmail: '複製電郵地址',
    waysLabel: '參與方式',
    ways: [
      {
        title: '參加活動',
        body: '參加活動是認識 CGSA 的好方式。看看近期安排，透過各活動的報名連結報名。',
        cta: '查看活動',
      },
      {
        title: '成為義工',
        body: '協助活動與宣傳，或者貢獻一技之長——設計、攝影、寫作、組織統籌。告訴我們你想做什麼。',
        cta: '給我們發訊息',
      },
      {
        title: '加入執行團隊',
        body: '想參與帶領 CGSA？聯絡我們，了解如何加入執行團隊。',
        cta: '查詢職位',
      },
      {
        title: '開展合作',
        body: '學生組織、校內部門、校友網絡與各類機構：歡迎提出聯合活動或合作項目。',
        cta: '與 CGSA 合作',
      },
    ],
    mailSubjectVolunteer: 'CGSA 義工查詢',
    mailSubjectExec: 'CGSA 執行團隊職位查詢',
  },

  contact: {
    label: '聯絡我們',
    title: '聯絡 CGSA',
    intro: '透過微信或電郵聯絡我們。',
    partnerLabel: '與 CGSA 合作',
    partnerTitle: '與 CGSA 合作。',
    partnerBody: '無論是合辦活動、支持某個項目，還是為同學們提供服務，都歡迎來信。請簡單介紹你的機構和想法。',
    partnerCta: '發送合作意向',
    partnerSubject: '合作查詢 — CGSA',
    urgentTitle: '需要緊急幫助？',
    urgentBody: 'CGSA 不提供緊急救助。緊急情況請撥打 911，其他重要聯絡方式見「學生資源」。',
    urgentCta: '重要聯絡方式',
  },

  footer: {
    closing: '連接 · 成長 · 歸屬',
    closingAlt: 'Connect · Grow · Belong',
    contactLabel: '聯絡',
    exploreLabel: '瀏覽',
    benefitsLink: '會員福利一卡通',
    disclaimer: '本會為學生自主營運的研究生團體，並非卡爾加里大學或研究生會（GSA）的官方機構，本網站內容亦未經其背書。',
    rights: 'UCalgary CGSA',
  },

  notFound: {
    label: '404',
    title: '這個頁面不存在。',
    body: '這個頁面可能已經移到別處。返回首頁，或者看看這些：',
  },
}
