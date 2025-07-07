import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { Card, Button, Badge, Tabs } from '@/components/ui'
import Container from '@/components/shared/Container'
import { HiOutlineArrowLeft, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { apiGetVehicle, apiDeleteVehicle } from '@/services/vehiclesServices'
import { toast } from '@/components/ui/toast'
import { Spinner } from '@/components/ui'


const { TabNav, TabList, TabContent } = Tabs

const VehicleDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [vehicle, setVehicle] = useState(null)
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('basic')

    useEffect(() => {
        fetchVehicleDetails()
    }, [id])

    const fetchVehicleDetails = async () => {
        try {
            setLoading(true)
            const response = await apiGetVehicle(id)
            setVehicle(response)
        } catch (error) {
            console.error('Error fetching vehicle details:', error)
            toast.push(error.response?.data?.message || 'Failed to fetch vehicle details', {
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

    const handleEdit = () => {
        navigate(`/fleetbold/vehicles/edit/${id}`)
    }

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this vehicle?')) {
            try {
                await apiDeleteVehicle(id)
                toast.push('Vehicle deleted successfully!', {
                    placement: 'top-end',
                    type: 'success'
                })
                navigate('/fleetbold/vehicles')
            } catch (error) {
                console.error('Error deleting vehicle:', error)
                toast.push(error.response?.data?.message || 'Failed to delete vehicle', {
                    placement: 'top-end',
                    type: 'error'
                })
            }
        }
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A'
        return new Date(dateString).toLocaleDateString()
    }

    const formatCurrency = (amount) => {
        if (!amount) return 'N/A'
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount)
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'active':
                return 'text-green-800 text-lg font-semibold'
            case 'maintenance':
                return 'text-yellow-800 text-lg font-semibold'
            case 'inactive':
                return 'text-gray-800 text-lg font-semibold'
            case 'sold':
                return 'text-red-800 text-lg font-semibold'
            default:
                return 'text-gray-800 text-lg font-semibold'
        }
    }

    if (loading) {
        return (
            <Container>
                <div className="flex justify-center items-center h-64">
                    <Spinner size="lg" />
                </div>
            </Container>
        )
    }

    if (!vehicle) {
        return (
            <Container>
                <div className="text-center py-8">
                    <h3 className="text-xl font-semibold mb-2">Vehicle Not Found</h3>
                    <p className="text-gray-600 mb-4">The vehicle you're looking for doesn't exist.</p>
                    <Button onClick={handleBack}>Back to Vehicles</Button>
                </div>
            </Container>
        )
    }

    return (
        <Container>
            <div className="mb-6">
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="plain"
                            size="sm"
                            icon={<HiOutlineArrowLeft />}
                            onClick={handleBack}
                        >
                            Back
                        </Button>
                        <div>
                            <h4 className="text-2xl font-semibold">{vehicle.make} {vehicle.model}</h4>
                            <p className="text-gray-600">{vehicle.license_plate}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <p className={getStatusColor(vehicle.status)}>
                            {vehicle.status}
                        </p>
                        <Button
                            variant="plain"
                            size="sm"
                            icon={<HiOutlinePencil />}
                            onClick={handleEdit}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="plain"
                            size="sm"
                            icon={<HiOutlineTrash />}
                            onClick={handleDelete}
                            className="text-red-600 hover:text-red-700"
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </div>

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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h6 className="font-semibold mb-2">Vehicle Details</h6>
                                    <div className="space-y-2">
                                        <div><span className="font-medium">License Plate:</span> {vehicle.license_plate}</div>
                                        <div><span className="font-medium">VIN:</span> {vehicle.vin || 'N/A'}</div>
                                        <div><span className="font-medium">Make:</span> {vehicle.make || 'N/A'}</div>
                                        <div><span className="font-medium">Model:</span> {vehicle.model || 'N/A'}</div>
                                        <div><span className="font-medium">Year:</span> {vehicle.year || 'N/A'}</div>
                                        <div><span className="font-medium">Color:</span> {vehicle.color || 'N/A'}</div>
                                        <div><span className="font-medium">Type:</span> {vehicle.vehicle_type || 'N/A'}</div>
                                    </div>
                                </div>
                            </div>
                        </TabContent>

                        <TabContent value="technical">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h6 className="font-semibold mb-2">Technical Specifications</h6>
                                    <div className="space-y-2">
                                        <div><span className="font-medium">Engine Type:</span> {vehicle.engine_type || 'N/A'}</div>
                                        <div><span className="font-medium">Transmission:</span> {vehicle.transmission_type || 'N/A'}</div>
                                        <div><span className="font-medium">Fuel Capacity:</span> {vehicle.fuel_capacity ? `${vehicle.fuel_capacity} gallons` : 'N/A'}</div>
                                        <div><span className="font-medium">Seating Capacity:</span> {vehicle.seating_capacity || 'N/A'}</div>
                                        <div><span className="font-medium">Mileage:</span> {vehicle.mileage ? vehicle.mileage.toLocaleString() : 'N/A'}</div>
                                    </div>
                                </div>
                            </div>
                        </TabContent>

                        <TabContent value="legal">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h6 className="font-semibold mb-2">Registration & Legal</h6>
                                    <div className="space-y-2">
                                        <div><span className="font-medium">Registration Number:</span> {vehicle.registration_number || 'N/A'}</div>
                                        <div><span className="font-medium">Registration Expires:</span> {formatDate(vehicle.registration_expires_at)}</div>
                                        <div><span className="font-medium">State Registered:</span> {vehicle.state_registered || 'N/A'}</div>
                                        <div><span className="font-medium">Title Status:</span> {vehicle.title_status || 'N/A'}</div>
                                    </div>
                                </div>
                            </div>
                        </TabContent>

                        <TabContent value="insurance">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h6 className="font-semibold mb-2">Insurance Information</h6>
                                    <div className="space-y-2">
                                        <div><span className="font-medium">Insurance Company:</span> {vehicle.insurance_company || 'N/A'}</div>
                                        <div><span className="font-medium">Policy Number:</span> {vehicle.insurance_policy_number || 'N/A'}</div>
                                        <div><span className="font-medium">Insurance Expires:</span> {formatDate(vehicle.insurance_expires_at)}</div>
                                        <div><span className="font-medium">Monthly Cost:</span> {formatCurrency(vehicle.insurance_monthly_cost)}</div>
                                    </div>
                                </div>
                            </div>
                        </TabContent>

                        <TabContent value="financial">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h6 className="font-semibold mb-2">Financial Information</h6>
                                    <div className="space-y-2">
                                        <div><span className="font-medium">Purchase Date:</span> {formatDate(vehicle.purchase_date)}</div>
                                        <div><span className="font-medium">Purchase Price:</span> {formatCurrency(vehicle.purchase_price)}</div>
                                        <div><span className="font-medium">Current Value:</span> {formatCurrency(vehicle.current_value)}</div>
                                        <div><span className="font-medium">Loan Balance:</span> {formatCurrency(vehicle.loan_balance)}</div>
                                        <div><span className="font-medium">Monthly Payment:</span> {formatCurrency(vehicle.loan_monthly_payment)}</div>
                                        <div><span className="font-medium">Current Location:</span> {vehicle.current_location || 'N/A'}</div>
                                    </div>
                                </div>
                            </div>
                        </TabContent>

                        <TabContent value="maintenance">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h6 className="font-semibold mb-2">Maintenance History</h6>
                                    <div className="space-y-2">
                                        <div><span className="font-medium">Last Service Date:</span> {formatDate(vehicle.last_service_date)}</div>
                                        <div><span className="font-medium">Last Service Mileage:</span> {vehicle.last_service_mileage ? vehicle.last_service_mileage.toLocaleString() : 'N/A'}</div>
                                        <div><span className="font-medium">Next Service Due:</span> {formatDate(vehicle.next_service_due_date)}</div>
                                        <div><span className="font-medium">Next Service Mileage:</span> {vehicle.next_service_due_mileage ? vehicle.next_service_due_mileage.toLocaleString() : 'N/A'}</div>
                                    </div>
                                </div>
                            </div>
                        </TabContent>

                        <TabContent value="rental">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h6 className="font-semibold mb-2">Rental Information</h6>
                                    <div className="space-y-2">
                                        <div><span className="font-medium">Available for Rental:</span> {vehicle.is_available_for_rental ? 'Yes' : 'No'}</div>
                                        <div><span className="font-medium">Daily Rate:</span> {formatCurrency(vehicle.daily_rental_rate)}</div>
                                        <div><span className="font-medium">Weekly Rate:</span> {formatCurrency(vehicle.weekly_rental_rate)}</div>
                                        <div><span className="font-medium">Monthly Rate:</span> {formatCurrency(vehicle.monthly_rental_rate)}</div>
                                        <div><span className="font-medium">Security Deposit:</span> {formatCurrency(vehicle.security_deposit)}</div>
                                    </div>
                                </div>
                                <div>
                                    <h6 className="font-semibold mb-2">Platform IDs</h6>
                                    <div className="space-y-2">
                                        <div><span className="font-medium">Turo Listing ID:</span> {vehicle.turo_listing_id || 'N/A'}</div>
                                        <div><span className="font-medium">Getaround Listing ID:</span> {vehicle.getaround_listing_id || 'N/A'}</div>
                                    </div>
                                </div>
                            </div>
                            {vehicle.notes && (
                                <div className="mt-6">
                                    <h6 className="font-semibold mb-2">Notes</h6>
                                    <p className="text-gray-600">{vehicle.notes}</p>
                                </div>
                            )}
                        </TabContent>
                    </div>
                </Tabs>
            </Card>
        </Container>
    )
}

export default VehicleDetail 