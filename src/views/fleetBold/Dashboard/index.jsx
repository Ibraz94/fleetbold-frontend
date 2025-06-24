import { Card, Button } from '@/components/ui'
import Container from '@/components/shared/Container'
import { useTranslation } from 'react-i18next'
import { TbCar, TbCalendarCheck, TbReceipt, TbFileInvoice, TbAlertTriangle, TbClock, TbExclamationCircle, TbArrowRight } from 'react-icons/tb'
import classNames from '@/utils/classNames'
import ApexChart from 'react-apexcharts'
import { COLORS } from '@/constants/chart.constant'
import Chart from '@/components/shared/Chart'
import { Table, Avatar, Tag, Switcher, Select, DatePicker } from '@/components/ui'
import { NumericFormat } from 'react-number-format'
import dayjs from 'dayjs'
import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router'


const { Tr, Td, TBody, THead, Th } = Table

const SummarySegment = ({
    title,
    value,
    growShrink,
    icon,
    iconClass,
    className,
}) => {
    return (
        <div className={classNames('flex flex-col gap-2 py-4 px-6', className)}>
            <div
                className={classNames(
                    'flex items-center justify-center min-h-12 min-w-12 max-h-12 max-w-12 text-gray-900 rounded-full text-2xl',
                    iconClass,
                )}
            >
                {icon}
            </div>
            <div className="mt-4">
                <div className="mb-1 text-gray-500">{title}</div>
                <h3 className="text-2xl font-bold mb-1">{value}</h3>
                {growShrink && (
                    <div className="inline-flex items-center flex-wrap gap-1">
                        <span className={growShrink > 0 ? 'text-emerald-500' : 'text-rose-500'}>
                            {growShrink > 0 ? '+' : ''}{growShrink}%
                        </span>
                        <span className="text-gray-500">vs last month</span>
                    </div>
                )}
            </div>
        </div>
    )
}

const FleetPerformance = () => {
    const [selectedMonths, setSelectedMonths] = useState([])
    const [selectedExpenseTypes, setSelectedExpenseTypes] = useState(['Tolls', 'Tickets', 'Cleaning Fees'])

    const allSeries = [
        {   
            name: 'Tolls',
            type: 'column',
            data: [100, 75, 85, 95, 105, 115, 125, 135, 145, 155, 165, 175],
            color: COLORS[1],
        },
        {
            name: 'Tickets',
            type: 'column',
            data: [75, 120, 95, 105, 115, 125, 135, 145, 155, 165, 175, 185],
            color: COLORS[3],
        },
        {
            name: 'Cleaning Fees',
            type: 'column',
            data: [75, 85, 95, 105, 115, 125, 135, 145, 155, 165, 120, 180],
            color: COLORS[0],
        }
    ]

    const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    
    const expenseTypeOptions = [
        { value: 'Tolls', label: 'Tolls' },
        { value: 'Tickets', label: 'Tickets' },
        { value: 'Cleaning Fees', label: 'Cleaning Fees' }
    ]

    const monthOptions = monthLabels.map((month, index) => ({
        value: index,
        label: month
    }))

    // Filter data based on selected filters
    const { filteredSeries, filteredLabels } = useMemo(() => {
        // Filter series by expense types
        const seriesFiltered = allSeries.filter(series => 
            selectedExpenseTypes.includes(series.name)
        )

        // If no months selected, show all months
        if (selectedMonths.length === 0) {
            return {
                filteredSeries: seriesFiltered,
                filteredLabels: monthLabels
            }
        }

        // Filter data by selected months
        const filteredData = seriesFiltered.map(series => ({
            ...series,
            data: selectedMonths.map(monthIndex => series.data[monthIndex])
        }))

        const filteredMonthLabels = selectedMonths.map(index => monthLabels[index])

        return {
            filteredSeries: filteredData,
            filteredLabels: filteredMonthLabels
        }
    }, [selectedMonths, selectedExpenseTypes])

    const handleMonthChange = (values) => {
        setSelectedMonths(values || [])
    }

    const handleExpenseTypeChange = (values) => {
        setSelectedExpenseTypes(values || [])
    }

    return (
        <Card>
            <div className="flex items-center justify-between mb-4">
                <h4>Monthly Breakdown</h4>
            </div>
            
            {/* Filter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Select Months
                    </label>
                    <Select
                        isMulti
                        placeholder="Select months (all if none selected)"
                        options={monthOptions}
                        value={monthOptions.filter(option => selectedMonths.includes(option.value))}
                        onChange={(selected) => handleMonthChange(selected?.map(option => option.value))}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Expense Types
                    </label>
                    <Select
                        isMulti
                        placeholder="Select expense types"
                        options={expenseTypeOptions}
                        value={expenseTypeOptions.filter(option => selectedExpenseTypes.includes(option.value))}
                        onChange={(selected) => handleExpenseTypeChange(selected?.map(option => option.value))}
                    />
                </div>
            </div>

            <div className="mt-6">
                <ApexChart
                    options={{
                        chart: {
                            type: 'bar',
                            zoom: { enabled: false },
                            toolbar: { show: false }
                        },
                        legend: { show: false },
                        stroke: {
                            show: true,
                            width: 2,
                            curve: 'smooth',
                            lineCap: 'round',
                            colors: ['transparent']
                        },
                        states: {
                            hover: {
                                filter: { type: 'none' }
                            }
                        },
                        tooltip: {
                            custom: function ({ series, dataPointIndex }) {
                                const tooltipContent = filteredSeries.map((seriesItem, index) => `
                                    <div class="flex items-center gap-2">
                                        <div class="h-[10px] w-[10px] rounded-full" style="background-color: ${seriesItem.color}"></div>
                                        <div class="flex gap-2">${seriesItem.name}: <span class="font-bold">${series[index][dataPointIndex]}%</span></div>
                                    </div>
                                `).join('')
                                
                                return `
                                    <div class="py-2 px-4 rounded-xl">
                                        <div class="flex flex-col gap-2">
                                            <div>${filteredLabels[dataPointIndex]}</div>
                                            ${tooltipContent}
                                        </div>
                                    </div>
                                `
                            }
                        },
                        labels: filteredLabels,
                        plotOptions: {
                            bar: {
                                horizontal: false,
                                columnWidth: '75%',
                                borderRadius: 5,
                                borderRadiusApplication: 'end',
                            }
                        }
                    }}
                    series={filteredSeries}
                    height={350}
                />
            </div>
        </Card>
    )
}

const VehiclePerformance = () => {
    const data = {
        categories: ['Maintenance', 'Fuel', 'Insurance', 'Repairs', 'Cleaning'],
        series: [85, 70, 90, 65, 80]
    }

    return (
        <Card>
            <div className="flex items-center justify-between">
                <h4>Vehicle Performance Score</h4>
            </div>
            <div className="mt-6">
                <Chart
                    type="radar"
                    customOptions={{
                        xaxis: {
                            categories: data.categories,
                            labels: {
                                formatter: (val) => {
                                    return `${data.categories.indexOf(val) + 1}`
                                }
                            }
                        },
                        yaxis: { show: false },
                        tooltip: {
                            custom: function ({ dataPointIndex }) {
                                return `
                                    <div class="py-2 px-4 rounded-xl">
                                        <div class="flex items-center gap-2">
                                            <div class="h-[10px] w-[10px] rounded-full" style="background-color: ${COLORS[0]}"></div>
                                            <div class="flex gap-2">${data.categories[dataPointIndex]}: <span class="font-bold">${data.series[dataPointIndex]}%</span></div>
                                        </div>
                                    </div>
                                `
                            }
                        }
                    }}
                    series={[
                        {
                            name: 'Vehicle performance score',
                            data: data.series
                        }
                    ]}
                    height={250}
                />
                <div className="flex flex-col gap-4">
                    {data.categories.map((category, index) => (
                        <div key={category + index} className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="rounded-full h-8 w-8 border-2 border-gray-200 dark:border-gray-600 font-bold heading-text flex items-center justify-center">
                                    {index + 1}
                                </div>
                                <div className="heading-text">{category}</div>
                            </div>
                            <div className="border-dashed border-[1.5px] border-gray-300 dark:border-gray-500 flex-1" />
                            <div>
                                <span className={classNames(
                                    'rounded-full px-2 py-1 text-white',
                                    data.series[index] > 75 && 'bg-success',
                                    data.series[index] <= 30 && 'bg-error',
                                    data.series[index] > 30 && data.series[index] < 75 && 'bg-warning'
                                )}>
                                    {data.series[index]}%
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    )
}

const Alerts = () => {
    const navigate = useNavigate()

    const alerts = [
        {
            id: 1,
            icon: <TbAlertTriangle />,
            iconColor: 'text-amber-500',
            bgColor: 'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800',
            message: '⚠️ 3 Trips with Unbilled Tolls',
            description: 'Outstanding toll charges need to be processed',
            priority: 'high'
        },
        {
            id: 2,
            icon: <TbClock />,
            iconColor: 'text-orange-500',
            bgColor: 'bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800',
            message: '🕐 5 Invoices Approaching Expiration',
            description: 'These invoices will expire within 7 days',
            priority: 'medium'
        },
        {
            id: 3,
            icon: <TbExclamationCircle />,
            iconColor: 'text-red-500',
            bgColor: 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800',
            message: '❗ 2 Overdue Payment Reminders',
            description: 'Payment reminders are past due',
            priority: 'urgent'
        },
        {
            id: 4,
            icon: <TbReceipt />,
            iconColor: 'text-blue-500',
            bgColor: 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800',
            message: '📋 8 New Expense Reports Ready',
            description: 'New expense reports require review',
            priority: 'low'
        }
    ]

    const handleViewAllInvoices = () => {
        navigate('/fleetbold/invoices')
    }

    return (
        <Card>
            <div className="flex items-center justify-between mb-6">
                <h4>Alerts</h4>
                <Button
                    size="sm"
                    variant="solid"
                    onClick={handleViewAllInvoices}
                    className="flex items-center gap-2"
                >
                    View All Invoices
                    <TbArrowRight className="text-sm" />
                </Button>
            </div>
            <div className="space-y-4">
                {alerts.map((alert) => (
                    <div
                        key={alert.id}
                        className={classNames(
                            'p-4 rounded-lg border-l-4 transition-all duration-200 hover:shadow-md',
                            alert.bgColor
                        )}
                    >
                        <div className="flex items-start gap-3">
                            <div className={classNames(
                                'flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-gray-800 shadow-sm',
                                alert.iconColor
                            )}>
                                {alert.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-semibold text-gray-900 dark:text-gray-100">
                                    {alert.message}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    {alert.description}
                                </div>
                            </div>
                            <div className="flex-shrink-0">
                                <Tag
                                    className={classNames(
                                        'text-xs',
                                        alert.priority === 'urgent' && 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
                                        alert.priority === 'high' && 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
                                        alert.priority === 'medium' && 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
                                        alert.priority === 'low' && 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                    )}
                                >
                                    {alert.priority.toUpperCase()}
                                </Tag>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    )
}

const Dashboard = () => {
    const { t } = useTranslation()

    return (
        <Container>
            <div className="mb-4">
                <h4 className="text-2xl font-semibold">{t('Dashboard')}</h4>
            </div>
            <div className="flex flex-col gap-4">
                <Card>
                    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
                        <SummarySegment
                            title="Total Invoices"
                            value="24"
                            growShrink={12}
                            icon={<TbCar />}
                            iconClass="bg-blue-200"
                            className="border-b border-r-0 md:border-b-0 md:ltr:border-r md:rtl:border-l border-gray-200 dark:border-gray-700"
                        />
                        <SummarySegment
                            title="Total Expense Detected"
                            value="12"
                            growShrink={8}
                            icon={<TbCalendarCheck />}
                            iconClass="bg-emerald-200"
                            className="border-b md:border-b-0 xl:ltr:border-r xl:rtl:border-l border-gray-200 dark:border-gray-700"
                        />
                        <SummarySegment
                            title="Invoices Approaching Expiration"
                            value="$12,500"
                            growShrink={-5}
                            icon={<TbReceipt />}
                            iconClass="bg-amber-200"
                            className="border-b border-r-0 md:border-b-0 md:ltr:border-r md:rtl:border-l border-gray-200 dark:border-gray-700"
                        />
                        <SummarySegment
                            title="Expense Collection Rate (This Month %)"
                            value="8"
                            growShrink={-2}
                            icon={<TbFileInvoice />}
                            iconClass="bg-rose-200"
                        />
                    </div>
                </Card>
                <div className="grid grid-cols-1 xl:grid-cols-1 gap-y-4 xl:gap-x-4">
                    <div className="col-span-2">
                        <FleetPerformance />
                    </div>
                    {/* <VehiclePerformance /> */}
                </div>
                <Alerts />
            </div>
        </Container>
    )
}

export default Dashboard 