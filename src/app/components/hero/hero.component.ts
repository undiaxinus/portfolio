import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  personalInfo = {
    name: 'Jamille B. Anonuevo',
    title: 'Full Stack Developer',
    description: 'Passionate about creating innovative web solutions and turning ideas into reality.',
    location: 'Sto. Domingo, Albay, Philippines',
    profileImage: '../../assets/jamz.jpg'
  };
}
