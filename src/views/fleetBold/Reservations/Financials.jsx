import { Card, Button } from '@/components/ui'
import { HiOutlineArrowLeft } from 'react-icons/hi'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const mockFinancialData = {
    totalEarnings: 2500,
    totalExpenses: 800,
    profitMargin: 68,
    monthlyData: [
        { month: 'Jan', earnings: 800, expenses: 300 },
        { month: 'Feb', earnings: 900, expenses: 250 },
        { month: 'Mar', earnings: 800, expenses: 250 },
    ],
    expenseBreakdown: [
        { type: 'Tolls', amount: 300 },
        { type: 'Tickets', amount: 200 },
        { type: 'Cleaning', amount: 300 },
    ],
}

const VehicleFinancials = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState(mockFinancialData)

    useEffect(() => {
        // In a real app, fetch data based on vehicle ID
        setData(mockFinancialData)
    }, [id])

    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-2">
                <Button
                    icon={<HiOutlineArrowLeft />}
                    onClick={() => navigate('/fleetBold/vehicles')}
                >
                    Back to Vehicles
                </Button>
                <h4>Vehicle Financial Summary</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <h6 className="text-gray-500">Total Earnings</h6>
                    <h3 className="text-2xl font-bold">${data.totalEarnings}</h3>
                </Card>
                <Card>
                    <h6 className="text-gray-500">Total Expenses</h6>
                    <h3 className="text-2xl font-bold">${data.totalExpenses}</h3>
                </Card>
                <Card>
                    <h6 className="text-gray-500">Profit Margin</h6>
                    <h3 className="text-2xl font-bold">{data.profitMargin}%</h3>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                    <h4 className="mb-4">Monthly Trends</h4>
                    {/* Add monthly trends chart here */}
                    <div className="h-64 bg-gray-100 flex items-center justify-center">
                        Monthly trends chart will be implemented here
                    </div>
                </Card>

                <Card>
                    <h4 className="mb-4">Expense Breakdown</h4>
                    {/* Add expense breakdown chart here */}
                    <div className="h-64 bg-gray-100 flex items-center justify-center">
                        Expense breakdown chart will be implemented here
                    </div>
                </Card>
            </div>

            <Card>
                <h4 className="mb-4">Recent Transactions</h4>
                <div className="space-y-4">
                    {data.monthlyData.map((item, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center p-4 border-b last:border-b-0"
                        >
                            <div>
                                <h6>{item.month}</h6>
                                <p className="text-gray-500">Monthly Summary</p>
                            </div>
                            <div className="text-right">
                                <p className="text-emerald-500">
                                    +${item.earnings}
                                </p>
                                <p className="text-red-500">
                                    -${item.expenses}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    )
}

export default VehicleFinancials 