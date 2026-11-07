import type { Messages } from './schema'

/**
 * 简体中文文案（E 角色撰写，C 角色审校）。
 * 按中文读者习惯独立撰写，不逐句对译。标题中的 “|” 标记唯一允许断行的位置
 * （见 src/components/Headline.tsx），渲染时不会显示。
 * 中英文之间、中文与数字之间保留空格；使用全角标点。
 */
export const zh: Messages = {
  meta: {
    home: {
      title: '卡尔加里大学中国研究生协会 · UCalgary CGSA',
      description: '卡尔加里大学中国研究生协会（CGSA）官方网站：活动、会员福利、学生资源与社区。',
    },
    events: {
      title: '活动 · UCalgary CGSA',
      description: 'CGSA 近期与往期活动，含日期、地点与 Eventbrite 报名链接。',
    },
    benefits: {
      title: '会员福利 · UCalgary CGSA',
      description: '由 CGSA 与卡大中国校友圈（CAN）联合推出的卡尔加里大学学生校友年度折扣一卡通。',
    },
    resources: {
      title: '学生资源 · UCalgary CGSA',
      description: '新生与在读同学常用的官方资源索引：卡尔加里大学、学生会、卡尔加里市与加拿大政府。',
    },
    about: {
      title: '关于我们 · UCalgary CGSA',
      description: '卡尔加里大学中国研究生协会，服务在校的中国学生与学者。',
    },
    team: {
      title: '团队 · UCalgary CGSA',
      description: 'UCalgary CGSA 执行团队。',
    },
    join: {
      title: '加入我们 · UCalgary CGSA',
      description: '参与 CGSA 的方式：参加活动、成为志愿者、加入执行团队或开展合作。',
    },
    contact: {
      title: '联系我们 · UCalgary CGSA',
      description: '微信号 UCalgaryCGSA，邮箱 ucalgarycgsa@gmail.com。',
    },
    notFound: {
      title: '页面不存在 · UCalgary CGSA',
      description: '找不到这个页面。',
    },
  },

  common: {
    skipToContent: '跳到正文',
    opensInNewTab: '（在新标签页打开）',
    comingSoon: '敬请期待',
    sample: '示例',
    copy: '复制',
    copied: '已复制',
    copyFailed: '复制失败，请手动选择复制',
    source: '来源',
    backHome: '返回首页',
    readMore: '了解更多',
    photoPlaceholder: '照片占位：请替换为已获授权的图片',
  },

  nav: {
    home: '主页',
    events: '活动',
    benefits: '会员福利',
    resources: '学生资源',
    about: '关于我们',
    team: '团队',
    join: '加入我们',
    contact: '联系我们',
    primaryLabel: '主导航',
    footerLabel: '页脚导航',
    menu: '菜单',
    openMenu: '打开菜单',
    closeMenu: '关闭菜单',
    close: '关闭',
    languageLabel: '语言',
    homeLink: 'UCalgary CGSA 首页',
  },

  hero: {
    eyebrow: '卡尔加里大学中国研究生协会',
    words: ['连接', '成长', '归属'],
    stop: '。',
    altLine: 'Connect · Grow · Belong',
    intro: '服务卡尔加里大学的|中国学生与学者。|从学术、职业发展|到社区生活，|支持你在卡大的|每一段成长。',
    ctaPrimary: '查看近期活动',
    ctaSecondary: '加入我们',
    indexLabel: '从这里开始',
    index: [
      { title: '最新活动', note: '近期安排与报名方式' },
      { title: '会员福利', note: '年度折扣一卡通' },
      { title: '学生资源', note: '官方信息，一站查找' },
      { title: '加入我们', note: '微信、邮箱与参与方式' },
    ],
  },

  home: {
    events: {
      label: '最新活动',
      title: '近期活动',
      all: '全部活动',
    },
    pillars: {
      label: '我们做什么',
      title: '四个方向，|陪你在卡大成长',
      items: [
        {
          title: '学术',
          body: '支持你研究生阶段学术成长的各类活动与资源。',
        },
        {
          title: '职业发展',
          body: '职业发展相关的活动，加上校内职业服务的直达链接，帮你迈出下一步。',
        },
        {
          title: '社区',
          body: '把卡大的中国学生与学者联系在一起——有事有人问，有空有人约。',
        },
        {
          title: '日常生活',
          body: '会员福利，以及在卡大与卡城生活所需的官方资源索引。',
        },
      ],
    },
    benefits: {
      label: '会员福利',
      title: '一卡通在手，|全年享优惠。',
      body: '卡尔加里大学学生校友年度折扣一卡通（UCalgary Student & Alumni Annual Discount Pass）由 CGSA 与卡大中国校友圈（CAN）联合推出。持卡人全年享有合作商家折扣、活动专属价格与优先参与资格。',
      cta: '查看会员福利',
      secondary: '了解使用方式',
      facts: [
        { k: '发起方', v: 'CGSA × CAN 联合推出' },
        { k: '有效期', v: '1 月 1 日至 12 月 31 日' },
        { k: '适用', v: '卡大社区：学生、校友、学者、教职员工与访客' },
        { k: '形式', v: 'Eventbrite 电子票' },
      ],
    },
    career: {
      label: '职业发展与社交',
      title: '读书之余，|也把人脉攒起来。',
      body: '职业发展与社交活动都会发布在活动页。想要一对一的指导，可以直接使用卡大的职业服务与研究生专业发展项目。',
      eventsLink: '职业发展与社交活动',
      resourcesLink: '职业资源',
    },
    community: {
      label: '社区与文化',
      title: '离家很远，|在这里也能找到归属。',
      body: '社区生活，与学术、职业发展一样，是 CGSA 想要支持的成长。我们希望卡大不只是一座校园，也是一个社区。',
      cta: '参与方式',
    },
    resources: {
      label: '学生资源',
      title: '需要什么，|从这里找。',
      body: '大学、学生会、卡尔加里市与加拿大政府官方页面的精简索引，按同学们最常查找的需求分类。',
      all: '查看完整索引',
    },
    about: {
      label: '关于 CGSA',
      quote: '卡尔加里大学|中国研究生协会|（简称 CGSA）|致力于更好地服务|在校的中国学生与学者。',
      body: '我们支持大家在学术、职业发展与社区生活等方面的成长，希望通过多元的活动与资源，帮助成员在卡尔加里大学度过一段充实、有支持、有归属感的求学时光。',
      cta: '进一步了解 CGSA',
    },
    partners: {
      label: '合作伙伴',
      title: '欢迎合作。',
      body: '学生组织、校内部门、校友与社区组织，以及服务学生的企业，都欢迎与我们联系。',
      cta: '与 CGSA 合作',
    },
    join: {
      label: '加入我们',
      title: '因一场活动相识，|因一群人留下。',
      body: '参与 CGSA，从打个招呼开始。加我们的微信，或者发一封邮件，我们帮你找到合适的参与方式。',
      cta: '参与方式',
    },
  },

  events: {
    label: '活动',
    title: '活动',
    intro: 'CGSA 活动会在这里发布，附日期、地点与报名链接。报名一般通过 Eventbrite 进行，本站不售票。',
    filterLabel: '按类别筛选',
    countLabel: '{n} 个即将举行的活动',
    all: '全部',
    featured: '重点活动',
    upcoming: '即将举行',
    past: '往期活动',
    emptyTitle: '新活动正在筹备中。',
    emptyBody: '活动确定后会第一时间发布在这里，并附 Eventbrite 报名链接。想更早知道？欢迎添加 CGSA 微信。',
    emptyFiltered: '这个类别暂时没有即将举行的活动。',
    pastEmpty: '往期活动将归档在这里。',
    homeEmpty: '近期暂无已发布的活动，新活动会先在微信上公布。',
    typesLabel: '活动类别',
    typesTitle: '活动如何分类',
    types: [
      { title: '职业发展与社交', body: '求职、技能、专业发展，以及结识同领域的人。' },
      { title: '学术', body: '与研究、学习和卡大学术生活相关。' },
      { title: '社区与联谊', body: '认识更多同学与学者，在卡城安顿下来。' },
      { title: '文化', body: '庆祝与分享文化，也和更多同学交流。' },
    ],
    howLabel: '如何报名',
    how: [
      { title: '找到活动', body: '每条活动都会列出日期、时间、地点；开放报名后附上报名链接。' },
      { title: '通过链接报名', body: '一般在 Eventbrite 上报名，活动详情与票价（如有）以该页面为准。' },
      { title: '保存确认信息', body: 'Eventbrite 会发送确认邮件，参加活动时请备好，以便需要时出示。' },
    ],
    showAllCategories: '查看全部类别',
    dateLabel: '日期',
    timeLabel: '时间',
    venueLabel: '地点',
    timeTBA: '时间待定',
    venueTBA: '地点待定',
    partnersLabel: '合作方',
    categories: {
      CAREER: '职业发展',
      NETWORKING: '社交拓展',
      CULTURE: '文化',
      SOCIAL: '联谊',
      ACADEMIC: '学术',
      COMMUNITY: '社区',
    },
    status: {
      UPCOMING: '即将举行',
      'REGISTRATION OPEN': '报名中',
      FULL: '名额已满',
      COMPLETED: '已结束',
      'COMING SOON': '敬请期待',
    },
    cta: {
      register: '在 Eventbrite 报名',
      rsvp: '报名',
      noRegistration: '免费 · 无需报名',
      comingSoon: '报名即将开放',
      full: '名额已满',
    },
  },

  benefits: {
    label: '会员福利',
    title: '一卡通在手，|全年享优惠。',
    intro: '卡尔加里大学学生校友年度折扣一卡通，由 CGSA 与卡大中国校友圈（UCalgary Chinese Alumni Network，简称 CAN）联合推出。',
    whatLabel: '这是什么',
    whatTitle: '合作商家折扣、|活动专属价格、|优先参与资格，|整整一年。',
    whatBody:
      '一卡通有效期为每年 1 月 1 日至 12 月 31 日。合作商家与最新优惠以 CAN 福利页面为准（持续更新），本站不另行列出。',
    whoLabel: '适用人群',
    whoTitle: '面向整个卡大社区',
    who: [
      '卡大在读学生（本科生与研究生）',
      '卡大校友（不限毕业年份与院系）',
      '访问学者与博士后',
      '卡大教职员工',
      '卡大社区成员与访客',
    ],
    howLabel: '如何购买与使用',
    how: [
      {
        title: '打开福利页面',
        body: '前往 CAN 福利页面，查看当年的一卡通、合作商家与购买链接。',
      },
      {
        title: '在 Eventbrite 购买',
        body: '一卡通通过 Eventbrite 购买，购买后会收到电子票。',
      },
      {
        title: '出示电子票',
        body: '在合作商家出示电子票即可。建议添加到手机钱包，截图无效。',
      },
    ],
    cta: '查看会员福利',
    ctaNote: '将打开 CAN 福利页面（ucalgarycan.ca），一卡通与合作商家信息以该页面为准。',
    questions: '对一卡通有疑问？',
    questionsBody: '欢迎发邮件或通过微信联系 CGSA。',
  },

  resources: {
    label: '学生资源',
    title: '学生资源',
    intro: '这里只收录官方页面，让你直接找到信息源头。CGSA 不转述学校政策，链接直达负责部门。',
    jump: '跳转到',
    checked: '链接核对于 2026 年 11 月。',
    reportLink: '发现失效链接？告诉我们。',
    groups: {
      new: { title: '新生指南', intro: '入学迎新、|签证移民|与最初几周。' },
      academic: { title: '学术', intro: '研究生院、|图书馆|与学业支持。' },
      career: { title: '职业发展', intro: '专业发展|与职业服务。' },
      life: { title: '卡城生活', intro: '交通、住宿，|在卡城安顿下来。' },
      community: { title: '社区', intro: '校内学生会|与学生团体。' },
      contacts: { title: '重要联系', intro: '安全、身心健康|与紧急情况。' },
    },
    emergencyTitle: '遇到紧急情况，请拨打 911。',
    emergencyBody: 'CGSA 是学生协会，不提供紧急救助或心理咨询服务。以下号码摘自对应的官方页面，如有出入，以官方页面为准。',
    phones: {
      security: '校园安保 Campus Security（含 Safewalk 护送服务）',
      wellness: '学生健康服务 Student Wellness Services',
      distress: '危机支持中心 Distress Centre（24 小时，由学生健康服务页面列出）',
    },
  },

  about: {
    label: '关于我们',
    title: '在卡大，|中国学生与学者|有个落脚处。',
    lead: '卡尔加里大学|中国研究生协会|（简称 CGSA）|致力于更好地服务|在校的中国学生与学者。',
    body: '我们支持大家在学术、职业发展与社区生活等方面的成长，希望通过多元的活动与资源，帮助成员在卡尔加里大学度过一段充实、有支持、有归属感的求学时光。',
    whatLabel: '我们做什么',
    whoLabel: '我们是谁',
    whoBody: 'CGSA 是由学生自主运营的协会，已列入卡尔加里大学研究生会（GSA）的研究生团体名录。',
    whoNote: 'CGSA 并非卡尔加里大学或研究生会（GSA）的官方机构，本网站内容亦未经其背书。',
    gsaLink: 'GSA 研究生团体名录',
    wechatLink: '在微信上了解 CGSA',
    workLabel: '携手合作',
    workBody: 'CGSA 与卡大中国校友圈（CAN）联合推出了卡尔加里大学学生校友年度折扣一卡通，这是 CGSA 为成员带来资源的方式之一。',
    workCta: '了解一卡通',
    teamLabel: '团队',
    teamBody: 'CGSA 由学生组成的执行团队负责运营。',
    teamCta: '认识我们的团队',
  },

  team: {
    label: '团队',
    title: '撑起 CGSA 的一群人。',
    intro: 'CGSA 由学生组成的执行团队运营：策划活动、对接合作，也一起经营这个社区。',
    emptyPageTitle: '和我们一起，|带领 CGSA。',
    emptyPageIntro: 'CGSA 由学生组成的执行团队运营，团队介绍将在这里发布。如果你想参与策划活动、对接合作，或一起经营这个社区，欢迎联系我们。',
    emptyTitle: '团队介绍即将上线。',
    emptyBody: '执行团队成员的职位与照片将在这里介绍。',
    joinTitle: '想一起带领 CGSA？',
    joinBody: '欢迎联系我们，了解如何加入执行团队。',
    joinCta: '参与方式',
    linkedin: 'LinkedIn',
    email: '邮箱',
  },

  join: {
    label: '加入我们',
    title: '从打个招呼|开始。',
    intro: '参与 CGSA 的方式不止一种：来参加活动、搭把手，或者一起带领协会。不知道从哪儿开始？直接给我们发消息就好。',
    contactLabel: '联系我们',
    wechatLabel: '微信',
    wechatHow: '在微信中搜索此微信号，添加我们。',
    copyWechat: '复制微信号',
    emailLabel: '邮箱',
    emailHow: '咨询、合作，或者一两句话说不完的事。',
    emailCta: '发邮件给 CGSA',
    copyEmail: '复制邮箱',
    waysLabel: '参与方式',
    ways: [
      {
        title: '参加活动',
        body: '参加活动是认识 CGSA 的好方式。看看近期安排，通过各活动的报名链接报名。',
        cta: '查看活动',
      },
      {
        title: '成为志愿者',
        body: '协助活动与宣传，或者贡献一技之长——设计、摄影、写作、组织统筹。告诉我们你想做什么。',
        cta: '给我们发消息',
      },
      {
        title: '加入执行团队',
        body: '想参与带领 CGSA？联系我们，了解如何加入执行团队。',
        cta: '咨询职位',
      },
      {
        title: '开展合作',
        body: '学生组织、校内部门、校友网络与各类机构：欢迎提出联合活动或合作项目。',
        cta: '与 CGSA 合作',
      },
    ],
    mailSubjectVolunteer: 'CGSA 志愿者咨询',
    mailSubjectExec: 'CGSA 执行团队职位咨询',
  },

  contact: {
    label: '联系我们',
    title: '联系 CGSA',
    intro: '通过微信或邮件联系我们。',
    partnerLabel: '与 CGSA 合作',
    partnerTitle: '与 CGSA 合作。',
    partnerBody: '无论是联合办活动、支持某个项目，还是为同学们提供服务，都欢迎来信。请简单介绍你的机构和想法。',
    partnerCta: '发送合作意向',
    partnerSubject: '合作咨询 — CGSA',
    urgentTitle: '需要紧急帮助？',
    urgentBody: 'CGSA 不提供紧急救助。紧急情况请拨打 911，其他重要联系方式见“学生资源”。',
    urgentCta: '重要联系',
  },

  footer: {
    closing: '连接 · 成长 · 归属',
    closingAlt: 'Connect · Grow · Belong',
    contactLabel: '联系',
    exploreLabel: '浏览',
    benefitsLink: '会员福利一卡通',
    disclaimer: '本会为学生自主运营的研究生团体，并非卡尔加里大学或研究生会（GSA）的官方机构，本网站内容亦未经其背书。',
    rights: 'UCalgary CGSA',
  },

  notFound: {
    label: '404',
    title: '这个页面不存在。',
    body: '它可能已经移动。返回首页，或者看看这些：',
  },
}
