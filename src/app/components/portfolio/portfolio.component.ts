import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent {
  webProjects = [
    {
      name: 'JeepFinder',
      description: 'A comprehensive web and mobile application for tracking jeepney routes and locations. Built with HTML, CSS, JavaScript, PHP for web interface and MIT App Inventor for the mobile app.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MIT App Inventor'],
      image: 'assets/photos/jeepfinder.webp',
      demo: 'https://peachpuff-donkey-807602.hostingersite.com',
      github: 'https://github.com/undiaxinus/jeepfinder'
    },
    {
      name: 'Fidelity Bond Alert Monitoring System',
      description: 'A comprehensive web and mobile application for monitoring and alerting fidelity bond statuses. Built with Angular for the web interface and Kotlin for the mobile application.',
      technologies: ['Angular', 'Kotlin', 'Supabase', 'REST API', 'Material Design'],
      image: 'https://picsum.photos/id/180/800/600',
      demo: 'https://5ca365c5.test-deployment-fbus.pages.dev/landing',
      github: 'https://github.com/undiaxinus/fbus'
    },
    {
      name: '16 in 1 Tea - Herbal Tea Shop',
      description: 'An online shop specializing in herbal tea products. Features product catalog, shopping cart, user accounts, and secure checkout.',
      technologies: ['HTML', 'JavaScript', 'PHP', 'CSS', 'MySQL'],
      image: 'https://picsum.photos/id/20/800/600',
      demo: 'https://www.16in1tea.com',
      github: 'https://github.com/undiaxinus/16in1tea'
    },
    {
      name: 'Pacific Blue Co-Working Space & POS System',
      description: 'A management system for co-working spaces with integrated point of sale capabilities. Features include membership management, space booking, billing, inventory tracking, and financial reporting.',
      technologies: ['Bootstrap', 'HTML', 'PHP', 'MySQL'],
      image: 'https://picsum.photos/id/160/800/600',
      demo: 'https://pacific-blue.example.com',
      github: 'https://github.com/undiaxinus/Pblue-CoWorkPOS'
    },
    {
      name: 'Portal for Grading System',
      description: 'A comprehensive grading management system for educational institutions. Features student records, grade calculation, report generation, and academic performance tracking.',
      technologies: ['Bootstrap', 'HTML', 'PHP', 'MySQL'],
      image: 'https://picsum.photos/id/100/800/600',
      demo: 'https://grading-portal.example.com',
      github: 'https://github.com/undiaxinus/grading-portal'
    },
    {
      name: 'Business Permit Document Management System',
      description: 'A comprehensive system for managing business permit applications and documents. Features request for quotation (RFQ) processing, document tracking, workflow automation, and status notifications.',
      technologies: ['Angular', 'TypeScript', 'Supabase', 'Node.js'],
      image: 'https://picsum.photos/id/160/800/600',
      demo: 'https://bpdms.example.com',
      github: 'https://github.com/undiaxinus/bpdms'
    },
    {
      name: 'Iphopil Document Management System',
      description: 'A rapid development document management system built for Posqua in just 5 days. Features document indexing, search functionality, user access controls, and version tracking.',
      technologies: ['Angular', 'TypeScript', 'Supabase', 'Material UI'],
      image: 'https://picsum.photos/id/160/800/600',
      demo: 'https://iphopil-dms.example.com',
      github: 'https://github.com/undiaxinus/iphopil-dms'
    }
  ];

  technicalProjects = [
    {
      title: 'Vehicle Tracking & Monitoring Device',
      description: 'IoT-based vehicle tracking system using Arduino with real-time GPS tracking, LCD display, and LoRa communication. Features touch sensor interface and battery-powered operation.',
      technologies: ['C++', 'Arduino', 'GPS', 'LoRa', 'ESP32', 'I2C LCD'],
      image: 'assets/vehicle-tracker.jpg'
    },
    {
      title: 'Arduino Weather Station',
      description: 'DIY weather monitoring system using Arduino and various sensors',
      technologies: ['Arduino', 'C++', 'Sensors', 'LCD Display'],
      image: 'https://picsum.photos/id/110/800/600'
    },
    {
      title: 'Home Security System',
      description: 'Motion detection and alert system with camera integration',
      technologies: ['Arduino', 'Python', 'Raspberry Pi', 'Web Interface'],
      image: 'https://picsum.photos/id/120/800/600'
    },
    {
      title: 'LED Matrix Display',
      description: 'Programmable LED matrix for displaying text and patterns',
      technologies: ['Arduino', 'C++', 'LED Matrix', 'Bluetooth Module'],
      image: 'https://picsum.photos/id/130/800/600'
    }
  ];

  galleryItems = [
    {
      title: 'Digital Art 1',
      category: 'Digital',
      image: 'https://picsum.photos/id/237/800/600',
      description: 'Digital artwork created using modern tools'
    },
    {
      title: 'Photography 1',
      category: 'Photography',
      image: 'https://picsum.photos/id/238/800/600',
      description: 'Landscape photography'
    },
    {
      title: 'Digital Art 2',
      category: 'Digital',
      image: 'https://picsum.photos/id/239/800/600',
      description: 'Abstract digital composition'
    },
    {
      title: 'Photography 2',
      category: 'Photography',
      image: 'https://picsum.photos/id/240/800/600',
      description: 'Urban photography'
    },
    {
      title: 'Digital Art 3',
      category: 'Digital',
      image: 'https://picsum.photos/id/241/800/600',
      description: 'Digital illustration'
    },
    {
      title: 'Photography 3',
      category: 'Photography',
      image: 'https://picsum.photos/id/242/800/600',
      description: 'Nature photography'
    }
  ];

  selectedImage: any = null;

  openImage(image: any) {
    this.selectedImage = image;
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  }

  closeImage() {
    this.selectedImage = null;
    document.body.style.overflow = 'auto'; // Restore scrolling
  }
}
