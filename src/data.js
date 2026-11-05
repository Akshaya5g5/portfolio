export const profile = {
  name: 'Uba Akshaya',
  email: 'ubaakshaya@gmail.com',
  linkedin: 'https://www.linkedin.com/in/akshaya-u-9536a4243/',
  roles: ['Python Full Stack engineer', 'LLM & AI agent builder', 'OCI + Terraform automation'],
  summary:
    'Full Stack Developer with 2 years of experience building Python backends and REST APIs. I work with FastAPI and Django, connect external and LLM APIs, and run the infrastructure on Oracle Cloud with Terraform.',
}

export const skills = {
  Backend: ['Python', 'FastAPI', 'Django', 'Django REST Framework', 'Flask', 'REST API design', 'JWT authentication', 'Async processing'],
  'AI & LLM': ['LLM API integration', 'AI agents', 'Multi-agent orchestration', 'RAG', 'FAISS vector search', 'Speech-to-text', 'Text-to-speech'],
  Data: ['PostgreSQL', 'MongoDB', 'Oracle ATP', 'Redis', 'Celery'],
  'Cloud & DevOps': ['Oracle Cloud (OCI)', 'Terraform', 'Virtual Machines', 'Serverless workflows', 'CI/CD', 'Linux'],
  Frontend: ['React', 'JavaScript', 'HTML', 'CSS'],
  Testing: ['Git', 'Postman', 'Unit testing', 'Integration testing'],
}

export const experience = [
  {
    role: 'Full Stack Developer',
    org: 'Cloud4Biz IT Services (OPC) Pvt Ltd',
    when: '2025 – Present',
    points: [
      'Develop and maintain production REST APIs in FastAPI; profile and optimize API latency and backend workflows.',
      'Design backend services and data models for a multi-service platform covering service creation, configuration and monitoring.',
      'Build external API integrations and automated data pipelines, including LLM-backed request processing.',
      'Run on-demand workloads on serverless backends, reducing infrastructure overhead.',
      'Build components for a real-time conversational system that coordinates speech recognition and text-to-speech.',
      'Provision and manage secure, scalable OCI infrastructure with Terraform, including virtual machines.',
      'Build Django and DRF services with REST APIs and database integrations.',
    ],
  },
  {
    role: 'Full Stack Developer Intern',
    org: 'Narvee Tech Pvt Ltd',
    when: 'Jun 2024 – Dec 2024',
    points: [
      'Supported debugging and API integration across the stack and helped optimize backend-connected services.',
      'Worked with cross-functional teams to improve application functionality.',
    ],
  },
]

export const projects = [
  {
    title: 'OCI Operations Command Center',
    sub: 'AI-orchestrated cloud operations platform',
    stack: ['Python', 'FastAPI', 'Oracle ATP', 'OCI', 'Terraform', 'LLM', 'AI Agents'],
    points: [
      'Multi-service backend covering infrastructure, monitoring, cost optimization and security, with an orchestrator that routes each request to a specialized service or agent.',
      'REST APIs for cloud resource management, plus external LLM/API providers for context-aware responses.',
      'Services for Terraform template management, CI/CD execution and Git-based synchronization.',
    ],
  },
  {
    title: 'Document Retrieval Backend (RAG)',
    sub: 'Semantic search over large document sets',
    stack: ['Python', 'FAISS', 'Semantic search'],
    points: ['Retrieval pipeline on FAISS vector search that finds relevant context across large document collections and feeds retrieval-augmented responses.'],
  },
  {
    title: 'Voice-Enabled Conversational Backend',
    sub: 'Real-time voice assistant',
    stack: ['Python', 'Serverless', 'Speech-to-text', 'Text-to-speech', 'LLM'],
    points: ['Serverless backend logic that coordinates speech-to-text, response generation and text-to-speech on demand.'],
  },
  {
    title: 'Chatbot Management Dashboard (Backend)',
    sub: 'Deploy and monitor chatbots',
    stack: ['REST APIs', 'JWT', 'Real-time monitoring'],
    points: ['Backend services with JWT authentication and real-time monitoring endpoints for managing chatbot deployments.'],
  },
  {
    title: 'Manufacturing Work Order Prediction',
    sub: 'Industrial maintenance planning',
    stack: ['FastAPI', 'Oracle APEX', 'LLM', 'OCI'],
    points: ['Prediction services for a work-order maintenance system, integrated with Oracle APEX for planning and scheduling.'],
  },
]

export const certs = [
  'Oracle Cloud Infrastructure Foundations Associate',
  'Oracle Certified Associate',
  'Full Stack Developer – Dr. Reddy’s Foundation',
  'Full Stack Internship Completion – Narvee Tech Pvt Ltd',
]
