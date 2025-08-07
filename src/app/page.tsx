'use client'

import { useState, useEffect } from 'react'
import DashboardHeader from '@/components/DashboardHeader'
import AgentGrid from '@/components/AgentGrid'
import ServiceStatus from '@/components/ServiceStatus'
import AnalyticsOverview from '@/components/AnalyticsOverview'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('agents')

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Dashboard Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('agents')}
              className={`pb-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'agents'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Agents
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`pb-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'services'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Services
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`pb-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'analytics'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Analytics
            </button>
          </nav>
        </div>

        {/* Dashboard Content */}
        <div className="space-y-8">
          {activeTab === 'agents' && <AgentGrid />}
          {activeTab === 'services' && <ServiceStatus />}
          {activeTab === 'analytics' && <AnalyticsOverview />}
        </div>
      </main>
    </div>
  )
}
