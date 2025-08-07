'use client'

import { useState } from 'react'

interface Agent {
  id: string
  name: string
  type: string
  status: 'online' | 'offline' | 'error'
  lastSeen: string
  tasks: number
  description: string
}

const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'BlogAgent',
    type: 'Content Generation',
    status: 'online',
    lastSeen: '2 minutes ago',
    tasks: 15,
    description: 'Automated blog post generation and management'
  },
  {
    id: '2',
    name: 'TheraAgent',
    type: 'Therapeutic Assistant',
    status: 'online',
    lastSeen: '5 minutes ago',
    tasks: 8,
    description: 'AI-powered therapeutic conversation agent'
  },
  {
    id: '3',
    name: 'PenMan',
    type: 'Content Writing',
    status: 'offline',
    lastSeen: '1 hour ago',
    tasks: 0,
    description: 'Advanced content writing and editing assistant'
  },
  {
    id: '4',
    name: 'TopicGenAgent',
    type: 'Topic Generation',
    status: 'online',
    lastSeen: '10 minutes ago',
    tasks: 23,
    description: 'Generates trending topics and content ideas'
  },
  {
    id: '5',
    name: 'TechBlogAgent',
    type: 'Technical Content',
    status: 'error',
    lastSeen: '30 minutes ago',
    tasks: 5,
    description: 'Specialized technical blog content creation'
  },
  {
    id: '6',
    name: 'BrandOS',
    type: 'Brand Management',
    status: 'online',
    lastSeen: '1 minute ago',
    tasks: 12,
    description: 'Brand identity and marketing content management'
  }
]

export default function AgentGrid() {
  const [agents, setAgents] = useState<Agent[]>(mockAgents)
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500'
      case 'offline':
        return 'bg-gray-400'
      case 'error':
        return 'bg-red-500'
      default:
        return 'bg-gray-400'
    }
  }

  const handleAgentAction = (agentId: string, action: string) => {
    console.log(`${action} agent ${agentId}`)
    // TODO: Implement agent actions
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">MBOS Agents</h2>
          <p className="text-gray-600">Manage and monitor your AI agents</p>
        </div>
        <button className="btn-primary">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Agent
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Online</p>
              <p className="text-2xl font-bold text-gray-900">
                {agents.filter(a => a.status === 'online').length}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-gray-100 rounded-lg">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Offline</p>
              <p className="text-2xl font-bold text-gray-900">
                {agents.filter(a => a.status === 'offline').length}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Errors</p>
              <p className="text-2xl font-bold text-gray-900">
                {agents.filter(a => a.status === 'error').length}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900">
                {agents.reduce((sum, agent) => sum + agent.tasks, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Agent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div key={agent.id} className="card hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{agent.name}</h3>
                <p className="text-sm text-gray-600">{agent.type}</p>
              </div>
              <div className={`w-3 h-3 rounded-full ${getStatusColor(agent.status)}`}></div>
            </div>
            
            <p className="text-sm text-gray-700 mb-4">{agent.description}</p>
            
            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <span>Last seen: {agent.lastSeen}</span>
              <span>{agent.tasks} tasks</span>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => handleAgentAction(agent.id, 'start')}
                className="flex-1 btn-secondary text-sm"
                disabled={agent.status === 'online'}
              >
                Start
              </button>
              <button
                onClick={() => handleAgentAction(agent.id, 'stop')}
                className="flex-1 btn-secondary text-sm"
                disabled={agent.status === 'offline'}
              >
                Stop
              </button>
              <button
                onClick={() => handleAgentAction(agent.id, 'restart')}
                className="flex-1 btn-secondary text-sm"
              >
                Restart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 