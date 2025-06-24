import { Card } from '@/components/ui'
import Container from '@/components/shared/Container'
import { useTranslation } from 'react-i18next'
import { Table, Button, Input, Select, Tag, Avatar, DatePicker } from '@/components/ui'
import { NumericFormat } from 'react-number-format'
import dayjs from 'dayjs'
import { HiOutlinePlus, HiOutlineEye, HiOutlinePencil, HiOutlineDownload, HiOutlineDocumentText, HiOutlineSearch } from 'react-icons/hi'
import { TbCar, TbCalendarCheck, TbCalendarX, TbFileInvoice } from 'react-icons/tb'

const { Tr, Td, TBody, THead, Th } = Table
const { DatePickerRange } = DatePicker

const invoiceStatus = {
    paid: { label: 'Paid', className: 'bg-emerald-200' },
    pending: { label: 'Pending', className: 'bg-orange-200' },
    overdue: { label: 'Overdue', className: 'bg-rose-200' },
    cancelled: { label: 'Cancelled', className: 'bg-gray-200' }
}

const expenseTypes = {
    fuel: { label: 'Fuel', color: 'bg-blue-100 text-blue-800' },
    maintenance: { label: 'Maintenance', color: 'bg-purple-100 text-purple-800' },
    insurance: { label: 'Insurance', color: 'bg-green-100 text-green-800' },
    rental: { label: 'Rental', color: 'bg-yellow-100 text-yellow-800' },
    tolls: { label: 'Tolls', color: 'bg-pink-100 text-pink-800' }
}

const dummyReservations = [
    {
        id: 'RES-001',
        bookingId: 'BK-2024-001',
        vehicle: 'Toyota Camry 2023',
        licensePlate: 'ABC-123',
        provider: 'Fleet Solutions Inc.',
        expenseTypes: ['fuel', 'rental'],
        invoiceStatus: 'paid',
        earnings: 2850.00,
        filesCount: 3,
        dateRange: [new Date(), new Date(new Date().setDate(new Date().getDate() + 5))]
    },
    {
        id: 'RES-002',
        bookingId: 'BK-2024-002',
        vehicle: 'Honda CR-V 2022',
        licensePlate: 'XYZ-789',
        provider: 'Metro Car Rental',
        expenseTypes: ['fuel', 'insurance', 'tolls'],
        invoiceStatus: 'pending',
        earnings: 1950.00,
        filesCount: 2,
        dateRange: [new Date(new Date().setDate(new Date().getDate() - 10)), new Date(new Date().setDate(new Date().getDate() - 3))]
    },
    {
        id: 'RES-003',
        bookingId: 'BK-2024-003',
        vehicle: 'Ford Transit 2023',
        licensePlate: 'DEF-456',
        provider: 'Commercial Vehicles Ltd.',
        expenseTypes: ['maintenance', 'rental'],
        invoiceStatus: 'overdue',
        earnings: 1200.00,
        filesCount: 5,
        dateRange: [new Date(new Date().setDate(new Date().getDate() + 2)), new Date(new Date().setDate(new Date().getDate() + 4))]
    },
    {
        id: 'RES-004',
        bookingId: 'BK-2024-004',
        vehicle: 'Tesla Model 3 2023',
        licensePlate: 'GHI-321',
        provider: 'Green Fleet Co.',
        expenseTypes: ['fuel', 'insurance'],
        invoiceStatus: 'cancelled',
        earnings: 0.00,
        filesCount: 1,
        dateRange: [new Date(new Date().setDate(new Date().getDate() - 5)), new Date(new Date().setDate(new Date().getDate() - 4))]
    }
]

const Search = () => {
    const { t } = useTranslation()

    const handleViewReservation = (reservationId) => {
        console.log('View reservation:', reservationId)
        // TODO: Implement view functionality
    }

    const handleEditReservation = (reservationId) => {
        console.log('Edit reservation:', reservationId)
        // TODO: Implement edit functionality
    }

    const handleExportReservation = (reservationId) => {
        console.log('Export reservation:', reservationId)
        // TODO: Implement export functionality
    }

    return (
        <Container>
            <div className="mb-4">
                <h4 className="text-2xl font-semibold">{t('Search & Manage Reservations')}</h4>
            </div>
            <div className="flex flex-col gap-4">
                <Card>
                    {/* Global Search */}
                    <div className="mb-6">
                        <Input
                            className="w-full"
                            size="lg"
                            placeholder="Global search across all reservations..."
                            prefix={<HiOutlineSearch className="text-lg" />}
                        />
                    </div>

                    {/* Advanced Filters */}
                    <div className="mb-6">
                        <h6 className="text-lg font-semibold mb-4">Advanced Filters</h6>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            <Input
                                placeholder="License Plate"
                                prefix={<TbCar className="text-lg" />}
                            />
                            <Input
                                placeholder="Reservation ID"
                                prefix={<TbCalendarCheck className="text-lg" />}
                            />
                            <Select
                                placeholder="Invoice Status"
                                options={[
                                    { value: 'all', label: 'All Status' },
                                    { value: 'paid', label: 'Paid' },
                                    { value: 'pending', label: 'Pending' },
                                    { value: 'overdue', label: 'Overdue' },
                                    { value: 'cancelled', label: 'Cancelled' }
                                ]}
                            />
                            <Select
                                placeholder="Expense Type"
                                options={[
                                    { value: 'all', label: 'All Types' },
                                    { value: 'fuel', label: 'Fuel' },
                                    { value: 'maintenance', label: 'Maintenance' },
                                    { value: 'insurance', label: 'Insurance' },
                                    { value: 'rental', label: 'Rental' },
                                    { value: 'tolls', label: 'Tolls' }
                                ]}
                            />
                            <Select
                                placeholder="Provider"
                                options={[
                                    { value: 'all', label: 'All Providers' },
                                    { value: 'fleet-solutions', label: 'Fleet Solutions Inc.' },
                                    { value: 'metro-car', label: 'Metro Car Rental' },
                                    { value: 'commercial-vehicles', label: 'Commercial Vehicles Ltd.' },
                                    { value: 'green-fleet', label: 'Green Fleet Co.' }
                                ]}
                            />
                            <div className="md:col-span-2 lg:col-span-3">
                                <DatePickerRange placeholder="Select Date Range" />
                            </div>
                        </div>
                        <div className="flex justify-between mt-4">
                            <div className="flex gap-2">
                                <Button variant="solid" size="sm">
                                    Apply Filters
                                </Button>
                                <Button variant="plain" size="sm">
                                    Clear All
                                </Button>
                            </div>
                            <Button
                                variant="solid"
                                size="sm"
                                icon={<HiOutlinePlus />}
                            >
                                New Reservation
                            </Button>
                        </div>
                    </div>

                    {/* Results Table */}
                    <Table>
                        <THead>
                            <Tr>
                                <Th>Booking ID</Th>
                                <Th>Vehicle</Th>
                                <Th>Provider</Th>
                                <Th>Expense Type(s)</Th>
                                <Th>Invoice Status</Th>
                                <Th>Earnings</Th>
                                <Th>Files</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </THead>
                        <TBody>
                            {dummyReservations.map((reservation) => (
                                <Tr key={reservation.id}>
                                    <Td>
                                        <div>
                                            <div className="font-semibold text-blue-600">
                                                {reservation.bookingId}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {reservation.id}
                                            </div>
                                        </div>
                                    </Td>
                                    <Td>
                                        <div>
                                            <div className="font-semibold">{reservation.vehicle}</div>
                                            <div className="text-sm text-gray-500 flex items-center gap-1">
                                                <TbCar className="text-xs" />
                                                {reservation.licensePlate}
                                            </div>
                                        </div>
                                    </Td>
                                    <Td>
                                        <div className="font-medium">{reservation.provider}</div>
                                    </Td>
                                    <Td>
                                        <div className="flex flex-wrap gap-1">
                                            {reservation.expenseTypes.map((type) => (
                                                <Tag
                                                    key={type}
                                                    className={`text-xs ${expenseTypes[type].color}`}
                                                >
                                                    {expenseTypes[type].label}
                                                </Tag>
                                            ))}
                                        </div>
                                    </Td>
                                    <Td>
                                        <Tag className={invoiceStatus[reservation.invoiceStatus].className}>
                                            {invoiceStatus[reservation.invoiceStatus].label}
                                        </Tag>
                                    </Td>
                                    <Td>
                                        <div className="font-semibold">
                                            <NumericFormat
                                                displayType="text"
                                                value={reservation.earnings}
                                                prefix={'$'}
                                                thousandSeparator={true}
                                                decimalScale={2}
                                                fixedDecimalScale
                                            />
                                        </div>
                                    </Td>
                                    <Td>
                                        <div className="flex items-center gap-2">
                                            <HiOutlineDocumentText className="text-lg text-gray-500" />
                                            <span className="text-sm">
                                                {reservation.filesCount} files
                                            </span>
                                        </div>
                                    </Td>
                                    <Td>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                size="xs"
                                                variant="plain"
                                                icon={<HiOutlineEye />}
                                                onClick={() => handleViewReservation(reservation.id)}
                                                title="View"
                                            />
                                            <Button
                                                size="xs"
                                                variant="plain"
                                                icon={<HiOutlinePencil />}
                                                onClick={() => handleEditReservation(reservation.id)}
                                                title="Edit"
                                            />
                                            <Button
                                                size="xs"
                                                variant="plain"
                                                icon={<HiOutlineDownload />}
                                                onClick={() => handleExportReservation(reservation.id)}
                                                title="Export"
                                            />
                                        </div>
                                    </Td>
                                </Tr>
                            ))}
                        </TBody>
                    </Table>
                </Card>
            </div>
        </Container>
    )
}

export default Search 