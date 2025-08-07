-- MBOS Dashboard Database Schema
-- This script sets up all necessary tables for the MBOS Dashboard

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Agents table to store information about MBOS agents
CREATE TABLE IF NOT EXISTS agents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL, -- 'content', 'tech', 'thera', 'brand', 'penman'
    status VARCHAR(50) DEFAULT 'inactive', -- 'active', 'inactive', 'error', 'starting'
    description TEXT,
    configuration JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_activity TIMESTAMP WITH TIME ZONE,
    version VARCHAR(50),
    memory_usage INTEGER, -- in MB
    cpu_usage DECIMAL(5,2), -- percentage
    uptime INTERVAL
);

-- Services table to track MBOS services
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'stopped', -- 'running', 'stopped', 'error', 'starting'
    description TEXT,
    port INTEGER,
    memory_usage INTEGER, -- in MB
    cpu_usage DECIMAL(5,2), -- percentage
    uptime INTERVAL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_restart TIMESTAMP WITH TIME ZONE,
    restart_count INTEGER DEFAULT 0,
    health_check_url VARCHAR(500),
    configuration JSONB DEFAULT '{}'
);

-- Tasks table to track agent tasks and content generation
CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
    prompt TEXT NOT NULL,
    output TEXT,
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    processing_time INTEGER, -- in milliseconds
    token_count INTEGER,
    model_used VARCHAR(100),
    error_message TEXT,
    metadata JSONB DEFAULT '{}'
);

-- Analytics table for tracking usage and performance metrics
CREATE TABLE IF NOT EXISTS analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    metric_name VARCHAR(255) NOT NULL,
    metric_value DECIMAL(10,2) NOT NULL,
    metric_unit VARCHAR(50),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    category VARCHAR(100), -- 'performance', 'usage', 'errors', 'system'
    tags JSONB DEFAULT '{}'
);

-- Activity logs table for tracking system events
CREATE TABLE IF NOT EXISTS activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type VARCHAR(100) NOT NULL, -- 'agent_started', 'service_restarted', 'task_completed', etc.
    event_data JSONB DEFAULT '{}',
    severity VARCHAR(20) DEFAULT 'info', -- 'info', 'warning', 'error', 'critical'
    message TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID, -- for future user management
    ip_address INET,
    user_agent TEXT
);

-- API usage tracking table
CREATE TABLE IF NOT EXISTS api_usage (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    endpoint VARCHAR(255) NOT NULL,
    method VARCHAR(10) NOT NULL,
    response_time INTEGER, -- in milliseconds
    status_code INTEGER,
    user_id UUID, -- for future user management
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    request_size INTEGER, -- in bytes
    response_size INTEGER, -- in bytes
    ip_address INET
);

-- System health metrics table
CREATE TABLE IF NOT EXISTS system_health (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cpu_usage DECIMAL(5,2),
    memory_usage INTEGER, -- in MB
    disk_usage INTEGER, -- in MB
    network_in INTEGER, -- in bytes
    network_out INTEGER, -- in bytes
    active_connections INTEGER,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_agents_status ON agents(status);
CREATE INDEX IF NOT EXISTS idx_agents_type ON agents(type);
CREATE INDEX IF NOT EXISTS idx_services_status ON services(status);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_agent_id ON tasks(agent_id);
CREATE INDEX IF NOT EXISTS idx_tasks_created_at ON tasks(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_timestamp ON analytics(timestamp);
CREATE INDEX IF NOT EXISTS idx_analytics_metric_name ON analytics(metric_name);
CREATE INDEX IF NOT EXISTS idx_activity_logs_timestamp ON activity_logs(timestamp);
CREATE INDEX IF NOT EXISTS idx_activity_logs_event_type ON activity_logs(event_type);
CREATE INDEX IF NOT EXISTS idx_api_usage_timestamp ON api_usage(timestamp);
CREATE INDEX IF NOT EXISTS idx_system_health_timestamp ON system_health(timestamp);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_agents_updated_at BEFORE UPDATE ON agents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some initial data for testing
INSERT INTO agents (name, type, status, description, version) VALUES
('ContentAgent', 'content', 'active', 'AI content generation agent', '1.0.0'),
('TechAgent', 'tech', 'active', 'Technical writing and code generation agent', '1.0.0'),
('TheraAgent', 'thera', 'inactive', 'Therapeutic conversation agent', '1.0.0'),
('BrandOS', 'brand', 'active', 'Brand management and marketing agent', '1.0.0'),
('PenMan', 'penman', 'active', 'Advanced content writing assistant', '1.0.0')
ON CONFLICT DO NOTHING;

INSERT INTO services (name, status, description, port, memory_usage, cpu_usage) VALUES
('MBOS Core', 'running', 'Core MBOS operating system service', 3000, 256, 12.5),
('Agent Manager', 'running', 'Manages agent lifecycle and communication', 3001, 128, 8.2),
('Database Service', 'running', 'PostgreSQL database service', 5432, 512, 5.1),
('API Gateway', 'running', 'REST API gateway and authentication', 8080, 64, 3.8),
('Log Service', 'running', 'Centralized logging and monitoring', 3002, 96, 2.9),
('File Storage', 'running', 'File storage and management service', 3003, 32, 1.5)
ON CONFLICT DO NOTHING;

-- Insert some sample analytics data
INSERT INTO analytics (metric_name, metric_value, metric_unit, category) VALUES
('total_agents', 5, 'count', 'usage'),
('active_agents', 4, 'count', 'usage'),
('total_services', 6, 'count', 'usage'),
('running_services', 6, 'count', 'usage'),
('system_health', 95.5, 'percentage', 'performance'),
('avg_response_time', 2450, 'milliseconds', 'performance')
ON CONFLICT DO NOTHING;

-- Insert some sample activity logs
INSERT INTO activity_logs (event_type, message, severity) VALUES
('system_started', 'MBOS Dashboard system started successfully', 'info'),
('agent_registered', 'ContentAgent registered and activated', 'info'),
('service_started', 'MBOS Core service started on port 3000', 'info'),
('task_completed', 'Blog post generation completed successfully', 'info')
ON CONFLICT DO NOTHING; 