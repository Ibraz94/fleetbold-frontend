import { Card } from '@/components/ui'
import { HiCurrencyDollar, HiTrendingUp, HiTrendingDown, HiCreditCard } from 'react-icons/hi'

const BillingOverview = () => {
    // Mock billing data
    const mockBillingData = {
        totalRevenue: 145600,
        monthlyGrowth: 12.5,
        activeSubscriptions: 169,
        churnRate: 2.3,
        averageRevenue: 862
    }

    const mockCompanyBilling = [
        {
            company: 'TechCorp Inc.',
            plan: 'Premium',
            monthlyRevenue: 2400,
            status: 'Active',
            nextBilling: '2024-02-15',
            paymentMethod: '**** 1234'
        },
        {
            company: 'Global Fleet Solutions',
            plan: 'Business',
            monthlyRevenue: 1800,
            status: 'Active',
            nextBilling: '2024-02-18',
            paymentMethod: '**** 5678'
        },
        {
            company: 'Metro Transport Co.',
            plan: 'Standard',
            monthlyRevenue: 800,
            status: 'Overdue',
            nextBilling: '2024-01-28',
            paymentMethod: '**** 9012'
        },
        {
            company: 'Logistics Plus',
            plan: 'Enterprise',
            monthlyRevenue: 4200,
            status: 'Active',
            nextBilling: '2024-02-20',
            paymentMethod: '**** 3456'
        }
    ]

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'active': return 'text-green-600'
            case 'overdue': return 'text-red-600'
            case 'trial': return 'text-blue-600'
            default: return 'text-gray-600'
        }
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount)
    }

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-green-100 dark:bg-gray-800 dark:border rounded-lg">
                    <HiCurrencyDollar className="text-green-600 text-xl" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-black dark:text-white">Billing Overview</h1>
                    <p className="text-gray-400">Monitor revenue, subscriptions, and billing status</p>
                </div>
            </div>

            {/* Revenue Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <Card className="p-6">
                    <div className="flex items-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-gray-800 dark:border rounded-lg">
                            <HiCurrencyDollar className="text-green-600 text-xl" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-400">Total Revenue</p>
                            <p className="text-2xl font-bold text-black dark:text-white">{formatCurrency(mockBillingData.totalRevenue)}</p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-gray-800 dark:border rounded-lg">
                            <HiTrendingUp className="text-blue-600 text-xl" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-400">Monthly Growth</p>
                            <p className="text-2xl font-bold text-green-600">+{mockBillingData.monthlyGrowth}%</p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-gray-800 dark:border rounded-lg">
                            <HiCreditCard className="text-purple-600 text-xl" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-400">Active Subscriptions</p>
                            <p className="text-2xl font-bold text-black dark:text-white">{mockBillingData.activeSubscriptions}</p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-red-100 dark:bg-gray-800 dark:border rounded-lg">
                            <HiTrendingDown className="text-red-600 text-xl" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-400">Churn Rate</p>
                            <p className="text-2xl font-bold text-red-600">{mockBillingData.churnRate}%</p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 dark:bg-gray-800 dark:border rounded-lg">
                            <HiCurrencyDollar className="text-yellow-600 text-xl" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-400">Avg Revenue</p>
                            <p className="text-2xl font-bold text-black dark:text-white">{formatCurrency(mockBillingData.averageRevenue)}</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Company Billing Table */}
            <Card>
                <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold">Company Billing Status</h3>
                    <p className="text-sm text-gray-400">Monitor individual company billing and payment status</p>
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
                                    Monthly Revenue
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                                    Next Billing
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                                    Payment Method
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {mockCompanyBilling.map((company, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-black dark:text-white">{company.company}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span>
                                            {company.plan}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black dark:text-white">
                                        {formatCurrency(company.monthlyRevenue)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={getStatusColor(company.status)}>
                                            {company.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black dark:text-white">
                                        {company.nextBilling}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                        {company.paymentMethod}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Revenue Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Revenue by Plan</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Enterprise</span>
                            <span className="text-sm text-black dark:text-white font-semibold">$50,400/mo</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Premium</span>
                            <span className="text-sm text-black dark:text-white font-semibold">$81,600/mo</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Business</span>
                            <span className="text-sm text-black dark:text-white font-semibold">$140,400/mo</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Standard</span>
                            <span className="text-sm text-black dark:text-white font-semibold">$44,550/mo</span>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Payment Status</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                                <span className="text-sm font-medium">Paid</span>
                            </div>
                            <span className="text-sm text-gray-400">156 companies</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
                                <span className="text-sm font-medium">Pending</span>
                            </div>
                            <span className="text-sm text-gray-400">8 companies</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-red-400 rounded-full mr-3"></div>
                                <span className="text-sm font-medium">Overdue</span>
                            </div>
                            <span className="text-sm text-gray-400">5 companies</span>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default BillingOverview 