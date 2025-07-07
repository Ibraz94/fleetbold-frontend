import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Card, Button, Input, Select, Tabs } from '@/components/ui'
import { Form } from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import { HiOutlineArrowLeft, HiOutlineCheck } from 'react-icons/hi'
import { apiCreateVehicle } from '@/services/vehiclesServices'
import { toast } from '@/components/ui/toast'

const { TabNav, TabList, TabContent } = Tabs

const AddCompany = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        // Basic Information
        name: '',
        email: '',
        phone: '',
        title: '',
        country: '',
        city: '',
        state: '',
        street: '',
        facebook: '',
        instagram: '',
        linkedin: '',
        twitter: '',
        Currency: '',
        postalCode: '',
        website: '',
    })

    const [activeTab, setActiveTab] = useState('basic')

    const handleInputChange = (field) => (e) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        
        try {
            // Prepare the data for API call
            const vehicleData = {
                ...formData,
                // Convert date strings to proper date format if needed
                registration_expires_at: formData.registration_expires_at ? new Date(formData.registration_expires_at).toISOString() : null,
                insurance_expires_at: formData.insurance_expires_at ? new Date(formData.insurance_expires_at).toISOString() : null,
                purchase_date: formData.purchase_date ? new Date(formData.purchase_date).toISOString() : null,
                last_service_date: formData.last_service_date ? new Date(formData.last_service_date).toISOString() : null,
                next_service_due_date: formData.next_service_due_date ? new Date(formData.next_service_due_date).toISOString() : null,
                // Convert numeric fields
                year: formData.year ? parseInt(formData.year) : null,
                fuel_capacity: formData.fuel_capacity ? parseFloat(formData.fuel_capacity) : null,
                seating_capacity: formData.seating_capacity ? parseInt(formData.seating_capacity) : null,
                mileage: formData.mileage ? parseInt(formData.mileage) : null,
                insurance_monthly_cost: formData.insurance_monthly_cost ? parseFloat(formData.insurance_monthly_cost) : null,
                purchase_price: formData.purchase_price ? parseFloat(formData.purchase_price) : null,
                current_value: formData.current_value ? parseFloat(formData.current_value) : null,
                loan_balance: formData.loan_balance ? parseFloat(formData.loan_balance) : null,
                loan_monthly_payment: formData.loan_monthly_payment ? parseFloat(formData.loan_monthly_payment) : null,
                daily_rental_rate: formData.daily_rental_rate ? parseFloat(formData.daily_rental_rate) : null,
                weekly_rental_rate: formData.weekly_rental_rate ? parseFloat(formData.weekly_rental_rate) : null,
                monthly_rental_rate: formData.monthly_rental_rate ? parseFloat(formData.monthly_rental_rate) : null,
                security_deposit: formData.security_deposit ? parseFloat(formData.security_deposit) : null,
                last_service_mileage: formData.last_service_mileage ? parseInt(formData.last_service_mileage) : null,
                next_service_due_mileage: formData.next_service_due_mileage ? parseInt(formData.next_service_due_mileage) : null,
                // Parse JSON fields if they contain data
                other_platform_ids: formData.other_platform_ids ? JSON.parse(formData.other_platform_ids || '{}') : {},
                vehicle_features: formData.vehicle_features ? JSON.parse(formData.vehicle_features || '{}') : {},
            }

            await apiCreateVehicle(vehicleData)
            
            toast.push('Vehicle created successfully!', {
                placement: 'top-end',
                type: 'success'
            })
            
        // Navigate back to vehicles list after successful creation
        navigate('/fleetbold/vehicles')
        } catch (error) {
            console.error('Error creating vehicle:', error)
            toast.push(error.response?.data?.message || 'Failed to create vehicle. Please try again.', {
                placement: 'top-end',
                type: 'error'
            })
        } finally {
            setLoading(false)
        }
    }

    const handleBack = () => {
        navigate('/fleetbold/vehicles')
    }

    const businessTypeOptions = [
        { value: 'sedan', label: 'Sedan' },
        { value: 'suv', label: 'SUV' },
        { value: 'truck', label: 'Truck' },
        { value: 'van', label: 'Van' },
        { value: 'coupe', label: 'Coupe' },
        { value: 'hatchback', label: 'Hatchback' },
        { value: 'convertible', label: 'Convertible' },
        { value: 'wagon', label: 'Wagon' }
    ]
    const currencyTypeOptions = [
        { value: 'usd', label: 'USD' },
        { value: 'pkr', label: 'PKR' },
    ]

    return (
        <Container>
            <div className="mb-6">
                <div className="mb-4 flex items-center gap-3">
                    <Button
                        variant="plain"
                        size="sm"
                        icon={<HiOutlineArrowLeft />}
                        onClick={handleBack}
                    >
                        Back
                    </Button>
                    <h4 className="text-2xl font-semibold">Add New Vehicle</h4>
                </div>
            </div>

            <Form onSubmit={handleSubmit}>
                <Card>
                    <Tabs value={activeTab} onChange={setActiveTab}>
                        <TabList>
                            <TabNav value="basic">Company Information</TabNav>
                        </TabList>

                        <div className="mt-6">
                            <TabContent value="basic">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="license_plate" className="text-sm font-medium">Name</label>

                                        <Input
                                            placeholder="Enter license plate"
                                            value={formData.name}
                                            onChange={handleInputChange('name')}
                                            required
                                        />

                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="vin" className="text-sm font-medium">Email</label>
                                        <Input
                                            placeholder="Enter VIN number"
                                            value={formData.email}
                                            onChange={handleInputChange('email')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="make" className="text-sm font-medium">Phone Number</label>
                                        <Input
                                            placeholder="e.g. Toyota, Honda, Ford"
                                            value={formData.phone}
                                            onChange={handleInputChange('phone')}
                                        />
                                    </div>

                                   <div className="flex flex-col gap-2">
                                        <label htmlFor="business_type" className="text-sm font-medium">Business Type</label>
                                        <Select
                                            placeholder="Select Business type"
                                            options={businessTypeOptions}
                                            value={businessTypeOptions.find(option => option.value === formData.business_type)}
                                            onChange={(option) => setFormData(prev => ({ ...prev, business_type: option?.value || '' }))}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="title" className="text-sm font-medium">Title</label>
                                        <Input
                                            placeholder="e.g. Camry, Accord, Focus"
                                            value={formData.title}
                                            onChange={handleInputChange('title')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="country" className="text-sm font-medium">Country</label>
                                        <Input
                                            type="text"
                                            placeholder="e.g. 2023"
                                            value={formData.country}
                                            onChange={handleInputChange('country')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="city" className="text-sm font-medium">City</label>
                                        <Input
                                            placeholder=""
                                            value={formData.city}
                                            onChange={handleInputChange('city')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="state" className="text-sm font-medium">State</label>
                                        <Input
                                            placeholder=""
                                            value={formData.state}
                                            onChange={handleInputChange('state')}
                                        />
                                    </div>
                                                                        <div className="flex flex-col gap-2">
                                        <label htmlFor="street" className="text-sm font-medium">Street Address</label>
                                        <Input
                                            placeholder=""
                                            value={formData.street}
                                            onChange={handleInputChange('street')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="postalCode" className="text-sm font-medium">Postal Code</label>
                                        <Input
                                            placeholder=""
                                            type="number"
                                            value={formData.postalCode}
                                            onChange={handleInputChange('postalCode')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="website" className="text-sm font-medium">website</label>
                                        <Input
                                            placeholder=""
                                            value={formData.webiste}
                                            onChange={handleInputChange('website')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="facebook" className="text-sm font-medium">Facebook</label>
                                        <Input
                                            placeholder=""
                                            value={formData.facebook}
                                            onChange={handleInputChange('facebook')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="instagram" className="text-sm font-medium">Instagram</label>
                                        <Input
                                            placeholder=""
                                            value={formData.instagram}
                                            onChange={handleInputChange('instagram')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="linkedin" className="text-sm font-medium">Linkedin</label>
                                        <Input
                                            placeholder=""
                                            value={formData.linkedin}
                                            onChange={handleInputChange('linkedin')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="twitter" className="text-sm font-medium">Twitter</label>
                                        <Input
                                            placeholder=""
                                            value={formData.twitter}
                                            onChange={handleInputChange('twitter')}
                                        />
                                    </div>
                                                                       <div className="flex flex-col gap-2">
                                        <label htmlFor="currency" className="text-sm font-medium">Currency</label>
                                        <Select
                                            placeholder="Select Currency type"
                                            options={currencyTypeOptions}
                                            value={currencyTypeOptions.find(option => option.value === formData.Currency)}
                                            onChange={(option) => setFormData(prev => ({ ...prev, Currency: option?.value || '' }))}
                                        />
                                    </div>

                                </div>
                            </TabContent>

                        </div>
                    </Tabs>
                </Card>

                <div className="mt-6 flex justify-end gap-3">
                    <Button variant="plain" onClick={handleBack} disabled={loading}>
                        Cancel
                    </Button>
                    <Button
                        variant="solid"
                        type="submit"
                        icon={<HiOutlineCheck />}
                        loading={loading}
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Add Vehicle'}
                    </Button>
                </div>
            </Form>
        </Container>
    )
}

export default AddCompany 