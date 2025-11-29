import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { SupabaseService, VisitorRecord } from './supabase.service';

export interface Visitor {
  id: string;
  ip: string;
  local_ip?: string; // Private/local IP address
  country: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;
  gps_latitude?: number; // Real GPS coordinates
  gps_longitude?: number; // Real GPS coordinates
  gps_country?: string; // GPS-based country
  gps_region?: string; // GPS-based region
  gps_city?: string; // GPS-based city
  gps_address?: string; // Full GPS address
  location_source?: 'ip' | 'gps' | 'both'; // Source of location data
  timezone: string;
  timestamp: string;
  referrer: string;
  userAgent: string;
}

export interface IPLocationResponse {
  ip: string;
  local_ip?: string; // Private/local IP address
  country_name: string;
  region_name: string;
  city: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

// Type alias for backward compatibility
export type VisitorData = Visitor;

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
   * Track a new visitor automatically with both IP and GPS location
   */
  async trackVisitor(): Promise<void> {
    try {
      // Get visitor's IP and location data
      const locationData = await this.getVisitorLocation();
      
      // Try to get GPS coordinates with user permission (optional)
      let gpsData = null;
      try {
        gpsData = await this.getGPSLocation();
      } catch (error) {
        console.log('📍 GPS location not available, using IP location only');
      }
      
      if (locationData) {
        const visitorData: VisitorData = {
          id: this.generateUniqueId(),
          ip: locationData.ip,
          local_ip: locationData.local_ip,
          country: locationData.country_name || 'Unknown',
          region: locationData.region_name || 'Unknown',
          city: locationData.city || 'Unknown',
          latitude: locationData.latitude || 0,
          longitude: locationData.longitude || 0,
          gps_latitude: gpsData?.latitude,
          gps_longitude: gpsData?.longitude,
          gps_country: gpsData?.country,
          gps_region: gpsData?.region,
          gps_city: gpsData?.city,
          gps_address: gpsData?.address,
          location_source: this.determineLocationSource(locationData, gpsData),
          timezone: locationData.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
          timestamp: new Date().toISOString(),
          referrer: document.referrer || 'Direct',
          userAgent: navigator.userAgent
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
   * Request location permission from user with a friendly prompt
   */
  async requestLocationPermission(): Promise<boolean> {
    if (!navigator.geolocation) {
      console.warn('🚫 Geolocation is not supported by this browser');
      return false;
    }

    // Show a user-friendly notification
    const userConsent = confirm(
      '📍 Would you like to share your precise location for better analytics? \n\n' +
      'This helps us understand our visitors better and is completely optional. \n' +
      'Your location data will be stored securely and used only for analytics purposes.'
    );

    if (!userConsent) {
      console.log('🚫 User declined location sharing');
      return false;
    }

    try {
      const position = await this.getGPSLocation();
      return position !== null;
    } catch (error) {
      console.error('❌ Error requesting location permission:', error);
      return false;
    }
  }

  /**
   * Get GPS coordinates with user permission
   */
  private async getGPSLocation(): Promise<{latitude: number, longitude: number, country?: string, region?: string, city?: string, address?: string} | null> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        console.warn('🚫 Geolocation is not supported by this browser');
        resolve(null);
        return;
      }

      console.log('📍 Requesting GPS location permission...');
      
      const options = {
        enableHighAccuracy: true,
        timeout: 10000, // 10 seconds timeout
        maximumAge: 300000 // 5 minutes cache
      };

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          console.log('✅ GPS location obtained:', coords);
          
          // Get address from coordinates using reverse geocoding
          const addressData = await this.reverseGeocode(coords.latitude, coords.longitude);
          
          resolve({
            ...coords,
            ...addressData
          });
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.warn('🚫 User denied the request for Geolocation.');
              break;
            case error.POSITION_UNAVAILABLE:
              console.warn('📍 Location information is unavailable.');
              break;
            case error.TIMEOUT:
              console.warn('⏰ The request to get user location timed out.');
              break;
            default:
              console.warn('❌ An unknown error occurred while retrieving location.');
              break;
          }
          resolve(null);
        },
        options
      );
    });
  }

  /**
   * Reverse geocode GPS coordinates to get address information
   */
  private async reverseGeocode(latitude: number, longitude: number): Promise<{country?: string, region?: string, city?: string, address?: string}> {
    try {
      // Using OpenStreetMap Nominatim API for reverse geocoding (free and no API key required)
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data && data.address) {
        const address = data.address;
        const fullAddress = data.display_name;
        
        return {
          country: address.country || 'Unknown',
          region: address.state || address.province || address.region || 'Unknown',
          city: address.city || address.town || address.village || address.municipality || 'Unknown',
          address: fullAddress || 'Unknown Address'
        };
      }
      
      console.warn('⚠️ No address data found for GPS coordinates');
      return {};
      
    } catch (error) {
      console.error('❌ Error in reverse geocoding:', error);
      return {};
    }
  }

  /**
   * Determine the source of location data
   */
  private determineLocationSource(ipData: any, gpsData: any): 'ip' | 'gps' | 'both' {
    if (ipData && gpsData) {
      return 'both';
    } else if (gpsData) {
      return 'gps';
    } else {
      return 'ip';
    }
  }

  /**
   * Get local/private IP address using WebRTC
   */
  private async getLocalIPAddress(): Promise<string | null> {
    return new Promise((resolve) => {
      try {
        const rtc = new RTCPeerConnection({
          iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        });
        
        rtc.createDataChannel('');
        
        rtc.onicecandidate = (event) => {
          if (event.candidate) {
            const candidate = event.candidate.candidate;
            const ipMatch = candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/);
            if (ipMatch) {
              const ip = ipMatch[1];
              // Check if it's a private IP (192.168.x.x, 10.x.x.x, 172.16-31.x.x)
              if (ip.startsWith('192.168.') || ip.startsWith('10.') || 
                  (ip.startsWith('172.') && parseInt(ip.split('.')[1]) >= 16 && parseInt(ip.split('.')[1]) <= 31)) {
                console.log(`🏠 Local IP found: ${ip}`);
                rtc.close();
                resolve(ip);
                return;
              }
            }
          }
        };
        
        rtc.createOffer().then(offer => rtc.setLocalDescription(offer));
        
        // Timeout after 3 seconds
        setTimeout(() => {
          rtc.close();
          resolve(null);
        }, 3000);
        
      } catch (error) {
        console.error('❌ Error getting local IP:', error);
        resolve(null);
      }
    });
  }

  /**
   * Get visitor's real public IP address using multiple reliable services
   */
  private async getRealIPAddress(): Promise<string | null> {
    // Use services that are known to work with CORS and return real public IPs
    const ipServices = [
      {
        url: 'https://api.ipify.org?format=json',
        ipField: 'ip'
      },
      {
        url: 'https://ipapi.co/json/',
        ipField: 'ip'
      },
      {
        url: 'https://api.seeip.org/jsonip',
        ipField: 'ip'
      },
      {
        url: 'https://ipinfo.io/json',
        ipField: 'ip'
      },
      {
        url: 'https://api.my-ip.io/ip.json',
        ipField: 'ip'
      }
    ];

    for (const service of ipServices) {
      try {
        console.log(`Trying to get IP from: ${service.url}`);
        const response = await fetch(service.url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          mode: 'cors'
        });
        
        if (!response.ok) {
          console.warn(`HTTP error from ${service.url}: ${response.status}`);
          continue;
        }
        
        const data = await response.json();
        const ip = data[service.ipField];
        
        if (ip && this.isValidPublicIP(ip)) {
          console.log(`✅ Real public IP obtained from ${service.url}:`, ip);
          return ip;
        } else {
          console.warn(`❌ Invalid or private IP from ${service.url}:`, ip);
        }
      } catch (error) {
        console.warn(`❌ Failed to get IP from ${service.url}:`, error);
        continue;
      }
    }
    
    console.error('❌ Failed to get real public IP from all services');
    return null;
  }

  /**
   * Validate if the IP address is a real public IP (not local/private)
   */
  private isValidPublicIP(ip: string): boolean {
    if (!ip || typeof ip !== 'string') {
      console.warn('Invalid IP format:', ip);
      return false;
    }
    
    // Basic IP format validation
    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (!ipRegex.test(ip)) {
      console.warn('IP format validation failed:', ip);
      return false;
    }
    
    // Check if it's not a private/local IP
    const parts = ip.split('.').map(Number);
    
    // Private IP ranges that should be rejected:
    // 10.0.0.0 - 10.255.255.255 (Class A private)
    if (parts[0] === 10) {
      console.warn('Private IP detected (10.x.x.x):', ip);
      return false;
    }
    
    // 172.16.0.0 - 172.31.255.255 (Class B private)
    if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) {
      console.warn('Private IP detected (172.16-31.x.x):', ip);
      return false;
    }
    
    // 192.168.0.0 - 192.168.255.255 (Class C private)
    if (parts[0] === 192 && parts[1] === 168) {
      console.warn('Private IP detected (192.168.x.x):', ip);
      return false;
    }
    
    // 127.0.0.0 - 127.255.255.255 (localhost)
    if (parts[0] === 127) {
      console.warn('Localhost IP detected (127.x.x.x):', ip);
      return false;
    }
    
    // 169.254.0.0 - 169.254.255.255 (link-local)
    if (parts[0] === 169 && parts[1] === 254) {
      console.warn('Link-local IP detected (169.254.x.x):', ip);
      return false;
    }
    
    // 0.0.0.0 - 0.255.255.255 (reserved)
    if (parts[0] === 0) {
      console.warn('Reserved IP detected (0.x.x.x):', ip);
      return false;
    }
    
    console.log('✅ Valid public IP:', ip);
    return true;
  }

  /**
   * Get visitor's location using IP geolocation API with both public and local IP
   */
  private async getVisitorLocation(): Promise<IPLocationResponse | null> {
    try {
      // Get both public and local IP addresses
      console.log('🔍 Getting IP addresses...');
      
      const [realIP, localIP] = await Promise.all([
        this.getRealIPAddress(),
        this.getLocalIPAddress()
      ]);
      
      if (!realIP) {
        console.error('❌ Could not obtain real public IP address');
        return null;
      }

      console.log(`🌍 Public IP: ${realIP}`);
      console.log(`🏠 Local IP: ${localIP || 'Not found'}`);
      console.log(`🌍 Getting location data for IP: ${realIP}`);
      
      // Now get location data for this IP using multiple services
      const locationServices = [
        {
          url: `https://ipapi.co/${realIP}/json/`,
          name: 'ipapi.co'
        },
        {
          url: `https://ipinfo.io/${realIP}/json`,
          name: 'ipinfo.io'
        },
        {
          url: `http://ip-api.com/json/${realIP}`,
          name: 'ip-api.com'
        }
      ];

      for (const service of locationServices) {
        try {
          console.log(`🔍 Trying location service: ${service.name}`);
          const response = await fetch(service.url, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
            },
            mode: 'cors'
          });
          
          if (!response.ok) {
            console.warn(`❌ HTTP error from ${service.name}: ${response.status}`);
            continue;
          }
          
          const data = await response.json();
          
          // Check for API errors
          if (data.error || data.status === 'fail') {
            console.warn(`❌ API error from ${service.name}:`, data.error || data.message);
            continue;
          }
          
          // Normalize the response format
          if (data && realIP) {
            const locationData = {
              ip: realIP,
              local_ip: localIP || undefined,
              country_name: data.country_name || data.country || 'Unknown',
              region_name: data.region_name || data.regionName || data.region || 'Unknown',
              city: data.city || 'Unknown',
              latitude: data.latitude || data.lat || 0,
              longitude: data.longitude || data.lon || data.lng || 0,
              timezone: data.timezone || data.timezone_name || Intl.DateTimeFormat().resolvedOptions().timeZone
            };
            
            console.log(`✅ Location data obtained from ${service.name}:`, locationData);
            return locationData;
          }
        } catch (error) {
          console.warn(`❌ Failed to get location from ${service.name}:`, error);
          continue;
        }
      }
      
      // If all location services fail, return basic data with real IP
      console.warn('⚠️ All location services failed, returning basic data');
      return {
        ip: realIP,
        local_ip: localIP || undefined,
        country_name: 'Unknown',
        region_name: 'Unknown',
        city: 'Unknown',
        latitude: 0,
        longitude: 0,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };
      
    } catch (error) {
      console.error('❌ Error getting location:', error);
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
      local_ip: undefined,
      country: 'Unknown',
      region: 'Unknown',
      city: 'Unknown',
      latitude: 0,
      longitude: 0,
      gps_latitude: undefined,
      gps_longitude: undefined,
      location_source: 'ip',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timestamp: new Date().toISOString(),
      referrer: document.referrer || 'Direct',
      userAgent: navigator.userAgent
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
          local_ip: visitorData.local_ip,
          country_name: visitorData.country,
          region_name: visitorData.region,
          city: visitorData.city,
          latitude: visitorData.latitude,
          longitude: visitorData.longitude,
          gps_latitude: visitorData.gps_latitude,
          gps_longitude: visitorData.gps_longitude,
          location_source: visitorData.location_source,
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
          local_ip: visitor.local_ip,
          country: visitor.country_name,
          region: visitor.region_name,
          city: visitor.city,
          latitude: visitor.latitude,
          longitude: visitor.longitude,
          gps_latitude: visitor.gps_latitude,
          gps_longitude: visitor.gps_longitude,
          location_source: visitor.location_source || 'ip',
          timezone: visitor.timezone,
          timestamp: visitor.timestamp,
          referrer: 'Unknown',
          userAgent: visitor.user_agent
        }));
        
        // Remove duplicate IP addresses, keeping only the most recent visit per IP
        const uniqueVisitors = this.removeDuplicateIPs(visitorData);
        this.visitorsSubject.next(uniqueVisitors);
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
      
      // Check if IP already exists (prevent duplicates)
      const existingVisit = visitors.find((visitor: VisitorData) => 
        visitor.ip === visitorData.ip
      );
      
      if (!existingVisit) {
        visitors.push(visitorData);
        localStorage.setItem(storageKey, JSON.stringify(visitors));
        // Apply duplicate removal before updating the subject
        const uniqueVisitors = this.removeDuplicateIPs(visitors);
        this.visitorsSubject.next(uniqueVisitors);
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
        // Remove duplicate IP addresses, keeping only the most recent visit per IP
        const uniqueVisitors = this.removeDuplicateIPs(visitors);
        this.visitorsSubject.next(uniqueVisitors);
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  }

  /**
   * Remove duplicate IP addresses, keeping only the most recent visit per IP
   */
  private removeDuplicateIPs(visitors: VisitorData[]): VisitorData[] {
    const ipMap = new Map<string, VisitorData>();
    
    // Sort visitors by timestamp (most recent first)
    const sortedVisitors = visitors.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    
    // Keep only the most recent visit per IP address
    sortedVisitors.forEach(visitor => {
      if (!ipMap.has(visitor.ip)) {
        ipMap.set(visitor.ip, visitor);
      }
    });
    
    // Convert back to array and sort by timestamp (most recent first)
    return Array.from(ipMap.values()).sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
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