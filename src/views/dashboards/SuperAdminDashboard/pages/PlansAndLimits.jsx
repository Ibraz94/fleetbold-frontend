import { Card, Button } from '@/components/ui'
import { HiCog, HiArrowUp, HiArrowDown, HiCheck } from 'react-icons/hi'

const PlansAndLimits = () => {
    // Mock data for plans
    const mockPlans = [
        {
            id: 1,
            name: 'Standard',
            price: 99,
            users: 15,
            vehicles: 50,
            features: ['Basic reporting', 'Email support', 'Mobile app'],
            companies: 45,
            color: 'gray'
        },
        {
            id: 2,
            name: 'Business',
            price: 199,
            users: 50,
            vehicles: 150,
            features: ['Advanced reporting', 'Priority support', 'API access', 'Custom branding'],
            companies: 78,
            color: 'blue'
        },
        {
            id: 3,
            name: 'Premium',
            price: 349,
            users: 100,
            vehicles: 300,
            features: ['Premium analytics', '24/7 support', 'White labeling', 'Advanced integrations'],
            companies: 34,
            color: 'indigo'
        },
        {
            id: 4,
            name: 'Enterprise',
            price: 599,
            users: 'Unlimited',
            vehicles: 'Unlimited',
            features: ['Custom development', 'Dedicated support', 'SLA guarantee', 'On-premise option'],
            companies: 12,
            color: 'purple'
        }
    ]

    const mockCompanyPlans = [
        {
            company: 'TechCorp Inc.',
            currentPlan: 'Premium',
            users: '45/100',
            vehicles: '120/300',
            usage: 85,
            canUpgrade: true,
            canDowngrade: false
        },
        {
            company: 'Global Fleet',
            currentPlan: 'Business',
            users: '28/50',
            vehicles: '85/150',
            usage: 60,
            canUpgrade: true,
            canDowngrade: true
        },
        {
            company: 'Metro Transport',
            currentPlan: 'Standard',
            users: '12/15',
            vehicles: '30/50',
            usage: 75,
            canUpgrade: true,
            canDowngrade: false
        }
    ]

    const getPlanColor = (color) => {
        const colors = {
            gray: 'bg-gray-100 text-gray-800 border-gray-200',
            blue: 'bg-blue-100 text-blue-800 border-blue-200',
            indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200',
            purple: 'bg-purple-100 text-purple-800 border-purple-200'
        }
        return colors[color] || colors.gray
    }

    const getUsageColor = (usage) => {
        if (usage >= 90) return 'bg-red-500'
        if (usage >= 75) return 'bg-yellow-500'
        return 'bg-green-500'
    }

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-purple-100 dark:bg-gray-800 dark:border rounded-lg">
                        <HiCog className="text-purple-600 text-xl" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-black dark:text-white">Plans & Limits Control Panel</h1>
                        <p className="text-gray-400">Manage subscription plans, features, and usage limits</p>
                    </div>
                </div>
            </div>

            {/* Plan Overview */}
            <div>
                <h2 className="text-lg font-semibold mb-4">Available Plans</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {mockPlans.map((plan) => (
                        <Card key={plan.id} className={`p-6 border-2 ${getPlanColor(plan.color)}`}>
                            <div className="text-center">
                                <h3 className="text-lg font-semibold mb-2 text-black">{plan.name}</h3>
                                <div className="text-3xl font-bold mb-2">${plan.price}</div>
                                <div className="text-sm text-black mb-4">per month</div>
                                
                                <div className="space-y-2 mb-4">
                                    <div className="text-sm">
                                        <strong>Users:</strong> {plan.users}
                                    </div>
                                    <div className="text-sm">
                                        <strong>Vehicles:</strong> {plan.vehicles}
                                    </div>
                                </div>

                                <div className="space-y-1 mb-4">
                                    {plan.features.map((feature, index) => (
                                        <div key={index} className="flex items-center text-sm">
                                            <HiCheck className="w-4 h-4 text-green-500 mr-2" />
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                <div className="text-sm text-gray-600">
                                    {plan.companies} companies
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Company Plan Management */}
            <Card>
                <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold">Company Plan Management</h3>
                    <p className="text-sm text-gray-400">Monitor and manage individual company subscriptions</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                                    Company
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                                    Current Plan
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                                    User Usage
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                                    Vehicle Usage
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                                    Overall Usage
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {mockCompanyPlans.map((company, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-black dark:text-white">{company.company}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span>
                                            {company.currentPlan}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black dark:text-white">
                                        {company.users}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black dark:text-white">
                                        {company.vehicles}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                                <div 
                                                    className={`h-2 rounded-full ${getUsageColor(company.usage)}`}
                                                    style={{ width: `${company.usage}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-sm text-black dark:text-white">{company.usage}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex items-center gap-2">
                                            {company.canUpgrade && (
                                                <Button size="xs" variant="outline" icon={<HiArrowUp />}>
                                                    Upgrade
                                                </Button>
                                            )}
                                            {company.canDowngrade && (
                                                <Button size="xs" variant="outline" icon={<HiArrowDown />}>
                                                    Downgrade
                                                </Button>
                                            )}
                                            <Button size="xs" variant="outline">
                                                Configure
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Plan Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Plan Distribution</h3>
                    <div className="space-y-3">
                        {mockPlans.map((plan) => (
                            <div key={plan.id} className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className={`w-3 h-3 rounded-full mr-3 ${plan.color === 'gray' ? 'bg-gray-400' : plan.color === 'blue' ? 'bg-blue-400' : plan.color === 'indigo' ? 'bg-indigo-400' : 'bg-purple-400'}`}></div>
                                    <span className="text-sm font-medium">{plan.name}</span>
                                </div>
                                <span className="text-sm text-black dark:text-white">{plan.companies} companies</span>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
                    <div className="space-y-3">
                        {mockPlans.map((plan) => (
                            <div key={plan.id} className="flex items-center justify-between">
                                <span className="text-sm font-medium">{plan.name}</span>
                                <span className="text-sm text-black dark:text-white font-semibold">
                                    ${(plan.price * plan.companies).toLocaleString()}/mo
                                </span>
                            </div>
                        ))}
                        <div className="border-t pt-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold">Total MRR</span>
                                <span className="text-sm font-bold text-green-600">
                                    ${mockPlans.reduce((sum, plan) => sum + (plan.price * plan.companies), 0).toLocaleString()}/mo
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default PlansAndLimits 