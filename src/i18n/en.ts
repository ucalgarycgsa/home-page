/**
 * English UI copy (role E). The reference shape for src/i18n/schema.ts.
 * Facts used here are limited to: the authoritative CGSA description, the
 * official contact details, the CAN benefits page and the GSA group listing
 * (see research/A_PRINCIPLES_MEMO.md). Nothing else is claimed.
 */
export const en = {
  meta: {
    home: {
      title: "UCalgary CGSA · Chinese Graduate Students’ Association",
      description:
        'Events, member benefits, resources and community for Chinese students and scholars at the University of Calgary.',
    },
    events: {
      title: 'Events · UCalgary CGSA',
      description: 'Upcoming and past CGSA events, with dates, venues and Eventbrite registration links.',
    },
    benefits: {
      title: 'Member Benefits · UCalgary CGSA',
      description:
        'The UCalgary Student & Alumni Annual Discount Pass, launched jointly by CGSA and the UCalgary Chinese Alumni Network.',
    },
    resources: {
      title: 'Student Resources · UCalgary CGSA',
      description:
        'A curated index of official resources — University of Calgary, student associations, the City of Calgary and the Government of Canada.',
    },
    about: {
      title: 'About · UCalgary CGSA',
      description:
        "Who we are: the UCalgary Chinese Graduate Students’ Association serves Chinese students and scholars at the University of Calgary.",
    },
    team: {
      title: 'Team · UCalgary CGSA',
      description: 'The executive team behind UCalgary CGSA.',
    },
    join: {
      title: 'Join CGSA · UCalgary CGSA',
      description: 'Ways to get involved with CGSA: attend, volunteer, join the executive team or collaborate.',
    },
    contact: {
      title: 'Contact · UCalgary CGSA',
      description: 'Reach UCalgary CGSA by WeChat (UCalgaryCGSA) or email (ucalgarycgsa@gmail.com).',
    },
    notFound: {
      title: 'Page not found · UCalgary CGSA',
      description: 'This page could not be found.',
    },
  },

  common: {
    skipToContent: 'Skip to content',
    opensInNewTab: '(opens in a new tab)',
    comingSoon: 'Coming soon',
    sample: 'Sample',
    copy: 'Copy',
    copied: 'Copied',
    copyFailed: 'Copy failed — please select and copy manually',
    source: 'Source',
    backHome: 'Back to the homepage',
    readMore: 'Read more',
    photoPlaceholder: 'Photo placeholder — replace with a licensed image',
  },

  nav: {
    home: 'Home',
    events: 'Events',
    benefits: 'Benefits',
    resources: 'Resources',
    about: 'About',
    team: 'Team',
    join: 'Join CGSA',
    contact: 'Contact',
    primaryLabel: 'Main',
    footerLabel: 'Footer',
    menu: 'Menu',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    close: 'Close',
    languageLabel: 'Language',
    homeLink: 'UCalgary CGSA — home',
  },

  hero: {
    eyebrow: "Chinese Graduate Students’ Association · University of Calgary",
    words: ['Connect', 'Grow', 'Belong'],
    stop: '.',
    altLine: '连接 · 成长 · 归属',
    intro:
      'CGSA serves Chinese students and scholars at the University of Calgary — through academic, professional and community initiatives that help you thrive here.',
    ctaPrimary: 'See upcoming events',
    ctaSecondary: 'Join CGSA',
    indexLabel: 'Start here',
    index: [
      { title: 'Upcoming events', note: "What's on, and how to register" },
      { title: 'Member benefits', note: 'The annual discount pass' },
      { title: 'Student resources', note: 'Official links for grad life' },
      { title: 'Join CGSA', note: 'WeChat, email and ways in' },
    ],
  },

  home: {
    events: {
      label: 'Upcoming events',
      title: "What's next",
      all: 'All events',
    },
    pillars: {
      label: 'What we do',
      title: 'Four ways CGSA supports you',
      items: [
        {
          title: 'Academic',
          body: 'Academic initiatives that support you through graduate study.',
        },
        {
          title: 'Career',
          body: 'Professional-development initiatives, and pointers to the career services that can help with your next step.',
        },
        {
          title: 'Community',
          body: 'A network of Chinese students and scholars at UCalgary — people to ask, and people to meet.',
        },
        {
          title: 'Everyday life',
          body: 'Member benefits, and an index of official resources for life at UCalgary and in Calgary.',
        },
      ],
    },
    benefits: {
      label: 'Member benefits',
      title: 'A year of member benefits, in one pass.',
      body: 'The UCalgary Student & Alumni Annual Discount Pass is launched jointly by CGSA and the UCalgary Chinese Alumni Network (CAN). Pass holders receive partner discounts, special event pricing and priority access, January to December.',
      cta: 'Explore member benefits',
      secondary: 'How the pass works',
      facts: [
        { k: 'Program', v: 'Joint CGSA × CAN annual pass' },
        { k: 'Valid', v: 'January 1 – December 31' },
        { k: 'Open to', v: 'The UCalgary community — students, alumni, scholars, faculty, staff and guests' },
        { k: 'Format', v: 'E‑ticket via Eventbrite' },
      ],
    },
    career: {
      label: 'Career & networking',
      title: 'Build your network while you build your degree.',
      body: 'Career and networking events are listed with everything else on our events page. For one-on-one support, the University’s own career and professional-development services are a click away.',
      eventsLink: 'Career & networking events',
      resourcesLink: 'Career resources',
    },
    community: {
      label: 'Community & culture',
      title: 'A place to belong, a long way from home.',
      body: 'Alongside academic and professional growth, CGSA supports community life — so UCalgary can feel less like a campus and more like a community.',
      cta: 'Ways to get involved',
    },
    resources: {
      label: 'Student resources',
      title: 'Where to find what you need.',
      body: 'A short index of official pages — the University, student associations, the City and the Government of Canada — sorted by what students look for.',
      all: 'Open the full index',
    },
    about: {
      label: 'About CGSA',
      quote:
        'UCalgary Chinese Graduate Students’ Association (CGSA) is committed to better serving Chinese students and scholars at the University of Calgary.',
      body: 'Through academic, professional and community-oriented initiatives, CGSA aims to help its members thrive and enjoy a meaningful and supportive experience at UCalgary.',
      cta: 'More about CGSA',
    },
    partners: {
      label: 'Partners',
      title: 'Work with us.',
      body: 'We welcome collaboration with student groups, university units, alumni and community organizations, and businesses that serve students.',
      cta: 'Partner with CGSA',
    },
    join: {
      label: 'Join CGSA',
      title: 'Come for an event. Stay for the people.',
      body: 'Getting involved starts with hello. Add us on WeChat or send an email — we’ll point you to the right place.',
      cta: 'Ways to join',
    },
  },

  events: {
    label: 'Events',
    title: 'Events',
    intro:
      'CGSA events are listed here with their date, venue and registration link. Registration usually happens on Eventbrite — this site doesn’t sell tickets.',
    filterLabel: 'Filter by category',
    countLabel: '{n} upcoming',
    all: 'All',
    featured: 'Featured',
    upcoming: 'Upcoming',
    past: 'Past events',
    emptyTitle: 'New events are on the way.',
    emptyBody:
      'Events appear here as soon as they are confirmed, each with an Eventbrite link to register. To hear first, add CGSA on WeChat.',
    emptyFiltered: 'No upcoming events in this category right now.',
    pastEmpty: 'Past events will be archived here.',
    homeEmpty: 'No events are scheduled right now. New ones are announced on WeChat first.',
    typesLabel: 'Event types',
    typesTitle: 'How events are labelled',
    types: [
      { title: 'Career & networking', body: 'Jobs, skills, professional development and meeting people in your field.' },
      { title: 'Academic', body: 'Research, study and academic life at UCalgary.' },
      { title: 'Community & social', body: 'Meeting other students and scholars, and settling into life in Calgary.' },
      { title: 'Culture', body: 'Celebrating and sharing culture with the wider campus.' },
    ],
    howLabel: 'How registration works',
    how: [
      { title: 'Find the event', body: 'Each listing shows the date, time, venue and a registration link once registration opens.' },
      { title: 'Register through the link', body: 'Usually on Eventbrite, which shows the event details and any ticket price.' },
      { title: 'Keep your confirmation', body: 'Eventbrite emails it to you. Have it ready at the event in case it’s needed.' },
    ],
    showAllCategories: 'Show all categories',
    dateLabel: 'Date',
    timeLabel: 'Time',
    venueLabel: 'Venue',
    timeTBA: 'Time to be announced',
    venueTBA: 'Venue to be announced',
    partnersLabel: 'With',
    categories: {
      CAREER: 'Career',
      NETWORKING: 'Networking',
      CULTURE: 'Culture',
      SOCIAL: 'Social',
      ACADEMIC: 'Academic',
      COMMUNITY: 'Community',
    },
    status: {
      UPCOMING: 'Upcoming',
      'REGISTRATION OPEN': 'Registration open',
      FULL: 'Full',
      COMPLETED: 'Completed',
      'COMING SOON': 'Coming soon',
    },
    cta: {
      register: 'Register on Eventbrite',
      rsvp: 'RSVP',
      noRegistration: 'Free · no registration needed',
      comingSoon: 'Registration coming soon',
      full: 'Event full',
    },
  },

  benefits: {
    label: 'Member benefits',
    title: 'One pass. A year of benefits.',
    intro:
      'The UCalgary Student & Alumni Annual Discount Pass is launched jointly by CGSA and the UCalgary Chinese Alumni Network (CAN).',
    whatLabel: 'What it is',
    whatTitle: 'Partner discounts, special event pricing and priority access — for a full calendar year.',
    whatBody:
      'The pass is valid from January 1 to December 31. Participating merchants and current offers are listed — and continuously updated — on the CAN benefits page, so this site doesn’t repeat them.',
    whoLabel: 'Who it’s for',
    whoTitle: 'Open to the whole UCalgary community',
    who: [
      'Current UCalgary students — undergraduate and graduate',
      'UCalgary alumni, from all years and faculties',
      'Visiting scholars and postdoctoral fellows',
      'UCalgary faculty and staff',
      'UCalgary community members and guests',
    ],
    howLabel: 'How to get and use it',
    how: [
      {
        title: 'Open the benefits page',
        body: 'Go to the CAN benefits page to see the current pass, its partners and the purchase link.',
      },
      {
        title: 'Get your pass on Eventbrite',
        body: 'The pass is purchased through Eventbrite. You’ll receive it as an e‑ticket.',
      },
      {
        title: 'Show the e‑ticket',
        body: 'Present the e‑ticket at participating merchants. Adding it to your phone’s wallet is easiest — screenshots are not accepted.',
      },
    ],
    cta: 'Explore member benefits',
    ctaNote: 'Opens ucalgarycan.ca, the CAN benefits page, where the pass and partner details are kept up to date.',
    questions: 'Questions about the pass?',
    questionsBody: 'Email CGSA or message us on WeChat.',
  },

  resources: {
    label: 'Student resources',
    title: 'Student resources',
    intro:
      'An index of official pages — so you always land on the source. CGSA doesn’t restate University policy; links go straight to the people responsible.',
    jump: 'Jump to',
    checked: 'Links checked November 2026.',
    reportLink: 'Spot a broken link? Tell us.',
    groups: {
      new: { title: 'New to UCalgary', intro: 'Orientation, immigration and your first weeks.' },
      academic: { title: 'Academic', intro: 'Graduate studies, the library and academic support.' },
      career: { title: 'Career', intro: 'Professional development and career services.' },
      life: { title: 'Life in Calgary', intro: 'Getting around, housing and settling into the city.' },
      community: { title: 'Community', intro: 'Student governments and student groups on campus.' },
      contacts: { title: 'Important contacts', intro: 'Safety, wellness and emergencies.' },
    },
    emergencyTitle: 'In an emergency, call 911.',
    emergencyBody:
      'CGSA is a student association, not an emergency or counselling service. The numbers below are quoted from the linked official pages — please confirm there.',
    phones: {
      security: 'Campus Security (also Safewalk)',
      wellness: 'Student Wellness Services',
      distress: 'Distress Centre — 24/7 support (listed by Student Wellness Services)',
    },
  },

  about: {
    label: 'About',
    title: 'A home base for Chinese students and scholars at UCalgary.',
    lead:
      'UCalgary Chinese Graduate Students’ Association (CGSA) is committed to better serving Chinese students and scholars at the University of Calgary.',
    body:
      'Through academic, professional and community-oriented initiatives, CGSA aims to help its members thrive and enjoy a meaningful and supportive experience at UCalgary.',
    whatLabel: 'What we do',
    whoLabel: 'Who we are',
    whoBody:
      'CGSA is a student-run association. It is listed as a Graduate Student Group by the Graduate Students’ Association of the University of Calgary.',
    whoNote:
      'CGSA is not an official unit of the University of Calgary or the Graduate Students’ Association, and this website is not endorsed by them.',
    gsaLink: 'GSA Graduate Student Groups listing',
    wechatLink: 'Read about CGSA on WeChat',
    workLabel: 'Working together',
    workBody: 'CGSA and the UCalgary Chinese Alumni Network (CAN) jointly launched the UCalgary Student & Alumni Annual Discount Pass — one of the ways CGSA brings resources to its members.',
    workCta: 'About the pass',
    teamLabel: 'The team',
    teamBody: 'CGSA is run by an executive team of students.',
    teamCta: 'Meet the team',
  },

  team: {
    label: 'Team',
    title: 'The people behind CGSA.',
    intro: 'CGSA is run by an executive team of students who plan events, build partnerships and look after the community.',
    emptyPageTitle: 'Help lead CGSA.',
    emptyPageIntro: 'CGSA is run by an executive team of students. Team profiles will be published here. If you’d like to help plan events, build partnerships or look after the community, get in touch.',
    emptyTitle: 'Team profiles are on their way.',
    emptyBody: 'Executive team members will be introduced here with their roles and portraits.',
    joinTitle: 'Want to help lead CGSA?',
    joinBody: 'Ask us about joining the executive team.',
    joinCta: 'Ways to join',
    linkedin: 'LinkedIn',
    email: 'Email',
  },

  join: {
    label: 'Join CGSA',
    title: 'Start with hello.',
    intro:
      'There’s no single way to be part of CGSA. Come to an event, lend a hand, or help lead — and if you’re not sure where to begin, just message us.',
    contactLabel: 'Get in touch',
    wechatLabel: 'WeChat',
    wechatHow: 'Search this WeChat ID in WeChat and add us.',
    copyWechat: 'Copy WeChat ID',
    emailLabel: 'Email',
    emailHow: 'For questions, partnerships and anything longer than a message.',
    emailCta: 'Email CGSA',
    copyEmail: 'Copy email',
    waysLabel: 'Ways in',
    ways: [
      {
        title: 'Attend an event',
        body: 'Events are a good way to meet CGSA. See what’s coming up and register through each event’s registration link.',
        cta: 'See events',
      },
      {
        title: 'Volunteer',
        body: 'Help with events and outreach, or lend a skill — design, photography, writing, organizing. Tell us what you’d like to do.',
        cta: 'Message us',
      },
      {
        title: 'Join the executive team',
        body: 'Interested in helping lead CGSA? Contact us to ask about joining the executive team.',
        cta: 'Ask about positions',
      },
      {
        title: 'Collaborate',
        body: 'Student groups, university units, alumni networks and organizations: propose a joint event or initiative.',
        cta: 'Partner with CGSA',
      },
    ],
    mailSubjectVolunteer: 'Volunteering with CGSA',
    mailSubjectExec: 'Executive team positions',
  },

  contact: {
    label: 'Contact',
    title: 'Contact CGSA',
    intro: 'Reach us on WeChat or by email.',
    partnerLabel: 'Partner with CGSA',
    partnerTitle: 'Partner with CGSA.',
    partnerBody:
      'Co-host an event, support an initiative or offer something to students. Send us a short note about your organization and your idea.',
    partnerCta: 'Email a partnership idea',
    partnerSubject: 'Partnership inquiry — CGSA',
    urgentTitle: 'Need urgent help?',
    urgentBody: 'CGSA is not an emergency service. In an emergency, call 911. Other important contacts are in Resources.',
    urgentCta: 'Important contacts',
  },

  footer: {
    closing: 'Connect · Grow · Belong',
    closingAlt: '连接 · 成长 · 归属',
    contactLabel: 'Contact',
    exploreLabel: 'Explore',
    benefitsLink: 'Member benefits pass',
    disclaimer:
      'UCalgary CGSA is a student-run graduate student group. It is not an official unit of the University of Calgary or the Graduate Students’ Association, and this site is not endorsed by them.',
    rights: 'UCalgary CGSA',
  },

  notFound: {
    label: '404',
    title: 'This page doesn’t exist.',
    body: 'It may have moved. Try the homepage, or one of these:',
  },
}
