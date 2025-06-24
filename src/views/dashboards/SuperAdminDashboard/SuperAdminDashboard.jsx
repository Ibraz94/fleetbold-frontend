import { Card, Button } from '@/components/ui'
import { HiShieldCheck, HiRefresh, HiOfficeBuilding, HiUsers, HiCurrencyDollar, HiExclamationCircle } from 'react-icons/hi'

const SuperAdminDashboard = () => {
    // Mock data for overview
    const mockData = {
        stats: {
            totalCompanies: 247,
            activeUsers: 1289,
            pendingIssues: 23,
            monthlyRevenue: 145600
        },
        recentActivity: [
            {
                id: 1,
                action: 'New company registration',
                company: 'Swift Logistics',
                time: '2 hours ago',
                type: 'success'
            },
            {
                id: 2,
                action: 'Payment overdue',
                company: 'Metro Transport Co.',
                time: '4 hours ago',
                type: 'warning'
            },
            {
                id: 3,
                action: 'Plan upgrade',
                company: 'TechCorp Inc.',
                time: '6 hours ago',
                type: 'info'
            },
            {
                id: 4,
                action: 'Support ticket resolved',
                company: 'Global Fleet Solutions',
                time: '8 hours ago',
                type: 'success'
            }
        ],
        topCompanies: [
            {
                name: 'Logistics Plus',
                plan: 'Enterprise',
                revenue: 4200,
                users: 89
            },
            {
                name: 'TechCorp Inc.',
                plan: 'Premium',
                revenue: 2400,
                users: 45
            },
            {
                name: 'Global Fleet Solutions',
                plan: 'Business',
                revenue: 1800,
                users: 28
            }
        ]
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount)
    }

    const getActivityTypeColor = (type) => {
        switch (type) {
            case 'success': return 'text-green-600'
            case 'warning': return 'text-yellow-600'
            case 'info': return 'text-blue-600'
            case 'error': return 'text-red-600'
            default: return 'text-gray-600'
        }
    }

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-100 dark:bg-gray-800">
                        <HiShieldCheck className="text-indigo-600 text-xl" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">Super Admin Overview</h1>
                        <p className="text-gray-400">Global oversight of all client companies and activities</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" icon={<HiRefresh />}>
                        Refresh
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-6">
                    <div className="flex items-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-gray-800 dark:border rounded-lg">
                            <HiOfficeBuilding className="text-blue-600 text-xl" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-400">Total Companies</p>
                            <p className="text-2xl font-bold text-black dark:text-white">{mockData.stats.totalCompanies}</p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-gray-800 dark:border rounded-lg">
                            <HiUsers className="text-green-600 text-xl" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-400">Active Users</p>
                            <p className="text-2xl font-bold text-black dark:text-white">{mockData.stats.activeUsers}</p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-gray-800 dark:border rounded-lg">
                            <HiCurrencyDollar className="text-purple-600 text-xl" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-400">Monthly Revenue</p>
                            <p className="text-2xl font-bold text-black dark:text-white">{formatCurrency(mockData.stats.monthlyRevenue)}</p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-red-100 dark:bg-gray-800 dark:border rounded-lg">
                            <HiExclamationCircle className="text-red-600 text-xl" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-400">Pending Issues</p>
                            <p className="text-2xl font-bold text-black dark:text-white">{mockData.stats.pendingIssues}</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <Card>
                    <div className="p-6 border-b">
                        <h3 className="text-lg font-semibold">Recent Activity</h3>
                        <p className="text-sm text-gray-400">Latest actions across all companies</p>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {mockData.recentActivity.map((activity) => (
                                <div key={activity.id} className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm font-medium text-black dark:text-white">{activity.action}</div>
                                        <div className="text-sm text-gray-400">{activity.company}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className={`text-sm font-medium ${getActivityTypeColor(activity.type)}`}>
                                            {activity.time}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 pt-4 border-t">
                            <Button variant="outline" size="sm" className="w-full">
                                View All Activity
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Top Companies */}
                <Card>
                    <div className="p-6 border-b">
                        <h3 className="text-lg font-semibold">Top Companies</h3>
                        <p className="text-sm text-gray-400">Highest revenue generating companies</p>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {mockData.topCompanies.map((company, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm font-medium text-black dark:text-white">{company.name}</div>
                                        <div className="text-sm text-gray-400">{company.plan} • {company.users} users</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-medium text-black dark:text-white">
                                            {formatCurrency(company.revenue)}/mo
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 pt-4 border-t">
                            <Button variant="outline" size="sm" className="w-full">
                                View All Companies
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card>
                <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold">Quick Actions</h3>
                    <p className="text-sm text-gray-400">Common administrative tasks</p>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
                            <HiOfficeBuilding className="text-xl mb-1" />
                            <span className="text-sm">Add Company</span>
                        </Button>
                        <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
                            <HiExclamationCircle className="text-xl mb-1" />
                            <span className="text-sm">Review Issues</span>
                        </Button>
                        <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
                            <HiCurrencyDollar className="text-xl mb-1" />
                            <span className="text-sm">Billing Report</span>
                        </Button>
                        <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
                            <HiUsers className="text-xl mb-1" />
                            <span className="text-sm">User Management</span>
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default SuperAdminDashboard 