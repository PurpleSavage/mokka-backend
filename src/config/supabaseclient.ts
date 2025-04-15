import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://qtfzgnmvgaggnshpukmo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0Znpnbm12Z2FnZ25zaHB1a21vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2OTY2NTUsImV4cCI6MjA2MDI3MjY1NX0.XUmkHk4vTLRhskgcUWqv3GT_AxDjYjb_bpW-pViDeXQ')