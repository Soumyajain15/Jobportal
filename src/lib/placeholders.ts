export interface Job {
  id: string;
  title: string;
  companyName: string;
  companyLogoUrl?: string;
  location: string;
  salary?: string;
  shortDescription: string;
  tags: string[];
  postedDate: string;
}

export interface Application {
  id: string;
  jobTitle: string;
  companyName: string;
  status: 'Applied' | 'Interviewing' | 'Offer' | 'Rejected' | 'Withdrawn';
  appliedDate: string;
  jobId: string;
}

export const placeholderJobs: Job[] = [
  {
    id: '1',
    title: 'Software Engineer, Frontend',
    companyName: 'Innovatech Solutions',
    companyLogoUrl: 'https://placehold.co/100x100/008080/FFFFFF.png?text=IS',
    dataAihint: 'tech company',
    location: 'San Francisco, CA',
    salary: '$120,000 - $150,000',
    shortDescription: 'Join our dynamic team to build cutting-edge web applications using React and Next.js. Drive innovation in user experience.',
    tags: ['React', 'Next.js', 'TypeScript', 'Frontend'],
    postedDate: '2024-07-20',
  },
  {
    id: '2',
    title: 'Product Manager',
    companyName: 'FutureGadgets Inc.',
    companyLogoUrl: 'https://placehold.co/100x100/FFD700/000000.png?text=FG',
    dataAihint: 'gadget startup',
    location: 'New York, NY',
    salary: '$130,000 - $160,000',
    shortDescription: 'Lead the product vision and strategy for our innovative consumer electronics. Work closely with engineering and design teams.',
    tags: ['Product Management', 'Agile', 'SaaS', 'Mobile'],
    postedDate: '2024-07-18',
  },
  {
    id: '3',
    title: 'UX/UI Designer',
    companyName: 'Creative Minds Co.',
    location: 'Remote',
    shortDescription: 'Design beautiful and intuitive user interfaces for web and mobile applications. Portfolio required.',
    tags: ['UX', 'UI', 'Figma', 'Adobe XD', 'Mobile Design'],
    postedDate: '2024-07-22',
  },
   {
    id: '4',
    title: 'Data Scientist',
    companyName: 'Alpha Analytics',
    companyLogoUrl: 'https://placehold.co/100x100/A0A0A0/FFFFFF.png?text=AA',
    dataAihint: 'data company',
    location: 'Austin, TX',
    salary: '$110,000 - $140,000',
    shortDescription: 'Analyze large datasets to extract meaningful insights and build predictive models. Strong Python and SQL skills needed.',
    tags: ['Machine Learning', 'Python', 'SQL', 'Statistics'],
    postedDate: '2024-07-15',
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    companyName: 'CloudNine Hosting',
    location: 'Seattle, WA (Hybrid)',
    shortDescription: 'Manage and scale our cloud infrastructure using AWS, Kubernetes, and Terraform. Focus on automation and reliability.',
    tags: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD'],
    postedDate: '2024-07-21',
  },
   {
    id: '6',
    title: 'Marketing Specialist',
    companyName: 'GrowthHackers Ltd.',
    companyLogoUrl: 'https://placehold.co/100x100/F08080/FFFFFF.png?text=GH',
    dataAihint: 'marketing agency',
    location: 'Remote',
    salary: '$70,000 - $90,000',
    shortDescription: 'Develop and execute digital marketing campaigns across various channels. Experience with SEO, SEM, and social media marketing.',
    tags: ['Digital Marketing', 'SEO', 'Social Media', 'Content Creation'],
    postedDate: '2024-07-19',
  }
];

export const placeholderApplications: Application[] = [
  {
    id: 'app1',
    jobTitle: 'Software Engineer, Frontend',
    companyName: 'Innovatech Solutions',
    status: 'Interviewing',
    appliedDate: '2024-07-15',
    jobId: '1',
  },
  {
    id: 'app2',
    jobTitle: 'Product Manager',
    companyName: 'FutureGadgets Inc.',
    status: 'Applied',
    appliedDate: '2024-07-19',
    jobId: '2',
  },
  {
    id: 'app3',
    jobTitle: 'UX/UI Designer',
    companyName: 'Creative Minds Co.',
    status: 'Offer',
    appliedDate: '2024-07-10',
    jobId: '3',
  },
];
