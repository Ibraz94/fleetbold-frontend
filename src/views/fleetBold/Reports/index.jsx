import { Card, Button, Select, DatePicker } from '@/components/ui'
import { HiOutlineDownload, HiOutlineFilter } from 'react-icons/hi'
import { useState } from 'react'

const mockVehicles = [
    { value: 'all', label: 'All Vehicles' },
    { value: 'VH001', label: 'Toyota Camry' },
    { value: 'VH002', label: 'Honda Civic' },
]

const mockExpenseTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'toll', label: 'Tolls' },
    { value: 'ticket', label: 'Tickets' },
    { value: 'cleaning', label: 'Cleaning' },
]

const Reports = () => {
    const [selectedVehicle, setSelectedVehicle] = useState('all')
    const [selectedType, setSelectedType] = useState('all')
    const [dateRange, setDateRange] = useState([null, null])

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h4 className="text-2xl font-semibold">Reports</h4>
                <Button
                    variant="solid"
                    icon={<HiOutlineDownload />}
                >
                    Export Report
                </Button>
            </div>

            <Card>
                <div className="flex flex-wrap gap-4 items-end">
                    <div className="flex-1 min-w-[200px]">
                        <h6>Vehicle</h6>
                        <Select
                            options={mockVehicles}
                            value={selectedVehicle}
                            onChange={(value) => setSelectedVehicle(value)}
                        />
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <h6>Expense Type</h6>
                        <Select
                            options={mockExpenseTypes}
                            value={selectedType}
                            onChange={(value) => setSelectedType(value)}
                        />
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <h6>Date Range</h6>
                        <DatePicker
                            value={dateRange}
                            onChange={(value) => setDateRange(value)}
                            range
                        />
                    </div>
                    <Button
                        icon={<HiOutlineFilter />}
                        onClick={() => {
                            // In a real app, this would filter the data
                        }}
                    >
                        Apply Filters
                    </Button>
                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                    <h5 className="mb-4">Earnings vs Expenses</h5>
                    <div className="h-64 bg-gray-100 flex items-center justify-center">
                        Earnings vs Expenses chart will be implemented here
                    </div>
                </Card>

                <Card>
                    <h5 className="mb-4">Expense Breakdown</h5>
                    <div className="h-64 bg-gray-100 flex items-center justify-center">
                        Expense breakdown chart will be implemented here
                    </div>
                </Card>
            </div>

            <Card>
                <h5 className="mb-4">Monthly Summary</h5>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h6 className="text-gray-500">Total Earnings</h6>
                            <h3 className="text-2xl font-bold">$12,345</h3>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h6 className="text-gray-500">Total Expenses</h6>
                            <h3 className="text-2xl font-bold">$4,567</h3>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h6 className="text-gray-500">Net Profit</h6>
                            <h3 className="text-2xl font-bold">$7,778</h3>
                        </div>
                    </div>
                    <div className="h-64 bg-gray-100 flex items-center justify-center">
                        Monthly summary chart will be implemented here
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default Reports 