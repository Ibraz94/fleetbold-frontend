import { Card, Button, Table, Dialog, Select, Upload, Steps, Progress, Input, Radio, DatePicker, Tooltip } from '@/components/ui'
import { HiOutlineEye, HiOutlineLink, HiOutlineUpload, HiOutlineDocumentText, HiOutlineCheckCircle, HiOutlineExclamationCircle, HiOutlineX, HiOutlineSearch, HiOutlinePencil, HiOutlineBan, HiOutlineFilter } from 'react-icons/hi'
import { useState, useCallback, useMemo } from 'react'

const mockExpenses = [
    {
        id: 'EXP001',
        type: 'Toll',
        amount: 25.50,
        status: 'Unassigned',
        booking: null,
        file: 'toll_receipt.pdf',
        date: '2024-01-15',
        vendor: 'Highway Tolls',
        description: 'Highway toll payment',
        notes: '',
    },
    {
        id: 'EXP002',
        type: 'Cleaning',
        amount: 45.00,
        status: 'Assigned',
        booking: 'BK001',
        file: 'cleaning_invoice.pdf',
        date: '2024-01-16',
        vendor: 'CleanCar Services',
        description: 'Vehicle cleaning service',
        notes: 'Post-rental cleaning',
    },
    {
        id: 'EXP003',
        type: 'Ticket',
        amount: 150.00,
        status: 'Collected',
        booking: null,
        file: 'parking_ticket.jpg',
        date: '2024-01-17',
        vendor: 'City Parking Authority',
        description: 'Parking violation ticket',
        notes: '',
    },
    {
        id: 'EXP004',
        type: 'Fuel',
        amount: 85.75,
        status: 'Disputed',
        booking: null,
        file: 'gas_receipt.pdf',
        date: '2024-01-18',
        vendor: 'Shell Gas Station',
        description: 'Fuel purchase',
        notes: '',
    },
    {
        id: 'EXP005',
        type: 'Toll',
        amount: 12.25,
        status: 'Unassigned',
        booking: null,
        file: 'toll_receipt2.pdf',
        date: '2024-01-19',
        vendor: 'Bridge Authority',
        description: 'Bridge toll payment',
        notes: '',
    },
]

const mockBookings = [
    { value: 'BK001', label: 'Booking BK001 - Toyota Camry', date: '2024-01-15', customer: 'John Doe' },
    { value: 'BK002', label: 'Booking BK002 - Honda Civic', date: '2024-01-16', customer: 'Jane Smith' },
    { value: 'BK003', label: 'Booking BK003 - Ford Explorer', date: '2024-01-17', customer: 'Mike Johnson' },
    { value: 'BK004', label: 'Booking BK004 - Nissan Altima', date: '2024-01-18', customer: 'Sarah Wilson' },
]

const EXPENSE_TYPES = ['Toll', 'Ticket', 'Cleaning Fees', 'Fuel', 'Maintenance']


// Mock OCR detection results
const mockOCRResults = {
    'receipt1.jpg': { type: 'Toll', amount: 12.50, vendor: 'Highway Tolls', date: '2024-01-15' },
    'invoice.pdf': { type: 'Cleaning', amount: 85.00, vendor: 'CleanCar Services', date: '2024-01-16' },
    'ticket.png': { type: 'Ticket', amount: 150.00, vendor: 'City Parking', date: '2024-01-17' },
}

const Expenses = () => {
    const [viewDialog, setViewDialog] = useState(false)
    const [assignDialog, setAssignDialog] = useState(false)
    const [selectedExpense, setSelectedExpense] = useState(null)
    const [selectedBooking, setSelectedBooking] = useState('')

    // New upload process state
    const [uploadDialog, setUploadDialog] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [detectedExpenses, setDetectedExpenses] = useState([])
    const [processingFiles, setProcessingFiles] = useState([])
    const [importSummary, setImportSummary] = useState(null)

    // New pending expenses assignment state
    const [searchTripDialog, setSearchTripDialog] = useState(false)
    const [addNoteDialog, setAddNoteDialog] = useState(false)
    const [pendingFilters, setPendingFilters] = useState({
        type: '',
        startDate: null,
        endDate: null,
    })

    const expenseTypeOptions = [
        { value: '', label: 'All Types' },
        ...EXPENSE_TYPES.map(type => ({ value: type, label: type }))
    ]
    const [searchResults, setSearchResults] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [noteText, setNoteText] = useState('')
    const [expenses, setExpenses] = useState(mockExpenses)

    const handleView = (expense) => {
        setSelectedExpense(expense)
        setViewDialog(true)
    }

    const handleAssign = (expense) => {
        setSelectedExpense(expense)
        setAssignDialog(true)
    }

    const handleAssignSubmit = () => {
        if (selectedExpense && selectedBooking) {
            setExpenses(prev =>
                prev.map(exp =>
                    exp.id === selectedExpense.id
                        ? { ...exp, booking: selectedBooking, status: 'Assigned' }
                        : exp
                )
            )
        }
        setAssignDialog(false)
        setSelectedBooking('')
    }

    // Upload process handlers
    const handleUploadDialog = () => {
        setUploadDialog(true)
        setCurrentStep(0)
        setUploadedFiles([])
        setDetectedExpenses([])
        setProcessingFiles([])
        setImportSummary(null)
    }

    const handleFileUpload = useCallback((files) => {
        const validFiles = []
        const invalidFiles = []

        Array.from(files).forEach(file => {
            const fileExtension = file.name.split('.').pop().toLowerCase()
            const isValidType = ['csv', 'pdf', 'jpg', 'jpeg', 'png'].includes(fileExtension)
            const isValidSize = file.size <= 10 * 1024 * 1024 // 10MB limit

            if (!isValidType) {
                invalidFiles.push({ file, error: 'Invalid file type. Only CSV, PDF, JPG, PNG are allowed.' })
            } else if (!isValidSize) {
                invalidFiles.push({ file, error: 'File size must be less than 10MB.' })
            } else {
                validFiles.push(file)
            }
        })

        if (invalidFiles.length > 0) {
            // Show validation errors
            console.error('Invalid files:', invalidFiles)
        }

        if (validFiles.length > 0) {
            setUploadedFiles(validFiles)
            // Move to detection step
            setTimeout(() => {
                setCurrentStep(1)
                processFiles(validFiles)
            }, 500)
        }
    }, [])

    const processFiles = (files) => {
        setProcessingFiles(files.map(file => ({ file, status: 'processing' })))

        // Simulate OCR processing
        files.forEach((file, index) => {
            setTimeout(() => {
                const mockResult = mockOCRResults[file.name] || {
                    type: 'Other',
                    amount: Math.floor(Math.random() * 100) + 10,
                    vendor: 'Unknown Vendor',
                    date: new Date().toISOString().split('T')[0]
                }

                setDetectedExpenses(prev => [...prev, {
                    id: `TEMP_${Date.now()}_${index}`,
                    file: file.name,
                    fileType: file.type || 'application/octet-stream',
                    detectedType: mockResult.type,
                    confirmedType: mockResult.type,
                    amount: mockResult.amount,
                    vendor: mockResult.vendor,
                    date: mockResult.date,
                    confidence: Math.floor(Math.random() * 30) + 70, // 70-100%
                    status: 'pending_confirmation'
                }])

                setProcessingFiles(prev =>
                    prev.map(item =>
                        item.file === file
                            ? { ...item, status: 'completed' }
                            : item
                    )
                )
            }, (index + 1) * 1000)
        })

        // Move to confirmation step after all files are processed
        setTimeout(() => {
            setCurrentStep(2)
        }, files.length * 1000 + 500)
    }

    const handleTypeConfirmation = (expenseId, newType) => {
        setDetectedExpenses(prev =>
            prev.map(expense =>
                expense.id === expenseId
                    ? { ...expense, confirmedType: newType }
                    : expense
            )
        )
    }

    const handleImportExpenses = () => {
        const summary = {
            total: detectedExpenses.length,
            totalAmount: detectedExpenses.reduce((sum, exp) => sum + exp.amount, 0),
            byType: EXPENSE_TYPES.reduce((acc, type) => {
                const count = detectedExpenses.filter(exp => exp.confirmedType === type).length
                const amount = detectedExpenses
                    .filter(exp => exp.confirmedType === type)
                    .reduce((sum, exp) => sum + exp.amount, 0)
                if (count > 0) {
                    acc[type] = { count, amount }
                }
                return acc
            }, {}),
            pendingAssignment: detectedExpenses.length,
            assigned: 0
        }

        setImportSummary(summary)
        setCurrentStep(3)
    }

    const handleFinalImport = () => {
        // In a real app, this would save the expenses to the backend
        console.log('Final import:', detectedExpenses)
        setUploadDialog(false)
        // Refresh the expenses list
    }

    const validateUpload = (files) => {
        const allowedTypes = ['text/csv', 'application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
        const maxSize = 10 * 1024 * 1024 // 10MB

        for (let file of files) {
            if (!allowedTypes.includes(file.type) && !file.name.toLowerCase().match(/\.(csv|pdf|jpg|jpeg|png)$/)) {
                return 'Invalid file type. Only CSV, PDF, JPG, PNG files are allowed.'
            }
            if (file.size > maxSize) {
                return 'File size must be less than 10MB.'
            }
        }
        return true
    }

    // New pending expenses handlers
    const handleSearchTrip = (expense) => {
        setSelectedExpense(expense)
        setSearchTripDialog(true)
        setSearchQuery('')
        setSearchResults([])
    }

    const handleSearchSubmit = () => {
        if (!searchQuery.trim()) return

        // Mock search logic - filter bookings by date range around expense date
        const expenseDate = new Date(selectedExpense.date)
        const searchStart = new Date(expenseDate)
        searchStart.setDate(searchStart.getDate() - 2)
        const searchEnd = new Date(expenseDate)
        searchEnd.setDate(searchEnd.getDate() + 2)

        const filteredBookings = mockBookings.filter(booking => {
            const bookingDate = new Date(booking.date)
            const matchesDate = bookingDate >= searchStart && bookingDate <= searchEnd
            const matchesQuery = booking.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                booking.customer.toLowerCase().includes(searchQuery.toLowerCase())
            return matchesDate || matchesQuery
        })

        setSearchResults(filteredBookings)
    }

    const handleAssignFromSearch = (bookingId) => {
        setExpenses(prev =>
            prev.map(exp =>
                exp.id === selectedExpense.id
                    ? { ...exp, booking: bookingId, status: 'Assigned' }
                    : exp
            )
        )
        setSearchTripDialog(false)
        setSearchResults([])
    }

    const handleAddNote = (expense) => {
        setSelectedExpense(expense)
        setNoteText(expense.notes || '')
        setAddNoteDialog(true)
    }

    const handleNoteSubmit = () => {
        setExpenses(prev =>
            prev.map(exp =>
                exp.id === selectedExpense.id
                    ? { ...exp, notes: noteText }
                    : exp
            )
        )
        setAddNoteDialog(false)
        setNoteText('')
    }

    const handleMarkUnbillable = (expense) => {
        setExpenses(prev =>
            prev.map(exp =>
                exp.id === expense.id
                    ? { ...exp, status: 'Unbillable' }
                    : exp
            )
        )
    }

    // Filter all expenses
    const filteredExpenses = useMemo(() => {
        return expenses.filter(expense => {
            // Type filter
            if (pendingFilters.type && expense.type !== pendingFilters.type) return false

            // Date filter
            if (pendingFilters.startDate) {
                const expenseDate = new Date(expense.date)
                const startDate = new Date(pendingFilters.startDate)
                if (expenseDate < startDate) return false
            }

            if (pendingFilters.endDate) {
                const expenseDate = new Date(expense.date)
                const endDate = new Date(pendingFilters.endDate)
                if (expenseDate > endDate) return false
            }

            return true
        })
    }, [expenses, pendingFilters])

    const handleFilterChange = (key, value) => {
        setPendingFilters(prev => ({ ...prev, [key]: value }))
    }

    const columns = [
        {
            header: 'Date',
            accessor: 'date',
            Cell: ({ row }) => new Date(row.date).toLocaleDateString(),
        },
        {
            header: 'Customer',
            accessor: 'customer',
            Cell: ({ row }) => row.vendor || '-',
        },
        {
            header: 'Booking Type',
            accessor: 'type',
        },
        {
            header: 'Linked Booking',
            accessor: 'booking',
            Cell: ({ row }) => row.booking || '-',
        },
        {
            header: 'Amount',
            accessor: 'amount',
            Cell: ({ row }) => `$${row.amount}`,
        },

        {
            header: 'File',
            accessor: 'file',
        },
        {
            header: 'Status',
            accessor: 'status',
            Cell: ({ row }) => (
                <span
                    className={`${row.status === 'Assigned'
                        ? 'text-yellow-500'
                        : row.status === 'Disputed'
                            ? 'text-red-600'
                            : row.status === 'Unassigned'
                                ? 'text-amber-600'
                                : row.status === 'Collected'
                                    ? 'text-green-500'
                                    : 'text-gray-600'
                        }`}
                >
                    {row.status}
                </span>
            ),
        },
        {
            header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => (
                <div className="flex space-x-2">
                    <Button
                        size="sm"
                        icon={<HiOutlineEye />}
                        onClick={() => handleView(row)}
                        title="View Details"
                    />
                    {!row.booking && row.status === 'Unassigned' && (
                        <Button
                            size="sm"
                            icon={<HiOutlineLink />}
                            onClick={() => handleAssign(row)}
                            title="Assign Expense"
                        />
                    )}
                </div>
            ),
        },
    ]

    // Pending expenses table columns
    const pendingColumns = [
        {
            header: 'Date',
            accessor: 'date',
            Cell: ({ row }) => new Date(row.date).toLocaleDateString(),
        },
        {
            header: 'Type',
            accessor: 'type',
            Cell: ({ row }) => <span className="text-gray-600">{row.type}</span>,
        },
        {
            header: 'Amount',
            accessor: 'amount',
            Cell: ({ row }) => `$${row.amount}`,
        },
        {
            header: 'Vendor',
            accessor: 'vendor',
        },
        {
            header: 'Description',
            accessor: 'description',
            Cell: ({ row }) => (
                <div className="max-w-xs truncate" title={row.description}>
                    {row.description}
                </div>
            ),
        },
        {
            header: 'Notes',
            accessor: 'notes',
            Cell: ({ row }) => (
                <div className="max-w-xs truncate" title={row.notes}>
                    {row.notes || '-'}
                </div>
            ),
        },
        {
            header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => (
                <div className="flex space-x-1">
                    <Button
                        size="sm"
                        variant="default"
                        icon={<HiOutlineSearch />}
                        onClick={() => handleSearchTrip(row)}
                        title="Search Trip"
                    />
                    <Button
                        size="sm"
                        variant="default"
                        icon={<HiOutlineLink />}
                        onClick={() => handleAssign(row)}
                        title="Assign Expense"
                    />
                    <Button
                        size="sm"
                        variant="default"
                        icon={<HiOutlinePencil />}
                        onClick={() => handleAddNote(row)}
                        title="Add Note"
                    />
                    <Button
                        size="sm"
                        variant="default"
                        icon={<HiOutlineBan />}
                        onClick={() => handleMarkUnbillable(row)}
                        title="Mark as Unbillable"
                        className="text-red-600 hover:text-red-700"
                    />
                </div>
            ),
        },
    ]

    const renderUploadStep = () => (
        <div className="space-y-6">
            <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Upload Expense Documents</h3>
                <p className="text-gray-600">Upload CSV files, PDF receipts, or photo scans of expenses</p>
            </div>

            <Upload
                draggable
                multiple
                accept=".csv,.pdf,.jpg,.jpeg,.png"
                beforeUpload={validateUpload}
                onChange={handleFileUpload}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors"
            >
                <div className="space-y-4">
                    <HiOutlineUpload className="mx-auto h-12 w-12 text-gray-400" />
                    <div>
                        <p className="text-lg font-medium">Choose files or drag and drop</p>
                        <p className="text-sm text-gray-500">CSV, PDF, JPG, PNG (max 10MB each)</p>
                    </div>
                </div>
            </Upload>

            {uploadedFiles.length > 0 && (
                <div className="mt-4">
                    <h4 className="font-medium mb-2">Uploaded Files:</h4>
                    <div className="space-y-2">
                        {uploadedFiles.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                <div className="flex items-center space-x-2">
                                    <HiOutlineDocumentText className="h-5 w-5 text-gray-500" />
                                    <span className="text-sm">{file.name}</span>
                                    <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(1)}KB)</span>
                                </div>
                                <HiOutlineCheckCircle className="h-5 w-5 text-green-500" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )

    const renderDetectionStep = () => (
        <div className="space-y-6">
            <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Processing & Detection</h3>
                <p className="text-gray-600">Detecting expense types and extracting information</p>
            </div>

            {processingFiles.length > 0 && (
                <div className="space-y-4">
                    {processingFiles.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-3">
                                <HiOutlineDocumentText className="h-5 w-5 text-gray-500" />
                                <span className="font-medium">{item.file.name}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                {item.status === 'processing' ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                                        <span className="text-sm text-gray-500">Processing...</span>
                                    </>
                                ) : (
                                    <>
                                        <HiOutlineCheckCircle className="h-5 w-5 text-green-500" />
                                        <span className="text-sm text-green-600">Completed</span>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {detectedExpenses.length > 0 && (
                <div className="mt-6">
                    <h4 className="font-semibold mb-4">Detected Expenses - Please Confirm</h4>
                    <div className="space-y-4">
                        {detectedExpenses.map((expense) => (
                            <Card key={expense.id} className="p-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <div className="flex items-center space-x-2 mb-2">
                                            <HiOutlineDocumentText className="h-4 w-4 text-gray-500" />
                                            <span className="text-sm font-medium">{expense.file}</span>
                                        </div>
                                        <div className="space-y-1 text-sm text-gray-600">
                                            <p><strong>Amount:</strong> ${expense.amount}</p>
                                            <p><strong>Vendor:</strong> {expense.vendor}</p>
                                            <p><strong>Date:</strong> {expense.date}</p>
                                            <p><strong>Confidence:</strong> {expense.confidence}%</p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Expense Type
                                            {expense.confidence < 80 && (
                                                <HiOutlineExclamationCircle className="inline h-4 w-4 text-amber-500 ml-1" />
                                            )}
                                        </label>
                                        <Select
                                            value={expense.confirmedType}
                                            onChange={(value) => handleTypeConfirmation(expense.id, value)}
                                            options={EXPENSE_TYPES.map(type => ({ value: type, label: type }))}
                                        />
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <div className="flex justify-center mt-6">
                        <Button
                            variant="solid"
                            onClick={handleImportExpenses}
                            disabled={detectedExpenses.some(exp => !exp.confirmedType)}
                        >
                            Continue to Summary
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )

    const renderSummaryStep = () => (
        <div className="space-y-6">
            <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Import Summary</h3>
                <p className="text-gray-600">Review your expense import before finalizing</p>
            </div>

            {importSummary && (
                <div className="space-y-6">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="p-4 text-center">
                            <h4 className="text-2xl font-bold text-primary">{importSummary.total}</h4>
                            <p className="text-sm text-gray-600">Total Expenses</p>
                        </Card>
                        <Card className="p-4 text-center">
                            <h4 className="text-2xl font-bold text-green-600">${importSummary.totalAmount.toFixed(2)}</h4>
                            <p className="text-sm text-gray-600">Total Amount</p>
                        </Card>
                        <Card className="p-4 text-center">
                            <h4 className="text-2xl font-bold text-amber-600">{importSummary.pendingAssignment}</h4>
                            <p className="text-sm text-gray-600">Pending Assignment</p>
                        </Card>
                    </div>

                    {/* By Type Breakdown */}
                    <Card className="p-4">
                        <h4 className="font-semibold mb-4">Expenses by Type</h4>
                        <div className="space-y-3">
                            {Object.entries(importSummary.byType).map(([type, data]) => (
                                <div key={type} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-gray-600">{type}</span>
                                        <span className="text-sm text-gray-600">{data.count} item(s)</span>
                                    </div>
                                    <span className="font-semibold">${data.amount.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Expense List */}
                    <Card className="p-4">
                        <h4 className="font-semibold mb-4">Expense Details</h4>
                        <div className="space-y-2">
                            {detectedExpenses.map((expense) => (
                                <div key={expense.id} className="flex justify-between items-center p-3 border-l-4 border-primary bg-gray-50 rounded">
                                    <div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-gray-600">{expense.confirmedType}</span>
                                            <span className="font-medium">${expense.amount}</span>
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {expense.vendor} • {expense.date} • {expense.file}
                                        </div>
                                    </div>
                                    <span className="text-amber-600">
                                        Unassigned
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <div className="flex justify-center space-x-4">
                        <Button variant="default" onClick={() => setCurrentStep(1)}>
                            Back to Edit
                        </Button>
                        <Button variant="solid" onClick={handleFinalImport}>
                            Import All Expenses
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h4 className="text-2xl font-semibold">Expenses</h4>
                <Button variant="solid" onClick={handleUploadDialog} icon={<HiOutlineUpload />}>
                    Upload Expenses
                </Button>
            </div>

            {/* Filters */}
            <Card>
                <div className="p-4">
                    <div className="flex flex-wrap gap-4 items-end">
                        <div className="flex-1 min-w-[200px]">
                            <label className="block text-sm font-medium mb-1">Filter by Type</label>
                            <Select
                                options={expenseTypeOptions}
                                value={expenseTypeOptions.find(option => option.value === pendingFilters.type)}
                                onChange={(option) => handleFilterChange('type', option?.value || '')}
                                placeholder="Select type"
                            />
                        </div>
                        <div className="flex-1 min-w-[150px]">
                            <label className="block text-sm font-medium mb-1">Start Date</label>
                            <DatePicker
                                value={pendingFilters.startDate}
                                onChange={(date) => handleFilterChange('startDate', date)}
                                placeholder="Start date"
                            />
                        </div>
                        <div className="flex-1 min-w-[150px]">
                            <label className="block text-sm font-medium mb-1">End Date</label>
                            <DatePicker
                                value={pendingFilters.endDate}
                                onChange={(date) => handleFilterChange('endDate', date)}
                                placeholder="End date"
                            />
                        </div>
                        <Button
                            variant="default"
                            onClick={() => setPendingFilters({ type: '', startDate: null, endDate: null })}
                            icon={<HiOutlineX />}
                        >
                            Clear
                        </Button>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <p className="text-sm text-gray-600">
                            Showing {filteredExpenses.length} of {expenses.length} expenses
                        </p>
                    </div>
                </div>
            </Card>

            {/* Main Expenses Table */}
            <Card>
                {filteredExpenses.length > 0 ? (
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
                            {filteredExpenses.map((expense) => (
                                <Table.Tr key={expense.id}>
                                    {columns.map((column) => (
                                        <Table.Td key={column.accessor}>
                                            {column.Cell ?
                                                column.Cell({ row: expense }) :
                                                expense[column.accessor]
                                            }
                                        </Table.Td>
                                    ))}
                                </Table.Tr>
                            ))}
                        </Table.TBody>
                    </Table>
                ) : (
                    <div className="p-8 text-center text-gray-500">
                        <HiOutlineFilter className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                        <p className="text-lg font-medium">No expenses found</p>
                        <p className="text-sm">Try adjusting your filter criteria</p>
                    </div>
                )}
            </Card>



            {/* Upload Process Dialog */}
            <Dialog
                isOpen={uploadDialog}
                onClose={() => setUploadDialog(false)}
                title="Upload Expenses"
                width="800px"
            >
                <div className="space-y-6">
                    <Steps current={currentStep}>
                        <Steps.Item title="Upload" />
                        <Steps.Item title="Detection" />
                        <Steps.Item title="Summary" />
                    </Steps>

                    <div className="min-h-[400px]">
                        {currentStep === 0 && renderUploadStep()}
                        {currentStep === 1 && renderDetectionStep()}
                        {currentStep === 2 && renderSummaryStep()}
                    </div>
                </div>
            </Dialog>

            {/* Search Trip Dialog */}
            <Dialog
                isOpen={searchTripDialog}
                onClose={() => setSearchTripDialog(false)}
                title="Search and Assign Trip"
                width="600px"
            >
                {selectedExpense && (
                    <div className="space-y-6">
                        <div className="p-4 bg-gray-50 rounded">
                            <h6 className="font-medium mb-2">Expense Details</h6>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="font-medium">Type:</span> {selectedExpense.type}
                                </div>
                                <div>
                                    <span className="font-medium">Amount:</span> ${selectedExpense.amount}
                                </div>
                                <div>
                                    <span className="font-medium">Date:</span> {new Date(selectedExpense.date).toLocaleDateString()}
                                </div>
                                <div>
                                    <span className="font-medium">Vendor:</span> {selectedExpense.vendor}
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Search Reservations</label>
                            <div className="flex space-x-2">
                                <Input
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search by booking ID, customer name..."
                                    className="flex-1"
                                />
                                <Button onClick={handleSearchSubmit} icon={<HiOutlineSearch />}>
                                    Search
                                </Button>
                            </div>
                        </div>

                        {searchResults.length > 0 && (
                            <div>
                                <h6 className="font-medium mb-3">Search Results</h6>
                                <div className="space-y-2 max-h-60 overflow-y-auto">
                                    {searchResults.map((booking) => (
                                        <div
                                            key={booking.value}
                                            className="flex items-center justify-between p-3 border rounded hover:bg-gray-50"
                                        >
                                            <div>
                                                <div className="font-medium">{booking.label}</div>
                                                <div className="text-sm text-gray-600">
                                                    {booking.customer} • {new Date(booking.date).toLocaleDateString()}
                                                </div>
                                            </div>
                                            <Button
                                                size="sm"
                                                onClick={() => handleAssignFromSearch(booking.value)}
                                            >
                                                Assign
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {searchResults.length === 0 && searchQuery && (
                            <div className="text-center py-8 text-gray-500">
                                <p>No matching reservations found</p>
                                <p className="text-sm">Try adjusting your search criteria</p>
                            </div>
                        )}
                    </div>
                )}
            </Dialog>

            {/* Add Note Dialog */}
            <Dialog
                isOpen={addNoteDialog}
                onClose={() => setAddNoteDialog(false)}
                title="Add Note"
                width="500px"
            >
                {selectedExpense && (
                    <div className="space-y-4">
                        <div>
                            <h6 className="font-medium mb-2">Expense</h6>
                            <p className="text-sm text-gray-600">
                                {selectedExpense.type} - ${selectedExpense.amount} ({new Date(selectedExpense.date).toLocaleDateString()})
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Note</label>
                            <textarea
                                value={noteText}
                                onChange={(e) => setNoteText(e.target.value)}
                                className="w-full p-3 border rounded-lg resize-none"
                                rows={4}
                                placeholder="Add a note for this expense..."
                            />
                        </div>

                        <div className="flex justify-end space-x-2">
                            <Button variant="default" onClick={() => setAddNoteDialog(false)}>
                                Cancel
                            </Button>
                            <Button variant="solid" onClick={handleNoteSubmit}>
                                Save Note
                            </Button>
                        </div>
                    </div>
                )}
            </Dialog>

            {/* Existing Assign Dialog */}
            <Dialog
                isOpen={assignDialog}
                onClose={() => setAssignDialog(false)}
                title="Assign to Booking"
            >
                {selectedExpense && (
                    <div className="space-y-4">
                        <div>
                            <h6>Expense Details</h6>
                            <p>
                                {selectedExpense.type} - ${selectedExpense.amount}
                            </p>
                        </div>
                        <div>
                            <h6>Select Booking</h6>
                            <Select
                                options={mockBookings}
                                value={selectedBooking}
                                onChange={(value) => setSelectedBooking(value)}
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button
                                variant="solid"
                                onClick={handleAssignSubmit}
                            >
                                Assign
                            </Button>
                        </div>
                    </div>
                )}
            </Dialog>

            {/* Existing View Dialog */}
            <Dialog
                isOpen={viewDialog}
                onClose={() => setViewDialog(false)}
                title="Expense Details"
            >
                {selectedExpense && (
                    <div className="space-y-4">
                        <div>
                            <h6>Type</h6>
                            <p>{selectedExpense.type}</p>
                        </div>
                        <div>
                            <h6>Amount</h6>
                            <p>${selectedExpense.amount}</p>
                        </div>
                        <div>
                            <h6>Status</h6>
                            <p>{selectedExpense.status}</p>
                        </div>
                        <div>
                            <h6>Linked Booking</h6>
                            <p>{selectedExpense.booking || '-'}</p>
                        </div>
                        <div>
                            <h6>File</h6>
                            <p>{selectedExpense.file}</p>
                        </div>
                        {selectedExpense.notes && (
                            <div>
                                <h6>Notes</h6>
                                <p>{selectedExpense.notes}</p>
                            </div>
                        )}
                    </div>
                )}
            </Dialog>
        </div>
    )
}

export default Expenses 