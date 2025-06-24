import { Card, Button, Input, Upload, Switcher, Select } from '@/components/ui'
import { HiOutlineUpload, HiOutlineSave } from 'react-icons/hi'
import { useState } from 'react'

const Settings = () => {
    const [companyInfo, setCompanyInfo] = useState({
        name: 'FleetBold Inc.',
        logo: null,
    })

    const [providerSettings, setProviderSettings] = useState({
        maxInvoiceDays: 30,
        defaultInvoiceExpiration: 30,
        allowCombinedInvoice: true,
    })

    const [notifications, setNotifications] = useState({
        invoiceReminders: true,
        frequency: 'Weekly',
        email: true,
        sms: false,
    })

    const handleCompanyInfoChange = (field, value) => {
        setCompanyInfo((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleProviderSettingsChange = (field, value) => {
        setProviderSettings((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleNotificationChange = (field, value) => {
        setNotifications((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSave = () => {
        // In a real app, this would save the settings
        console.log('Saving settings:', { companyInfo, providerSettings, notifications })
    }

    const frequencyOptions = [
        { value: 'Daily', label: 'Daily' },
        { value: 'Weekly', label: 'Weekly' },
        { value: 'Monthly', label: 'Monthly' },
    ]

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h4 className="text-2xl font-semibold">Company Settings</h4>
                <Button
                    variant="solid"
                    icon={<HiOutlineSave />}
                    onClick={handleSave}
                >
                    Save Changes
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                    <h5 className="mb-4">Company Profile</h5>
                    <div className="space-y-4">
                        <div>
                            <h6>Company Name</h6>
                            <Input
                                value={companyInfo.name}
                                onChange={(e) =>
                                    handleCompanyInfoChange('name', e.target.value)
                                }
                            />
                        </div>
                        <div>
                            <h6>Company Logo</h6>
                            <div className="mt-2">
                                <Upload
                                    className="w-full"
                                    accept="image/*"
                                    onChange={(files) => {
                                        if (files.length > 0) {
                                            handleCompanyInfoChange('logo', files[0])
                                        }
                                    }}
                                >
                                    <div className="flex items-center justify-center p-4 border-2 border-dashed rounded-lg">
                                        <HiOutlineUpload className="text-2xl text-gray-400" />
                                        <span className="ml-2">Upload Logo</span>
                                    </div>
                                </Upload>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card>
                    <h5 className="mb-4">Provider Settings</h5>
                    <div className="space-y-4">
                        <div>
                            <h6>Max Invoice Days</h6>
                            <p className="text-sm text-gray-500 mb-2">Maximum number of days allowed to submit an invoice per provider</p>
                            <Input
                                type="number"
                                value={providerSettings.maxInvoiceDays}
                                onChange={(e) =>
                                    handleProviderSettingsChange('maxInvoiceDays', parseInt(e.target.value))
                                }
                                min="1"
                                max="365"
                            />
                        </div>
                        <div>
                            <h6>Default Invoice Expiration</h6>
                            <p className="text-sm text-gray-500 mb-2">Days after submission when invoices expire by default</p>
                            <Input
                                type="number"
                                value={providerSettings.defaultInvoiceExpiration}
                                onChange={(e) =>
                                    handleProviderSettingsChange('defaultInvoiceExpiration', parseInt(e.target.value))
                                }
                                min="1"
                                max="365"
                            />
                        </div>
                        <div>
                            <h6>Allow Combined Invoice</h6>
                            <p className="text-sm text-gray-500 mb-2">Enable combining multiple expense types into a single invoice (only for supported providers)</p>
                            <div className="flex items-center mt-2">
                                <Switcher
                                    checked={providerSettings.allowCombinedInvoice}
                                    onChange={(checked) =>
                                        handleProviderSettingsChange('allowCombinedInvoice', checked)
                                    }
                                />
                                <span className="ml-2">
                                    {providerSettings.allowCombinedInvoice ? 'Enabled' : 'Disabled'}
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            <Card>
                <h5 className="mb-4">Notifications</h5>
                <div className="space-y-4">
                    <div>
                        <h6>Invoice Expiration Reminders</h6>
                        <div className="flex items-center mt-2">
                            <Switcher
                                checked={notifications.invoiceReminders}
                                onChange={(checked) =>
                                    handleNotificationChange('invoiceReminders', checked)
                                }
                            />
                            <span className="ml-2">
                                {notifications.invoiceReminders ? 'Enabled' : 'Disabled'}
                            </span>
                        </div>
                    </div>
                    
                    {notifications.invoiceReminders && (
                        <>
                            <div>
                                <h6>Reminder</h6>
                                <Select
                                    value={frequencyOptions.find(option => option.value === notifications.frequency)}
                                    options={frequencyOptions}
                                    onChange={(option) =>
                                        handleNotificationChange('frequency', option.value)
                                    }
                                />
                            </div>
                            
                            <div>
                                <h6>Delivery Method</h6>
                                <div className="space-y-2 mt-2">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={notifications.email}
                                            onChange={(e) =>
                                                handleNotificationChange('email', e.target.checked)
                                            }
                                            className="mr-2"
                                        />
                                        <span>Email</span>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={notifications.sms}
                                            onChange={(e) =>
                                                handleNotificationChange('sms', e.target.checked)
                                            }
                                            className="mr-2"
                                        />
                                        <span>SMS</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </Card>
        </div>
    )
}

export default Settings 