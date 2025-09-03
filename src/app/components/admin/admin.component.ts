import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VisitorTrackingService, VisitorData } from '../../services/visitor-tracking.service';
import { MapService } from '../../services/map.service';
import { ThemeService, Theme } from '../../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit, OnDestroy, AfterViewInit {
  isAuthenticated = false;
  password = '';
  adminPassword = 'admin123'; // In production, this should be environment-based
  visitors: VisitorData[] = [];
  visitorStats: any = {};
  showMap = false;
  selectedVisitor: VisitorData | null = null;
  currentTheme: Theme = 'light';
  isDarkMode = false;
  private subscription: Subscription = new Subscription();
  private mapInitialized = false;

  constructor(
    private visitorTrackingService: VisitorTrackingService,
    private mapService: MapService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    // Initialize theme
    this.currentTheme = this.themeService.getCurrentTheme();
    this.isDarkMode = this.themeService.isDarkMode();
    
    // Subscribe to theme changes
    this.subscription.add(
      this.themeService.theme$.subscribe(theme => {
        this.currentTheme = theme;
        this.isDarkMode = theme === 'dark';
        
        // Update map theme if map is initialized
        if (this.mapInitialized && this.showMap) {
          this.updateMapTheme();
        }
      })
    );
    
    // Check if already authenticated
    const authStatus = sessionStorage.getItem('admin_authenticated');
    if (authStatus === 'true') {
      this.isAuthenticated = true;
      this.loadVisitorData();
    }
  }

  ngAfterViewInit(): void {
    // Initialize map after view is ready if authenticated and map is shown
    if (this.isAuthenticated && this.showMap) {
      this.initializeMap();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.mapService.destroyMap();
  }

  /**
   * Authenticate admin user
   */
  authenticate(): void {
    if (this.password === this.adminPassword) {
      this.isAuthenticated = true;
      sessionStorage.setItem('admin_authenticated', 'true');
      this.loadVisitorData();
      this.password = ''; // Clear password field
    } else {
      alert('Invalid password!');
      this.password = '';
    }
  }

  /**
   * Logout admin user
   */
  logout(): void {
    this.isAuthenticated = false;
    sessionStorage.removeItem('admin_authenticated');
    this.visitors = [];
    this.visitorStats = {};
    this.showMap = false;
  }

  /**
   * Load visitor data and statistics
   */
  private loadVisitorData(): void {
    this.subscription.add(
      this.visitorTrackingService.visitors$.subscribe(visitors => {
        this.visitors = visitors;
        this.visitorStats = this.visitorTrackingService.getVisitorStats();
        
        // Update map if it's initialized
        this.updateMap();
      })
    );
  }

  /**
   * Toggle map view
   */
  toggleMap(): void {
    this.showMap = !this.showMap;
    
    if (this.showMap && !this.mapInitialized) {
      // Wait for DOM to update before initializing map
      setTimeout(() => {
        this.initializeMap();
      }, 100);
    } else if (!this.showMap) {
      this.mapService.destroyMap();
      this.mapInitialized = false;
    }
  }

  /**
   * Initialize the map
   */
  private initializeMap(): void {
    try {
      const mapElement = document.getElementById('visitor-map');
      if (mapElement && !this.mapInitialized) {
        // Clear the placeholder content
        mapElement.innerHTML = '';
        
        // Initialize the map with current theme
        this.mapService.initMap('visitor-map', this.currentTheme);
        this.mapService.addVisitorMarkers(this.visitors);
        this.mapInitialized = true;
      }
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }

  /**
   * Update map with current visitor data
   */
  private updateMap(): void {
    if (this.mapInitialized && this.showMap) {
      this.mapService.addVisitorMarkers(this.visitors);
    }
  }

  /**
   * Update map theme when theme changes
   */
  private updateMapTheme(): void {
    if (this.mapInitialized && this.showMap) {
      this.mapService.updateMapTheme(this.currentTheme);
      // Re-add visitor markers with new theme
      this.mapService.addVisitorMarkers(this.visitors);
    }
  }



  /**
   * TrackBy function for visitor list performance
   */
  trackByVisitorId(index: number, visitor: VisitorData): string {
    return visitor.id;
  }

  /**
   * Select visitor for detailed view
   */
  selectVisitor(visitor: VisitorData): void {
    this.selectedVisitor = visitor;
  }

  /**
   * Close visitor details
   */
  closeVisitorDetails(): void {
    this.selectedVisitor = null;
  }

  /**
   * Export visitor data
   */
  exportData(): void {
    const dataStr = this.visitorTrackingService.exportVisitorData();
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `visitor-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  /**
   * Refresh visitor data from API
   */
  refreshData(): void {
    this.visitorTrackingService.refreshVisitorData();
  }

  /**
   * Clear all visitor data
   */
  clearData(): void {
    if (confirm('Are you sure you want to clear all visitor data? This action cannot be undone.')) {
      this.visitorTrackingService.clearVisitorData();
      this.selectedVisitor = null;
    }
  }

  /**
   * Get country flag emoji
   */
  getCountryFlag(country: string): string {
    const countryFlags: { [key: string]: string } = {
      'Philippines': '🇵🇭',
      'United States': '🇺🇸',
      'United Kingdom': '🇬🇧',
      'Canada': '🇨🇦',
      'Australia': '🇦🇺',
      'Germany': '🇩🇪',
      'France': '🇫🇷',
      'Japan': '🇯🇵',
      'South Korea': '🇰🇷',
      'China': '🇨🇳',
      'India': '🇮🇳',
      'Singapore': '🇸🇬',
      'Malaysia': '🇲🇾',
      'Thailand': '🇹🇭',
      'Indonesia': '🇮🇩',
      'Vietnam': '🇻🇳'
    };
    return countryFlags[country] || '🌍';
  }

  /**
   * Format timestamp
   */
  formatTimestamp(timestamp: string): string {
    return new Date(timestamp).toLocaleString();
  }

  /**
   * Get visitor location string
   */
  getLocationString(visitor: VisitorData): string {
    const parts = [visitor.city, visitor.region, visitor.country].filter(part => part && part !== 'Unknown');
    return parts.join(', ') || 'Unknown Location';
  }

  /**
   * Get time ago string
   */
  getTimeAgo(timestamp: string): string {
    const now = new Date().getTime();
    const visitTime = new Date(timestamp).getTime();
    const diffMs = now - visitTime;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  }
}