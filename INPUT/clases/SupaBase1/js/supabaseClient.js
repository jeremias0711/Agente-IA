// Supabase client setup. Replace the placeholders with your project values.
const SUPABASE_URL = "https://klhkfegfngcygjbpjatc.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsaGtmZWdmbmdjeWdqYnBqYXRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIwODg2NDcsImV4cCI6MjEwNzY2NDY0N30.DFo9YWymvQXats9nnuFDvTL1eutxscAzZntwOjKN0Zo";

// `supabase` is the global exposed by the CDN script; we expose the client as `db`.
const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
