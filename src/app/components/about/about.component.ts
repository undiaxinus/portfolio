import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Experience {
  year: string;
  title: string;
  company: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  showCertificateModal = false;

  skills = {
    languages: ['TypeScript', 'JavaScript', 'PHP', 'SQL', 'HTML', 'CSS'],
    frameworks: ['Angular', 'Tailwind CSS', 'Laravel', 'Bootstrap'],
    tools: ['Node.js', 'Git', 'GitHub', 'Visual Studio Code', 'Postman', 'Docker', 'Figma'],
    databases: ['PostgreSQL', 'MySQL', 'Supabase'],
    softSkills: [
      'Analytical troubleshooting',
      'Communication',
      'Problem-solving',
      'Time Management',
      'Willingness to Learn',
      'Documentation'
    ]
  };

  experiences: Experience[] = [
    {
      year: 'Oct 2025 - Present',
      title: 'IT Developer',
      company: 'Rural Bank of Guinobatan Inc.',
      description:
        'Provided technical support by investigating partner transactions and verifying success/failure directly from the database. Worked as a backend developer for internal systems and integrations. Supported UAT/DevOps by installing, configuring, and deploying test builds/environments for QA and user testing.',
      image: '../../assets/Rural-Bank-of-Guinobatan.jpg'
    },
    {
      year: '2023 - Aug 2025',
      title: 'Freelance Web Developer',
      company: 'Self-Employed',
      description: 'Designed and developed responsive websites for various clients on a per-project basis. Built full-stack applications using Angular, PHP, Tailwind CSS, and Supabase. Managed both frontend and backend development, database integration, and optimization. Leveraged AI-assisted coding tools to reduce development time by up to 30% while maintaining clean and efficient code.',
      image: '../../assets/jamz.png'
    },
    {
      year: 'Jul 2024 – Jun 2025',
      title: 'Full Stack Web Developer (OJT & Internship) ',
      company: 'Quanby Solutions Inc.',
      description: '•	Developed and maintained web applications using Angular, Supabase, and modern tech stacks. Implemented responsive UI designs ensuring cross-browser compatibility. Collaborated using Git for version control and participated in code reviews. Optimized database queries, improving efficiency and load performance.',
      image: '../../assets/qb.jpg'
    }
  ];

  openCertificateModal(): void {
    this.showCertificateModal = true;
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  }

  closeCertificateModal(): void {
    this.showCertificateModal = false;
    // Restore body scroll when modal is closed
    document.body.style.overflow = 'auto';
  }
}
