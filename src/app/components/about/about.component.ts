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
      // { name: 'UI/UX Design', level: 85 },
      { name: 'Responsive Design', level: 90 },
      { name: 'Arduino Programming', level: 80 },
      { name: 'Git/GitHub', level: 85 }
    ]
  };

  experiences = [
    {
      year: 'October 7, 2024 - June 13, 2025',
      title: 'Intern Full Stack Web Developer',
      company: 'Quanby Solutions Inc.',
      description: 'Developed and maintained web applications across the full stack, expanded my skills in both frontend and backend technologies, and contributed to real-world projects as part of a dynamic team.'
    },
    {
      year: '2023 - Present',
      title: 'Freelance Web Developer',
      company: 'Self-Employed',
      description: 'Creating custom websites and web applications for various clients, specializing in modern frontend frameworks and responsive design.'
    },
    {
      year: 'July 11, 2024 -October 3, 2024',
      title: 'Web Development OJT',
      company: 'Quanby Solutions Inc.',
      description: 'Completed internship program working on real-world projects, gaining hands-on experience with full-stack development.'
    }
  ];
}
