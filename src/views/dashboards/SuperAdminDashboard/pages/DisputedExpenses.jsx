import { useState } from 'react'
import { Card, Button, Input, Select, Tabs } from '@/components/ui'
import { HiSearch, HiExclamationCircle, HiClock, HiCurrencyDollar } from 'react-icons/hi'

const { TabList, TabNav, TabContent } = Tabs

const DisputedExpenses = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [activeTab, setActiveTab] = useState('tolls')

    // Mock data for disputed expenses
    const mockExpenses = {
        tolls: [
            {
                id: 1,
                company: 'TechCorp Inc.',
                amount: 45.50,
                description: 'Highway toll - Route 95',
                date: '2024-01-15',
                status: 'Disputed',
                daysOverdue: 12,
                reason: 'Incorrect charge amount'
            },
            {
                id: 2,
                company: 'Global Fleet',
                amount: 23.75,
                description: 'Bridge toll - Golden Gate',
                date: '2024-01-18',
                status: 'Expired',
                daysOverdue: 8,
                reason: 'Payment deadline passed'
            }
        ],
        tickets: [
            {
                id: 3,
                company: 'Metro Transport',
                amount: 150.00,
                description: 'Speeding violation - 15 mph over',
                date: '2024-01-10',
                status: 'Disputed',
                daysOverdue: 18,
                reason: 'Driver disputes location'
            },
            {
                id: 4,
                company: 'Logistics Plus',
                amount: 75.00,
                description: 'Parking violation - No permit',
                date: '2024-01-20',
                status: 'Pending',
                daysOverdue: 5,
                reason: 'Awaiting documentation'
            }
        ],
        invoices: [
            {
                id: 5,
                company: 'City Delivery',
                amount: 1200.00,
                description: 'Fuel charges - December 2023',
                date: '2024-01-05',
                status: 'Disputed',
                daysOverdue: 25,
                reason: 'Billing discrepancy'
            }
        ]
    }

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'disputed': return 'text-red-600'
            case 'expired': return 'text-orange-600'
            case 'pending': return 'text-yellow-600'
            case 'resolved': return 'text-green-600'
            default: return 'text-gray-600'
        }
    }

    const getDaysOverdueColor = (days) => {
        if (days > 20) return 'text-red-600'
        if (days > 10) return 'text-orange-600'
        if (days > 5) return 'text-yellow-600'
        return 'text-gray-600'
    }

    const renderExpenseTable = (expenses, type) => {
        const filteredExpenses = expenses.filter(expense => {
            const matchesSearch = expense.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                expense.description.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesStatus = statusFilter === 'all' || expense.status.toLowerCase() === statusFilter.toLowerCase()
            return matchesSearch && matchesStatus
        })

        return (
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                                Company
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                                Description
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                                Amount
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                                Days Overdue
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredExpenses.map((expense) => (
                            <tr key={expense.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-black dark:text-white">{expense.company}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-black dark:text-white">{expense.description}</div>
                                    <div className="text-sm text-gray-400">{expense.reason}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black dark:text-white">
                                    ${expense.amount.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                    {expense.date}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={getStatusColor(expense.status)}>
                                        {expense.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`text-sm font-medium ${getDaysOverdueColor(expense.daysOverdue)}`}>
                                        {expense.daysOverdue} days
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex items-center gap-2">
                                        <Button size="xs" variant="outline">
                                            Review
                                        </Button>
                                        <Button size="xs">
                                            Resolve
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }

    const getTotalAmount = (expenses) => {
        return expenses.reduce((sum, expense) => sum + expense.amount, 0)
    }

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-red-100 dark:bg-gray-800 dark:border rounded-lg">
                        <HiExclamationCircle className="text-red-600 text-xl" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-black dark:text-white">Disputed / Expired Expenses</h1>
                        <p className="text-gray-400">Monitor and resolve unresolved expenses across all companies</p>
                    </div>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-6">
                    <div className="flex items-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-red-100 dark:bg-gray-800 dark:border rounded-lg">
                            <HiCurrencyDollar className="text-red-600 text-xl" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-400">Total Disputed Tolls</p>
                            <p className="text-2xl font-bold text-black dark:text-white">${getTotalAmount(mockExpenses.tolls).toFixed(2)}</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-6">
                    <div className="flex items-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-gray-800 dark:border rounded-lg">
                            <HiExclamationCircle className="text-orange-600 text-xl" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-400">Total Disputed Tickets</p>
                            <p className="text-2xl font-bold text-black dark:text-white">${getTotalAmount(mockExpenses.tickets).toFixed(2)}</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-6">
                    <div className="flex items-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 dark:bg-gray-800 dark:border rounded-lg">
                            <HiClock className="text-yellow-600 text-xl" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-400">Total Disputed Invoices</p>
                            <p className="text-2xl font-bold text-black dark:text-white">${getTotalAmount(mockExpenses.invoices).toFixed(2)}</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Filters */}
            <Card className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1">
                        <Input
                            placeholder="Search expenses..."
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
                        <option value="disputed">Disputed</option>
                        <option value="expired">Expired</option>
                        <option value="pending">Pending</option>
                        <option value="resolved">Resolved</option>
                    </Select>
                </div>
            </Card>

            {/* Expenses Table with Tabs */}
            <Card>
                <Tabs value={activeTab} onChange={setActiveTab}>
                    <TabList>
                        <TabNav value="tolls">Tolls ({mockExpenses.tolls.length})</TabNav>
                        <TabNav value="tickets">Tickets ({mockExpenses.tickets.length})</TabNav>
                        <TabNav value="invoices">Invoices ({mockExpenses.invoices.length})</TabNav>
                    </TabList>
                    <div className="mt-6">
                        <TabContent value="tolls">
                            {renderExpenseTable(mockExpenses.tolls, 'tolls')}
                        </TabContent>
                        <TabContent value="tickets">
                            {renderExpenseTable(mockExpenses.tickets, 'tickets')}
                        </TabContent>
                        <TabContent value="invoices">
                            {renderExpenseTable(mockExpenses.invoices, 'invoices')}
                        </TabContent>
                    </div>
                </Tabs>
            </Card>
        </div>
    )
}

export default DisputedExpenses 