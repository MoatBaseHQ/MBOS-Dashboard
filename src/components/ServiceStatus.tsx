'use client'

import { useState } from 'react'

interface Service {
  id: string
  name: string
  status: 'running' | 'stopped' | 'error' | 'starting'
  uptime: string
  memory: string
  cpu: string
  port: number
  description: string
}

const mockServices: Service[] = [
  {
    id: '1',
    name: 'MBOS Core',
    status: 'running',
    uptime: '2d 14h 32m',
    memory: '256MB',
    cpu: '12%',
    port: 3000,
    description: 'Core MBOS operating system service'
  },
  {
    id: '2',
    name: 'Agent Manager',
    status: 'running',
    uptime: '1d 8h 15m',
    memory: '128MB',
    cpu: '8%',
    port: 3001,
    description: 'Manages agent lifecycle and communication'
  },
  {
    id: '3',
    name: 'Database Service',
    status: 'running',
    uptime: '5d 2h 45m',
    memory: '512MB',
    cpu: '5%',
    port: 5432,
    description: 'PostgreSQL database service'
  },
  {
    id: '4',
    name: 'API Gateway',
    status: 'error',
    uptime: '0h 5m',
    memory: '64MB',
    cpu: '0%',
    port: 8080,
    description: 'REST API gateway and authentication'
  },
  {
    id: '5',
    name: 'Log Service',
    status: 'running',
    uptime: '3d 12h 8m',
    memory: '96MB',
    cpu: '3%',
    port: 3002,
    description: 'Centralized logging and monitoring'
  },
  {
    id: '6',
    name: 'File Storage',
    status: 'starting',
    uptime: '0h 2m',
    memory: '32MB',
    cpu: '15%',
    port: 3003,
    description: 'File storage and management service'
  }
]

export default function ServiceStatus() {
  const [services, setServices] = useState<Service[]>(mockServices)
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-green-500'
      case 'stopped':
        return 'bg-gray-400'
      case 'error':
        return 'bg-red-500'
      case 'starting':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-400'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'running':
        return 'Running'
      case 'stopped':
        return 'Stopped'
      case 'error':
        return 'Error'
      case 'starting':
        return 'Starting'
      default:
        return 'Unknown'
    }
  }

  const handleServiceAction = (serviceId: string, action: string) => {
    console.log(`${action} service ${serviceId}`)
    // TODO: Implement service actions
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Service Status</h2>
          <p className="text-gray-600">Monitor and manage MBOS services</p>
        </div>
        <div className="flex space-x-2">
          <button className="btn-secondary">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
          <button className="btn-primary">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Service
          </button>
        </div>
      </div>

      {/* Service Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Running</p>
              <p className="text-2xl font-bold text-gray-900">
                {services.filter(s => s.status === 'running').length}
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
                {services.filter(s => s.status === 'error').length}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Starting</p>
              <p className="text-2xl font-bold text-gray-900">
                {services.filter(s => s.status === 'starting').length}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total CPU</p>
              <p className="text-2xl font-bold text-gray-900">
                {services.reduce((sum, service) => sum + parseInt(service.cpu), 0)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Uptime
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Memory
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CPU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Port
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{service.name}</div>
                      <div className="text-sm text-gray-500">{service.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(service.status)} mr-2`}></div>
                      <span className="text-sm text-gray-900">{getStatusText(service.status)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {service.uptime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {service.memory}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {service.cpu}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {service.port}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleServiceAction(service.id, 'start')}
                        className="text-primary-600 hover:text-primary-900"
                        disabled={service.status === 'running'}
                      >
                        Start
                      </button>
                      <button
                        onClick={() => handleServiceAction(service.id, 'stop')}
                        className="text-red-600 hover:text-red-900"
                        disabled={service.status === 'stopped'}
                      >
                        Stop
                      </button>
                      <button
                        onClick={() => handleServiceAction(service.id, 'restart')}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Restart
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 