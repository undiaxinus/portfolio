import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

// Type declaration for Supabase
declare module '@supabase/supabase-js';

export interface VisitorRecord {
  id?: number;
  ip: string;
  country_name: string;
  region_name: string;
  city: string;
  latitude: number;
  longitude: number;
  timezone: string;
  user_agent: string;
  timestamp: string;
  created_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseAnonKey
    );
  }

  /**
   * Save visitor data to Supabase
   */
  async saveVisitor(visitorData: VisitorRecord): Promise<boolean> {
    try {
      const { data, error } = await this.supabase
        .from('visitors')
        .insert([
          {
            ip: visitorData.ip,
            country_name: visitorData.country_name,
            region_name: visitorData.region_name,
            city: visitorData.city,
            latitude: visitorData.latitude,
            longitude: visitorData.longitude,
            timezone: visitorData.timezone,
            user_agent: visitorData.user_agent,
            timestamp: visitorData.timestamp
          }
        ]);

      if (error) {
        console.error('Error saving visitor to Supabase:', error);
        return false;
      }

      console.log('Visitor saved to Supabase:', data);
      return true;
    } catch (error) {
      console.error('Error in saveVisitor:', error);
      return false;
    }
  }

  /**
   * Get all visitors from Supabase
   */
  async getVisitors(): Promise<VisitorRecord[]> {
    try {
      const { data, error } = await this.supabase
        .from('visitors')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching visitors from Supabase:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getVisitors:', error);
      return [];
    }
  }

  /**
   * Check if visitor with same IP visited recently (within 1 hour)
   */
  async hasRecentVisit(ip: string): Promise<boolean> {
    try {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
      
      const { data, error } = await this.supabase
        .from('visitors')
        .select('id')
        .eq('ip', ip)
        .gte('created_at', oneHourAgo)
        .limit(1);

      if (error) {
        console.error('Error checking recent visit:', error);
        return false;
      }

      return (data && data.length > 0);
    } catch (error) {
      console.error('Error in hasRecentVisit:', error);
      return false;
    }
  }

  /**
   * Clear all visitor data (for admin use)
   */
  async clearAllVisitors(): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from('visitors')
        .delete()
        .neq('id', 0); // Delete all records

      if (error) {
        console.error('Error clearing visitors from Supabase:', error);
        return false;
      }

      console.log('All visitors cleared from Supabase');
      return true;
    } catch (error) {
      console.error('Error in clearAllVisitors:', error);
      return false;
    }
  }

  /**
   * Get visitor statistics
   */
  async getVisitorStats(): Promise<any> {
    try {
      const { data, error } = await this.supabase
        .from('visitors')
        .select('country_name, city, created_at');

      if (error) {
        console.error('Error fetching visitor stats:', error);
        return null;
      }

      // Process statistics
      const stats = {
        total: data?.length || 0,
        countries: {} as any,
        cities: {} as any,
        today: 0
      };

      const today = new Date().toDateString();

      data?.forEach((visitor: any) => {
        // Count by country
        stats.countries[visitor.country_name] = (stats.countries[visitor.country_name] || 0) + 1;
        
        // Count by city
        stats.cities[visitor.city] = (stats.cities[visitor.city] || 0) + 1;
        
        // Count today's visits
        if (visitor.created_at && new Date(visitor.created_at).toDateString() === today) {
          stats.today++;
        }
      });

      return stats;
    } catch (error) {
      console.error('Error in getVisitorStats:', error);
      return null;
    }
  }
}