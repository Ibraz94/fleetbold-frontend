import { useState, useEffect } from 'react'
import { Card, Button, Input, Select, Spinner } from '@/components/ui'
import { HiSearch, HiOfficeBuilding, HiEye, HiCog, HiCheckCircle, HiXCircle } from 'react-icons/hi'
import { apiGetCompanies, apiGetCompaniesStatistics, apiActivateCompany, apiDeactivateCompany } from '@/services/companiesService'
import { toast } from '@/components/ui/toast'
import { useNavigate } from 'react-router'

const CompanyDirectory = () => {
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [planFilter, setPlanFilter] = useState('all')
    const [companies, setCompanies] = useState([])
    const [statistics, setStatistics] = useState({})
    const [loading, setLoading] = useState(true)
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 20,
        total: 0
    })

    // Load companies data
    useEffect(() => {
        const loadData = async () => {
            setLoading(true)
            await Promise.all([
                fetchCompanies(),
                fetchStatistics()
            ])
            setLoading(false)
        }
        loadData()
    }, [])

    // Fetch companies data
    const fetchCompanies = async (page = 1, pageSize = 20) => {
        try {
            const response = await apiGetCompanies({
                page,
                per_page: pageSize
            })
            console.log('Companies response:', response) // Debug log
            setCompanies(response.companies || [])
            setPagination(prev => ({
                ...prev,
                current: page,
                total: response.pagination?.total || 0
            }))
        } catch (error) {
            console.error('Error fetching companies:', error)
            toast.push(error.response?.data?.message || 'Failed to fetch companies', {
                placement: 'top-end',
                type: 'error'
            })
        }
    }

    // Add Companies
    const handleAddCompany = () => {
        navigate('/super-admin/company/add')
    }

    // Fetch statistics
    const fetchStatistics = async () => {
        try {
            const response = await apiGetCompaniesStatistics()
            console.log('Statistics response:', response) // Debug log
            setStatistics(response)
        } catch (error) {
            console.error('Error fetching statistics:', error)
            // Don't show error toast for statistics if it fails - just log it
            console.log('Statistics API might not be implemented yet')
        }
    }

    // Handle company activation/deactivation
    const handleActivateCompany = async (companyId) => {
        try {
            await apiActivateCompany(companyId)
            toast.push('Company activated successfully!', {
                placement: 'top-end',
                type: 'success'
            })
            fetchCompanies()
        } catch (error) {
            console.error('Error activating company:', error)
            toast.push(error.response?.data?.message || 'Failed to activate company', {
                placement: 'top-end',
                type: 'error'
            })
        }
    }

    const handleDeactivateCompany = async (companyId) => {
        if (window.confirm('Are you sure you want to deactivate this company?')) {
            try {
                await apiDeactivateCompany(companyId)
                toast.push('Company deactivated successfully!', {
                    placement: 'top-end',
                    type: 'success'
                })
                fetchCompanies()
            } catch (error) {
                console.error('Error deactivating company:', error)
                toast.push(error.response?.data?.message || 'Failed to deactivate company', {
                    placement: 'top-end',
                    type: 'error'
                })
            }
        }
    }

    const filteredCompanies = companies.filter(company => {
        const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            company.email.toLowerCase().includes(searchTerm.toLowerCase())
        const status = company.is_active ? 'active' : 'inactive'
        const matchesStatus = statusFilter === 'all' || status === statusFilter
        const matchesPlan = planFilter === 'all' || company.subscription_plan?.toLowerCase() === planFilter.toLowerCase()
        return matchesSearch && matchesStatus && matchesPlan
    })

    const getStatusColor = (isActive) => {
        return isActive ? 'text-green-600' : 'text-red-600'
    }

    const getStatusText = (isActive) => {
        return isActive ? 'Active' : 'Inactive'
    }

    const getPlanColor = (plan) => {
        if (!plan) return 'text-gray-600'
        switch (plan.toLowerCase()) {
            case 'enterprise': return 'text-purple-600'
            case 'premium': return 'text-indigo-600'
            case 'business': return 'text-blue-600'
            case 'standard': return 'text-gray-600'
            default: return 'text-gray-600'
        }
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A'
        const date = new Date(dateString)
        const now = new Date()
        const diffTime = Math.abs(now - date)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        
        if (diffDays === 1) return '1 day ago'
        if (diffDays < 30) return `${diffDays} days ago`
        return date.toLocaleDateString()
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Spinner size="lg" />
            </div>
        )
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
                            prefix={<HiSearch />}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Select
                        value={statusFilter}
                        placeholder="Filter by status"
                        className="w-full lg:w-48"
                        onChange={setStatusFilter}
                        >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </Select>
                    <Select
                        value={planFilter}
                        placeholder="Filter by plan"
                        className="w-full lg:w-48"
                        onChange={setPlanFilter}
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
                        <Button size="sm" onClick={handleAddCompany}>
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
                                    Fleet Size
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                                    Phone
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                                    Created
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredCompanies.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                                        No companies found matching your criteria.
                                    </td>
                                </tr>
                            ) : (
                                filteredCompanies.map((company) => (
                                    <tr key={company.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-black dark:text-white">{company.name}</div>
                                                <div className="text-sm text-gray-400">{company.email}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={getPlanColor(company.subscription_plan)}>
                                                {company.subscription_plan ? company.subscription_plan.charAt(0).toUpperCase() + company.subscription_plan.slice(1) : 'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black dark:text-white">
                                            {company.fleet_size || 0}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black dark:text-white">
                                            {company.phone || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={getStatusColor(company.is_active)}>
                                                {getStatusText(company.is_active)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                            {formatDate(company.created_at)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex items-center gap-2">
                                                <Button size="xs" variant="outline" icon={<HiEye />}>
                                                    View
                                                </Button>
                                                <Button size="xs" variant="outline" icon={<HiCog />}>
                                                    Manage
                                                </Button>
                                                {company.is_active ? (
                                                    <Button 
                                                        size="xs" 
                                                        variant="outline" 
                                                        icon={<HiXCircle />}
                                                        className="text-red-600 hover:text-red-700"
                                                        onClick={() => handleDeactivateCompany(company.id)}
                                                    >
                                                        Deactivate
                                                    </Button>
                                                ) : (
                                                    <Button 
                                                        size="xs" 
                                                        variant="outline" 
                                                        icon={<HiCheckCircle />}
                                                        className="text-green-600 hover:text-green-700"
                                                        onClick={() => handleActivateCompany(company.id)}
                                                    >
                                                        Activate
                                                    </Button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    )
}

export default CompanyDirectory 