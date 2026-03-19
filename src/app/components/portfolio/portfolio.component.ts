import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface WebProject {
  name: string;
  description: string;
  technologies: string[];
  image: string;
  demo: string | null;
  isConfidential?: boolean;
  isArchived?: boolean;
  isInternal?: boolean;
}

interface TechnicalProject {
  title: string;
  description: string;
  technologies: string[];
  image: string;
}

interface GalleryItem {
  title: string;
  category: string;
  image: string;
  description: string;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent {
  webProjects: WebProject[] = [
    {
      name: 'The Marino World website',
      description: 'Marino World is a digital platform that provides up-to-date maritime news, industry insights, and access to monthly digital magazine issues focused on the Philippine maritime sector. The website serves both general readers and industry professionals, offering features such as an online magazine viewer, article archives, and a user-friendly admin panel for content management.',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Prisma'],
      image: 'assets/photos/marinoworld.png',
      demo: 'https://themarinoworld.com/dashboard'
    },
    {
      name: 'Sabat MO!',
      description: 'A comprehensive web and mobile application for tracking jeepney routes and locations. Built with HTML, CSS, JavaScript, PHP for web interface and MIT App Inventor for the mobile app.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MIT App Inventor'],
      image: 'assets/photos/jeepfinder.png',
      demo: 'https://peachpuff-donkey-807602.hostingersite.com'
    },
    {
      name: 'Fidelity Bond Alert Monitoring System',
      description: '[CONFIDENTIAL PROJECT] An enterprise monitoring and alert system built with Angular and Kotlin. Due to confidentiality agreements, detailed information and demo access are restricted.',
      technologies: ['Angular', 'Kotlin', 'Supabase', 'REST API', 'Material Design'],
      image: 'assets/photos/fbus.png',
      demo: null, // Confidential - access restricted
      isConfidential: true,
    },
    {
      name: '16 in 1 Tea - Herbal Tea Shop',
      description: 'An online shop specializing in herbal tea products. Features product catalog, shopping cart, user accounts, and secure checkout.',
      technologies: ['HTML', 'JavaScript', 'PHP', 'CSS', 'MySQL'],
      image: 'assets/photos/16in1.png',
      demo: 'https://www.16in1tea.com'
    },
    {
      name: 'Pacific Blue Co-Working Space & POS System [Internal System]',
      description: 'A management system for co-working spaces with integrated point of sale capabilities. Features include membership management, space booking, billing, inventory tracking, and financial reporting. This system runs on a local server for internal restaurant operations only.',
      technologies: ['Bootstrap', 'HTML', 'PHP', 'MySQL', 'JavaScript'],
      image: 'assets/photos/pblue.png',
      demo: null,
      isInternal: true
    },
    // {
    //   name: 'Portal for Grading System',
    //   description: 'A comprehensive grading management system for educational institutions. Features student records, grade calculation, report generation, and academic performance tracking.',
    //   technologies: ['Bootstrap', 'HTML', 'PHP', 'MySQL'],
    //   image: 'https://picsum.photos/id/100/800/600',
    //   demo: 'https://grading-portal.example.com',
    //   github: 'https://github.com/undiaxinus/grading-portal'
    // },
    {
      name: 'Business Permit Document Management System',
      description: '[CONFIDENTIAL PROJECT] A comprehensive system for managing business permit applications and documents. Features request for quotation (RFQ) processing, document tracking, workflow automation, and status notifications. Due to NDA, detailed information and demo access are restricted.',
      technologies: ['Angular', 'TypeScript', 'Supabase', 'Node.js'],
      image: 'assets/photos/bpdm.png',
      demo: null,
      isConfidential: true
    },
    // {
    //   name: 'Albay Chambers Website',
    //   description: 'A professional website for Albay Chambers built using WordPress. Features include responsive design, custom themes, content management system, and modern UI/UX.',
    //   technologies: ['WordPress', 'PHP', 'HTML', 'CSS', 'JavaScript'],
    //   image: 'assets/photos/albaychambers.png',
    //   demo: 'https://albaychambers.com',
    //   github: 'https://github.com/undiaxinus/albay-chambers'
    // },
    {
      name: 'The Apple Peach House Platform [Archived]',
      description: 'A specialized platform for The Apple Peach House featuring room reservations, event bookings, and property management. Includes features for room availability checking, online payments, guest management, and event scheduling. (Project is no longer active)',
      technologies: ['PHP', 'JavaScript', 'MySQL', 'CSS'],
      image: 'assets/photos/applepeach.png',
      demo: null,
      isArchived: true
    },
    {
      name: 'Hotel POS & Admin Dashboard [Archived]',
      description: 'Administrative backend for The Apple Peach House hotel, providing staff with tools for management. Features include point of sale system, room management, staff scheduling, inventory tracking, and financial reporting. (Project is no longer active)',
      technologies: ['Laravel', 'CSS', 'JavaScript', 'MySQL', 'PHP', 'jQuery', 'Bootstrap'],
      image: 'assets/photos/applepeachs.png',
      demo: null,
      isArchived: true
    }
  ];

  ruralBankProjects: WebProject[] = [
    {
      name: 'Apache Superset Setup & Deployment (Rocky Linux) [Internal]',
      description: 'Installed and configured Apache Superset on a Rocky Linux server for internal BI reporting and dashboarding. Prepared the environment, handled service configuration, and ensured stable access for users.',
      technologies: ['Apache Superset', 'Rocky Linux', 'Linux', 'SQL', 'PostgreSQL'],
      image: 'assets/Rural-Bank-of-Guinobatan.jpg',
      demo: null,
      isInternal: true
    },
    {
      name: 'Real-time API Transaction Monitoring System [Discontinued]',
      description: 'Built a real-time monitoring dashboard for API transactions using Laravel to help track request status and troubleshoot issues. The initiative was later discontinued when monitoring was moved to Superset-based reporting.',
      technologies: ['Laravel', 'PHP', 'REST API', 'SQL', 'Mysql'],
      image: 'assets/Rural-Bank-of-Guinobatan.jpg',
      demo: null,
      isArchived: true
    },
    {
      name: 'Asenso Web Portal Debugging & Support [Internal]',
      description: 'Debugged Instapay transaction filtering and SOA report generation when results were not working as expected. Fixed issues related to downloading/exporting transaction records, improving reliability for operations and reporting.',
      technologies: ['PHP', 'JavaScript', 'SQL', 'Git'],
      image: 'assets/Rural-Bank-of-Guinobatan.jpg',
      demo: null,
      isInternal: true
    }
  ];

  technicalProjects: TechnicalProject[] = [
    {
      title: 'Vehicle Tracking & Passenger Counting Device',
      description: 'IoT-based vehicle tracking system using Arduino with real-time GPS tracking, LCD display, and LoRa communication. Features touch sensor interface and battery-powered operation.',
      technologies: ['C++', 'Arduino', 'GPS', 'LoRa', 'ESP32', 'I2C LCD'],
      image: 'assets/photos/gps.jpg'
    },
    {
      title: 'Passenger Monitoring Device',
      description: 'IoT-based passenger counting and monitoring system using Arduino with real-time display and data logging. Features include passenger counting, occupancy tracking, and data analytics.',
      technologies: ['Arduino', 'C++', 'Sensors', 'LCD Display', 'Data Logging'],
      image: 'assets/photos/psc.jpg'
    // },
    // {
    //   title: 'Home Security System',
    //   description: 'Motion detection and alert system with camera integration',
    //   technologies: ['Arduino', 'Python', 'Raspberry Pi', 'Web Interface'],
    //   image: 'https://picsum.photos/id/120/800/600'
    // },
    // {
    //   title: 'LED Matrix Display',
    //   description: 'Programmable LED matrix for displaying text and patterns',
    //   technologies: ['Arduino', 'C++', 'LED Matrix', 'Bluetooth Module'],
    //   image: 'https://picsum.photos/id/130/800/600'
    }
  ];

  galleryItems: GalleryItem[] = [
    {
      title: 'Digital Art 1',
      category: 'Digital',
      image: 'assets/gallery/1.png',
      description: ''
    },
    {
      title: 'Digital Art 2',
      category: 'Digital',
      image: 'assets/gallery/2.png',
      description: ''
    },
    {
      title: 'Digital Art 3',
      category: 'Digital',
      image: 'assets/gallery/3.png',
      description: ''
    },
    {
      title: 'Digital Art 4',
      category: 'Digital',
      image: 'assets/gallery/4.jpg',
      description: ''
    },
    {
      title: 'Digital Art 5',
      category: 'Digital',
      image: 'assets/gallery/5.png',
      description: ''
    },
    {
      title: 'Digital Art 6',
      category: 'Digital',
      image: 'assets/gallery/6.png',
      description: ''
    },
    {
      title: 'Digital Art 7',
      category: 'Digital',
      image: 'assets/gallery/7.png',
      description: ''
    },
    {
      title: 'Digital Art 8',
      category: 'Digital',
      image: 'assets/gallery/8.png',
      description: ''
    },
    {
      title: 'Digital Art 9',
      category: 'Digital',
      image: 'assets/gallery/9.png',
      description: ''
    }
  ];

  selectedImage: GalleryItem | null = null;

  openImage(image: GalleryItem) {
    this.selectedImage = image;
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  }

  closeImage() {
    this.selectedImage = null;
    document.body.style.overflow = 'auto'; // Restore scrolling
  }
}
