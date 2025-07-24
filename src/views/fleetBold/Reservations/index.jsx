import { Card, Pagination, Button, Dialog, toast } from '@/components/ui'
import { useState, useEffect } from 'react'
import Container from '@/components/shared/Container'
import Table from '@/components/ui/Table'
const { THead, Tr, Th, TBody, Td } = Table
import { HiOutlinePlus, HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { useNavigate } from 'react-router'
import { apiDeleteReservation, apigetReservations } from '@/services/reservationServices'
const Reservations = () => {
    const navigate = useNavigate();
    const [reservations, setReservations] = useState([]);
    const [reservationsExpense, setReservationsExpense] = useState([]);
    const [loading, setLoading] = useState(true)
    const [viewDialog, setViewDialog] = useState(false)
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    })
    // Mock trip data
    const tripData = {
        reservationId: 'RSV-2023-10-001',
        vehicle: 'Toyota Camry - Plate: ABC123',
        dates: {
            start: '2023-10-15 09:00 AM',
            end: '2023-10-17 06:00 PM'
        },
        provider: 'Elite Car Rentals',
        invoiceStatus: 'Paid'
    }

    // Fetch reservations data
    const fetchReservations = async (page = 1, pageSize = 10) => {
        try {
            const response = await apigetReservations({
                page,
                per_page: pageSize,
            });

            const reservations = response.reservations || [];
            setReservations(reservations);
            console.log("Reservations:", reservations);

            // ✅ Use response.reservations directly, not stale state
            const allExpenses = reservations.flatMap(reservation => {
                return (reservation.expenses || []).map(exp => ({
                    ...exp,
                    reservationId: reservation.id,
                    reservationNumber: reservation.reservation_number,
                    vehicleName: reservation.vehicle_name
                }));
            });
            console.log("Extracted expenses", allExpenses);
            setReservationsExpense(allExpenses);

            setPagination((prev) => ({
                ...prev,
                current: page,
                total: response.pagination?.total || 0,
            }));
        } catch (error) {
            console.error('Error fetching reservations:', error);
            toast.push(
                error.response?.data?.message || 'Failed to fetch reservations',
                {
                    placement: 'top-end',
                    type: 'error',
                }
            );
        }
    };


    const trips = [tripData];

    useEffect(() => {
        const loadData = async () => {
            setLoading(true)
            await Promise.all([fetchReservations()])
            setLoading(false)
        }
        loadData()
    }, [])
    const earningsData = {
        tripPrice: 450.00,
        reportedTolls: 25.50,
        discounts: -50.00,
        fees: 15.75,
        netEarnings: 441.25
    }

    const expensesData = [
        { id: 1, type: 'Fuel', amount: 85.50, status: 'Approved', linkedInvoice: 'INV-2023-001' },
        { id: 2, type: 'Tolls', amount: 25.50, status: 'Pending', linkedInvoice: 'INV-2023-002' },
        { id: 3, type: 'Maintenance', amount: 120.00, status: 'Approved', linkedInvoice: 'INV-2023-003' },
        { id: 4, type: 'Cleaning', amount: 35.00, status: 'Approved', linkedInvoice: 'INV-2023-004' },
        { id: 5, type: 'Insurance', amount: 45.75, status: 'Rejected', linkedInvoice: 'INV-2023-005' }
    ]

    const activityLog = [
        { id: 1, date: '2023-10-17 06:15 PM', action: 'Trip completed', user: 'System' },
        { id: 2, date: '2023-10-17 06:30 PM', action: 'Invoice generated', user: 'Admin' },
        { id: 3, date: '2023-10-18 09:00 AM', action: 'Fuel expense added', user: 'Driver' },
        { id: 4, date: '2023-10-18 10:15 AM', action: 'Invoice approved', user: 'Manager' },
        { id: 5, date: '2023-10-18 02:30 PM', action: 'Payment processed', user: 'Finance' }
    ]

    const getStatusBadge = (status) => {
        const statusConfig = {
            'approved': {
                bg: 'bg-green-100',
                textColor: 'text-green-700',
                text: 'Approved'
            },
            'pending': {
                bg: 'bg-yellow-100',
                textColor: 'text-yellow-700',
                text: 'Pending'
            },
        };

        const config = statusConfig[status] || {
            bg: 'bg-gray-100',
            textColor: 'text-gray-700',
            text: status
        };

        return (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${config.bg} ${config.textColor}`}>
                {config.text}
            </span>
        );
    };


    const handleAddTrip = () => {
        navigate('/fleetbold/reservations/add')
    }
    const handleEditTrip = (reservationId) => {
        navigate(`/fleetbold/reservations/edit/${reservationId}`)
    }
    const handleView = () => {
        setViewDialog(true)
    }

    const handleClose = () => {
        setViewDialog(false)
    }


    const handleDeleteReservation = async (reservationId) => {
        try {
            await apiDeleteReservation(reservationId)
            toast.push('Vehicle deleted successfully!', {
                placement: 'top-end',
                type: 'success',
            })
            setViewDialog(false)
            // Refresh the vehicles list
            fetchReservations(pagination.current, pagination.pageSize)
        } catch (error) {
            console.error('Error deleting vehicle:', error)
            toast.push(
                error.response?.data?.message || 'Failed to delete vehicle',
                {
                    placement: 'top-end',
                    type: 'error',
                },
            )
        }
    }

    const handlePageChange = (page) => {
        fetchVehicles(page, pagination.pageSize)
    }

    return (
        <Container>
            {/* Header */}
            <div className="mb-6 flex justify-between items-end">

                <h4 className="text-2xl font-semibold">Reservation Details</h4>

                <div className="flex gap-3">
                    <Button variant="outline">
                        <span className="mr-2">📎</span>
                        View Attachments
                    </Button>
                    <Button>
                        <span className="mr-2">📄</span>
                        Export Invoice
                    </Button>
                </div>
            </div>

            {/* Earnings Breakdown */}
            <Card className="mb-6">
                <div className="p-6">
                    <h5 className="text-lg font-semibold mb-4">Earnings Breakdown</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        <div className="border p-4 rounded-lg">
                            <h6 className="text-sm font-bold mb-1">Trip Price</h6>
                            <p className="text-xl font-bold text-blue-700">${earningsData.tripPrice.toFixed(2)}</p>
                        </div>
                        <div className="border p-4 rounded-lg">
                            <h6 className="text-sm font-bold mb-1">Reported Tolls</h6>
                            <p className="text-xl font-bold text-green-700">${earningsData.reportedTolls.toFixed(2)}</p>
                        </div>
                        <div className="border p-4 rounded-lg">
                            <h6 className="text-sm font-bold mb-1">Discounts</h6>
                            <p className="text-xl font-bold text-red-700">${earningsData.discounts.toFixed(2)}</p>
                        </div>
                        <div className="border p-4 rounded-lg">
                            <h6 className="text-sm font-bold mb-1">Fees</h6>
                            <p className="text-xl font-bold text-yellow-700">${earningsData.fees.toFixed(2)}</p>
                        </div>
                        <div className="border p-4 rounded-lg">
                            <h6 className="text-sm font-bold mb-1">Net Earnings</h6>
                            <p className="text-xl font-bold text-purple-700">${earningsData.netEarnings.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Trip Header Info */}
            <Card className="mb-6">
                <div className="mt-6">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xl font-semibold">Reservations List</h4>
                        <Button
                            variant="solid"
                            size="sm"
                            icon={<HiOutlinePlus />}
                            onClick={handleAddTrip}
                        >
                            Add Reservations
                        </Button>
                    </div>

                    <Card>
                        <Table>
                            <THead>
                                <Tr>
                                    <Th>Reservation ID</Th>
                                    <Th>Vehicle</Th>
                                    <Th>Start Date</Th>
                                    <Th>End Date</Th>
                                    <Th>Provider</Th>
                                    <Th>Invoice Status</Th>
                                    <Th>Actions</Th>
                                </Tr>
                            </THead>
                            <TBody>
                                {reservations.length === 0 ? (
                                    <Tr>
                                        <Td colSpan="7" className="text-center py-8">
                                            No reservations found.
                                        </Td>
                                    </Tr>
                                ) : (
                                    reservations.map((reservation) => (
                                        <Tr key={reservation.id}>
                                            <Td className="font-medium">{reservation.reservation_number
                                            }</Td>
                                            <Td>{reservation.vehicle_name}</Td>
                                            <Td>{new Date(reservation.start_date).toLocaleString()}</Td>
                                            <Td>{new Date(reservation.end_date).toLocaleString()}</Td>
                                            <Td>{reservation.provider}</Td>
                                            <Td>{getStatusBadge(reservation.invoice_status)}</Td>

                                            <Td>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="plain"
                                                        size="xs"
                                                        icon={<HiOutlineEye />}
                                                        onClick={() => handleViewTrip(reservation.id)}
                                                    />
                                                    <Button
                                                        variant="plain"
                                                        size="xs"
                                                        icon={<HiOutlinePencil />}
                                                        onClick={() => handleEditTrip(reservation.id)}
                                                    />
                                                    <Button
                                                        variant="plain"
                                                        size="xs"
                                                        icon={<HiOutlineTrash />}
                                                        onClick={() => handleView()}
                                                        className="text-red-600 hover:text-red-700"
                                                    />
                                                </div>
                                            </Td>
                                            <Dialog
                                                isOpen={viewDialog}
                                                onClose={() => setViewDialog(false)}
                                                title="Delete Vehicle"
                                            >
                                                {
                                                    <div className="space-y-4 text-nowrap">
                                                        <h4>
                                                            Are you sure you want to
                                                            delete this reservation?
                                                        </h4>
                                                        <div className="flex items-center justify-center">
                                                            <Button
                                                                onClick={() =>
                                                                    handleDeleteReservation(
                                                                        reservation.id,
                                                                    )
                                                                }
                                                                className="text-red-600 hover:text-red-700 mx-4"
                                                            >
                                                                Delete
                                                            </Button>
                                                            <Button
                                                                onClick={() =>
                                                                    handleClose()
                                                                }
                                                            >
                                                                Cancel
                                                            </Button>
                                                        </div>
                                                    </div>
                                                }
                                            </Dialog>
                                        </Tr>
                                    ))
                                )}

                            </TBody>
                        </Table>
                    </Card>

                    {/* Pagination */}
                    {/* {trips.length > 0 && (
                        <div className="mt-4 flex justify-end">
                            <Pagination
                                total={tripPagination.total}
                                pageSize={tripPagination.pageSize}
                                current={tripPagination.current}
                                onChange={handleTripPageChange}
                            />
                        </div>
                    )} */}
                </div>

            </Card>


            {/* Associated Expenses Table */}
            <Card className="mb-6">
                <div className="p-6">
                    <h5 className="text-lg font-semibold mb-4">Associated Expenses</h5>
                    <Table>
                        <THead>
                            <Tr>
                                <Th>Description</Th>
                                <Th>Type</Th>
                                <Th>Amount</Th>
                                <Th>Status</Th>
                                <Th>Linked Invoice</Th>
                            </Tr>
                        </THead>
                        <TBody>
                            {reservationsExpense.map((expense) => (
                                <Tr key={expense.id}>
                                    <Td>{expense.description}</Td>
                                    <Td>{expense.type}</Td>
                                    <Td className="font-semibold">${expense.amount.toFixed(2)}</Td>
                                    <Td>{getStatusBadge(expense.status)}</Td>
                                    <Td>
                                        <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                                            {expense.linkedInvoice}
                                        </span>
                                    </Td>
                                </Tr>
                            ))}
                        </TBody>
                    </Table>
                    <div className="mt-4 flex justify-end">
                        <Pagination
                            total={expensesData.length}
                            pageSize={5}
                            defaultCurrent={1}
                            onChange={(page) => console.log('Page:', page)}
                        />
                    </div>
                </div>
            </Card>

            {/* Additional Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Internal Notes */}
                <Card>
                    <div className="p-6">
                        <h5 className="text-lg font-semibold mb-4">Internal Notes</h5>
                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                            <p className="text-sm text-gray-700 mb-2">
                                <strong>Finance Team:</strong> Customer requested early payment. Approved for next business day processing.
                            </p>
                            <p className="text-xs text-gray-500">Added on Oct 18, 2023 at 2:15 PM</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                            <p className="text-sm text-gray-700 mb-2">
                                <strong>Operations:</strong> Vehicle returned with minor scratch on rear bumper. Damage report filed.
                            </p>
                            <p className="text-xs text-gray-500">Added on Oct 17, 2023 at 6:45 PM</p>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                            Add New Note
                        </Button>
                    </div>
                </Card>

                {/* Activity Log */}
                <Card>
                    <div className="p-6">
                        <h5 className="text-lg font-semibold mb-4">Activity Log</h5>
                        <div className="space-y-3 max-h-80 overflow-y-auto">
                            {activityLog.map((activity) => (
                                <div key={activity.id} className="border-l-2 border-blue-200 pl-4 pb-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm font-medium">{activity.action}</p>
                                            <p className="text-xs text-gray-500">by {activity.user}</p>
                                        </div>
                                        <p className="text-xs text-gray-400">{activity.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>
        </Container>
    )
}

export default Reservations;