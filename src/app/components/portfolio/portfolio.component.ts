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
      image: 'assets/jeepfinder.jpg',
      demo: 'https://jeepfinder-demo.com',
      github: 'https://github.com/yourusername/jeepfinder'
    },
    {
      name: 'Inventory Management System',
      description: 'A comprehensive system built with Angular, Laravel, and MySQL for tracking inventory, sales, and generating reports.',
      technologies: ['Angular', 'Laravel', 'MySQL', 'Tailwind CSS'],
      image: 'https://picsum.photos/id/180/800/600',
      demo: 'https://inventory-demo.com',
      github: 'https://github.com/yourusername/inventory'
    },
    {
      name: 'Smart Home Arduino Project',
      description: 'IoT-based home automation system using Arduino, featuring temperature monitoring, light control, and mobile app integration.',
      technologies: ['Arduino', 'C++', 'IoT Sensors', 'Mobile App'],
      image: 'https://picsum.photos/id/20/800/600',
      demo: 'https://smart-home-demo.com',
      github: 'https://github.com/yourusername/smart-home'
    },
    {
      name: 'Task Management Platform',
      description: 'Real-time task management application with team collaboration features using Angular and Supabase.',
      technologies: ['Angular', 'TypeScript', 'Supabase', 'Tailwind CSS'],
      image: 'https://picsum.photos/id/160/800/600',
      demo: 'https://task-manager-demo.com',
      github: 'https://github.com/yourusername/task-manager'
    },
    {
      name: 'E-Learning Portal',
      description: 'Educational platform with video courses, quizzes, and progress tracking using Angular and Node.js.',
      technologies: ['Angular', 'Node.js', 'PostgreSQL', 'Express.js'],
      image: 'https://picsum.photos/id/100/800/600',
      demo: 'https://elearning-demo.com',
      github: 'https://github.com/yourusername/elearning'
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
