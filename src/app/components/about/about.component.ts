import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  skills = {
    development: [
      { name: 'Angular', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'PHP/Laravel', level: 80 },
      { name: 'TypeScript', level: 85 },
      { name: 'Node.js', level: 80 },
      { name: 'C++', level: 75 },
      { name: 'PostgreSQL/MySQL', level: 70 },
      { name: 'Supabase', level: 75 }
    ],
    design: [
      { name: 'HTML/CSS', level: 95 },
      { name: 'UI/UX Design', level: 85 },
      { name: 'Responsive Design', level: 90 },
      { name: 'Arduino Programming', level: 80 },
      { name: 'Git/GitHub', level: 85 }
    ]
  };

  experiences = [
    {
      year: '2024 - Present',
      title: 'Part-time Full Stack Web Developer',
      company: 'Quanby Solutions Inc.',
      description: 'Continuing to develop and maintain web applications while focusing on both frontend and backend development after successful internship completion.'
    },
    {
      year: '2023 - Present',
      title: 'Freelance Web Developer',
      company: 'Self-Employed',
      description: 'Creating custom websites and web applications for various clients, specializing in modern frontend frameworks and responsive design.'
    },
    {
      year: '2023',
      title: 'Web Development Intern',
      company: 'Quanby Solutions Inc.',
      description: 'Completed internship program working on real-world projects, gaining hands-on experience with full-stack development.'
    }
  ];
}
