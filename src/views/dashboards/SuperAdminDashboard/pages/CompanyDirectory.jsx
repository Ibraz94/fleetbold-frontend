import { useState } from 'react'
import { Card, Button, Input, Select } from '@/components/ui'
import { HiSearch, HiOfficeBuilding, HiEye, HiCog } from 'react-icons/hi'

const CompanyDirectory = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [planFilter, setPlanFilter] = useState('all')

    // Mock data for companies
    const mockCompanies = [
        {
            id: 1,
            name: 'TechCorp Inc.',
            email: 'admin@techcorp.com',
            planType: 'Premium',
            activeUsers: 45,
            totalUsers: 50,
            totalVehicles: 120,
            totalReservations: 2340,
            status: 'Active',
            lastActive: '2 hours ago',
            monthlySpend: 2400
        },
        {
            id: 2,
            name: 'Global Fleet Solutions',
            email: 'admin@globalfleet.com',
            planType: 'Business',
            activeUsers: 28,
            totalUsers: 35,
            totalVehicles: 85,
            totalReservations: 1200,
            status: 'Active',
            lastActive: '1 day ago',
            monthlySpend: 1800
        },
        {
            id: 3,
            name: 'Metro Transport Co.',
            email: 'contact@metrotransport.com',
            planType: 'Standard',
            activeUsers: 12,
            totalUsers: 15,
            totalVehicles: 30,
            totalReservations: 450,
            status: 'Suspended',
            lastActive: '1 week ago',
            monthlySpend: 800
        },
        {
            id: 4,
            name: 'Logistics Plus',
            email: 'info@logisticsplus.com',
            planType: 'Enterprise',
            activeUsers: 89,
            totalUsers: 100,
            totalVehicles: 250,
            totalReservations: 5600,
            status: 'Active',
            lastActive: '30 minutes ago',
            monthlySpend: 4200
        },
        {
            id: 5,
            name: 'City Delivery Services',
            email: 'admin@citydelivery.com',
            planType: 'Business',
            activeUsers: 22,
            totalUsers: 25,
            totalVehicles: 45,
            totalReservations: 890,
            status: 'Trial',
            lastActive: '3 hours ago',
            monthlySpend: 0
        }
    ]

    const filteredCompanies = mockCompanies.filter(company => {
        const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            company.email.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === 'all' || company.status.toLowerCase() === statusFilter.toLowerCase()
        const matchesPlan = planFilter === 'all' || company.planType.toLowerCase() === planFilter.toLowerCase()
        return matchesSearch && matchesStatus && matchesPlan
    })

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'active': return 'text-green-600'
            case 'suspended': return 'text-red-600'
            case 'trial': return 'text-blue-600'
            default: return 'text-gray-600'
        }
    }

    const getPlanColor = (plan) => {
        switch (plan.toLowerCase()) {
            case 'enterprise': return 'text-purple-600'
            case 'premium': return 'text-indigo-600'
            case 'business': return 'text-blue-600'
            case 'standard': return 'text-gray-600'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-gray-800 dark:border rounded-lg">
                        <HiOfficeBuilding className="text-blue-600 text-xl" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-black dark:text-white">Company Directory</h1>
                        <p className="text-gray-400">Manage all client companies and their subscriptions</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <Card className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1">
                        <Input
                            placeholder="Search companies..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            prefix={<HiSearch />}
                        />
                    </div>
                    <Select
                        value={statusFilter}
                        onChange={setStatusFilter}
                        placeholder="Filter by status"
                        className="w-full lg:w-48"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="suspended">Suspended</option>
                        <option value="trial">Trial</option>
                    </Select>
                    <Select
                        value={planFilter}
                        onChange={setPlanFilter}
                        placeholder="Filter by plan"
                        className="w-full lg:w-48"
                    >
                        <option value="all">All Plans</option>
                        <option value="enterprise">Enterprise</option>
                        <option value="premium">Premium</option>
                        <option value="business">Business</option>
                        <option value="standard">Standard</option>
                    </Select>
                </div>
            </Card>

            {/* Companies Table */}
            <Card>
                <div className="p-6 border-b">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold">Companies</h3>
                            <p className="text-sm text-gray-400">{filteredCompanies.length} companies found</p>
                        </div>
                        <Button size="sm">
                            Add Company
                        </Button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                                    Company
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                                    Plan
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                                    Users
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                                    Vehicles
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                                    Monthly Spend
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                                    Last Active
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredCompanies.map((company) => (
                                <tr key={company.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-black dark:text-white">{company.name}</div>
                                            <div className="text-sm text-gray-400">{company.email}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={getPlanColor(company.planType)}>
                                            {company.planType}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black dark:text-white">
                                        {company.activeUsers} / {company.totalUsers}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black dark:text-white">
                                        {company.totalVehicles}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black dark:text-white">
                                        ${company.monthlySpend.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={getStatusColor(company.status)}>
                                            {company.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                        {company.lastActive}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex items-center gap-2">
                                            <Button size="xs" variant="outline" icon={<HiEye />}>
                                                View
                                            </Button>
                                            <Button size="xs" variant="outline" icon={<HiCog />}>
                                                Manage
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    )
}

export default CompanyDirectory 