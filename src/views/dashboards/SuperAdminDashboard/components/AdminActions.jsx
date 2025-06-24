import { useState } from 'react'
import { Card, Button, Badge, Dialog, Form, FormItem, Input, Select, Notification, toast } from '@/components/ui'
import { 
    HiShieldExclamation, HiLockClosed, HiEye, HiCurrencyDollar, 
    HiUsers, HiOfficeBuilding, HiExclamationCircle, HiCheckCircle 
} from 'react-icons/hi'

const AdminActions = ({ data = {} }) => {
    const [suspendDialogOpen, setSuspendDialogOpen] = useState(false)
    const [resetPasswordDialogOpen, setResetPasswordDialogOpen] = useState(false)
    const [selectedCompany, setSelectedCompany] = useState('')
    const [selectedUser, setSelectedUser] = useState('')

    const stats = {
        totalCompanies: data.totalCompanies || 0,
        activeUsers: data.activeUsers || 0,
        pendingIssues: data.pendingIssues || 0,
        monthlyRevenue: data.monthlyRevenue || 0,
        suspendedCompanies: data.suspendedCompanies || 0,
        disputedExpenses: data.disputedExpenses || 0,
    }

    const handleSuspendCompany = () => {
        // Handle company suspension logic
        toast.push(
            <Notification title="Success" type="success">
                Company suspended successfully
            </Notification>,
            { placement: 'top-center' }
        )
        setSuspendDialogOpen(false)
        setSelectedCompany('')
    }

    const handleResetPassword = () => {
        // Handle password reset logic
        toast.push(
            <Notification title="Success" type="success">
                Password reset email sent successfully
            </Notification>,
            { placement: 'top-center' }
        )
        setResetPasswordDialogOpen(false)
        setSelectedUser('')
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount)
    }

    return (
        <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <HiShieldExclamation className="text-xl text-indigo-600" />
                        <h3 className="text-lg font-semibold">Platform Overview</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <HiOfficeBuilding className="mx-auto text-2xl text-blue-600 mb-2" />
                            <div className="text-2xl font-bold text-blue-600">{stats.totalCompanies}</div>
                            <div className="text-sm text-gray-600">Total Companies</div>
                        </div>
                        
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                            <HiUsers className="mx-auto text-2xl text-green-600 mb-2" />
                            <div className="text-2xl font-bold text-green-600">{stats.activeUsers}</div>
                            <div className="text-sm text-gray-600">Active Users</div>
                        </div>
                        
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                            <HiCurrencyDollar className="mx-auto text-2xl text-purple-600 mb-2" />
                            <div className="text-2xl font-bold text-purple-600">{formatCurrency(stats.monthlyRevenue)}</div>
                            <div className="text-sm text-gray-600">Monthly Revenue</div>
                        </div>
                        
                        <div className="text-center p-4 bg-red-50 rounded-lg">
                            <HiExclamationCircle className="mx-auto text-2xl text-red-600 mb-2" />
                            <div className="text-2xl font-bold text-red-600">{stats.pendingIssues}</div>
                            <div className="text-sm text-gray-600">Pending Issues</div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Quick Actions */}
            <Card>
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <HiShieldExclamation className="text-xl text-red-600" />
                        <h3 className="text-lg font-semibold">Admin Actions</h3>
                    </div>
                    
                    <div className="space-y-4">
                        <Button
                            variant="solid"
                            color="red"
                            icon={<HiShieldExclamation />}
                            block
                            onClick={() => setSuspendDialogOpen(true)}
                        >
                            Suspend Company
                        </Button>
                        
                        <Button
                            variant="solid"
                            color="orange"
                            icon={<HiLockClosed />}
                            block
                            onClick={() => setResetPasswordDialogOpen(true)}
                        >
                            Reset User Password
                        </Button>
                        
                        <Button
                            variant="outline"
                            color="blue"
                            icon={<HiEye />}
                            block
                        >
                            View Billing Status
                        </Button>
                        
                        <Button
                            variant="outline"
                            color="green"
                            icon={<HiCheckCircle />}
                            block
                        >
                            System Health Check
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Alert Stats */}
            <Card>
                <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4">System Alerts</h3>
                    
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                            <div className="flex items-center gap-2">
                                <HiExclamationCircle className="text-red-600" />
                                <span className="text-sm">Suspended Companies</span>
                            </div>
                            <Badge className="bg-red-100 text-red-800">
                                {stats.suspendedCompanies}
                            </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                            <div className="flex items-center gap-2">
                                <HiCurrencyDollar className="text-orange-600" />
                                <span className="text-sm">Disputed Expenses</span>
                            </div>
                            <Badge className="bg-orange-100 text-orange-800">
                                {stats.disputedExpenses}
                            </Badge>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Suspend Company Dialog */}
            <Dialog isOpen={suspendDialogOpen} onClose={() => setSuspendDialogOpen(false)}>
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <HiShieldExclamation className="text-xl text-red-600" />
                        <h3 className="text-xl font-semibold">Suspend Company</h3>
                    </div>

                    <Form className="space-y-6">
                        <FormItem label="Select Company" required>
                            <Select 
                                value={selectedCompany}
                                onChange={setSelectedCompany}
                                placeholder="Choose company to suspend"
                            >
                                <option value="techcorp">TechCorp Inc.</option>
                                <option value="globalfleet">Global Fleet Solutions</option>
                                <option value="fleetmax">FleetMax Industries</option>
                            </Select>
                        </FormItem>

                        <FormItem label="Reason for Suspension" required>
                            <Select placeholder="Select reason">
                                <option value="payment">Payment Issues</option>
                                <option value="violation">Policy Violation</option>
                                <option value="request">Client Request</option>
                                <option value="other">Other</option>
                            </Select>
                        </FormItem>

                        <FormItem label="Additional Notes">
                            <Input.TextArea
                                placeholder="Enter additional details..."
                                rows={3}
                            />
                        </FormItem>

                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <Button variant="outline" onClick={() => setSuspendDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button variant="solid" color="red" onClick={handleSuspendCompany}>
                                Suspend Company
                            </Button>
                        </div>
                    </Form>
                </div>
            </Dialog>

            {/* Reset Password Dialog */}
            <Dialog isOpen={resetPasswordDialogOpen} onClose={() => setResetPasswordDialogOpen(false)}>
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <HiLockClosed className="text-xl text-orange-600" />
                        <h3 className="text-xl font-semibold">Reset User Password</h3>
                    </div>

                    <Form className="space-y-6">
                        <FormItem label="User Email" required>
                            <Input 
                                type="email"
                                value={selectedUser}
                                onChange={(e) => setSelectedUser(e.target.value)}
                                placeholder="Enter user email address"
                            />
                        </FormItem>

                        <FormItem label="Reset Method">
                            <Select defaultValue="email">
                                <option value="email">Send Reset Email</option>
                                <option value="temp">Generate Temporary Password</option>
                            </Select>
                        </FormItem>

                        <FormItem label="Reason">
                            <Input.TextArea
                                placeholder="Reason for password reset..."
                                rows={2}
                            />
                        </FormItem>

                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <Button variant="outline" onClick={() => setResetPasswordDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button variant="solid" color="orange" onClick={handleResetPassword}>
                                Reset Password
                            </Button>
                        </div>
                    </Form>
                </div>
            </Dialog>
        </div>
    )
}

export default AdminActions