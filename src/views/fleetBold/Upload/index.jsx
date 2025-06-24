import { Card, Button, Table } from '@/components/ui'
import { HiOutlineUpload, HiOutlineDocument, HiOutlineCheck, HiOutlineClock } from 'react-icons/hi'
import { useState } from 'react'

const mockUploads = [
    {
        id: 'UP001',
        name: 'toll_receipts.csv',
        type: 'CSV',
        size: '2.5 MB',
        status: 'Processed',
        date: '2024-03-15',
    },
    {
        id: 'UP002',
        name: 'cleaning_invoice.pdf',
        type: 'PDF',
        size: '1.2 MB',
        status: 'Pending',
        date: '2024-03-15',
    },
    // Add more mock data as needed
]

const Upload = () => {
    const [isDragging, setIsDragging] = useState(false)
    const [uploads, setUploads] = useState(mockUploads)

    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)
        // In a real app, handle file upload here
    }

    const columns = [
        {
            header: 'File Name',
            accessorKey: 'name',
            cell: (props) => (
                <div className="flex items-center space-x-2">
                    <HiOutlineDocument className="text-xl" />
                    <span>{props.row.original.name}</span>
                </div>
            ),
        },
        {
            header: 'Type',
            accessorKey: 'type',
        },
        {
            header: 'Size',
            accessorKey: 'size',
        },
        {
            header: 'Status',
            accessorKey: 'status',
            cell: (props) => (
                <div className="flex items-center space-x-2">
                    {props.row.original.status === 'Processed' ? (
                        <HiOutlineCheck className="text-emerald-500" />
                    ) : (
                        <HiOutlineClock className="text-amber-500" />
                    )}
                    <span>{props.row.original.status}</span>
                </div>
            ),
        },
        {
            header: 'Date',
            accessorKey: 'date',
        },
    ]

    return (
        <div className="space-y-4">
            <h4 className="text-2xl font-semibold">Upload Files</h4>

            <Card
                className={`border-2 border-dashed p-8 ${
                    isDragging ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div className="text-center">
                    <HiOutlineUpload className="mx-auto text-4xl text-gray-400" />
                    <h5 className="mt-2">Drag and drop files here</h5>
                    <p className="text-gray-500">
                        Supported formats: CSV, PDF, JPG, PNG
                    </p>
                    <Button
                        className="mt-4"
                        variant="solid"
                        icon={<HiOutlineUpload />}
                    >
                        Select Files
                    </Button>
                </div>
            </Card>

            <Card>
                <h5 className="mb-4">Uploaded Files</h5>
                <Table columns={columns} data={uploads} />
            </Card>
        </div>
    )
}

export default Upload 