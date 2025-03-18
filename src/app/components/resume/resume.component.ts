import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css'
})
export class ResumeComponent {
  education = [
    {
      degree: 'Bachelor of Science in Information Technology',
      school: 'Bicol University',
      year: '2020 - 2024',
      description: 'Specialized in Web Development and Software Engineering'
    }
  ];

  experience = [
    {
      position: 'Part-time Full Stack Web Developer',
      company: 'Quanby Solutions Inc.',
      period: '2024 - Present',
      responsibilities: [
        'Develop and maintain web applications using Angular and Laravel',
        'Implement responsive designs and ensure cross-browser compatibility',
        'Collaborate with team members using Git for version control',
        'Optimize application performance and database queries'
      ]
    },
    {
      position: 'Freelance Web Developer',
      company: 'Self-Employed',
      period: '2023 - Present',
      responsibilities: [
        'Create custom websites for various clients',
        'Develop full-stack applications using modern technologies',
        'Provide technical consultation and solutions',
        'Manage project timelines and client communications'
      ]
    },
    {
      position: 'Web Development Intern',
      company: 'Quanby Solutions Inc.',
      period: '2023',
      responsibilities: [
        'Assisted in developing web applications using Angular',
        'Learned and implemented best practices in web development',
        'Participated in team meetings and code reviews',
        'Gained hands-on experience with full-stack development'
      ]
    }
  ];

  skills = {
    technical: [
      'Angular', 'TypeScript', 'JavaScript', 'PHP/Laravel',
      'HTML5/CSS3', 'Node.js', 'PostgreSQL/MySQL',
      'Git/GitHub', 'RESTful APIs', 'Responsive Design'
    ],
    tools: [
      'VS Code', 'Postman', 'GitHub Desktop',
      'Adobe XD', 'Figma', 'Arduino IDE'
    ],
    soft: [
      'Problem Solving', 'Team Collaboration',
      'Time Management', 'Communication',
      'Adaptability', 'Quick Learning'
    ]
  };

  certifications = [
    {
      name: 'Angular Development',
      issuer: 'Udemy',
      date: '2023'
    },
    {
      name: 'Web Development Bootcamp',
      issuer: 'Coursera',
      date: '2023'
    }
  ];

  async downloadPDF() {
    // Get the element
    const element = document.getElementById('resume-content');
    if (!element) return;

    try {
      // Create canvas from the element
      const canvas = await html2canvas(element, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      // Calculate dimensions to fit on A4
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      let firstPage = true;

      // Add pages if content is longer than A4
      while (heightLeft >= 0) {
        if (!firstPage) {
          pdf.addPage();
        }
        
        pdf.addImage(
          canvas.toDataURL('image/png'), 
          'PNG', 
          0, 
          position,
          imgWidth, 
          imgHeight
        );
        
        heightLeft -= pageHeight;
        position -= pageHeight;
        firstPage = false;
      }

      // Save the PDF
      pdf.save('resume.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  }
}
