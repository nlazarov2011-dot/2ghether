import { createClient } from '@supabase/supabase-js';

// IMPORTANT: It must use 'import.meta.env' to read the keys from Vercel
const env = (import.meta as any).env || {};

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.VITE_SUPABASE_ANON_KEY;

// Check configuration. 
// If keys are missing or it's the default placeholder, we switch to Mock Mode.
const isConfigured = supabaseUrl && supabaseKey && supabaseUrl !== 'https://placeholder.supabase.co';

// --- MOCK CLIENT ---
// Handles authentication in memory/localStorage when backend is unavailable.
// This ensures the UI works for demos without crashing on network requests.
const MOCK_STORAGE_KEY = 'sb-mock-session';

const getMockSession = () => {
  try {
    const stored = localStorage.getItem(MOCK_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch { return null; }
};

const setMockSession = (session: any) => {
  if (session) {
    localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(MOCK_STORAGE_KEY);
  }
};

const authListeners: Set<(event: string, session: any) => void> = new Set();

// Mock Query Builder to prevent crashes when accessing .from()
const mockQueryBuilder = {
  select: () => mockQueryBuilder,
  insert: () => mockQueryBuilder,
  upsert: () => mockQueryBuilder,
  update: () => mockQueryBuilder,
  delete: () => mockQueryBuilder,
  eq: () => mockQueryBuilder,
  match: () => mockQueryBuilder,
  order: () => mockQueryBuilder,
  limit: () => mockQueryBuilder,
  single: () => mockQueryBuilder,
  maybeSingle: () => mockQueryBuilder,
  // Treat as a promise that resolves to empty success
  then: (resolve: any) => Promise.resolve({ data: [], error: null }).then(resolve)
};

const mockSupabase = {
  auth: {
    getSession: async () => {
      return { data: { session: getMockSession() }, error: null };
    },
    onAuthStateChange: (callback: (event: string, session: any) => void) => {
      authListeners.add(callback);
      // Fire immediately to sync state
      callback('INITIAL', getMockSession());
      return {
        data: {
          subscription: {
            unsubscribe: () => authListeners.delete(callback),
          },
        },
      };
    },
    signInWithPassword: async ({ email }: { email: string }) => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const session = {
        access_token: 'mock-token-' + Date.now(),
        user: {
          id: 'mock-user-' + Date.now(),
          email: email,
          user_metadata: { full_name: email.split('@')[0] },
          aud: 'authenticated',
          created_at: new Date().toISOString()
        }
      };
      
      setMockSession(session);
      authListeners.forEach(l => l('SIGNED_IN', session));
      return { data: { user: session.user, session }, error: null };
    },
    signUp: async ({ email, options }: { email: string, options: any }) => {
       await new Promise(resolve => setTimeout(resolve, 600));
       const session = {
        access_token: 'mock-token-' + Date.now(),
        user: {
          id: 'mock-user-' + Date.now(),
          email: email,
          user_metadata: { 
            full_name: options?.data?.full_name || email.split('@')[0],
            phone: options?.data?.phone
          },
          aud: 'authenticated',
          created_at: new Date().toISOString()
        }
      };
      setMockSession(session);
      authListeners.forEach(l => l('SIGNED_IN', session));
      return { data: { user: session.user, session }, error: null };
    },
    signOut: async () => {
      setMockSession(null);
      authListeners.forEach(l => l('SIGNED_OUT', null));
      return { error: null };
    }
  },
  // Add database mock
  from: (table: string) => mockQueryBuilder
};

// Export either real client or mock client
export const supabase = isConfigured 
  ? createClient(supabaseUrl, supabaseKey) 
  : (mockSupabase as any);