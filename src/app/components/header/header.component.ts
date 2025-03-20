import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Add a tooltip notification to inform users about the shortcuts
    this.showShortcutTooltip();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
  }

  // Handle keyboard shortcuts
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // Ctrl+R for Resume
    if (event.ctrlKey && event.key === 'r') {
      event.preventDefault(); // Prevent browser refresh
      this.router.navigate(['/resume']);
    }
    
    // Ctrl+L for Login
    if (event.ctrlKey && event.key === 'l') {
      event.preventDefault(); // Prevent browser focus on address bar
      this.router.navigate(['/login']);
    }
  }

  // Show a temporary tooltip to inform users about the shortcuts
  private showShortcutTooltip() {
    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.innerHTML = 
      '<div style="margin-bottom:5px"><strong>Ctrl+R</strong> - View Resume</div>';
    tooltip.style.position = 'fixed';
    tooltip.style.bottom = '20px';
    tooltip.style.right = '20px';
    tooltip.style.padding = '12px 15px';
    tooltip.style.background = 'rgba(1, 85, 81, 0.9)';
    tooltip.style.color = '#FDFBEE';
    tooltip.style.borderRadius = '6px';
    tooltip.style.zIndex = '9999';
    tooltip.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    tooltip.style.fontSize = '14px';
    tooltip.style.transition = 'opacity 0.5s ease-in-out';
    
    // Add to document
    document.body.appendChild(tooltip);
    
    // Remove after 5 seconds
    setTimeout(() => {
      tooltip.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(tooltip);
      }, 500);
    }, 5000);
  }
}
