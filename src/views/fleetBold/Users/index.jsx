import { Card, Button, Table, Dialog, Select, Input, Tooltip, Switcher } from '@/components/ui'
import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash, HiOutlineMail, HiOutlineUserAdd } from 'react-icons/hi'
import { useState } from 'react'

const mockUsers = [
    {
        id: 'USR001',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'Admin',
        status: 'Active',
        company: 'FleetBold Inc.',
    },
    {
        id: 'USR002',
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'Manager',
        status: 'Active',
        company: 'FleetBold Inc.',
    },
    {
        id: 'USR003',
        name: 'Mike Johnson',
        email: 'mike@example.com',
        role: 'Accountant',
        status: 'Invited',
        company: 'FleetBold Inc.',
    },
]

const roleOptions = [
    { value: 'Admin', label: 'Admin' },
    { value: 'Manager', label: 'Manager' },
    { value: 'Accountant', label: 'Accountant' },
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
    const [roleMatrixDialog, setRoleMatrixDialog] = useState(false)
    const [inviteDialog, setInviteDialog] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const [selectedRole, setSelectedRole] = useState('')
    const [inviteEmail, setInviteEmail] = useState('')
    const [inviteRole, setInviteRole] = useState('')
    const [rolePermissions, setRolePermissions] = useState(defaultRolePermissions)
    const [activeTab, setActiveTab] = useState('users')

    const handleView = (user) => {
        setSelectedUser(user)
        setViewDialog(true)
    }

    const handleEdit = (user) => {
        setSelectedUser(user)
        setSelectedRole(user.role)
        setEditDialog(true)
    }

    const handleRemove = (user) => {
        // In a real app, this would show a confirmation dialog and remove the user
        console.log('Remove user:', user)
    }

    const handleResendInvite = (user) => {
        // In a real app, this would resend the invitation
        console.log('Resend invite to:', user.email)
    }

    const handleRoleChange = () => {
        // In a real app, this would update the user's role
        setEditDialog(false)
    }

    const handleInviteUser = () => {
        // In a real app, this would send an invitation
        console.log('Invite user:', inviteEmail, 'as', inviteRole)
        setInviteDialog(false)
        setInviteEmail('')
        setInviteRole('')
    }

    const handlePermissionChange = (role, module, permission, value) => {
        setRolePermissions(prev => ({
            ...prev,
            [role]: {
                ...prev[role],
                [module]: {
                    ...prev[role][module],
                    [permission]: value
                }
            }
        }))
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
        return status === 'Active' 
            ? 'text-green-600' 
            : 'text-yellow-600'
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
                <span className={getRoleBadgeColor(row.role)}>
                    {row.role}
                </span>
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
                    {row.status === 'Invited' && (
                        <Tooltip title="Resend Invitation">
                            <Button
                                size="sm"
                                variant="twoTone"
                                icon={<HiOutlineMail />}
                                onClick={() => handleResendInvite(row)}
                            />
                        </Tooltip>
                    )}
                    <Tooltip title="Remove User">
                        <Button
                            size="sm"
                            variant="twoTone"
                            icon={<HiOutlineTrash />}
                            onClick={() => handleRemove(row)}
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
                <div className="flex space-x-2">
                    <Button 
                        variant="solid" 
                        icon={<HiOutlineUserAdd />}
                        onClick={() => setInviteDialog(true)}
                    >
                        Invite User
                    </Button>
                    <Button 
                        variant="twoTone"
                        onClick={() => setRoleMatrixDialog(true)}
                    >
                        Manage Permissions
                    </Button>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`py-2 px-1 border-b-2 font-medium text-sm ${
                            activeTab === 'users'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
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
                        {mockUsers.map((user) => (
                            <Table.Tr key={user.id}>
                                {columns.map((column) => (
                                    <Table.Td key={column.accessor}>
                                        {column.Cell ? 
                                            column.Cell({ row: user }) : 
                                            user[column.accessor]
                                        }
                                    </Table.Td>
                                ))}
                            </Table.Tr>
                        ))}
                    </Table.TBody>
                </Table>

                {mockUsers.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No users found
                    </div>
                )}
            </Card>

            {/* Invite User Dialog */}
            <Dialog
                isOpen={inviteDialog}
                onClose={() => setInviteDialog(false)}
                title="Invite New User"
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <Input
                            type="email"
                            placeholder="Enter email address"
                            value={inviteEmail}
                            onChange={(e) => setInviteEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Role
                        </label>
                        <Select
                            placeholder="Select role"
                            options={roleOptions}
                            value={inviteRole}
                            onChange={(value) => setInviteRole(value)}
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button
                            variant="plain"
                            onClick={() => setInviteDialog(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="solid"
                            onClick={handleInviteUser}
                            disabled={!inviteEmail || !inviteRole}
                        >
                            Send Invitation
                        </Button>
                    </div>
                </div>
            </Dialog>

            {/* View User Dialog */}
            <Dialog
                isOpen={viewDialog}
                onClose={() => setViewDialog(false)}
                title="User Details"
            >
                {selectedUser && (
                    <div className="space-y-4">
                        <div>
                            <h6 className="font-medium text-gray-700">Name</h6>
                            <p className="text-gray-900">{selectedUser.name}</p>
                        </div>
                        <div>
                            <h6 className="font-medium text-gray-700">Email</h6>
                            <p className="text-gray-900">{selectedUser.email}</p>
                        </div>
                        <div>
                            <h6 className="font-medium text-gray-700">Role</h6>
                            <span className={getRoleBadgeColor(selectedUser.role)}>
                                {selectedUser.role}
                            </span>
                        </div>
                        <div>
                            <h6 className="font-medium text-gray-700">Status</h6>
                            <span className={getStatusBadgeColor(selectedUser.status)}>
                                {selectedUser.status}
                            </span>
                        </div>
                        <div>
                            <h6 className="font-medium text-gray-700">Company</h6>
                            <p className="text-gray-900">{selectedUser.company}</p>
                        </div>
                    </div>
                )}
            </Dialog>

            {/* Edit User Dialog */}
            <Dialog
                isOpen={editDialog}
                onClose={() => setEditDialog(false)}
                title="Edit User Role"
            >
                {selectedUser && (
                    <div className="space-y-4">
                        <div>
                            <h6 className="font-medium text-gray-700">User</h6>
                            <p className="text-gray-900">{selectedUser.name}</p>
                        </div>
                        <div>
                            <h6 className="font-medium text-gray-700">Current Role</h6>
                            <span className={getRoleBadgeColor(selectedUser.role)}>
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
                                onClick={handleRoleChange}
                            >
                                Update Role
                            </Button>
                        </div>
                    </div>
                )}
            </Dialog>

            {/* Role Matrix Dialog */}
            <Dialog
                isOpen={roleMatrixDialog}
                onClose={() => setRoleMatrixDialog(false)}
                title="Role Permissions Matrix"
                width={900}
            >
                <div className="flex flex-col h-full max-h-[80vh]">
                    {/* Header */}
                    <div className="flex-shrink-0 pb-4 border-b border-gray-200">
                        <p className="text-sm text-gray-600">
                            Configure permissions for each role across different modules.
                        </p>
                    </div>
                    
                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto py-4 space-y-6 max-h-[60vh]">
                        {roleOptions.map((role) => (
                            <Card key={role.value} className="p-4 flex-shrink-0">
                                <h5 className="text-lg font-semibold mb-4 flex items-center sticky top-0 bg-white z-10 pb-2">
                                    <span className={getRoleBadgeColor(role.value)}>
                                        {role.label}
                                    </span>
                                    <span className="ml-2">Permissions</span>
                                </h5>
                                
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse min-w-[600px]">
                                        <thead>
                                            <tr className="border-b bg-gray-50">
                                                <th className="text-left p-3 font-medium text-gray-700 min-w-[150px]">Module</th>
                                                {permissions.map((permission) => (
                                                    <th key={permission} className="text-center p-3 font-medium text-gray-700 min-w-[80px]">
                                                        <Tooltip title={`${permission} permission allows users to ${permission.toLowerCase()} data in this module`}>
                                                            <div className="cursor-help">{permission}</div>
                                                        </Tooltip>
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {modules.map((module, index) => (
                                                <tr key={module.id} className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'} hover:bg-blue-25 transition-colors`}>
                                                    <td className="p-3 font-medium text-gray-900">{module.name}</td>
                                                    {permissions.map((permission) => (
                                                        <td key={permission} className="text-center p-3">
                                                            <div className="flex justify-center">
                                                                <Switcher
                                                                    checked={rolePermissions[role.value]?.[module.id]?.[permission] || false}
                                                                    onChange={(checked) => 
                                                                        handlePermissionChange(role.value, module.id, permission, checked)
                                                                    }
                                                                />
                                                            </div>
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Card>
                        ))}
                    </div>
                    
                    {/* Footer */}
                    <div className="flex-shrink-0 pt-4 border-t border-gray-200">
                        <div className="flex justify-end space-x-2">
                            <Button
                                variant="plain"
                                onClick={() => setRoleMatrixDialog(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="solid"
                                onClick={() => setRoleMatrixDialog(false)}
                            >
                                Save Permissions
                            </Button>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default Users 