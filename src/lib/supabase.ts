import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://exektmvubfuqbdqikref.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4ZWt0bXZ1YmZ1cWJkcWlrcmVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0MDQ2NzgsImV4cCI6MjA2OTk4MDY3OH0.9mV2aMDZXF272M-euYztxNDViCP2ZwjqvrPpLxTImIw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);