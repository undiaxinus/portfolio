import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { VisitorData } from './visitor-tracking.service';
import { Theme } from './theme.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map: L.Map | null = null;
  private markers: L.Marker[] = [];
  private currentTileLayer: L.TileLayer | null = null;
  private currentTheme: Theme = 'light';

  constructor() {
    // Fix for default markers in Leaflet
    this.fixLeafletIcons();
  }

  /**
   * Initialize the map
   */
  initMap(containerId: string, theme: Theme = 'light'): L.Map {
    // Default center (Philippines)
    const defaultLat = 12.8797;
    const defaultLng = 121.7740;

    this.currentTheme = theme;

    this.map = L.map(containerId, {
      center: [defaultLat, defaultLng],
      zoom: 6,
      zoomControl: true,
      scrollWheelZoom: true,
      preferCanvas: true
    });

    // Add theme-appropriate tile layer
    this.addTileLayer(theme);

    // Apply theme-specific styling
    this.applyMapTheme(theme);

    return this.map;
  }

  /**
   * Add visitor markers to the map
   */
  addVisitorMarkers(visitors: VisitorData[]): void {
    if (!this.map) return;

    // Clear existing markers
    this.clearMarkers();

    // Filter visitors with valid coordinates
    const validVisitors = visitors.filter(visitor => 
      (visitor.latitude !== 0 && visitor.longitude !== 0 && visitor.latitude && visitor.longitude) ||
      (visitor.gps_latitude !== undefined && visitor.gps_longitude !== undefined && 
       visitor.gps_latitude !== 0 && visitor.gps_longitude !== 0)
    );

    if (validVisitors.length === 0) return;

    // Create markers for each visitor
    validVisitors.forEach(visitor => {
      // Create IP-based marker if available
      if (visitor.latitude && visitor.longitude && visitor.latitude !== 0 && visitor.longitude !== 0) {
        const ipMarker = this.createVisitorMarker(visitor, 'ip');
        if (ipMarker) {
          this.markers.push(ipMarker);
          ipMarker.addTo(this.map!);
        }
      }

      // Create GPS-based marker if available
      if (visitor.gps_latitude && visitor.gps_longitude && 
          visitor.gps_latitude !== 0 && visitor.gps_longitude !== 0) {
        const gpsMarker = this.createVisitorMarker(visitor, 'gps');
        if (gpsMarker) {
          this.markers.push(gpsMarker);
          gpsMarker.addTo(this.map!);
        }
      }

      // Create connection line if both IP and GPS coordinates are available
      if (visitor.latitude && visitor.longitude && visitor.latitude !== 0 && visitor.longitude !== 0 &&
          visitor.gps_latitude && visitor.gps_longitude && 
          visitor.gps_latitude !== 0 && visitor.gps_longitude !== 0) {
        this.createConnectionLine(visitor);
      }
    });

    // Fit map to show all markers
    if (this.markers.length > 0) {
      const group = new L.FeatureGroup(this.markers);
      this.map.fitBounds(group.getBounds().pad(0.1));
    }
  }

  /**
   * Create a marker for a visitor
   */
  private createVisitorMarker(visitor: VisitorData, locationType: 'ip' | 'gps' = 'ip'): L.Marker | null {
    let lat: number, lng: number;
    
    if (locationType === 'gps') {
      if (!visitor.gps_latitude || !visitor.gps_longitude) return null;
      lat = visitor.gps_latitude;
      lng = visitor.gps_longitude;
    } else {
      if (!visitor.latitude || !visitor.longitude) return null;
      lat = visitor.latitude;
      lng = visitor.longitude;
    }

    // Create custom icon based on country and location type
    const icon = this.createLocationIcon(visitor.country, locationType);
    
    const marker = L.marker([lat, lng], { icon });

    // Create popup content
    const popupContent = this.createPopupContent(visitor, locationType);
    marker.bindPopup(popupContent, {
      maxWidth: 300,
      className: 'visitor-popup'
    });

    return marker;
  }

  /**
   * Create connection line between IP and GPS coordinates
   */
  private createConnectionLine(visitor: VisitorData): void {
    if (!this.map || !visitor.latitude || !visitor.longitude || 
        !visitor.gps_latitude || !visitor.gps_longitude) return;

    const ipCoords: [number, number] = [visitor.latitude, visitor.longitude];
    const gpsCoords: [number, number] = [visitor.gps_latitude, visitor.gps_longitude];

    // Create a polyline connecting IP and GPS locations
    const connectionLine = L.polyline([ipCoords, gpsCoords], {
      color: this.currentTheme === 'dark' ? '#60A5FA' : '#3B82F6',
      weight: 2,
      opacity: 0.7,
      dashArray: '5, 10'
    });

    connectionLine.addTo(this.map);
    this.markers.push(connectionLine as any); // Add to markers for cleanup
  }

  /**
   * Create custom icon for country and location type
   */
  private createLocationIcon(country: string, locationType: 'ip' | 'gps'): L.DivIcon {
    return locationType === 'gps' ? this.createGPSIcon(country) : this.createCountryIcon(country);
  }

  /**
   * Create custom icon for country (IP-based location)
   */
  private createCountryIcon(country: string): L.DivIcon {
    const countryColors: { [key: string]: string } = {
      'Philippines': '#FF6B6B',
      'United States': '#4ECDC4',
      'United Kingdom': '#45B7D1',
      'Canada': '#96CEB4',
      'Australia': '#FFEAA7',
      'Germany': '#DDA0DD',
      'France': '#98D8C8',
      'Japan': '#F7DC6F',
      'South Korea': '#BB8FCE',
      'China': '#F8C471',
      'India': '#82E0AA',
      'Singapore': '#85C1E9',
      'Malaysia': '#F9E79F',
      'Thailand': '#D7BDE2',
      'Indonesia': '#A9DFBF',
      'Vietnam': '#F5B7B1'
    };

    const color = countryColors[country] || '#95A5A6';
    const borderColor = this.currentTheme === 'dark' ? '#374151' : 'white';
    const shadowColor = this.currentTheme === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.3)';

    return L.divIcon({
      className: 'custom-marker ip-marker',
      html: `
        <div style="
          background-color: ${color};
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: 3px solid ${borderColor};
          box-shadow: 0 3px 6px ${shadowColor};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          color: white;
          font-weight: bold;
          transition: all 0.3s ease;
        ">
          ${this.getCountryFlag(country)}
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -14]
    });
  }

  /**
   * Create custom GPS icon
   */
  private createGPSIcon(country: string): L.DivIcon {
    const borderColor = this.currentTheme === 'dark' ? '#374151' : 'white';
    const shadowColor = this.currentTheme === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.3)';
    const gpsColor = '#10B981'; // Green color for GPS

    return L.divIcon({
      className: 'custom-marker gps-marker',
      html: `
        <div style="
          background-color: ${gpsColor};
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: 3px solid ${borderColor};
          box-shadow: 0 3px 6px ${shadowColor};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          color: white;
          font-weight: bold;
          transition: all 0.3s ease;
        ">
          📍
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -14]
    });
  }

  /**
   * Create popup content for visitor
   */
  private createPopupContent(visitor: VisitorData, locationType: 'ip' | 'gps' = 'ip'): string {
    // Use GPS address data if available, otherwise fall back to IP location data
    let location = '';
    if (locationType === 'gps' && (visitor as any).gps_address) {
      location = (visitor as any).gps_address;
    } else if (locationType === 'gps' && ((visitor as any).gps_city || (visitor as any).gps_region || (visitor as any).gps_country)) {
      const gpsCity = (visitor as any).gps_city || 'Unknown';
      const gpsRegion = (visitor as any).gps_region || 'Unknown';
      const gpsCountry = (visitor as any).gps_country || 'Unknown';
      location = `${gpsCity}, ${gpsRegion}, ${gpsCountry}`;
    } else {
      const locationParts = [visitor.city, visitor.region, visitor.country]
        .filter(part => part && part !== 'Unknown');
      location = locationParts.join(', ') || 'Unknown Location';
    }
    
    const timeAgo = this.getTimeAgo(visitor.timestamp);
    const formattedTime = new Date(visitor.timestamp).toLocaleString();

    // Theme-aware colors
    const isDark = this.currentTheme === 'dark';
    const titleColor = isDark ? '#f9fafb' : '#2c3e50';
    const textColor = isDark ? '#d1d5db' : '#7f8c8d';
    const subtleColor = isDark ? '#9ca3af' : '#95a5a6';
    const bgColor = isDark ? '#374151' : '#ffffff';

    // Get coordinates based on location type
    const lat = locationType === 'gps' ? visitor.gps_latitude : visitor.latitude;
    const lng = locationType === 'gps' ? visitor.gps_longitude : visitor.longitude;
    const locationTypeLabel = locationType === 'gps' ? 'GPS Location' : 'IP Location';
    const locationIcon = locationType === 'gps' ? '📍' : this.getCountryFlag(visitor.country);

    return `
      <div class="visitor-popup-content" style="background-color: ${bgColor}; border-radius: 8px; padding: 12px;">
        <div style="font-weight: bold; margin-bottom: 8px; color: ${titleColor}; font-size: 14px;">
          ${locationIcon} ${location}
        </div>
        <div style="font-size: 12px; color: ${textColor}; margin-bottom: 4px;">
          <strong>Type:</strong> ${locationTypeLabel}
        </div>
        <div style="font-size: 12px; color: ${textColor}; margin-bottom: 4px;">
          <strong>Coordinates:</strong> ${lat?.toFixed(4)}, ${lng?.toFixed(4)}
        </div>
        <div style="font-size: 12px; color: ${textColor}; margin-bottom: 4px;">
          <strong>IP:</strong> ${visitor.ip}
        </div>
        <div style="font-size: 12px; color: ${textColor}; margin-bottom: 4px;">
          <strong>Time:</strong> ${timeAgo}
        </div>
        <div style="font-size: 11px; color: ${subtleColor};">
          ${formattedTime}
        </div>
        <div style="font-size: 11px; color: ${subtleColor}; margin-top: 4px;">
          <strong>Referrer:</strong> ${visitor.referrer}
        </div>
      </div>
    `;
  }

  /**
   * Get country flag emoji
   */
  private getCountryFlag(country: string): string {
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
   * Get time ago string
   */
  private getTimeAgo(timestamp: string): string {
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

  /**
   * Clear all markers from the map
   */
  private clearMarkers(): void {
    this.markers.forEach(marker => {
      if (this.map) {
        this.map.removeLayer(marker);
      }
    });
    this.markers = [];
  }

  /**
   * Destroy the map
   */
  destroyMap(): void {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
    this.markers = [];
  }

  /**
   * Fix Leaflet default icon issue
   */
  private fixLeafletIcons(): void {
    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';
    const iconDefault = L.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = iconDefault;
  }

  /**
   * Add tile layer based on theme
   */
  private addTileLayer(theme: Theme): void {
    if (!this.map) return;

    // Remove existing tile layer
    if (this.currentTileLayer) {
      this.map.removeLayer(this.currentTileLayer);
    }

    const tileUrl = theme === 'dark' 
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

    this.currentTileLayer = L.tileLayer(tileUrl, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 18,
      subdomains: 'abcd'
    });

    this.currentTileLayer.addTo(this.map);
  }

  /**
   * Apply theme-specific styling to map
   */
  private applyMapTheme(theme: Theme): void {
    if (!this.map) return;

    const mapContainer = this.map.getContainer();
    if (mapContainer) {
      mapContainer.classList.remove('map-light', 'map-dark');
      mapContainer.classList.add(`map-${theme}`);
    }
  }

  /**
   * Update map theme
   */
  updateMapTheme(theme: Theme): void {
    if (!this.map || this.currentTheme === theme) return;

    this.currentTheme = theme;
    this.addTileLayer(theme);
    this.applyMapTheme(theme);

    // Recreate markers with new theme
    const currentVisitors = this.markers.map(marker => {
      const popup = marker.getPopup();
      return popup ? popup.getContent() : null;
    }).filter(content => content);

    // Clear and recreate markers if we have visitor data
    if (this.markers.length > 0) {
      this.clearMarkers();
      // Note: This would need visitor data to recreate markers
      // The calling component should call addVisitorMarkers again
    }
  }

  /**
   * Get current theme
   */
  getCurrentTheme(): Theme {
    return this.currentTheme;
  }

  /**
   * Get map instance
   */
  getMap(): L.Map | null {
    return this.map;
  }
}