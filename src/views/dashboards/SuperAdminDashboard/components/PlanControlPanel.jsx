import { useState } from 'react'
import { Card, Table, Badge, Button, Input, Select, Dialog, Form, FormItem, Checkbox, Switcher } from '@/components/ui'
import { HiSearch, HiCog, HiCreditCard, HiSparkles, HiUsers, HiGlobe } from 'react-icons/hi'

const { THead, TBody, Tr, Th, Td } = Table

const PlanControlPanel = ({ data = [] }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [planFilter, setPlanFilter] = useState('all')
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [selectedCompany, setSelectedCompany] = useState(null)

    const filteredData = data.filter(company => {
        const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesPlan = planFilter === 'all' || company.planType.toLowerCase() === planFilter.toLowerCase()
        return matchesSearch && matchesPlan
    })

    const getPlanColor = (plan) => {
        switch (plan.toLowerCase()) {
            case 'premium': return 'purple'
            case 'business': return 'blue'
            case 'basic': return 'gray'
            case 'trial': return 'green'
            default: return 'gray'
        }
    }

    const handleEditPlan = (company) => {
        setSelectedCompany(company)
        setEditDialogOpen(true)
    }

    const handleSavePlan = () => {
        // Handle plan update logic here
        setEditDialogOpen(false)
        setSelectedCompany(null)
    }

    const planFeatures = {
        basic: ['Basic fleet tracking', 'Monthly reports', 'Email support'],
        business: ['Advanced analytics', 'Custom branding', 'Priority support', 'Export data'],
        premium: ['Full feature access', 'Custom integrations', 'Dedicated support', 'White-label solution']
    }

    return (
        <Card>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-6 border-b">
                <div className="flex items-center gap-3">
                    <HiCreditCard className="text-xl text-blue-600" />
                    <div>
                        <h3 className="text-lg font-semibold">Plan and Limit Control Panel</h3>
                        <p className="text-sm text-gray-600">Manage company subscriptions and feature access</p>
                    </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                        placeholder="Search companies..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        prefix={<HiSearch />}
                        className="w-full sm:w-64"
                    />
                    <Select
                        value={planFilter}
                        onChange={setPlanFilter}
                        placeholder="Filter by plan"
                        className="w-full sm:w-32"
                    >
                        <option value="all">All Plans</option>
                        <option value="basic">Basic</option>
                        <option value="business">Business</option>
                        <option value="premium">Premium</option>
                        <option value="trial">Trial</option>
                    </Select>
                </div>
            </div>

            <div className="overflow-x-auto">
                <Table>
                    <THead>
                        <Tr>
                            <Th>Company</Th>
                            <Th>Current Plan</Th>
                            <Th>Monthly Cost</Th>
                            <Th>Features</Th>
                            <Th>Custom Branding</Th>
                            <Th>User Limit</Th>
                            <Th>Export Retention</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </THead>
                    <TBody>
                        {filteredData.map((company) => (
                            <Tr key={company.id}>
                                <Td>
                                    <div className="font-semibold">{company.name}</div>
                                    <div className="text-sm text-gray-500">{company.email}</div>
                                </Td>
                                <Td>
                                    <Badge className={`bg-${getPlanColor(company.planType)}-100 text-${getPlanColor(company.planType)}-800`}>
                                        {company.planType}
                                    </Badge>
                                </Td>
                                <Td>
                                    <div className="font-semibold text-lg">
                                        ${company.monthlyCost}
                                    </div>
                                </Td>
                                <Td>
                                    <div className="space-y-1">
                                        {(planFeatures[company.planType.toLowerCase()] || []).slice(0, 2).map((feature, index) => (
                                            <div key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                                {feature}
                                            </div>
                                        ))}
                                        {planFeatures[company.planType.toLowerCase()]?.length > 2 && (
                                            <div className="text-xs text-gray-500">
                                                +{planFeatures[company.planType.toLowerCase()].length - 2} more
                                            </div>
                                        )}
                                    </div>
                                </Td>
                                <Td>
                                    <div className="flex items-center gap-2">
                                        <Switcher checked={company.customBranding} disabled size="sm" />
                                        <span className="text-sm">
                                            {company.customBranding ? 'Enabled' : 'Disabled'}
                                        </span>
                                    </div>
                                </Td>
                                <Td>
                                    <div className="text-center">
                                        <div className="font-semibold">{company.activeUsers}</div>
                                        <div className="text-xs text-gray-500">/ {company.userLimit} limit</div>
                                    </div>
                                </Td>
                                <Td>
                                    <div className="text-sm">
                                        {company.exportRetention} days
                                    </div>
                                </Td>
                                <Td>
                                    <div className="flex items-center gap-2">
                                        <Button 
                                            size="xs" 
                                            variant="solid" 
                                            color="blue"
                                            onClick={() => handleEditPlan(company)}
                                        >
                                            Edit Plan
                                        </Button>
                                        <Button size="xs" variant="outline">
                                            Billing
                                        </Button>
                                    </div>
                                </Td>
                            </Tr>
                        ))}
                    </TBody>
                </Table>
            </div>

            {/* Edit Plan Dialog */}
            <Dialog isOpen={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <HiCog className="text-xl text-blue-600" />
                        <h3 className="text-xl font-semibold">Edit Plan - {selectedCompany?.name}</h3>
                    </div>

                    <Form className="space-y-6">
                        <FormItem label="Plan Type">
                            <Select defaultValue={selectedCompany?.planType.toLowerCase()}>
                                <option value="basic">Basic - $29/month</option>
                                <option value="business">Business - $79/month</option>
                                <option value="premium">Premium - $149/month</option>
                            </Select>
                        </FormItem>

                        <FormItem label="Feature Access">
                            <div className="space-y-2">
                                <Checkbox defaultChecked>Export Data Access</Checkbox>
                                <Checkbox defaultChecked={selectedCompany?.customBranding}>Custom Branding</Checkbox>
                                <Checkbox defaultChecked>Multi-role Setup</Checkbox>
                                <Checkbox>Advanced Analytics</Checkbox>
                                <Checkbox>API Access</Checkbox>
                            </div>
                        </FormItem>

                        <FormItem label="User Limit">
                            <Input 
                                type="number" 
                                defaultValue={selectedCompany?.userLimit}
                                placeholder="Enter user limit"
                            />
                        </FormItem>

                        <FormItem label="Export Retention Period (days)">
                            <Select defaultValue={selectedCompany?.exportRetention?.toString()}>
                                <option value="30">30 days</option>
                                <option value="60">60 days</option>
                                <option value="90">90 days</option>
                                <option value="365">1 year</option>
                                <option value="unlimited">Unlimited</option>
                            </Select>
                        </FormItem>

                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button variant="solid" color="blue" onClick={handleSavePlan}>
                                Save Changes
                            </Button>
                        </div>
                    </Form>
                </div>
            </Dialog>

            {filteredData.length === 0 && (
                <div className="text-center py-8">
                    <HiCreditCard className="mx-auto text-4xl text-gray-300 mb-4" />
                    <p className="text-gray-500">No companies found matching your criteria</p>
                </div>
            )}
        </Card>
    )
}

export default PlanControlPanel 