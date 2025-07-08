import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Card, Button, Input, Select, DatePicker, Checkbox, Tabs } from '@/components/ui'
import { Form } from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import { HiOutlineArrowLeft, HiOutlineCheck } from 'react-icons/hi'
import { apiCreateVehicle } from '@/services/vehiclesServices'
import { toast } from '@/components/ui/toast'
// import { label } from 'yet-another-react-lightbox/*'

const { TabNav, TabList, TabContent } = Tabs

const AddVehicle = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        // Basic Information
        license_plate: '',
        vin: '',
        make: '',
        model: '',
        year: '',
        color: '',
        vehicle_type: '',
        status: '',
        maintenance: 0,

        // Technical Specifications
        engine_type: '',
        transmission_type: '',
        fuel_capacity: '',
        seating_capacity: '',
        mileage: '',

        // Registration & Legal
        registration_number: '',
        registration_expires_at: '',
        state_registered: '',
        title_status: '',

        // Insurance Information
        insurance_company: '',
        insurance_policy_number: '',
        insurance_expires_at: '',
        insurance_monthly_cost: '',

        // Purchase/Acquisition Information
        purchase_date: '',
        purchase_price: '',
        current_value: '',
        loan_balance: '',
        loan_monthly_payment: '',

        // Operational Status
        is_available_for_rental: true,
        current_location: '',

        // Maintenance & Service
        last_service_date: '',
        last_service_mileage: '',
        next_service_due_date: '',
        next_service_due_mileage: '',

        // Platform Integration
        turo_listing_id: '',
        getaround_listing_id: '',
        other_platform_ids: '',

        // Financial Tracking
        daily_rental_rate: '',
        weekly_rental_rate: '',
        monthly_rental_rate: '',
        security_deposit: '',

        // Additional data
        vehicle_features: '',
        notes: ''
    })

    const [activeTab, setActiveTab] = useState('basic')

    const handleInputChange = (field) => (e) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }))
    }

    const handleCheckboxChange = (field) => (checked) => {
        setFormData(prev => ({
            ...prev,
            [field]: checked
        }))
    }

    const handleDateChange = (field) => (date) => {
        setFormData(prev => ({
            ...prev,
            [field]: date
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
                status: formData.status ? formData.status : '',
                maintenance: formData.maintenance ? formData.maintenance : 0
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

    const vehicleTypeOptions = [
        { value: 'sedan', label: 'Sedan' },
        { value: 'suv', label: 'SUV' },
        { value: 'truck', label: 'Truck' },
        { value: 'van', label: 'Van' },
        { value: 'coupe', label: 'Coupe' },
        { value: 'hatchback', label: 'Hatchback' },
        { value: 'convertible', label: 'Convertible' },
        { value: 'wagon', label: 'Wagon' }
    ]

    const engineTypeOptions = [
        { value: 'gasoline', label: 'Gasoline' },
        { value: 'diesel', label: 'Diesel' },
        { value: 'hybrid', label: 'Hybrid' },
        { value: 'electric', label: 'Electric' },
        { value: 'plug-in-hybrid', label: 'Plug-in Hybrid' }
    ]

    const transmissionTypeOptions = [
        { value: 'manual', label: 'Manual' },
        { value: 'automatic', label: 'Automatic' },
        { value: 'cvt', label: 'CVT' }
    ]

    const titleStatusOptions = [
        { value: 'clean', label: 'Clean' },
        { value: 'lien', label: 'Lien' },
        { value: 'salvage', label: 'Salvage' },
        { value: 'flood', label: 'Flood' },
        { value: 'rebuilt', label: 'Rebuilt' }
    ]

    const status = [
        { value: "active", label: 'active' },
        { value: "inactive", label: "inactive" },
        { value: "in-maintenance", label: "in-maintenance" }
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
                            <TabNav value="basic">Basic Information</TabNav>
                            <TabNav value="technical">Technical Details</TabNav>
                            <TabNav value="legal">Registration & Legal</TabNav>
                            <TabNav value="insurance">Insurance</TabNav>
                            <TabNav value="financial">Financial</TabNav>
                            <TabNav value="maintenance">Maintenance</TabNav>
                            <TabNav value="rental">Rental & Platforms</TabNav>
                        </TabList>

                        <div className="mt-6">
                            <TabContent value="basic">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="license_plate" className="text-sm font-medium">License Plate *</label>

                                        <Input
                                            placeholder="Enter license plate"
                                            value={formData.license_plate}
                                            onChange={handleInputChange('license_plate')}
                                            required
                                        />

                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="vin" className="text-sm font-medium">VIN</label>
                                        <Input
                                            placeholder="Enter VIN number"
                                            value={formData.vin}
                                            onChange={handleInputChange('vin')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="make" className="text-sm font-medium">Make</label>
                                        <Input
                                            placeholder="e.g. Toyota, Honda, Ford"
                                            value={formData.make}
                                            onChange={handleInputChange('make')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="model" className="text-sm font-medium">Model</label>
                                        <Input
                                            placeholder="e.g. Camry, Accord, Focus"
                                            value={formData.model}
                                            onChange={handleInputChange('model')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="year" className="text-sm font-medium">Year</label>
                                        <Input
                                            type="number"
                                            placeholder="e.g. 2023"
                                            value={formData.year}
                                            onChange={handleInputChange('year')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="color" className="text-sm font-medium">Color</label>
                                        <Input
                                            placeholder="e.g. Red, Blue, White"
                                            value={formData.color}
                                            onChange={handleInputChange('color')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="vehicle_type" className="text-sm font-medium">Vehicle Type</label>
                                        <Select
                                            placeholder="Select vehicle type"
                                            options={vehicleTypeOptions}
                                            value={vehicleTypeOptions.find(option => option.value === formData.vehicle_type)}
                                            onChange={(option) => setFormData(prev => ({ ...prev, vehicle_type: option?.value || '' }))}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="status" className="text-sm font-medium">status</label>
                                        <Select
                                            placeholder="Select vehicle status"
                                            options={status}
                                            value={status.find(opt => opt.value === formData.status)}
                                            onChange={(option) => setFormData(prev => ({ ...prev, status: option?.value || '' }))}
                                        />
                                    </div>
                                </div>
                            </TabContent>

                            <TabContent value="technical">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="engine_type" className="text-sm font-medium">Engine Type</label>
                                        <Select
                                            placeholder="Select engine type"
                                            options={engineTypeOptions}
                                            value={engineTypeOptions.find(option => option.value === formData.engine_type)}
                                            onChange={(option) => setFormData(prev => ({ ...prev, engine_type: option?.value || '' }))}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="transmission_type" className="text-sm font-medium">Transmission Type</label>
                                        <Select
                                            placeholder="Select transmission type"
                                            options={transmissionTypeOptions}
                                            value={transmissionTypeOptions.find(option => option.value === formData.transmission_type)}
                                            onChange={(option) => setFormData(prev => ({ ...prev, transmission_type: option?.value || '' }))}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="fuel_capacity" className="text-sm font-medium">Fuel Capacity (gallons)</label>
                                        <Input
                                            type="number"
                                            step="0.1"
                                            placeholder="e.g. 15.5"
                                            value={formData.fuel_capacity}
                                            onChange={handleInputChange('fuel_capacity')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="seating_capacity" className="text-sm font-medium">Seating Capacity</label>
                                        <Input
                                            type="number"
                                            placeholder="e.g. 5"
                                            value={formData.seating_capacity}
                                            onChange={handleInputChange('seating_capacity')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="mileage" className="text-sm font-medium">Current Mileage</label>
                                        <Input
                                            type="number"
                                            placeholder="e.g. 45000"
                                            value={formData.mileage}
                                            onChange={handleInputChange('mileage')}
                                        />
                                    </div>
                                </div>
                            </TabContent>

                            <TabContent value="legal">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="registration_number" className="text-sm font-medium">Registration Number</label>
                                        <Input
                                            placeholder="Enter registration number"
                                            value={formData.registration_number}
                                            onChange={handleInputChange('registration_number')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="registration_expires_at" className="text-sm font-medium">Registration Expires</label>
                                        <DatePicker
                                            placeholder="Select expiration date"
                                            value={formData.registration_expires_at}
                                            onChange={handleDateChange('registration_expires_at')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="state_registered" className="text-sm font-medium">State Registered</label>
                                        <Input
                                            placeholder="e.g. CA, NY, TX"
                                            value={formData.state_registered}
                                            onChange={handleInputChange('state_registered')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="title_status" className="text-sm font-medium">Title Status</label>
                                        <Select
                                            placeholder="Select title status"
                                            options={titleStatusOptions}
                                            value={titleStatusOptions.find(option => option.value === formData.title_status)}
                                            onChange={(option) => setFormData(prev => ({ ...prev, title_status: option?.value || '' }))}
                                        />
                                    </div>
                                </div>
                            </TabContent>

                            <TabContent value="insurance">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="insurance_company" className="text-sm font-medium">Insurance Company</label>
                                        <Input
                                            placeholder="e.g. Geico, State Farm"
                                            value={formData.insurance_company}
                                            onChange={handleInputChange('insurance_company')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="insurance_policy_number" className="text-sm font-medium">Policy Number</label>
                                        <Input
                                            placeholder="Enter policy number"
                                            value={formData.insurance_policy_number}
                                            onChange={handleInputChange('insurance_policy_number')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="insurance_expires_at" className="text-sm font-medium">Insurance Expires</label>
                                        <DatePicker
                                            placeholder="Select expiration date"
                                            value={formData.insurance_expires_at}
                                            onChange={handleDateChange('insurance_expires_at')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="insurance_monthly_cost" className="text-sm font-medium">Monthly Insurance Cost</label>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            placeholder="e.g. 150.00"
                                            value={formData.insurance_monthly_cost}
                                            onChange={handleInputChange('insurance_monthly_cost')}
                                        />
                                    </div>
                                </div>
                            </TabContent>

                            <TabContent value="financial">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="purchase_date" className="text-sm font-medium">Purchase Date</label>
                                        <DatePicker
                                            placeholder="Select purchase date"
                                            value={formData.purchase_date}
                                            onChange={handleDateChange('purchase_date')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="purchase_price" className="text-sm font-medium">Purchase Price</label>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            placeholder="e.g. 25000.00"
                                            value={formData.purchase_price}
                                            onChange={handleInputChange('purchase_price')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="current_value" className="text-sm font-medium">Current Value</label>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            placeholder="e.g. 22000.00"
                                            value={formData.current_value}
                                            onChange={handleInputChange('current_value')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="loan_balance" className="text-sm font-medium">Loan Balance</label>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            placeholder="e.g. 15000.00"
                                            value={formData.loan_balance}
                                            onChange={handleInputChange('loan_balance')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="loan_monthly_payment" className="text-sm font-medium">Monthly Loan Payment</label>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            placeholder="e.g. 450.00"
                                            value={formData.loan_monthly_payment}
                                            onChange={handleInputChange('loan_monthly_payment')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="current_location" className="text-sm font-medium">Current Location</label>
                                        <Input
                                            placeholder="e.g. Los Angeles, CA"
                                            value={formData.current_location}
                                            onChange={handleInputChange('current_location')}
                                        />
                                    </div>
                                </div>
                            </TabContent>

                            <TabContent value="maintenance">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="last_service_date" className="text-sm font-medium">Last Service Date</label>
                                        <DatePicker
                                            placeholder="Select last service date"
                                            value={formData.last_service_date}
                                            onChange={handleDateChange('last_service_date')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="last_service_mileage" className="text-sm font-medium">Last Service Mileage</label>
                                        <Input
                                            type="number"
                                            placeholder="e.g. 40000"
                                            value={formData.last_service_mileage}
                                            onChange={handleInputChange('last_service_mileage')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="next_service_due_date" className="text-sm font-medium">Next Service Due Date</label>
                                        <DatePicker
                                            placeholder="Select next service date"
                                            value={formData.next_service_due_date}
                                            onChange={handleDateChange('next_service_due_date')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="next_service_due_mileage" className="text-sm font-medium">Next Service Due Mileage</label>
                                        <Input
                                            type="number"
                                            placeholder="e.g. 50000"
                                            value={formData.next_service_due_mileage}
                                            onChange={handleInputChange('next_service_due_mileage')}
                                        />
                                    </div>
                                </div>
                            </TabContent>

                            <TabContent value="rental">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="daily_rental_rate" className="text-sm font-medium">Daily Rental Rate</label>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            placeholder="e.g. 65.00"
                                            value={formData.daily_rental_rate}
                                            onChange={handleInputChange('daily_rental_rate')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="weekly_rental_rate" className="text-sm font-medium">Weekly Rental Rate</label>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            placeholder="e.g. 400.00"
                                            value={formData.weekly_rental_rate}
                                            onChange={handleInputChange('weekly_rental_rate')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="monthly_rental_rate" className="text-sm font-medium">Monthly Rental Rate</label>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            placeholder="e.g. 1500.00"
                                            value={formData.monthly_rental_rate}
                                            onChange={handleInputChange('monthly_rental_rate')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="security_deposit" className="text-sm font-medium">Security Deposit</label>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            placeholder="e.g. 500.00"
                                            value={formData.security_deposit}
                                            onChange={handleInputChange('security_deposit')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="turo_listing_id" className="text-sm font-medium">Turo Listing ID</label>
                                        <Input
                                            placeholder="Enter Turo listing ID"
                                            value={formData.turo_listing_id}
                                            onChange={handleInputChange('turo_listing_id')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="getaround_listing_id" className="text-sm font-medium">Getaround Listing ID</label>
                                        <Input
                                            placeholder="Enter Getaround listing ID"
                                            value={formData.getaround_listing_id}
                                            onChange={handleInputChange('getaround_listing_id')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="other_platform_ids" className="text-sm font-medium">Other Platform IDs</label>
                                        <Input
                                            placeholder="Enter other platform IDs (JSON format)"
                                            value={formData.other_platform_ids}
                                            onChange={handleInputChange('other_platform_ids')}
                                        />
                                    </div>
                                    {/* <div className="flex flex-col gap-2">

                                        <Input
                                            placeholder="Enter vehicle features (JSON format)"
                                            value={formData.vehicle_features}
                                            onChange={handleInputChange('vehicle_features')}
                                        />
                                    </div> */}
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="notes" className="text-sm font-medium">Notes</label>
                                        <Input
                                            textArea
                                            rows={4}
                                            placeholder="Enter any additional notes..."
                                            value={formData.notes}
                                            onChange={handleInputChange('notes')}
                                        />
                                    </div><br></br>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="is_available_for_rental" className="text-sm font-medium">Available for Rental</label>
                                        <Checkbox
                                            checked={formData.is_available_for_rental}
                                            onChange={handleCheckboxChange('is_available_for_rental')}
                                        >
                                            Available for rental
                                        </Checkbox>
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

export default AddVehicle 