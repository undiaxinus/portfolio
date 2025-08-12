import { Component, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { using } from 'rxjs';

@Pipe({
  name: 'safeHtml',
  standalone: true
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, SafeHtmlPipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  constructor(private sanitizer: DomSanitizer) {}

  skills = {
    languages: ['PHP', 'HTML', 'CSS', 'JavaScript', 'TypeScript', 'SQL', 'C++', 'Python'],
    frameworks: ['Angular', 'Tailwind CSS', 'Bootstrap', 'Next.js', 'Laravel'],
    tools: ['Node.js', 'Git', 'Visual Studio Code', 'Supabase', 'Figma'],
    databases: ['MySQL', 'PostgreSQL', 'WordPress', 'Firebase'],
    softSkills: [
      'Problem-solving',
      'Team Collaboration',
      'Time Management',
      'Adaptability',
      'Willingness to Learn',
      'Prompt Engineering for Code Generation'
    ]
  };

  experiences = [
    {
      year: '2023 - Present',
      title: 'Freelance Web Developer',
      company: 'Self-Employed',
      description: 'Designed and developed responsive websites for various clients on a per-project basis. Built full-stack applications using Angular, PHP, Tailwind CSS, and Supabase. Managed both frontend and backend development, database integration, and optimization. Leveraged AI-assisted coding tools to reduce development time by up to 30% while maintaining clean and efficient code.'
    },
    {
      year: 'Jul 2024 – Jun 2025',
      title: 'Full Stack Web Developer (OJT & Internship) ',
      company: 'Quanby Solutions Inc.',
      description: '•	Developed and maintained web applications using Angular, Supabase, and modern tech stacks. Implemented responsive UI designs ensuring cross-browser compatibility. Collaborated using Git for version control and participated in code reviews. Optimized database queries, improving efficiency and load performance.'
    }
  ];
}
