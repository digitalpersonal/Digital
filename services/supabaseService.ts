import { MockService } from './mockData';

// Exporting MockService as SupabaseService to maintain compatibility
// while the application is in "demo mode" without a real backend.
export const SupabaseService = MockService;
