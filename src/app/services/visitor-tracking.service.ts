import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { SupabaseService, VisitorRecord } from './supabase.service';

export interface VisitorData {
  id: string;
  ip: string;
  country: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  userAgent: string;
  referrer: string;
  timezone: string;
}

export interface IPLocationResponse {
  ip: string;
  country_name: string;
  region_name: string;
  city: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

@Injectable({
  providedIn: 'root'
})
export class VisitorTrackingService {
  private visitorsSubject = new BehaviorSubject<VisitorData[]>([]);
  public visitors$ = this.visitorsSubject.asObservable();

  constructor(
    private supabaseService: SupabaseService
  ) {
    this.loadVisitorsFromAPI();
  }

  /**
   * Track a new visitor automatically
   */
  async trackVisitor(): Promise<void> {
    try {
      // Get visitor's IP and location data
      const locationData = await this.getVisitorLocation();
      
      if (locationData) {
        const visitorData: VisitorData = {
          id: this.generateUniqueId(),
          ip: locationData.ip,
          country: locationData.country_name || 'Unknown',
          region: locationData.region_name || 'Unknown',
          city: locationData.city || 'Unknown',
          latitude: locationData.latitude || 0,
          longitude: locationData.longitude || 0,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          referrer: document.referrer || 'Direct',
          timezone: locationData.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone
        };

        this.saveVisitor(visitorData);
      }
    } catch (error) {
      console.error('Error tracking visitor:', error);
      // Fallback: save basic data without location
      this.saveBasicVisitorData();
    }
  }

  /**
   * Get visitor's location using IP geolocation API
   */
  private async getVisitorLocation(): Promise<IPLocationResponse | null> {
    try {
      // Check if we have a full geolocation API or just IP service
      if (environment.ipGeolocationApi.includes('ipapi.co')) {
        // Full geolocation service
        const response = await fetch(environment.ipGeolocationApi);
        const data = await response.json();
        return data || null;
      } else {
        // Simple IP service - get IP only
        const response = await fetch(environment.ipGeolocationApi);
        const ipResponse = await response.json();
        if (ipResponse?.ip) {
          return {
            ip: ipResponse.ip,
            country_name: 'Unknown',
            region_name: 'Unknown',
            city: 'Unknown',
            latitude: 0,
            longitude: 0,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
          };
        }
        return null;
      }
    } catch (error) {
      console.error('Error getting location:', error);
      return null;
    }
  }

  /**
   * Save basic visitor data as fallback
   */
  private saveBasicVisitorData(): void {
    const basicData: VisitorData = {
      id: this.generateUniqueId(),
      ip: 'Unknown',
      country: 'Unknown',
      region: 'Unknown',
      city: 'Unknown',
      latitude: 0,
      longitude: 0,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer || 'Direct',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };

    this.saveVisitor(basicData);
  }

  /**
   * Save visitor data to Supabase or fallback to localStorage
   */
  private async saveVisitor(visitorData: VisitorData): Promise<void> {
    console.log('saveVisitor called with data:', visitorData);
    console.log('Supabase URL:', environment.supabaseUrl);
    console.log('Supabase configured:', environment.supabaseUrl && environment.supabaseUrl !== 'YOUR_SUPABASE_URL');
    
    // Check if Supabase is configured
    if (environment.supabaseUrl && environment.supabaseUrl !== 'YOUR_SUPABASE_URL') {
      console.log('Using Supabase for visitor tracking');
      try {
        // Check for recent visits from same IP
        const hasRecent = await this.supabaseService.hasRecentVisit(visitorData.ip);
        if (hasRecent) {
          console.log('Recent visit detected, skipping save');
          return;
        }

        // Convert to VisitorRecord format
        const visitorRecord: VisitorRecord = {
          ip: visitorData.ip,
          country_name: visitorData.country,
          region_name: visitorData.region,
          city: visitorData.city,
          latitude: visitorData.latitude,
          longitude: visitorData.longitude,
          timezone: visitorData.timezone,
          user_agent: visitorData.userAgent,
          timestamp: visitorData.timestamp
        };

        const success = await this.supabaseService.saveVisitor(visitorRecord);
        if (success) {
          console.log('Visitor data saved to Supabase successfully');
          // Refresh the visitors list
          this.loadVisitorsFromAPI();
        } else {
          console.error('Failed to save visitor data to Supabase');
          // Fallback to localStorage
          this.saveToLocalStorage(visitorData);
        }
      } catch (error) {
        console.error('Error saving visitor data to Supabase:', error);
        // Fallback to localStorage
        this.saveToLocalStorage(visitorData);
      }
    } else {
      // No Supabase configured, save to localStorage directly
      console.log('Supabase not configured, using localStorage');
      this.saveToLocalStorage(visitorData);
    }
  }

  /**
   * Load visitors from Supabase or localStorage
   */
  private async loadVisitorsFromAPI(): Promise<void> {
    // Check if Supabase is configured
    if (environment.supabaseUrl && environment.supabaseUrl !== 'YOUR_SUPABASE_URL') {
      try {
        const visitors = await this.supabaseService.getVisitors();
        // Convert VisitorRecord to VisitorData format
        const visitorData: VisitorData[] = visitors.map(visitor => ({
          id: this.generateUniqueId(),
          ip: visitor.ip,
          country: visitor.country_name,
          region: visitor.region_name,
          city: visitor.city,
          latitude: visitor.latitude,
          longitude: visitor.longitude,
          timezone: visitor.timezone,
          userAgent: visitor.user_agent,
          referrer: 'Unknown',
          timestamp: visitor.timestamp
        }));
        this.visitorsSubject.next(visitorData);
        return;
      } catch (error) {
        console.error('Error loading visitors from Supabase:', error);
        // Fallback to localStorage
      }
    }

    // No Supabase configured, use localStorage directly
    this.loadVisitorsFromLocalStorage();
  }

  /**
   * Fallback: Save visitor to localStorage
   */
  private saveToLocalStorage(visitorData: VisitorData): void {
    try {
      const storageKey = 'portfolio_visitors';
      const stored = localStorage.getItem(storageKey);
      const visitors = stored ? JSON.parse(stored) : [];
      
      // Check for recent visits
      const recentVisit = visitors.find((visitor: VisitorData) => 
        visitor.ip === visitorData.ip && 
        new Date().getTime() - new Date(visitor.timestamp).getTime() < 3600000
      );
      
      if (!recentVisit) {
        visitors.push(visitorData);
        localStorage.setItem(storageKey, JSON.stringify(visitors));
        this.visitorsSubject.next(visitors);
      }
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  /**
   * Fallback: Load visitors from localStorage
   */
  private loadVisitorsFromLocalStorage(): void {
    try {
      const storageKey = 'portfolio_visitors';
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const visitors = JSON.parse(stored) as VisitorData[];
        this.visitorsSubject.next(visitors);
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  }

  /**
   * Generate unique ID for visitor
   */
  private generateUniqueId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  /**
   * Get all visitors
   */
  getVisitors(): VisitorData[] {
    return this.visitorsSubject.value;
  }

  /**
   * Get visitor statistics
   */
  getVisitorStats() {
    const visitors = this.visitorsSubject.value;
    const countries = [...new Set(visitors.map(v => v.country))];
    const cities = [...new Set(visitors.map(v => v.city))];
    
    return {
      totalVisitors: visitors.length,
      uniqueCountries: countries.length,
      uniqueCities: cities.length,
      countries: countries,
      cities: cities,
      recentVisitors: visitors.slice(-10).reverse() // Last 10 visitors
    };
  }

  /**
   * Clear all visitor data (admin function)
   */
  async clearVisitorData(): Promise<void> {
    // Check if Supabase is configured
    if (environment.supabaseUrl && environment.supabaseUrl !== 'YOUR_SUPABASE_URL') {
      try {
        const success = await this.supabaseService.clearAllVisitors();
        if (success) {
          console.log('Visitor data cleared from Supabase successfully');
          this.visitorsSubject.next([]);
        } else {
          console.error('Failed to clear visitor data from Supabase');
        }
        // Also clear localStorage
        localStorage.removeItem('portfolio_visitors');
      } catch (error) {
        console.error('Error clearing visitor data from Supabase:', error);
        // Clear localStorage anyway
        localStorage.removeItem('portfolio_visitors');
        this.visitorsSubject.next([]);
      }
    } else {
      // No Supabase configured, clear localStorage directly
      this.visitorsSubject.next([]);
      localStorage.removeItem('portfolio_visitors');
    }
  }

  /**
   * Refresh visitor data from API
   */
  refreshVisitorData(): void {
    this.loadVisitorsFromAPI();
  }

  /**
   * Export visitor data as JSON
   */
  exportVisitorData(): string {
    return JSON.stringify(this.visitorsSubject.value, null, 2);
  }
}