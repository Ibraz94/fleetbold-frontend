import { Card, Button, Table, Dialog, Select, DatePicker, Input, toast } from '@/components/ui'
import { HiOutlineEye, HiOutlineDownload, HiOutlineDocumentAdd, HiOutlineDocument, HiOutlineFilter } from 'react-icons/hi'
import { useState, useMemo, useEffect } from 'react'
import { apigetReservation, apigetReservations } from '@/services/reservationServices'
import { apiCreateInvoice } from '@/services/invoicesService'
import { useNavigate } from 'react-router'

const mockInvoices = [
    {
        id: 'INV001',
        bookingId: 'BK001',
        type: 'Fuel',
        status: 'Paid',
        amount: 1250.50,
        date: '2024-03-01',
        files: ['invoice_001.pdf'],
    },
    {
        id: 'INV002',
        bookingId: 'BK002',
        type: 'Maintenance',
        status: 'Pending',
        amount: 850.00,
        date: '2024-03-10',
        files: ['invoice_002.pdf'],
    },
    {
        id: 'INV003',
        bookingId: 'BK003',
        type: 'Insurance',
        status: 'Overdue',
        amount: 2100.00,
        date: '2024-03-05',
        files: ['invoice_003.pdf', 'receipt_003.pdf'],
    },
    {
        id: 'INV004',
        bookingId: 'BK004',
        type: 'Fuel',
        status: 'Paid',
        amount: 975.25,
        date: '2024-03-15',
        files: ['invoice_004.pdf'],
    },
    {
        id: 'INV005',
        bookingId: 'BK005',
        type: 'Repairs',
        status: 'Pending',
        amount: 1500.75,
        date: '2024-03-20',
        files: [],
    },
]

const expenseTypeOptions = [
    { value: '', label: 'All Types' },
    { value: 'Fuel', label: 'Fuel' },
    { value: 'Maintenance', label: 'Maintenance' },
    { value: 'Insurance', label: 'Insurance' },
    { value: 'Repairs', label: 'Repairs' },
]

const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'Paid', label: 'Paid' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Overdue', label: 'Overdue' },
]

const Invoices = () => {
    const navigate = useNavigate();
    const [viewDialog, setViewDialog] = useState(false)
    const [generateDialog, setGenerateDialog] = useState(false)
    const [selectedInvoice, setSelectedInvoice] = useState(null)
    const [reservations, setReservations] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [loading, setLoading] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState('')


    // Filter states
    const [filters, setFilters] = useState({
        expenseType: '',
        status: '',
        dateFrom: null,
        dateTo: null,
        searchTerm: '',
    })

    // Filter invoices based on current filters
    const filteredInvoices = useMemo(() => {
        return mockInvoices.filter(invoice => {
            const matchesType = !filters.expenseType || invoice.type === filters.expenseType
            const matchesStatus = !filters.status || invoice.status === filters.status
            const matchesSearch = !filters.searchTerm ||
                invoice.id.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                invoice.bookingId.toLowerCase().includes(filters.searchTerm.toLowerCase())

            const invoiceDate = new Date(invoice.date)
            const matchesDateFrom = !filters.dateFrom || invoiceDate >= new Date(filters.dateFrom)
            const matchesDateTo = !filters.dateTo || invoiceDate <= new Date(filters.dateTo)

            return matchesType && matchesStatus && matchesSearch && matchesDateFrom && matchesDateTo
        })
    }, [filters])

    const handleView = (invoice) => {
        setSelectedInvoice(invoice)
        setViewDialog(true)
    }

    const handleGenerate = () => {
        setGenerateDialog(true)
    }

    const handleGenerateSubmit = async () => {
        // In a real app, this would generate a new invoice
        if (selectedReservation) {
            try {
                await apiCreateInvoice({reservation_id: selectedReservation.value});

                navigate('/fleetBold/invoices');
                toast.push('Invoice generated successfully!', {
                    placement: 'top-end',
                    type: 'success'
                });
            } catch (error) {
                console.error("Failed to generate invoice:", error);
                toast.push(error.response?.data?.message || 'Failed to generate invoice', {
                    placement: 'top-end',
                    type: 'error'
                });
                return;
            }
        }
        setGenerateDialog(false)
    }

    const handleViewPDF = (invoice) => {
        // In a real app, this would open the PDF viewer
        console.log('Viewing PDF for invoice:', invoice.id)
    }

    const handleExportPDF = (invoice) => {
        // In a real app, this would export the invoice as PDF
        console.log('Exporting PDF for invoice:', invoice.id)
    }

    const handleExportCSV = () => {
        // Convert filtered invoices to CSV format
        const headers = ['Invoice ID', 'Booking ID', 'Type', 'Amount', 'Date', 'Status', 'Files']
        const csvContent = [
            headers.join(','),
            ...filteredInvoices.map(invoice => [
                invoice.id,
                invoice.bookingId,
                invoice.type,
                invoice.amount,
                invoice.date,
                invoice.status,
                invoice.files.join(';')
            ].join(','))
        ].join('\n')

        const blob = new Blob([csvContent], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'invoices.csv'
        a.click()
        window.URL.revokeObjectURL(url)
    }

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }))
    }

    const clearFilters = () => {
        setFilters({
            expenseType: '',
            status: '',
            dateFrom: null,
            dateTo: null,
            searchTerm: '',
        })
    }

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
        if (bottom && reservationPgination.has_next && !rervationLoading) {
            apigetReservations(reservationPgination.current_page + 1);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Paid':
                return 'text-emerald-600'
            case 'Pending':
                return 'text-amber-600'
            case 'Overdue':
                return 'text-red-600'
            default:
                return 'text-gray-600'
        }
    }

    const columns = [
        {
            header: 'Invoice ID',
            accessor: 'id',
        },
        {
            header: 'Booking ID',
            accessor: 'bookingId',
        },
        {
            header: 'Type',
            accessor: 'type',
        },
        {
            header: 'Amount',
            accessor: 'amount',
            Cell: ({ row }) => `$${row.amount.toFixed(2)}`,
        },
        {
            header: 'Date',
            accessor: 'date',
        },
        {
            header: 'Status',
            accessor: 'status',
            Cell: ({ row }) => (
                <span className={getStatusColor(row.status)}>
                    {row.status}
                </span>
            ),
        },
        {
            header: 'Files',
            accessor: 'files',
            Cell: ({ row }) => (
                <div className="flex items-center space-x-1">
                    <HiOutlineDocument className="text-gray-500" />
                    <span className="text-xs">{row.files.length}</span>
                </div>
            ),
        },
        {
            header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => (
                <div className="flex space-x-2">
                    <Button
                        size="sm"
                        variant="plain"
                        icon={<HiOutlineEye />}
                        onClick={() => handleView(row)}
                        title="View Details"
                    />
                    <Button
                        size="sm"
                        variant="plain"
                        icon={<HiOutlineDocument />}
                        onClick={() => handleViewPDF(row)}
                        title="View PDF"
                        disabled={row.files.length === 0}
                    />
                    <Button
                        size="sm"
                        variant="plain"
                        icon={<HiOutlineDownload />}
                        onClick={() => handleExportPDF(row)}
                        title="Export PDF"
                    />
                </div>
            ),
        },
    ]

    // Fetch reservations data
    const fetchReservations = async (page = 1, pageSize = 10) => {
        try {
            const response = await apigetReservations({
                page,
                per_page: pageSize,
            })
            console.log('Reservations response:', response) // Debug log
            setReservations(response.reservations || [])
            console.log("Reservations:", response.reservations);

            setPagination((prev) => ({
                ...prev,
                current: page,
                total: response.pagination?.total || 0,
            }))
        } catch (error) {
            console.error('Error fetching reservations:', error)
            toast.push(
                error.response?.data?.message || 'Failed to fetch reservations',
                {
                    placement: 'top-end',
                    type: 'error',
                },
            )
        }
    }

    useEffect(() => {
        const loadData = async () => {
            setLoading(true)
            await Promise.all([fetchReservations()])
            setLoading(false)
        }
        loadData()
    }, [])

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h4 className="text-2xl font-semibold">Invoices</h4>
                <div className="flex space-x-2">
                    <Button
                        variant="plain"
                        onClick={handleExportCSV}
                        icon={<HiOutlineDownload />}
                    >
                        Export CSV
                    </Button>
                    <Button
                        variant="solid"
                        icon={<HiOutlineDocumentAdd />}
                        onClick={handleGenerate}
                    >
                        Generate Invoice
                    </Button>
                </div>
            </div>

            {/* Filters Section */}
            <Card>
                <div className="p-4">
                    <div className="flex items-center space-x-2 mb-4">
                        <HiOutlineFilter className="text-gray-500" />
                        <h6 className="font-semibold">Filters</h6>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Search</label>
                            <Input
                                placeholder="Search by Invoice ID or Booking ID"
                                value={filters.searchTerm}
                                onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Expense Type</label>
                            <Select
                                options={expenseTypeOptions}
                                value={expenseTypeOptions.find(option => option.value === filters.expenseType)}
                                onChange={(option) => handleFilterChange('expenseType', option?.value || '')}
                                placeholder="Select Type"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Status</label>
                            <Select
                                options={statusOptions}
                                value={statusOptions.find(option => option.value === filters.status)}
                                onChange={(option) => handleFilterChange('status', option?.value || '')}
                                placeholder="Select Status"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Date From</label>
                            <DatePicker
                                value={filters.dateFrom}
                                onChange={(date) => handleFilterChange('dateFrom', date)}
                                placeholder="Select start date"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Date To</label>
                            <DatePicker
                                value={filters.dateTo}
                                onChange={(date) => handleFilterChange('dateTo', date)}
                                placeholder="Select end date"
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <p className="text-sm text-gray-600">
                            Showing {filteredInvoices.length} of {mockInvoices.length} invoices
                        </p>
                        <Button
                            size="sm"
                            variant="plain"
                            onClick={clearFilters}
                        >
                            Clear Filters
                        </Button>
                    </div>
                </div>
            </Card>

            <Card>
                <Table>
                    <Table.THead>
                        <Table.Tr>
                            {columns.map((column) => (
                                <Table.Th key={column.accessor}>
                                    <div className="flex items-center justify-between space-x-2">
                                        <span>{column.header}</span>
                                    </div>
                                </Table.Th>
                            ))}
                        </Table.Tr>
                    </Table.THead>
                    <Table.TBody>
                        {filteredInvoices.map((invoice) => (
                            <Table.Tr key={invoice.id}>
                                {columns.map((column) => (
                                    <Table.Td key={column.accessor}>
                                        {column.Cell ?
                                            column.Cell({ row: invoice }) :
                                            invoice[column.accessor]
                                        }
                                    </Table.Td>
                                ))}
                            </Table.Tr>
                        ))}
                    </Table.TBody>
                </Table>

                {filteredInvoices.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No invoices found
                    </div>
                )}
            </Card>

            <Dialog
                isOpen={viewDialog}
                onClose={() => setViewDialog(false)}
                title="Invoice Details"
            >
                {selectedInvoice && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h6 className="font-semibold text-gray-700">Invoice ID</h6>
                                <p>{selectedInvoice.id}</p>
                            </div>
                            <div>
                                <h6 className="font-semibold text-gray-700">Booking ID</h6>
                                <p>{selectedInvoice.bookingId}</p>
                            </div>
                            <div>
                                <h6 className="font-semibold text-gray-700">Type</h6>
                                <p>{selectedInvoice.type}</p>
                            </div>
                            <div>
                                <h6 className="font-semibold text-gray-700">Status</h6>
                                <span className={getStatusColor(selectedInvoice.status)}>
                                    {selectedInvoice.status}
                                </span>
                            </div>
                            <div>
                                <h6 className="font-semibold text-gray-700">Amount</h6>
                                <p>${selectedInvoice.amount.toFixed(2)}</p>
                            </div>
                            <div>
                                <h6 className="font-semibold text-gray-700">Date</h6>
                                <p>{selectedInvoice.date}</p>
                            </div>
                        </div>
                        <div>
                            <h6 className="font-semibold text-gray-700">Files ({selectedInvoice.files.length})</h6>
                            {selectedInvoice.files.length > 0 ? (
                                <ul className="list-disc list-inside space-y-1">
                                    {selectedInvoice.files.map((file, index) => (
                                        <li key={index} className="text-sm text-blue-600 hover:underline cursor-pointer">
                                            {file}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500 text-sm">No files attached</p>
                            )}
                        </div>
                        <div className="flex justify-end space-x-2 pt-4 border-t">
                            <Button
                                variant="solid"
                                onClick={() => handleViewPDF(selectedInvoice)}
                                disabled={selectedInvoice.files.length === 0}
                            >
                                View PDF
                            </Button>
                            <Button
                                variant="plain"
                                onClick={() => handleExportPDF(selectedInvoice)}
                            >
                                Export PDF
                            </Button>
                        </div>
                    </div>
                )}
            </Dialog>

            <Dialog
                isOpen={generateDialog}
                onClose={() => setGenerateDialog(false)}
                title="Generate Invoice"
            >
                <div className="space-y-4">
                    <p>Select the reservation to include in the invoice:</p>
                    <Select
                        options={reservations.map((reservation) => ({
                            value: reservation.id,
                            label: reservation.reservation_number,
                        }))}
                        value={selectedReservation}
                        onChange={(value) => setSelectedReservation(value)}
                        onScroll={handleScroll} // Add scroll listener for pagination
                    // isLoading={reservationsLoading} // Show loading spinner if fetching more bookings
                    />
                    <div className="flex justify-end">
                        <Button
                            variant="solid"
                            onClick={handleGenerateSubmit}
                        >
                            Generate
                        </Button>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default Invoices 