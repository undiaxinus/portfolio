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
    languages: ['PHP', 'HTML', 'CSS', 'JavaScript', 'TypeScript', 'SQL', 'Python (basic)'],
    frameworks: ['Angular', 'Next.js', 'Laravel', 'Tailwind CSS', 'Bootstrap'],
    tools: ['Git', 'Node.js', 'Visual Studio Code', 'Supabase'],
    databases: ['MySQL', 'PostgreSQL', 'WordPress', 'Firebase (basic)'],
    softSkills: [
      'Problem-Solving',
      'Team Collaboration',
      'Time Management',
      'Adaptability',
      'Willingness to Learn',
      'Communication'
    ]
  };

  experiences: Experience[] = [
    {
      year: 'October 2025 - June 2026',
      title: 'IT Developer',
      company: 'Rural Bank of Guinubatan Inc.',
      description:
        'Developed, maintained, and supported banking-related applications and internal systems. Managed databases, optimized SQL queries, investigated incidents, and resolved system and application issues to improve reliability. Assisted in software deployment, testing, and maintenance of system enhancements.',
      image: '../../assets/Rural-Bank-of-Guinobatan.jpg'
    },
    {
      year: '2023 - August 2025',
      title: 'Freelance Web Developer',
      company: 'Self-Employed',
      description: 'Designed and developed responsive websites and custom web applications for multiple clients. Built full-stack solutions using Angular, PHP, Tailwind CSS, and Supabase while handling frontend development, backend logic, database integration, and performance optimization. Used AI-assisted coding tools to reduce development time while maintaining clean and efficient code.',
      image: '../../assets/jamz.png'
    },
    {
      year: 'July 2024 - June 2025',
      title: 'Full Stack Web Developer (OJT & Internship)',
      company: 'Quanby Solutions Inc.',
      description: 'Developed and maintained web applications using Angular, Supabase, and modern web technologies. Built responsive user interfaces, ensured cross-browser compatibility, collaborated with the team using Git, and contributed to code reviews and continuous improvements. Improved database performance and application efficiency through query optimization and system enhancements.',
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
