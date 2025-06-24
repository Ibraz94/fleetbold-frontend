import { useState } from 'react'
import { Card, Button, Input, Select, Avatar } from '@/components/ui'
import { HiSearch, HiDocumentText, HiCalendar, HiUser, HiClock } from 'react-icons/hi'

const AuditLogs = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [companyFilter, setCompanyFilter] = useState('all')
    const [actionFilter, setActionFilter] = useState('all')
    const [dateRange, setDateRange] = useState('')

    // Mock audit log data
    const mockAuditLogs = [
        {
            id: 1,
            timestamp: '2024-01-20 14:30:25',
            user: 'John Smith',
            userEmail: 'john@techcorp.com',
            userAvatar: '/img/avatars/thumb-1.jpg',
            company: 'TechCorp Inc.',
            action: 'Updated vehicle maintenance schedule',
            actionType: 'Edit',
            module: 'Fleet Management',
            ipAddress: '192.168.1.100',
            beforeAfter: {
                before: 'Next maintenance: 2024-02-15',
                after: 'Next maintenance: 2024-02-10'
            }
        },
        {
            id: 2,
            timestamp: '2024-01-20 13:45:12',
            user: 'Sarah Johnson',
            userEmail: 'sarah@globalfleet.com',
            userAvatar: '/img/avatars/thumb-2.jpg',
            company: 'Global Fleet Solutions',
            action: 'Deleted expired reservation',
            actionType: 'Delete',
            module: 'Reservations',
            ipAddress: '10.0.0.50',
            beforeAfter: {
                before: 'Reservation #1234 - Vehicle ABC123',
                after: 'Deleted'
            }
        },
        {
            id: 3,
            timestamp: '2024-01-20 12:15:08',
            user: 'Mike Davis',
            userEmail: 'mike@metrotransport.com',
            userAvatar: '/img/avatars/thumb-3.jpg',
            company: 'Metro Transport Co.',
            action: 'Exported monthly fleet report',
            actionType: 'Export',
            module: 'Reports',
            ipAddress: '172.16.0.25',
            beforeAfter: null
        },
        {
            id: 4,
            timestamp: '2024-01-20 11:20:33',
            user: 'Admin User',
            userEmail: 'admin@logisticsplus.com',
            userAvatar: '/img/avatars/thumb-4.jpg',
            company: 'Logistics Plus',
            action: 'Changed user role from Driver to Manager',
            actionType: 'Role Change',
            module: 'User Management',
            ipAddress: '203.0.113.45',
            beforeAfter: {
                before: 'Role: Driver',
                after: 'Role: Manager'
            }
        },
        {
            id: 5,
            timestamp: '2024-01-20 10:05:17',
            user: 'Lisa Chen',
            userEmail: 'lisa@citydelivery.com',
            userAvatar: '/img/avatars/thumb-5.jpg',
            company: 'City Delivery Services',
            action: 'Created new vehicle profile',
            actionType: 'Create',
            module: 'Fleet Management',
            ipAddress: '198.51.100.10',
            beforeAfter: {
                before: 'No vehicle profile',
                after: 'Vehicle DEF456 - Toyota Camry 2023'
            }
        },
        {
            id: 6,
            timestamp: '2024-01-20 09:30:45',
            user: 'Robert Wilson',
            userEmail: 'robert@techcorp.com',
            userAvatar: '/img/avatars/thumb-6.jpg',
            company: 'TechCorp Inc.',
            action: 'Updated company billing information',
            actionType: 'Edit',
            module: 'Account Settings',
            ipAddress: '192.168.1.101',
            beforeAfter: {
                before: 'Payment method: **** 1234',
                after: 'Payment method: **** 5678'
            }
        }
    ]

    const filteredLogs = mockAuditLogs.filter(log => {
        const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            log.company.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCompany = companyFilter === 'all' || log.company === companyFilter
        const matchesAction = actionFilter === 'all' || log.actionType === actionFilter
        return matchesSearch && matchesCompany && matchesAction
    })

    const getActionColor = (actionType) => {
        switch (actionType.toLowerCase()) {
            case 'edit': return 'bg-blue-100 text-blue-800'
            case 'delete': return 'bg-red-100 text-red-800'
            case 'export': return 'bg-green-100 text-green-800'
            case 'role change': return 'bg-purple-100 text-purple-800'
            case 'create': return 'bg-teal-100 text-teal-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const getActionIcon = (actionType) => {
        switch (actionType.toLowerCase()) {
            case 'edit': return <HiDocumentText className="w-4 h-4" />
            case 'delete': return <HiDocumentText className="w-4 h-4" />
            case 'export': return <HiDocumentText className="w-4 h-4" />
            case 'role change': return <HiUser className="w-4 h-4" />
            case 'create': return <HiDocumentText className="w-4 h-4" />
            default: return <HiClock className="w-4 h-4" />
        }
    }

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp)
        return {
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString()
        }
    }

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-green-100 dark:bg-gray-800 dark:border rounded-lg">
                        <HiDocumentText className="text-green-600 text-xl" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-black dark:text-white">Audit Logs</h1>
                        <p className="text-gray-400">Global timeline of all user activities across the platform</p>
                    </div>
                </div>
                <Button variant="outline" size="sm">
                    Export Logs
                </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="p-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-black dark:text-white">{mockAuditLogs.length}</div>
                        <div className="text-sm text-gray-400">Total Activities</div>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                            {mockAuditLogs.filter(log => log.actionType === 'Edit').length}
                        </div>
                        <div className="text-sm text-gray-400">Edits</div>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">
                            {mockAuditLogs.filter(log => log.actionType === 'Delete').length}
                        </div>
                        <div className="text-sm text-gray-400">Deletions</div>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                            {mockAuditLogs.filter(log => log.actionType === 'Create').length}
                        </div>
                        <div className="text-sm text-gray-400">Creations</div>
                    </div>
                </Card>
            </div>

            {/* Filters */}
            <Card className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    <Input
                        placeholder="Search activities..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        prefix={<HiSearch />}
                    />
                    <Select
                        value={companyFilter}
                        onChange={setCompanyFilter}
                        placeholder="Filter by company"
                    >
                        <option value="all">All Companies</option>
                        <option value="TechCorp Inc.">TechCorp Inc.</option>
                        <option value="Global Fleet Solutions">Global Fleet Solutions</option>
                        <option value="Metro Transport Co.">Metro Transport Co.</option>
                        <option value="Logistics Plus">Logistics Plus</option>
                        <option value="City Delivery Services">City Delivery Services</option>
                    </Select>
                    <Select
                        value={actionFilter}
                        onChange={setActionFilter}
                        placeholder="Filter by action"
                    >
                        <option value="all">All Actions</option>
                        <option value="Edit">Edit</option>
                        <option value="Delete">Delete</option>
                        <option value="Export">Export</option>
                        <option value="Role Change">Role Change</option>
                        <option value="Create">Create</option>
                    </Select>
                    <Input
                        type="date"
                        placeholder="Date range"
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        prefix={<HiCalendar />}
                    />
                </div>
            </Card>

            {/* Audit Log Table */}
            <Card>
                <div className="p-6 border-b">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold">Activity Timeline</h3>
                            <p className="text-sm text-gray-400">{filteredLogs.length} activities found</p>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                                    Timestamp
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                                    User
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                                    Company
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                                    Action
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                                    Type
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                                    Module
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                                    IP Address
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredLogs.map((log) => {
                                const { date, time } = formatTimestamp(log.timestamp)
                                return (
                                    <tr key={log.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-black dark:text-white">{date}</div>
                                            <div className="text-sm text-gray-400">{time}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <Avatar size="sm" src={log.userAvatar} />
                                                <div className="ml-3">
                                                    <div className="text-sm font-medium text-black dark:text-white">{log.user}</div>
                                                    <div className="text-sm text-gray-400">{log.userEmail}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-black dark:text-white">{log.company}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-black dark:text-white">{log.action}</div>
                                            {log.beforeAfter && (
                                                <div className="text-xs text-gray-400 mt-1">
                                                    <div><strong>Before:</strong> {log.beforeAfter.before}</div>
                                                    <div><strong>After:</strong> {log.beforeAfter.after}</div>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={getActionColor(log.actionType)}>
                                                <div className="flex items-center">
                                                    {getActionIcon(log.actionType)}
                                                    <span className="ml-1">{log.actionType}</span>
                                                </div>
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black dark:text-white">
                                            {log.module}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                            {log.ipAddress}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <Button size="xs" variant="outline">
                                                View Details
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    )
}

export default AuditLogs 