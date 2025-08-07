'use client'

import { useState } from 'react'

interface Metric {
  id: string
  name: string
  value: string
  change: string
  changeType: 'increase' | 'decrease' | 'neutral'
  icon: string
}

interface ChartData {
  date: string
  agents: number
  tasks: number
  errors: number
}

const mockMetrics: Metric[] = [
  {
    id: '1',
    name: 'Total Agents',
    value: '12',
    change: '+2',
    changeType: 'increase',
    icon: '🤖'
  },
  {
    id: '2',
    name: 'Active Tasks',
    value: '1,247',
    change: '+15%',
    changeType: 'increase',
    icon: '📋'
  },
  {
    id: '3',
    name: 'Success Rate',
    value: '94.2%',
    change: '+2.1%',
    changeType: 'increase',
    icon: '✅'
  },
  {
    id: '4',
    name: 'Error Rate',
    value: '2.8%',
    change: '-0.5%',
    changeType: 'decrease',
    icon: '❌'
  },
  {
    id: '5',
    name: 'Avg Response Time',
    value: '1.2s',
    change: '-0.3s',
    changeType: 'decrease',
    icon: '⚡'
  },
  {
    id: '6',
    name: 'System Uptime',
    value: '99.7%',
    change: '+0.1%',
    changeType: 'increase',
    icon: '🟢'
  }
]

const mockChartData: ChartData[] = [
  { date: 'Mon', agents: 10, tasks: 120, errors: 3 },
  { date: 'Tue', agents: 11, tasks: 145, errors: 2 },
  { date: 'Wed', agents: 12, tasks: 180, errors: 4 },
  { date: 'Thu', agents: 12, tasks: 165, errors: 1 },
  { date: 'Fri', agents: 12, tasks: 200, errors: 5 },
  { date: 'Sat', agents: 11, tasks: 140, errors: 2 },
  { date: 'Sun', agents: 10, tasks: 110, errors: 3 }
]

export default function AnalyticsOverview() {
  const [metrics] = useState<Metric[]>(mockMetrics)
  const [chartData] = useState<ChartData[]>(mockChartData)
  const [timeRange, setTimeRange] = useState('7d')

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'increase':
        return 'text-green-600'
      case 'decrease':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'increase':
        return '↗'
      case 'decrease':
        return '↘'
      default:
        return '→'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Overview</h2>
          <p className="text-gray-600">Performance metrics and usage statistics</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="input-field w-auto"
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button className="btn-secondary">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <div key={metric.id} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.name}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${getChangeColor(metric.changeType)}`}>
                    {getChangeIcon(metric.changeType)} {metric.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last period</span>
                </div>
              </div>
              <div className="text-3xl">{metric.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Activity</h3>
          <div className="space-y-4">
            {chartData.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600 w-12">{data.date}</span>
                <div className="flex-1 mx-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: `${(data.tasks / 200) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-12">{data.tasks}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Total Tasks: {chartData.reduce((sum, d) => sum + d.tasks, 0)}</span>
              <span className="text-gray-600">Avg: {Math.round(chartData.reduce((sum, d) => sum + d.tasks, 0) / chartData.length)}</span>
            </div>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Performance</h3>
          <div className="space-y-6">
            {/* CPU Usage */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">CPU Usage</span>
                <span className="text-sm text-gray-900">43%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '43%' }}></div>
              </div>
            </div>

            {/* Memory Usage */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Memory Usage</span>
                <span className="text-sm text-gray-900">67%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '67%' }}></div>
              </div>
            </div>

            {/* Disk Usage */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Disk Usage</span>
                <span className="text-sm text-gray-900">28%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '28%' }}></div>
              </div>
            </div>

            {/* Network */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Network I/O</span>
                <span className="text-sm text-gray-900">2.4 MB/s</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '35%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { time: '2 min ago', action: 'BlogAgent generated 3 new posts', type: 'success' },
            { time: '5 min ago', action: 'System backup completed successfully', type: 'info' },
            { time: '12 min ago', action: 'TheraAgent started new therapy session', type: 'success' },
            { time: '1 hour ago', action: 'API Gateway connection restored', type: 'warning' },
            { time: '2 hours ago', action: 'New agent PenMan registered', type: 'info' },
            { time: '3 hours ago', action: 'Database optimization completed', type: 'success' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full ${
                activity.type === 'success' ? 'bg-green-500' :
                activity.type === 'warning' ? 'bg-yellow-500' :
                'bg-blue-500'
              }`}></div>
              <span className="text-sm text-gray-600 w-20">{activity.time}</span>
              <span className="text-sm text-gray-900 flex-1">{activity.action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 