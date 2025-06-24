import { Card, Button, Table, DatePicker, Select, Input, Pagination, Dialog, Tooltip } from '@/components/ui'
import { 
    HiOutlineDownload, 
    HiOutlineTrash, 
    HiOutlineStar, 
    HiStar,
    HiOutlineDocumentText,
    HiOutlineDocument,
    HiOutlineFilter,
    HiOutlineRefresh
} from 'react-icons/hi'
import { useState, useMemo } from 'react'

// Mock data for exported files
const mockExports = [
    {
        id: 'EXP001',
        exportDate: '2024-03-20T14:30:00Z',
        exportType: 'PDF',
        expenseType: 'Tolls',
        recordCount: 45,
        fileSize: '2.1 MB',
        fileName: 'tolls_export_20240320.pdf',
        isFavorite: true,
        status: 'completed'
    },
    {
        id: 'EXP002',
        exportDate: '2024-03-19T09:15:00Z',
        exportType: 'CSV',
        expenseType: 'Tickets',
        recordCount: 12,
        fileSize: '340 KB',
        fileName: 'tickets_export_20240319.csv',
        isFavorite: false,
        status: 'completed'
    },
    {
        id: 'EXP003',
        exportDate: '2024-03-18T16:45:00Z',
        exportType: 'PDF',
        expenseType: 'Cleaning Fees',
        recordCount: 8,
        fileSize: '1.8 MB',
        fileName: 'cleaning_fees_20240318.pdf',
        isFavorite: true,
        status: 'completed'
    },
    {
        id: 'EXP004',
        exportDate: '2024-03-17T11:20:00Z',
        exportType: 'CSV',
        expenseType: 'Custom',
        recordCount: 156,
        fileSize: '8.4 MB',
        fileName: 'custom_expenses_20240317.csv',
        isFavorite: false,
        status: 'completed'
    },
    {
        id: 'EXP005',
        exportDate: '2024-03-16T13:30:00Z',
        exportType: 'PDF',
        expenseType: 'Tolls',
        recordCount: 23,
        fileSize: '1.2 MB',
        fileName: 'tolls_export_20240316.pdf',
        isFavorite: false,
        status: 'failed'
    },
    {
        id: 'EXP006',
        exportDate: '2024-03-15T10:10:00Z',
        exportType: 'CSV',
        expenseType: 'Tickets',
        recordCount: 67,
        fileSize: '4.2 MB',
        fileName: 'tickets_export_20240315.csv',
        isFavorite: true,
        status: 'completed'
    }
]

const Export = () => {
    const [exports, setExports] = useState(mockExports)
    const [filters, setFilters] = useState({
        dateRange: { start: null, end: null },
        exportType: '',
        expenseType: '',
        showFavoritesOnly: false
    })
    const [sortConfig, setSortConfig] = useState({ key: 'exportDate', direction: 'desc' })
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize] = useState(10)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [exportToDelete, setExportToDelete] = useState(null)

    const exportTypeOptions = [
        { value: '', label: 'All Types' },
        { value: 'PDF', label: 'PDF' },
        { value: 'CSV', label: 'CSV' }
    ]

    const expenseTypeOptions = [
        { value: '', label: 'All Expenses' },
        { value: 'Tolls', label: 'Tolls' },
        { value: 'Tickets', label: 'Tickets' },
        { value: 'Cleaning Fees', label: 'Cleaning Fees' },
        { value: 'Custom', label: 'Custom' }
    ]

    // Filter and sort exports
    const filteredAndSortedExports = useMemo(() => {
        let filtered = exports.filter(exportItem => {
            // Date range filter
            if (filters.dateRange.start && filters.dateRange.end) {
                const exportDate = new Date(exportItem.exportDate)
                if (exportDate < filters.dateRange.start || exportDate > filters.dateRange.end) {
                    return false
                }
            }

            // Export type filter
            if (filters.exportType && exportItem.exportType !== filters.exportType) {
                return false
            }

            // Expense type filter
            if (filters.expenseType && exportItem.expenseType !== filters.expenseType) {
                return false
            }

            // Favorites filter
            if (filters.showFavoritesOnly && !exportItem.isFavorite) {
                return false
            }

            return true
        })

        // Sort
        filtered.sort((a, b) => {
            let aValue = a[sortConfig.key]
            let bValue = b[sortConfig.key]

            if (sortConfig.key === 'exportDate') {
                aValue = new Date(aValue)
                bValue = new Date(bValue)
            }

            if (sortConfig.key === 'recordCount') {
                aValue = parseInt(aValue)
                bValue = parseInt(bValue)
            }

            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
            return 0
        })

        return filtered
    }, [exports, filters, sortConfig])

    // Pagination
    const paginatedExports = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize
        return filteredAndSortedExports.slice(startIndex, startIndex + pageSize)
    }, [filteredAndSortedExports, currentPage, pageSize])

    const totalPages = Math.ceil(filteredAndSortedExports.length / pageSize)

    const handleSort = (key) => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }))
    }

    const toggleFavorite = (id) => {
        setExports(prev => prev.map(exportItem => 
            exportItem.id === id 
                ? { ...exportItem, isFavorite: !exportItem.isFavorite }
                : exportItem
        ))
    }

    const handleDeleteClick = (exportItem) => {
        setExportToDelete(exportItem)
        setDeleteDialogOpen(true)
    }

    const confirmDelete = () => {
        if (exportToDelete) {
            setExports(prev => prev.filter(exportItem => exportItem.id !== exportToDelete.id))
            setDeleteDialogOpen(false)
            setExportToDelete(null)
        }
    }

    const handleDownload = (exportItem) => {
        // In a real app, this would trigger the actual file download
        console.log('Downloading:', exportItem.fileName)
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const getFileIcon = (type) => {
        return type === 'PDF' ? 
            <HiOutlineDocumentText className="text-red-500" /> : 
            <HiOutlineDocument className="text-green-500" />
    }

    const getFileSizeBadge = (size) => {
        const sizeNum = parseFloat(size)
        const isLarge = size.includes('MB') && sizeNum > 5
        return (
            <span>
                {size}
            </span>
        )
    }

    const columns = [
        {
            header: 'Export Date',
            accessor: 'exportDate',
            sortable: true,
            Cell: ({ row }) => (
                <div className="flex items-center space-x-2">
                    {getFileIcon(row.exportType)}
                    <div>
                        <div className="font-medium">{formatDate(row.exportDate)}</div>
                        <div className="text-sm text-gray-500">{row.fileName}</div>
                    </div>
                </div>
            )
        },
        {
            header: 'Type',
            accessor: 'exportType',
            Cell: ({ row }) => (
                <span className={row.exportType === 'PDF' ? 'text-orange-600' : 'text-green-600'}>
                    {row.exportType}
                </span>
            )
        },
        {
            header: 'Expense Type',
            accessor: 'expenseType',
            Cell: ({ row }) => (
                <span>{row.expenseType}</span>
            )
        },
        {
            header: 'Records',
            accessor: 'recordCount',
            sortable: true,
            Cell: ({ row }) => (
                <span className="font-medium">{row.recordCount}</span>
            )
        },
        {
            header: 'Size',
            accessor: 'fileSize',
            Cell: ({ row }) => getFileSizeBadge(row.fileSize)
        },
        {
            header: 'Status',
            accessor: 'status',
            Cell: ({ row }) => (
                <span className={
                    row.status === 'completed' 
                        ? 'text-green-600' 
                        : 'text-red-600'
                }>
                    {row.status}
                </span>
            )
        },
        {
            header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => (
                <div className="flex items-center space-x-2">
                    <Tooltip title="Download">
                        <Button
                            size="sm"
                            variant="plain"
                            icon={<HiOutlineDownload />}
                            onClick={() => handleDownload(row)}
                            disabled={row.status === 'failed'}
                        />
                    </Tooltip>
                    <Tooltip title={row.isFavorite ? "Remove from favorites" : "Add to favorites"}>
                        <Button
                            size="sm"
                            variant="plain"
                            icon={row.isFavorite ? <HiStar className="text-yellow-500" /> : <HiOutlineStar />}
                            onClick={() => toggleFavorite(row.id)}
                        />
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Button
                            size="sm"
                            variant="plain"
                            icon={<HiOutlineTrash />}
                            onClick={() => handleDeleteClick(row)}
                            className="text-red-500 hover:text-red-700"
                        />
                    </Tooltip>
                </div>
            )
        }
    ]

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h4 className="text-2xl font-semibold">Export History</h4>
                <Button variant="solid" icon={<HiOutlineRefresh />}>
                    New Export
                </Button>
            </div>

            {/* Filters */}
            <Card>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                            Date Range
                        </label>
                        <DatePicker.DatePickerRange
                            value={[filters.dateRange.start, filters.dateRange.end]}
                            onChange={(dates) => 
                                setFilters(prev => ({
                                    ...prev,
                                    dateRange: { start: dates[0], end: dates[1] }
                                }))
                            }
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                            Export Type
                        </label>
                        <Select
                            value={filters.exportType}
                            onChange={(value) => 
                                setFilters(prev => ({ ...prev, exportType: value }))
                            }
                            options={exportTypeOptions}
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                            Expense Type
                        </label>
                        <Select
                            value={filters.expenseType}
                            onChange={(value) => 
                                setFilters(prev => ({ ...prev, expenseType: value }))
                            }
                            options={expenseTypeOptions}
                        />
                    </div>
                    <div className="flex items-center space-x-4">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={filters.showFavoritesOnly}
                                onChange={(e) => 
                                    setFilters(prev => ({ 
                                        ...prev, 
                                        showFavoritesOnly: e.target.checked 
                                    }))
                                }
                                className="rounded"
                            />
                            <span className="text-sm">Favorites only</span>
                        </label>
                        <Button 
                            size="sm" 
                            variant="default"
                            onClick={() => setFilters({
                                dateRange: { start: null, end: null },
                                exportType: '',
                                expenseType: '',
                                showFavoritesOnly: false
                            })}
                        >
                            Clear
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Results Summary */}
            <div className="text-sm text-gray-600">
                Showing {paginatedExports.length} of {filteredAndSortedExports.length} exports
            </div>

            {/* Data Table */}
            <Card>
                <Table>
                    <Table.THead>
                        <Table.Tr>
                            {columns.map((column) => (
                                <Table.Th 
                                    key={column.accessor}
                                    className={column.sortable ? 'cursor-pointer hover:bg-gray-50' : ''}
                                    onClick={column.sortable ? () => handleSort(column.accessor) : undefined}
                                >
                                    <div className="flex items-center space-x-1">
                                        <span>{column.header}</span>
                                        {column.sortable && sortConfig.key === column.accessor && (
                                            <span className="text-gray-400">
                                                {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                            </span>
                                        )}
                                    </div>
                                </Table.Th>
                            ))}
                        </Table.Tr>
                    </Table.THead>
                    <Table.TBody>
                        {paginatedExports.map((row) => (
                            <Table.Tr key={row.id}>
                                {columns.map((column) => (
                                    <Table.Td key={column.accessor}>
                                        {column.Cell ? 
                                            column.Cell({ row }) : 
                                            row[column.accessor]
                                        }
                                    </Table.Td>
                                ))}
                            </Table.Tr>
                        ))}
                    </Table.TBody>
                </Table>

                {paginatedExports.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No exports found matching your criteria
                    </div>
                )}
            </Card>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center">
                    <Pagination
                        currentPage={currentPage}
                        total={filteredAndSortedExports.length}
                        pageSize={pageSize}
                        onChange={setCurrentPage}
                    />
                </div>
            )}

            {/* Delete Confirmation Dialog */}
            <Dialog 
                isOpen={deleteDialogOpen} 
                onClose={() => setDeleteDialogOpen(false)}
            >
                <h5 className="mb-4">Confirm Delete</h5>
                <p className="text-gray-600 mb-6">
                    Are you sure you want to delete "{exportToDelete?.fileName}"? 
                    This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-2">
                    <Button 
                        variant="plain" 
                        onClick={() => setDeleteDialogOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button 
                        variant="solid" 
                        color="red"
                        onClick={confirmDelete}
                    >
                        Delete
                    </Button>
                </div>
            </Dialog>
        </div>
    )
}

export default Export 