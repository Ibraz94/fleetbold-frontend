import { useState } from 'react'
import { Card, Table, Badge, Button, Input, Select } from '@/components/ui'
import Tabs from '@/components/ui/Tabs'
import { HiSearch, HiExclamationTriangle, HiCurrencyDollar, HiDocument, HiClock } from 'react-icons/hi'

const { THead, TBody, Tr, Th, Td } = Table
const { TabList, TabNav, TabContent } = Tabs

const DisputedExpenseMonitor = ({ data = {} }) => {
    const [activeTab, setActiveTab] = useState('tolls')
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [companyFilter, setCompanyFilter] = useState('all')

    const currentData = data[activeTab] || []
    
    const filteredData = currentData.filter(expense => {
        const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            expense.company.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === 'all' || expense.status.toLowerCase() === statusFilter.toLowerCase()
        const matchesCompany = companyFilter === 'all' || expense.company === companyFilter
        return matchesSearch && matchesStatus && matchesCompany
    })

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'disputed': return 'red'
            case 'expired': return 'orange'
            case 'pending': return 'yellow'
            case 'resolved': return 'green'
            default: return 'gray'
        }
    }

    const getExpenseIcon = (type) => {
        switch (type) {
            case 'tolls': return <HiCurrencyDollar className="w-5 h-5" />
            case 'tickets': return <HiDocument className="w-5 h-5" />
            case 'invoices': return <HiDocument className="w-5 h-5" />
            default: return <HiCurrencyDollar className="w-5 h-5" />
        }
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount)
    }

    const tabs = [
        { key: 'tolls', label: 'Unresolved Tolls', count: data.tolls?.length || 0 },
        { key: 'tickets', label: 'Traffic Tickets', count: data.tickets?.length || 0 },
        { key: 'invoices', label: 'Disputed Invoices', count: data.invoices?.length || 0 },
    ]

    return (
        <Card>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-6 border-b">
                <div className="flex items-center gap-3">
                    <HiExclamationTriangle className="text-xl text-orange-600" />
                    <div>
                        <h3 className="text-lg font-semibold">Disputed / Expired Expense Monitor</h3>
                        <p className="text-sm text-gray-600">
                            {filteredData.length} items requiring attention
                        </p>
                    </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                        placeholder="Search expenses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        prefix={<HiSearch />}
                        className="w-full sm:w-64"
                    />
                    <Select
                        value={statusFilter}
                        onChange={setStatusFilter}
                        placeholder="Filter by status"
                        className="w-full sm:w-32"
                    >
                        <option value="all">All Status</option>
                        <option value="disputed">Disputed</option>
                        <option value="expired">Expired</option>
                        <option value="pending">Pending</option>
                        <option value="resolved">Resolved</option>
                    </Select>
                    <Select
                        value={companyFilter}
                        onChange={setCompanyFilter}
                        placeholder="Filter by company"
                        className="w-full sm:w-32"
                    >
                        <option value="all">All Companies</option>
                        <option value="TechCorp">TechCorp</option>
                        <option value="GlobalFleet">GlobalFleet</option>
                        <option value="FleetMax">FleetMax</option>
                    </Select>
                </div>
            </div>

            <div className="p-6">
                <Tabs value={activeTab} onChange={setActiveTab}>
                    <TabList className="mb-6">
                        {tabs.map(tab => (
                            <TabNav key={tab.key} value={tab.key} className="flex items-center gap-2">
                                {getExpenseIcon(tab.key)}
                                {tab.label}
                                {tab.count > 0 && (
                                    <Badge className="bg-red-100 text-red-800 ml-2">
                                        {tab.count}
                                    </Badge>
                                )}
                            </TabNav>
                        ))}
                    </TabList>

                    <TabContent value={activeTab}>
                        <div className="overflow-x-auto">
                            <Table>
                                <THead>
                                    <Tr>
                                        <Th>Company</Th>
                                        <Th>Description</Th>
                                        <Th>Amount</Th>
                                        <Th>Date</Th>
                                        <Th>Status</Th>
                                        <Th>Days Overdue</Th>
                                        <Th>Actions</Th>
                                    </Tr>
                                </THead>
                                <TBody>
                                    {filteredData.map((expense) => (
                                        <Tr key={expense.id}>
                                            <Td>
                                                <div className="font-semibold">{expense.company}</div>
                                                <div className="text-sm text-gray-500">{expense.vehicle}</div>
                                            </Td>
                                            <Td>
                                                <div className="font-medium">{expense.description}</div>
                                                <div className="text-sm text-gray-500">{expense.location}</div>
                                            </Td>
                                            <Td>
                                                <div className="font-semibold text-lg">
                                                    {formatCurrency(expense.amount)}
                                                </div>
                                            </Td>
                                            <Td>
                                                <div className="text-sm">
                                                    {expense.date}
                                                </div>
                                            </Td>
                                            <Td>
                                                <Badge className={`bg-${getStatusColor(expense.status)}-100 text-${getStatusColor(expense.status)}-800`}>
                                                    {expense.status}
                                                </Badge>
                                            </Td>
                                            <Td>
                                                <div className="flex items-center gap-1">
                                                    <HiClock className="w-4 h-4 text-red-500" />
                                                    <span className="text-red-600 font-medium">
                                                        {expense.daysOverdue} days
                                                    </span>
                                                </div>
                                            </Td>
                                            <Td>
                                                <div className="flex items-center gap-2">
                                                    <Button size="xs" variant="solid" color="blue">
                                                        Review
                                                    </Button>
                                                    <Button size="xs" variant="outline">
                                                        Contact
                                                    </Button>
                                                </div>
                                            </Td>
                                        </Tr>
                                    ))}
                                </TBody>
                            </Table>
                        </div>

                        {filteredData.length === 0 && (
                            <div className="text-center py-8">
                                {getExpenseIcon(activeTab)}
                                <p className="text-gray-500 mt-4">
                                    No {activeTab} found matching your criteria
                                </p>
                            </div>
                        )}
                    </TabContent>
                </Tabs>
            </div>
        </Card>
    )
}

export default DisputedExpenseMonitor 