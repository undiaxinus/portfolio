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
      name: 'Marino World Website',
      description: 'Built a content-driven platform for maritime news, digital magazine access, and industry updates using Next.js, Prisma, and Supabase. The project supports content management and delivers a responsive experience for readers and administrators.',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Prisma'],
      image: 'assets/photos/marinoworld.png',
      demo: 'https://themarinoworld.com/dashboard'
    },
    {
      name: 'Real-Time Jeepney Locator & Passenger Monitoring System',
      description: 'Developed a real-time tracking and passenger monitoring system for public transportation using PHP, JavaScript, and C++. The project combines location tracking and passenger data monitoring to support transport visibility and operational insights.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MIT App Inventor'],
      image: 'assets/photos/jeepfinder.png',
      demo: 'https://peachpuff-donkey-807602.hostingersite.com'
    },
    {
      name: 'Automated Alert System',
      description: '[CONFIDENTIAL PROJECT] Integrated an Angular frontend with a Kotlin-based Android backend to support direct SIM-based SMS alerts. Due to confidentiality agreements, detailed implementation information and demo access remain restricted.',
      technologies: ['Angular', 'Kotlin', 'Supabase', 'REST API', 'Material Design'],
      image: 'assets/photos/fbus.png',
      demo: null, // Confidential - access restricted
      isConfidential: true,
    },
    {
      name: 'E-commerce Website - ALBAY Alingatong Herbal Roots',
      description: 'Developed an e-commerce website with product browsing, shopping cart functionality, and order handling using PHP and MySQL. The project focused on delivering a responsive storefront and a practical purchasing flow for customers.',
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
      name: 'RFQ Business Permit Document Management System',
      description: '[CONFIDENTIAL PROJECT] Developed an Angular and Supabase-based system for document submission, status tracking, and approval workflows. Due to confidentiality agreements, detailed information and demo access are restricted.',
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
      name: 'PeachPerfect Hotel Management System [Archived]',
      description: 'Developed a Laravel-based hotel booking and guest management system with payment tracking and reservation support. The platform helped manage hospitality operations through a centralized web-based workflow. (Project is no longer active)',
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
      description: 'Installed and configured Apache Superset on a Rocky Linux server to support internal reporting and dashboarding. Prepared the environment, configured services, and ensured stable access for business users.',
      technologies: ['Apache Superset', 'Rocky Linux', 'Linux', 'SQL'],
      image: 'assets/photos/superset.png',
      demo: null,
      isInternal: true
    },
    {
      name: 'Real-time API Transaction Monitoring System [Discontinued]',
      description: 'Built a Laravel-based dashboard for monitoring API transaction activity, request status, and operational issues. The solution was later discontinued after reporting was transitioned to Superset-based dashboards.',
      technologies: ['Laravel', 'PHP', 'REST API', 'SQL', 'Mysql'],
      image: 'assets/photos/rbgi.png',
      demo: null,
      isArchived: true
    },
    {
      name: 'Asenso Web Portal Debugging & Support [Internal]',
      description: 'Provided debugging and support for Instapay transaction filtering and SOA report generation in the Asenso web portal. Resolved issues affecting transaction exports and reporting reliability for internal users.',
      technologies: ['PHP', 'JavaScript', 'SQL', 'Git'],
      image: 'assets/photos/asenso.png',
      demo: null,
      isInternal: true
    },
    {
      name: 'Automated Transaction Settlement Using Python [Internal]',
      description: 'Implemented an automated transaction settlement process using a Python background script to reduce manual work, improve accuracy, and speed up end-of-day operations. The solution standardized internal settlement flow and minimized operational errors.',
      technologies: ['Python', 'SQL', 'MySQL', 'Background Processing', 'Automation'],
      image: 'assets/photos/rbgi.png',
      demo: null,
      isInternal: true
    },
    {
      name: 'MySQL Replication for Disaster Recovery and Reporting [Internal]',
      description: 'Set up MySQL replication between servers to improve disaster recovery readiness and provide a read replica for reporting workloads. The setup increased data availability and reduced reporting load on the primary transactional database.',
      technologies: ['MySQL', 'Database Replication', 'SQL', 'Linux', 'Disaster Recovery'],
      image: 'assets/photos/rbgi.png',
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
