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
      degree: 'Bachelor of Science in Information System',
      school: 'Southern Luzon Technological College Foundation Inc.',
      year: '2021 - 2025',
      description: "I'm a Full Stack Web Developer who loves solving problems and learning new things. Whether working with a team or independently, I bring a positive attitude, strong attention to detail, and a passion for building clean, user-friendly web applications. I enjoy challenges that push me to grow, and I’m always looking for ways to improve not just as a developer, but as a person. My approach is grounded, collaborative, and driven by the belief that technology should make life easier and more meaningful."
    }
  ];

  experience = [
    {
      position: 'Intern Full Stack Web Developer',
      company: 'Quanby Solutions Inc.',
      period: '2024 - 2025',
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
      position: 'Web Development OJT',
      company: 'Quanby Solutions Inc.',
      period: '2024',
      responsibilities: [
        'Assisted in developing web applications using Angular',
        'Learned and implemented best practices in web development',
        'Participated in team meetings and code reviews',
        'Gained hands-on experience with full-stack development'
      ]
    }
  ];

  achievements = [
    'Cum Laude – BS in Information Systems',
    'Service Awardee',
    'Proficiency in Computer Programming & Web Development',
    'Best in Capstone Project – Real-Time Jeepney Locator & Passenger Monitoring System'
  ];

  skills = {
    technical: [
      'PHP', 'HTML', 'CSS', 'JavaScript', 'TypeScript', 'SQL',
      'C++', 'Python', 'Angular', 'Tailwind CSS', 'Bootstrap',
      'Next.js', 'Laravel', 'Node.js', 'Git', 'Responsive Design'
    ],
    tools: [
      'Visual Studio Code', 'Supabase', 'Figma', 'Arduino IDE', 'Shapr3D'
    ],
    databases: [
      'MySQL', 'PostgreSQL', 'WordPress', 'Firebase'
    ],
    soft: [
      'Problem-solving', 'Team Collaboration', 'Time Management',
      'Adaptability', 'Willingness to Learn', 'Prompt Engineering for Code Generation'
    ]
  };

  // certifications = [
  //   {
  //     name: 'Angular Development',
  //     issuer: 'Udemy',
  //     date: '2023'
  //   },
  //   {
  //     name: 'Web Development Bootcamp',
  //     issuer: 'Coursera',
  //     date: '2023'
  //   }
  // ];

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
