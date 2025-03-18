import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export class TestimonialsComponent {
  testimonials = [
    {
      content: 'Exceptional work on our e-commerce platform. The attention to detail and responsive design made our online store stand out. Highly recommended for any web development project.',
      name: 'Maria Garcia',
      role: 'CEO, TechStyle Shop',
      avatar: 'https://i.pravatar.cc/150?img=5',
      rating: 5
    },
    {
      content: 'Created an amazing IoT solution for our smart home project. The Arduino integration was flawless, and the web interface is user-friendly. Great technical expertise!',
      name: 'John Anderson',
      role: 'CTO, Smart Living Inc.',
      avatar: 'https://i.pravatar.cc/150?img=8',
      rating: 5
    },
    {
      content: 'Delivered our database management system ahead of schedule. The optimization techniques implemented significantly improved our application performance.',
      name: 'Sarah Chen',
      role: 'Project Manager, DataFlow Solutions',
      avatar: 'https://i.pravatar.cc/150?img=9',
      rating: 5
    },
    {
      content: 'Outstanding work on our company website. The modern design and smooth functionality exceeded our expectations. A pleasure to work with!',
      name: 'David Kim',
      role: 'Marketing Director, Innovation Labs',
      avatar: 'https://i.pravatar.cc/150?img=12',
      rating: 5
    }
  ];

  // Helper method to generate star rating array
  generateStars(rating: number): number[] {
    return Array(rating).fill(0);
  }
}
