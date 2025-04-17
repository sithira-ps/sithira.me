interface Project {
  title: string
  description: string
  category: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Proxima.ai - Live AI Chat Web App',
    description: `This project is a modern, real-time AI chat web application built with Next.js. 
    It enables users to interact with an AI model via a live streaming API, displaying responses as they are generated. 
    The application features smooth UX enhancements like auto-scrolling, message streaming, and a customizable chatbot model selector. 
    AI responses support rich content through beautifully styled Markdown rendering with syntax highlighting for code blocks.
    The project uses Tailwind CSS for design and integrates libraries such as react-markdown, rehype-highlight, and lucide-react for icons.`,
    imgSrc: '/images/articles/llm-platform.png',
    href: 'https://chat.sithira.me',
    category: 'WEB',
  },
  {
    title: 'WES - Document Management System',
    description: `This is a web-based Document Management System designed to streamline how organizations manage, store, and retrieve invoices and quotations.
      The frontend is built using Angular 18 and styled with the FUSE theme, while the backend API is developed with Express.js.
      It leverages Microsoft SQL Server as the database engine.
      The entire application is containerized with Docker, integrated with a CI/CD pipeline, and hosted on a VPS for efficient and scalable deployment.`,
    imgSrc: '/images/angular.jpg',
    href: 'https://wes-rho.vercel.app/',
    category: 'WEB',
  },
  {
    title: 'JADE - Mobile POS System',
    description: `This is a mobile Point of Sale (POS) system built for a small juice bar.
      It uses SQLite for offline data storage, ensuring uninterrupted operation even without internet connectivity, and integrates with Firebase for cloud syncing, authentication, and real-time updates.
      The system provides a set of reports and visual charts to help track sales performance and revenue trends over time, offering valuable insights for business decisions.`,
    imgSrc: '/images/flutter.png',
    href: 'https://github.com/SthiraPs/UniPos_V2',
    category: 'MOBILE',
  },
]

export default projectsData
