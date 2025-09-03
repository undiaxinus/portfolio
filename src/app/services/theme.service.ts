import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'admin-theme';
  private themeSubject = new BehaviorSubject<Theme>(this.getStoredTheme());
  
  public theme$: Observable<Theme> = this.themeSubject.asObservable();

  constructor() {
    this.initializeTheme();
  }

  /**
   * Get the current theme
   */
  getCurrentTheme(): Theme {
    return this.themeSubject.value;
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme(): void {
    const newTheme: Theme = this.getCurrentTheme() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  /**
   * Set a specific theme
   */
  setTheme(theme: Theme): void {
    this.themeSubject.next(theme);
    this.saveTheme(theme);
    this.applyTheme(theme);
  }

  /**
   * Check if current theme is dark
   */
  isDarkMode(): boolean {
    return this.getCurrentTheme() === 'dark';
  }

  /**
   * Initialize theme on service creation
   */
  private initializeTheme(): void {
    const storedTheme = this.getStoredTheme();
    this.applyTheme(storedTheme);
  }

  /**
   * Get theme from localStorage or default to light
   */
  private getStoredTheme(): Theme {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem(this.THEME_KEY);
      if (stored === 'dark' || stored === 'light') {
        return stored as Theme;
      }
    }
    return 'light';
  }

  /**
   * Save theme to localStorage
   */
  private saveTheme(theme: Theme): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.THEME_KEY, theme);
    }
  }

  /**
   * Apply theme to document
   */
  private applyTheme(theme: Theme): void {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      
      if (theme === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.add('light');
        root.classList.remove('dark');
      }
      
      // Set data attribute for CSS targeting
      root.setAttribute('data-theme', theme);
    }
  }

  /**
   * Get theme-specific colors for map styling
   */
  getMapThemeColors(): {
    background: string;
    text: string;
    accent: string;
    border: string;
  } {
    const isDark = this.isDarkMode();
    
    return {
      background: isDark ? '#1f2937' : '#ffffff',
      text: isDark ? '#f9fafb' : '#111827',
      accent: isDark ? '#3b82f6' : '#2563eb',
      border: isDark ? '#374151' : '#e5e7eb'
    };
  }

  /**
   * Get Leaflet map style URL based on current theme
   */
  getMapStyleUrl(): string {
    const isDark = this.isDarkMode();
    
    if (isDark) {
      // Dark theme map style
      return 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
    } else {
      // Light theme map style
      return 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
    }
  }

  /**
   * Get map attribution based on theme
   */
  getMapAttribution(): string {
    return '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
  }
}