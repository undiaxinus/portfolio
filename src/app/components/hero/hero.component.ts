import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VisitorTrackingService } from '../../services/visitor-tracking.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit {
  personalInfo = {
    name: 'Jamille B. Añonuevo',
    title: 'Full Stack Developer',
    description: 'Passionate about creating innovative web solutions and turning ideas into reality.',
    location: 'Sto. Domingo, Albay, Philippines',
    profileImage: '../../assets/jamz.jpg'
  };

  constructor(private visitorTrackingService: VisitorTrackingService) {}

  ngOnInit(): void {
    // Track visitor when hero page loads
    this.visitorTrackingService.trackVisitor();
  }
}
