import { useState } from 'react'
import { Card, Table, Badge, Button, Input, Select, Avatar } from '@/components/ui'
import { HiSearch, HiEye, HiCog, HiOfficeBuilding } from 'react-icons/hi'

const { Thead, Tbody, Tr, Th, Td, THead, TBody } = Table

const CompanyDirectory = ({ data = [] }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [planFilter, setPlanFilter] = useState('all')

    const filteredData = data.filter(company => {
        const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === 'all' || company.status.toLowerCase() === statusFilter.toLowerCase()
        const matchesPlan = planFilter === 'all' || company.planType.toLowerCase() === planFilter.toLowerCase()
        return matchesSearch && matchesStatus && matchesPlan
    })

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'active': return 'green'
            case 'suspended': return 'red'
            case 'trial': return 'blue'
            default: return 'gray'
        }
    }

    const getPlanColor = (plan) => {
        switch (plan.toLowerCase()) {
            case 'premium': return 'purple'
            case 'business': return 'blue'
            case 'basic': return 'gray'
            default: return 'gray'
        }
    }

    return (
        <Card>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-6 border-b">
                <div className="flex items-center gap-3">
                    <HiOfficeBuilding className="text-xl text-gray-600" />
                    <div>
                        <h3 className="text-lg font-semibold">Company Directory</h3>
                        <p className="text-sm text-gray-600">{filteredData.length} companies</p>
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
                        value={statusFilter}
                        onChange={setStatusFilter}
                        placeholder="Filter by status"
                        className="w-full sm:w-32"
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
                        className="w-full sm:w-32"
                    >
                        <option value="all">All Plans</option>
                        <option value="basic">Basic</option>
                        <option value="business">Business</option>
                        <option value="premium">Premium</option>
                    </Select>
                </div>
            </div>

            <div className="overflow-x-auto">
                <Table>
                    <THead>
                        <Tr>
                            <Th>Company</Th>
                            <Th>Plan Type</Th>
                            <Th>Active Users</Th>
                            <Th>Vehicles/Reservations</Th>
                            <Th>Status</Th>
                            <Th>Last Active</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </THead>
                    <TBody>
                        {filteredData.map((company) => (
                            <Tr key={company.id}>
                                <Td>
                                    <div className="flex items-center gap-3">
                                        <Avatar
                                            size="sm"
                                            src={company.logo}
                                            icon={<HiOfficeBuilding />}
                                        />
                                        <div>
                                            <div className="font-semibold">{company.name}</div>
                                            <div className="text-sm text-gray-500">{company.email}</div>
                                        </div>
                                    </div>
                                </Td>
                                <Td>
                                    <Badge className={`bg-${getPlanColor(company.planType)}-100 text-${getPlanColor(company.planType)}-800`}>
                                        {company.planType}
                                    </Badge>
                                </Td>
                                <Td>
                                    <div className="text-center">
                                        <div className="font-semibold">{company.activeUsers}</div>
                                        <div className="text-xs text-gray-500">/ {company.totalUsers} total</div>
                                    </div>
                                </Td>
                                <Td>
                                    <div className="text-center">
                                        <div className="font-semibold">{company.totalVehicles}</div>
                                        <div className="text-xs text-gray-500">{company.totalReservations} reservations</div>
                                    </div>
                                </Td>
                                <Td>
                                    <Badge className={`bg-${getStatusColor(company.status)}-100 text-${getStatusColor(company.status)}-800`}>
                                        {company.status}
                                    </Badge>
                                </Td>
                                <Td>
                                    <div className="text-sm">
                                        {company.lastActive}
                                    </div>
                                </Td>
                                <Td>
                                    <div className="flex items-center gap-2">
                                        <Button size="xs" variant="plain" icon={<HiEye />}>
                                            View
                                        </Button>
                                        <Button size="xs" variant="plain" icon={<HiCog />}>
                                            Manage
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
                    <HiOfficeBuilding className="mx-auto text-4xl text-gray-300 mb-4" />
                    <p className="text-gray-500">No companies found matching your criteria</p>
                </div>
            )}
        </Card>
    )
}

export default CompanyDirectory 