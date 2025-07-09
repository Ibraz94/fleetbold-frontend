import {
    Card,
    Button,
    Table,
    Dialog,
    Select,
    Input,
    Tooltip,
    Switcher,
    Pagination,
} from '@/components/ui'
import {
    HiOutlineEye,
    HiOutlinePencil,
    HiOutlineTrash,
    HiOutlineMail,
    HiOutlineUserAdd,
} from 'react-icons/hi'
import { useEffect, useState } from 'react'
import {
    apiDeleteuser,
    apiEditRole,
    apiFetchUsers,
    apiSendInvitation,
} from '@/services/UserService'
import { toast } from '@/components/ui/toast'

// const mockUsers = [
//     {
//         id: 'USR001',
//         name: 'John Doe',
//         email: 'john@example.com',
//         role: 'Admin',
//         status: 'Active',
//         company: 'FleetBold Inc.',
//     },
//     {
//         id: 'USR002',
//         name: 'Jane Smith',
//         email: 'jane@example.com',
//         role: 'Manager',
//         status: 'Active',
//         company: 'FleetBold Inc.',
//     },
//     {
//         id: 'USR003',
//         name: 'Mike Johnson',
//         email: 'mike@example.com',
//         role: 'Accountant',
//         status: 'Invited',
//         company: 'FleetBold Inc.',
//     },
// ]

const roleOptions = [
    { value: 'admin', label: 'admin' },
    { value: 'manager', label: 'manager' },
    { value: 'accountant', label: 'accountant' },
]

const modules = [
    { id: 'dashboard', name: 'Dashboard' },
    { id: 'vehicles', name: 'Vehicle Management' },
    { id: 'drivers', name: 'Driver Management' },
    { id: 'maintenance', name: 'Maintenance' },
    { id: 'fuel', name: 'Fuel Management' },
    { id: 'reports', name: 'Reports' },
    { id: 'settings', name: 'Settings' },
]

const permissions = ['View', 'Edit', 'Export', 'Assign']

const defaultRolePermissions = {
    Admin: {
        dashboard: { View: true, Edit: true, Export: true, Assign: true },
        vehicles: { View: true, Edit: true, Export: true, Assign: true },
        drivers: { View: true, Edit: true, Export: true, Assign: true },
        maintenance: { View: true, Edit: true, Export: true, Assign: true },
        fuel: { View: true, Edit: true, Export: true, Assign: true },
        reports: { View: true, Edit: true, Export: true, Assign: true },
        settings: { View: true, Edit: true, Export: true, Assign: true },
    },
    Manager: {
        dashboard: { View: true, Edit: false, Export: true, Assign: false },
        vehicles: { View: true, Edit: true, Export: true, Assign: true },
        drivers: { View: true, Edit: true, Export: true, Assign: true },
        maintenance: { View: true, Edit: true, Export: true, Assign: false },
        fuel: { View: true, Edit: true, Export: true, Assign: false },
        reports: { View: true, Edit: false, Export: true, Assign: false },
        settings: { View: false, Edit: false, Export: false, Assign: false },
    },
    Accountant: {
        dashboard: { View: true, Edit: false, Export: true, Assign: false },
        vehicles: { View: true, Edit: false, Export: true, Assign: false },
        drivers: { View: true, Edit: false, Export: true, Assign: false },
        maintenance: { View: true, Edit: false, Export: true, Assign: false },
        fuel: { View: true, Edit: true, Export: true, Assign: false },
        reports: { View: true, Edit: false, Export: true, Assign: false },
        settings: { View: false, Edit: false, Export: false, Assign: false },
    },
}

const Users = () => {
    const [viewDialog, setViewDialog] = useState(false)
    const [editDialog, setEditDialog] = useState(false)
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [roleMatrixDialog, setRoleMatrixDialog] = useState(false)
    const [inviteDialog, setInviteDialog] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const [selectedRole, setSelectedRole] = useState('')
    const [inviteEmail, setInviteEmail] = useState('')
    const [inviteRole, setInviteRole] = useState('')
    const [rolePermissions, setRolePermissions] = useState(
        defaultRolePermissions,
    )
    const [activeTab, setActiveTab] = useState('users')
    const [usersData, setusersData] = useState([])
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    })

    const fetchUsers = async (page = 1, pageSize = 10) => {
        try {
            const response = await apiFetchUsers({
                page,
                per_page: pageSize,
            })
            console.log('Users response:', response) // Debug log
            setusersData(response.users)
            setPagination((prev) => ({
                ...prev,
                current: page,
                total: response.pagination?.total || 0,
            }))
        } catch (error) {
            console.error('Error fetching vehicles:', error)
            toast.push(
                error.response?.data?.message || 'Failed to fetch vehicles',
                {
                    placement: 'top-end',
                    type: 'error',
                },
            )
        }
    }
    useEffect(() => {
        fetchUsers()
    }, [])

    const handlePageChange = (page) => {
        usersData(page, pagination.pageSize)
    }

    const handleView = (user) => {
        setSelectedUser(user)
        setViewDialog(true)
    }

    const handleEdit = (user) => {
        setSelectedUser(user)
        setSelectedRole(user.role)
        setEditDialog(true)
    }

    const handleRemove = async (user) => {
        // In a real app, this would show a confirmation dialog and remove the user
        try {
            const { id } = user;
            await apiDeleteuser(id)
            console.log("ID:");
            toast.push('User deleted successfully!', {
                placement: 'top-end',
                type: 'success',
            })
            setDeleteDialog(false);
            fetchUsers(pagination.current, pagination.pageSize)
        } catch (error) {
            console.error("Error deleting user ", error)
            toast.push(
                error.response?.data?.message ||
                'Failed to delete user. Please try again.',
                {
                    placement: 'top-end',
                    type: 'error',
                },
            )
        }
        console.log('Remove user:', user)
    }

    const handleRoleChange = async (selectedUser, role) => {
        // In a real app, this would update the user's role
        try {
            const { id } = selectedUser
            await apiEditRole(id, role)

            toast.push('Role updated successfully!', {
                placement: 'top-end',
                type: 'success',
            });
        } catch (error) {
            console.error("Error updating user's role ", error)
            toast.push(
                error.response?.data?.message ||
                'Failed to update users role. Please try again.',
                {
                    placement: 'top-end',
                    type: 'error',
                },
            )
        }
        setEditDialog(false)
    }

    const getRoleBadgeColor = (role) => {
        switch (role) {
            case 'Admin':
                return 'text-blue-600'
            case 'Manager':
                return 'text-orange-600'
            case 'Accountant':
                return 'text-green-600'
            default:
                return 'text-gray-600'
        }
    }

    const getStatusBadgeColor = (status) => {
        return status === 'Active' ? 'text-green-600' : 'text-yellow-600'
    }

    const columns = [
        {
            header: 'Name',
            accessor: 'name',
        },
        {
            header: 'Email',
            accessor: 'email',
        },
        {
            header: 'Company',
            accessor: 'company',
        },
        {
            header: 'Role',
            accessor: 'role',
            Cell: ({ row }) => (
                <span className={getRoleBadgeColor(row.role)}>{row.role}</span>
            ),
        },
        {
            header: 'Status',
            accessor: 'status',
            Cell: ({ row }) => (
                <span className={getStatusBadgeColor(row.status)}>
                    {row.status}
                </span>
            ),
        },
        {
            header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => (
                <div className="flex space-x-2">
                    <Tooltip title="View Details">
                        <Button
                            size="sm"
                            variant="twoTone"
                            icon={<HiOutlineEye />}
                            onClick={() => handleView(row)}
                        />
                    </Tooltip>
                    <Tooltip title="Edit Role">
                        <Button
                            size="sm"
                            variant="twoTone"
                            icon={<HiOutlinePencil />}
                            onClick={() => handleEdit(row)}
                        />
                    </Tooltip>
                    <Tooltip title="Remove User">
                        <Button
                            size="sm"
                            variant="twoTone"
                            icon={<HiOutlineTrash />}
                            onClick={() => {
                                setDeleteDialog(true)
                                setSelectedUser(row)
                            }}
                        />
                    </Tooltip>
                </div>
            ),
        },
    ]

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h4 className="text-2xl font-semibold">User Management</h4>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                    <button
                        className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'users'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        onClick={() => setActiveTab('users')}
                    >
                        Users
                    </button>
                </nav>
            </div>

            {/* User List */}
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
                        {usersData.map((user) => (
                            <Table.Tr key={user.id || user.id + user.name}>
                                {columns.map((column) => (
                                    <Table.Td key={column.accessor}>
                                        {column.Cell
                                            ? column.Cell({ row: user })
                                            : user[column.accessor]}
                                    </Table.Td>
                                ))}
                            </Table.Tr>
                        ))}
                    </Table.TBody>
                </Table>

                {usersData.length > 0 && (
                    <div className="mt-4 flex justify-end">
                        <Pagination
                            total={pagination.total}
                            pageSize={pagination.pageSize}
                            current={pagination.current}
                            onChange={handlePageChange}
                        />
                    </div>
                )}

                {usersData.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No users found
                    </div>
                )}
            </Card>

            {/* View User Dialog */}
            <Dialog
                isOpen={viewDialog}
                title="User Details"
                onClose={() => setViewDialog(false)}
            >
                {usersData && (
                    <div className="space-y-4">
                        <div>
                            <h6 className="font-medium text-gray-700">Name</h6>
                            <p className="text-gray-900">{usersData.name}</p>
                        </div>
                        <div>
                            <h6 className="font-medium text-gray-700">Email</h6>
                            <p className="text-gray-900">{usersData.email}</p>
                        </div>
                        <div>
                            <h6 className="font-medium text-gray-700">Role</h6>
                            <span className={getRoleBadgeColor(usersData.role)}>
                                {usersData.role}
                            </span>
                        </div>
                        <div>
                            <h6 className="font-medium text-gray-700">
                                Status
                            </h6>
                            <span
                                className={getStatusBadgeColor(
                                    usersData.status,
                                )}
                            >
                                {usersData.status}
                            </span>
                        </div>
                        <div>
                            <h6 className="font-medium text-gray-700">
                                Company
                            </h6>
                            <p className="text-gray-900">{usersData.company}</p>
                        </div>
                    </div>
                )}
            </Dialog>

            {/* Edit User Dialog */}
            <Dialog
                isOpen={editDialog}
                title="Edit User Role"
                onClose={() => setEditDialog(false)}
            >
                {selectedUser && (
                    <div className="space-y-4">
                        <div>
                            <h6 className="font-medium text-gray-700">User</h6>
                            <p className="text-gray-900">{selectedUser.name}</p>
                        </div>
                        <div>
                            <h6 className="font-medium text-gray-700">
                                Current Role
                            </h6>
                            <span
                                className={getRoleBadgeColor(selectedUser.role)}
                            >
                                {selectedUser.role}
                            </span>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                New Role
                            </label>
                            <Select
                                options={roleOptions}
                                value={selectedRole}
                                onChange={(value) => setSelectedRole(value)}
                            />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <Button
                                variant="plain"
                                onClick={() => setEditDialog(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="solid"
                                onClick={() =>
                                    handleRoleChange(selectedUser, selectedRole)
                                }
                            >
                                Update Role
                            </Button>
                        </div>
                    </div>
                )}
            </Dialog>

            {/* Delete User dialog */}
            <Dialog
                isOpen={deleteDialog}
                title="Remove User"
                onClose={() => setDeleteDialog(false)}
            >
                {selectedUser && (
                    <div className="space-y-4">
                        <p>Are you sure you want to delete this user?</p>
                        <div className="flex justify-center space-x-2">
                            <Button
                                variant="outline"
                                className="border-gray-300 text-gray-700 hover:bg-gray-100"
                                onClick={() => setDeleteDialog(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="solid"
                                className="bg-red-600 hover:bg-red-500 text-white"
                                onClick={() => handleRemove(selectedUser)}
                            >
                                Delete
                            </Button>
                        </div>

                    </div>
                )}
            </Dialog>
        </div>
    )
}

export default Users
