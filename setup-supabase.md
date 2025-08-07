# Supabase Database Setup Guide

## Step 1: Access Your Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign in to your account
3. Navigate to your project: `exektmvubfuqbdqikref`

## Step 2: Open the SQL Editor

1. In your Supabase dashboard, click on "SQL Editor" in the left sidebar
2. Click "New query" to create a new SQL script

## Step 3: Run the Database Schema

1. Copy the entire contents of `supabase-schema.sql`
2. Paste it into the SQL editor
3. Click "Run" to execute the script

## Step 4: Verify the Setup

After running the script, you should see:

### Tables Created:
- ✅ `agents` - MBOS agent information
- ✅ `services` - Service status and metrics
- ✅ `tasks` - Content generation tasks
- ✅ `analytics` - Performance metrics
- ✅ `activity_logs` - System events
- ✅ `api_usage` - API call tracking
- ✅ `system_health` - System performance data

### Sample Data:
- ✅ 5 agents (ContentAgent, TechAgent, TheraAgent, BrandOS, PenMan)
- ✅ 6 services (MBOS Core, Agent Manager, Database Service, etc.)
- ✅ Initial analytics metrics
- ✅ Sample activity logs

## Step 5: Test the Connection

The database is now ready! Your MBOS Dashboard should be able to connect and use all the tables.

## Database Schema Overview

### Agents Table
Stores information about MBOS agents:
- `id`: Unique identifier
- `name`: Agent name (e.g., "ContentAgent")
- `type`: Agent type (content, tech, thera, brand, penman)
- `status`: Current status (active, inactive, error, starting)
- `description`: Agent description
- `configuration`: JSON configuration data
- `memory_usage`, `cpu_usage`: Performance metrics

### Services Table
Tracks MBOS services:
- `name`: Service name
- `status`: Service status (running, stopped, error, starting)
- `port`: Service port number
- `memory_usage`, `cpu_usage`: Resource usage
- `uptime`: Service uptime

### Tasks Table
Records content generation tasks:
- `agent_id`: Reference to the agent that performed the task
- `prompt`: User input prompt
- `output`: Generated content
- `status`: Task status (pending, processing, completed, failed)
- `processing_time`: Time taken to complete
- `model_used`: AI model used for generation

### Analytics Table
Tracks performance metrics:
- `metric_name`: Metric name (e.g., "total_agents", "system_health")
- `metric_value`: Numeric value
- `metric_unit`: Unit of measurement
- `category`: Metric category (performance, usage, errors, system)

## Next Steps

1. **Test the API**: Try generating content through your dashboard
2. **Monitor Logs**: Check the activity_logs table for system events
3. **View Analytics**: Monitor performance metrics in the analytics table
4. **Scale Up**: Add more agents and services as needed

## Troubleshooting

If you encounter any issues:

1. **Check Supabase Logs**: Go to Logs in your Supabase dashboard
2. **Verify Connection**: Ensure your environment variables are correct
3. **Test Queries**: Use the SQL editor to test database queries
4. **Check Permissions**: Ensure your API key has the necessary permissions

Your MBOS Dashboard database is now fully configured and ready to use! 🚀 