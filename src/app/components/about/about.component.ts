import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { profile, skills, education, experiences } from '../../data/profile';

interface Experience {
  year: string;
  title: string;
  company: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  showCertificateModal = false;

  profile = profile;
  skills = skills;
  education = education;
  experiences: Experience[] = experiences.map(exp => ({
    year: exp.period,
    title: exp.position,
    company: exp.company,
    description: exp.responsibilities.join(' '),
    image: exp.image
  }));

  openCertificateModal(): void {
    this.showCertificateModal = true;
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  }

  closeCertificateModal(): void {
    this.showCertificateModal = false;
    // Restore body scroll when modal is closed
    document.body.style.overflow = 'auto';
  }
}
