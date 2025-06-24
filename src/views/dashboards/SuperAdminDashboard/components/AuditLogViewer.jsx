import { useState } from 'react'
import { Card, Timeline, Badge, Button, Input, Select, DatePicker, Avatar } from '@/components/ui'
import { HiSearch, HiCalendar, HiDocumentText, HiUser, HiClock } from 'react-icons/hi'

const AuditLogViewer = ({ data = [], fullView = false }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [companyFilter, setCompanyFilter] = useState('all')
    const [actionFilter, setActionFilter] = useState('all')
    const [dateRange, setDateRange] = useState(null)

    const filteredData = data.filter(log => {
        const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            log.user.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCompany = companyFilter === 'all' || log.company === companyFilter
        const matchesAction = actionFilter === 'all' || log.actionType === actionFilter
        // Add date filtering logic here if needed
        return matchesSearch && matchesCompany && matchesAction
    })

    const displayData = fullView ? filteredData : filteredData.slice(0, 10)

    const getActionColor = (actionType) => {
        switch (actionType.toLowerCase()) {
            case 'edit': return 'blue'
            case 'delete': return 'red'
            case 'export': return 'green'
            case 'role change': return 'purple'
            case 'create': return 'teal'
            default: return 'gray'
        }
    }

    const getActionIcon = (actionType) => {
        switch (actionType.toLowerCase()) {
            case 'edit': return <HiDocumentText className="w-4 h-4" />
            case 'delete': return <HiDocumentText className="w-4 h-4" />
            case 'export': return <HiDocumentText className="w-4 h-4" />
            case 'role change': return <HiUser className="w-4 h-4" />
            default: return <HiClock className="w-4 h-4" />
        }
    }

    return (
        <Card>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-6 border-b">
                <div className="flex items-center gap-3">
                    <HiDocumentText className="text-xl text-gray-600" />
                    <div>
                        <h3 className="text-lg font-semibold">
                            {fullView ? 'Complete Audit Log' : 'Recent Activity'}
                        </h3>
                        <p className="text-sm text-gray-600">
                            {displayData.length} {fullView ? 'entries' : 'recent activities'}
                        </p>
                    </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                        placeholder="Search activities..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        prefix={<HiSearch />}
                        className="w-full sm:w-64"
                    />
                    {fullView && (
                        <>
                            <Select
                                value={companyFilter}
                                onChange={setCompanyFilter}
                                placeholder="Filter by company"
                                className="w-full sm:w-40"
                            >
                                <option value="all">All Companies</option>
                                <option value="TechCorp">TechCorp</option>
                                <option value="GlobalFleet">GlobalFleet</option>
                                <option value="FleetMax">FleetMax</option>
                            </Select>
                            <Select
                                value={actionFilter}
                                onChange={setActionFilter}
                                placeholder="Filter by action"
                                className="w-full sm:w-32"
                            >
                                <option value="all">All Actions</option>
                                <option value="edit">Edit</option>
                                <option value="delete">Delete</option>
                                <option value="export">Export</option>
                                <option value="role change">Role Change</option>
                            </Select>
                            <DatePicker
                                placeholder="Date range"
                                value={dateRange}
                                onChange={setDateRange}
                                className="w-full sm:w-40"
                            />
                        </>
                    )}
                </div>
            </div>

            <div className="p-6">
                {displayData.length > 0 ? (
                    <Timeline>
                        {displayData.map((log, index) => (
                            <Timeline.Item key={log.id}>
                                <div className="flex items-start gap-4">
                                    <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-${getActionColor(log.actionType)}-100`}>
                                        <div className={`text-${getActionColor(log.actionType)}-600`}>
                                            {getActionIcon(log.actionType)}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Badge className={`bg-${getActionColor(log.actionType)}-100 text-${getActionColor(log.actionType)}-800`}>
                                                {log.actionType}
                                            </Badge>
                                            <span className="text-sm text-gray-500">{log.company}</span>
                                        </div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Avatar size="xs" src={log.userAvatar} />
                                            <span className="font-medium text-sm">{log.user}</span>
                                            <span className="text-xs text-gray-500">{log.time}</span>
                                        </div>
                                        <p className="text-sm text-gray-900 mb-2">{log.action}</p>
                                        <div className="text-xs text-gray-500">
                                            <strong>Module:</strong> {log.module}
                                        </div>
                                        {log.beforeAfter && (
                                            <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div>
                                                        <strong>Before:</strong> {log.beforeAfter.before}
                                                    </div>
                                                    <div>
                                                        <strong>After:</strong> {log.beforeAfter.after}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Timeline.Item>
                        ))}
                    </Timeline>
                ) : (
                    <div className="text-center py-8">
                        <HiDocumentText className="mx-auto text-4xl text-gray-300 mb-4" />
                        <p className="text-gray-500">No audit logs found matching your criteria</p>
                    </div>
                )}

                {!fullView && data.length > 10 && (
                    <div className="text-center mt-6">
                        <Button variant="outline" size="sm">
                            View All Audit Logs
                        </Button>
                    </div>
                )}
            </div>
        </Card>
    )
}

export default AuditLogViewer 