import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { profile } from '../../data/profile';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  personalInfo = {
    ...profile,
    description: profile.summary,
    profileImage: '../../assets/jamz.jpg'
  };
}
