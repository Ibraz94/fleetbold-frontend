import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Card, Button, Input, Select, DatePicker, Checkbox, Tabs } from '@/components/ui'
import { Form } from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import { HiOutlineArrowLeft, HiOutlineCheck } from 'react-icons/hi'
import { apiCreateVehicle, apiGetVehicles } from '@/services/vehiclesServices'
import { toast } from '@/components/ui/toast'
import { apiCreateReservation } from '@/services/reservationServices'
// import { label } from 'yet-another-react-lightbox/*'

const { TabNav, TabList, TabContent } = Tabs

const AddReservations = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [vehicles, setVehicles] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    })
    const [formData, setFormData] = useState({
        // Basic Information
        vehicle_id: '',
        provider: '',
        reservation_number: '',
        guest_name: '',
        guest_email: '',
        guest_phone: '',

        // vehicle Dropdown details
        license_plate: '',
        make: '',

        // Technical Specifications
        pickup_location: '',
        dropoff_location: '',
        trip_status: '',
        invoice_status: '',
        start_date: '',
        end_date: '',
        completed_at: '', //reminder: add calender

        // price fields
        trip_price: '',
        fees: '',
        discounts: '',
        net_earnings: '',
        reported_tolls: '',

        // Vehicle details
        mileage_start: '',
        mileage_end: '',
        fuel_level_start: '',
        fuel_level_end: '',
        damage_reported: '',
        damage_description: '',
        cleaning_required: '',

        // ratings
        guest_rating: '',
        host_rating: '',
        notes: '',

        expense_id: '',
        company_id: '',

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
            const selectedVehicle = vehicles.find(v => v.value === formData.license_plate)

            const payload = {
                // Required fields only
                vehicle_name: selectedVehicle?.label || '',
                provider: formData.provider,
                trip_price: parseFloat(formData.trip_price) || 0,
                start_date: formData.start_date ? new Date(formData.start_date).toISOString() : null,
                end_date: formData.end_date ? new Date(formData.end_date).toISOString() : null,

                // Optional fields (only if filled)
                ...(formData.completed_at && { completed_at: new Date(formData.completed_at).toISOString() }),
                ...(formData.reservation_number && { reservation_number: formData.reservation_number }),
                ...(formData.guest_name && { guest_name: formData.guest_name }),
                ...(formData.guest_email && { guest_email: formData.guest_email }),
                ...(formData.guest_phone && { guest_phone: formData.guest_phone }),
                ...(formData.invoice_status && { invoice_status: formData.invoice_status }),
                ...(formData.pickup_location && { pickup_location: formData.pickup_location }),
                ...(formData.dropoff_location && { dropoff_location: formData.dropoff_location }),

                ...(formData.fees && { fees: parseFloat(formData.fees) }),
                ...(formData.discounts && { discounts: parseFloat(formData.discounts) }),
                ...(formData.net_earnings && { net_earnings: parseFloat(formData.net_earnings) }),
                ...(formData.reported_tolls && { reported_tolls: parseFloat(formData.reported_tolls) }),

                ...(formData.mileage_start && { mileage_start: parseInt(formData.mileage_start) }),
                ...(formData.mileage_end && { mileage_end: parseInt(formData.mileage_end) }),
                ...(formData.fuel_level_start && { fuel_level_start: parseFloat(formData.fuel_level_start) }),
                ...(formData.fuel_level_end && { fuel_level_end: parseFloat(formData.fuel_level_end) }),
                ...(formData.damage_reported && { damage_reported: formData.damage_reported }),
                ...(formData.damage_description && { damage_description: formData.damage_description }),
                ...(formData.cleaning_required && { cleaning_required: formData.cleaning_required }),

                ...(formData.guest_rating && { guest_rating: parseInt(formData.guest_rating) }),
                ...(formData.host_rating && { host_rating: parseInt(formData.host_rating) }),
                ...(formData.notes && { notes: formData.notes }),
            }

            await apiCreateReservation(payload)

            toast.push('Reservation created successfully!', {
                placement: 'top-end',
                type: 'success',
            })

            navigate('/fleetbold/Reservations')
        } catch (error) {
            console.error('Error creating reservation:', error)
            toast.push(
                error.response?.data?.message || 'Failed to create reservation. Please try again.',
                {
                    placement: 'top-end',
                    type: 'error',
                }
            )
        } finally {
            setLoading(false)
        }
    }


    const handleBack = () => {
        navigate('/fleetbold/Reservations')
    }

    // Fetch vehicles data
    const fetchVehicles = async (page = 1, pageSize = 10) => {
        try {
            const response = await apiGetVehicles({
                page,
                per_page: pageSize,
            })
            console.log('Vehicles response:', response) // Debug log
            const vehicleOptions = response.vehicles
                .filter((v) => v.is_available_for_rental)
                .map((v) => ({
                    label: `${v.license_plate} - ${v.make} ${v.model}`,
                    value: v.license_plate,
                }))
            setVehicles(vehicleOptions)
            console.log("license:", response.vehicles.filter((v) => v.license_plate));
            console.log(
                'Rental availability:',
                response.vehicles.map((v) => v.is_available_for_rental),
            )
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

    const invoiceStatus = [
        { value: "paid", label: "paid" },
        { value: "not-paid", label: "not-paid" }
    ]

    // Load initial data
    useEffect(() => {
        const loadData = async () => {
            setLoading(true)
            await Promise.all([fetchVehicles()])
            setLoading(false)
        }
        loadData()
    }, [])

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
                    <h4 className="text-2xl font-semibold">Add New Reservation</h4>
                </div>
            </div>

            <Form onSubmit={handleSubmit}>
                <Card>
                    <Tabs value={activeTab} onChange={setActiveTab}>
                        <TabList>
                            <TabNav value="basic">Basic Information</TabNav>
                            <TabNav value="about">About Trip</TabNav>
                            <TabNav value="price">Price Details</TabNav>
                            <TabNav value="details">Vehicle Details</TabNav>
                            {/* <TabNav value="reviews">Reviews & Ratings</TabNav> */}
                        </TabList>

                        <div className="mt-6">
                            <TabContent value="basic">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="vehicle_id" className="text-sm font-medium">
                                            Available vehicles
                                        </label>
                                        <Select
                                            placeholder="Select available vehicle"
                                            options={vehicles} // this is an array of {label, value}
                                            value={vehicles.find(option => option.value === formData.license_plate)}
                                            onChange={(option) =>
                                                setFormData(prev => ({
                                                    ...prev,
                                                    license_plate: option?.value || ''
                                                }))
                                            }
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="provider" className="text-sm font-medium">Provider name</label>
                                        <Input
                                            placeholder="Enter provider name"
                                            value={formData.provider}
                                            onChange={handleInputChange('provider')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="reservation_number" className="text-sm font-medium">Reservation Number</label>
                                        <Input
                                            placeholder="012"
                                            type="number"
                                            value={formData.reservation_number}
                                            onChange={handleInputChange('reservation_number')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="guest_name" className="text-sm font-medium">Guest name</label>
                                        <Input
                                            placeholder="John Doe"
                                            value={formData.guest_name}
                                            onChange={handleInputChange('guest_name')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="guest_email" className="text-sm font-medium">Guest email</label>
                                        <Input
                                            type="email"
                                            placeholder="someone@example.com"
                                            value={formData.guest_email}
                                            onChange={handleInputChange('guest_email')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="guest_phone" className="text-sm font-medium">Guest Phone Number</label>
                                        <Input
                                            placeholder="03001234567"
                                            type="number"
                                            value={formData.guest_phone}
                                            onChange={handleInputChange('guest_phone')}
                                        />
                                    </div>
                                </div>
                            </TabContent>

                            <TabContent value="about">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="pickup_location" className="text-sm font-medium">Pickup Location</label>
                                        <Input
                                            placeholder="House 12a, Street 1, block ABC"
                                            value={formData.pickup_location}
                                            onChange={handleInputChange('pickup_location')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="dropoff_location" className="text-sm font-medium">Drop-off Location</label>
                                        <Input
                                            placeholder="House 9, Street 5, block ABC"
                                            value={formData.dropoff_location}
                                            onChange={handleInputChange('dropoff_location')}
                                        />
                                    </div>
                                    {/* <div className="flex flex-col gap-2">
                                        <label htmlFor="status" className="text-sm font-medium">Vehicle status</label>
                                        <Select
                                            placeholder="Select vehicle status"
                                            options={status}
                                            value={status.find(opt => opt.value === formData.status)}
                                            onChange={(option) => setFormData(prev => ({ ...prev, status: option?.value || '' }))}
                                        />
                                    </div> */}
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="invoiceStatus" className="text-sm font-medium">Invoice status</label>
                                        <Select
                                            placeholder="Select invoice status"
                                            options={invoiceStatus}
                                            value={invoiceStatus.find(opt => opt.value === formData.invoice_status)}
                                            onChange={(option) => setFormData(prev => ({ ...prev, invoice_status: option?.value || '' }))}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="start_date" className="text-sm font-medium">Start Date</label>
                                        <Input
                                            type="date"
                                            value={formData.start_date}
                                            onChange={handleInputChange('start_date')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="end" className="text-sm font-medium">End Date</label>
                                        <Input
                                            type="date"
                                            value={formData.end_date}
                                            onChange={handleInputChange('end_date')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="completed_at" className="text-sm font-medium">Completed at</label>
                                        <Input
                                            type="date"
                                            value={formData.completed_at}
                                            onChange={handleInputChange('completed_at')}
                                        />
                                    </div>
                                </div>
                            </TabContent>

                            <TabContent value="price">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="trip_price" className="text-sm font-medium">Trip Price</label>
                                        <Input
                                            placeholder="$20.00"
                                            value={formData.trip_price}
                                            onChange={handleInputChange('trip_price')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="fees" className="text-sm font-medium">Fees</label>
                                        <Input
                                            placeholder="$1.50"
                                            value={formData.fees}
                                            onChange={handleInputChange('fees')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="discounts" className="text-sm font-medium">Discounts</label>
                                        <Input
                                            placeholder="$2.00"
                                            value={formData.discounts}
                                            onChange={handleInputChange('discounts')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="net_earnings" className="text-sm font-medium">Net Earnings</label>
                                        <Input
                                            placeholder="$10.00"
                                            value={formData.net_earnings}
                                            onChange={handleInputChange('net_earnings')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="reported_tolls" className="text-sm font-medium">Reported Tolls</label>
                                        <Input
                                            placeholder="10"
                                            value={formData.reported_tolls}
                                            onChange={handleInputChange('reported_tolls')}
                                        />
                                    </div>
                                </div>
                            </TabContent>

                            <TabContent value="details">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="mileage_start" className="text-sm font-medium">Mileage Start</label>
                                        <Input
                                            placeholder="100"
                                            value={formData.mileage_start}
                                            onChange={handleInputChange('mileage_start')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="mileage_end" className="text-sm font-medium">Mileage End</label>
                                        <Input
                                            placeholder="110"
                                            value={formData.mileage_end}
                                            onChange={handleInputChange('mileage_end')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="fuel_level_start" className="text-sm font-medium">Fuel level start</label>
                                        <Input
                                            placeholder=""
                                            value={formData.fuel_level_start}
                                            onChange={handleInputChange('fuel_level_start')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="fuel_level_end" className="text-sm font-medium">Fuel level end</label>
                                        <DatePicker
                                            placeholder=""
                                            value={formData.fuel_level_end}
                                            onChange={handleDateChange('fuel_level_end')}
                                        />
                                    </div>
                                </div>
                            </TabContent>

                            {/* 
                            <TabContent value="reviews">
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
                            </TabContent> */}

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
                        {loading ? 'Creating...' : 'Add Reservation'}
                    </Button>
                </div>
            </Form>
        </Container>
    )
}

export default AddReservations 