import { useState, useEffect } from 'react'
import { Card, Pagination, Button } from '@/components/ui'
import Container from '@/components/shared/Container'
import Table from '@/components/ui/Table'
import { useNavigate } from 'react-router'
import { HiOutlinePlus, HiOutlineEye, HiOutlineTrash, HiOutlinePencil } from 'react-icons/hi'
import { apiGetVehicles, apiGetVehiclesStatistics, apiDeleteVehicle } from '@/services/vehiclesServices'
import { toast } from '@/components/ui/toast'
import { Spinner } from '@/components/ui'

const { THead, Tr, Th, TBody, Td } = Table

const Vehicles = () => {
    const navigate = useNavigate()
    const [vehicles, setVehicles] = useState([])
    const [statistics, setStatistics] = useState({
        total_vehicles: 0,
        active_vehicles: 0,
        maintenance_vehicles: 0,
        available_for_rental: 0
    })
    const [loading, setLoading] = useState(true)
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0
    })

    // Fetch vehicles data
    const fetchVehicles = async (page = 1, pageSize = 10) => {
        try {
            const response = await apiGetVehicles({
                page,
                per_page: pageSize
            })
            console.log('Vehicles response:', response) // Debug log
            setVehicles(response.vehicles || [])
            setPagination(prev => ({
                ...prev,
                current: page,
                total: response.pagination?.total || 0
            }))
        } catch (error) {
            console.error('Error fetching vehicles:', error)
            toast.push(error.response?.data?.message || 'Failed to fetch vehicles', {
                placement: 'top-end',
                type: 'error'
            })
        }
    }

    // Fetch statistics
    const fetchStatistics = async () => {
        try {
            const response = await apiGetVehiclesStatistics()
            console.log('Statistics response:', response) // Debug log
            setStatistics(response)
        } catch (error) {
            console.error('Error fetching statistics:', error)
            // Don't show error toast for statistics if it fails - just log it
            console.log('Statistics API might not be implemented yet')
        }
    }

    // Load initial data
    useEffect(() => {
        const loadData = async () => {
            setLoading(true)
            await Promise.all([
                fetchVehicles(),
                fetchStatistics()
            ])
            setLoading(false)
        }
        loadData()
    }, [])

    const handleAddVehicle = () => {
        navigate('/fleetbold/vehicles/add')
    }

    const handleViewVehicle = (vehicleId) => {
        navigate(`/fleetbold/vehicles/${vehicleId}`)
    }

    const handleEditVehicle = (vehicleId) => {
        navigate(`/fleetbold/vehicles/edit/${vehicleId}`)
    }

    const handleDeleteVehicle = async (vehicleId) => {
        if (window.confirm('Are you sure you want to delete this vehicle?')) {
            try {
                await apiDeleteVehicle(vehicleId)
                toast.push('Vehicle deleted successfully!', {
                    placement: 'top-end',
                    type: 'success'
                })
                // Refresh the vehicles list
                fetchVehicles(pagination.current, pagination.pageSize)
                fetchStatistics()
            } catch (error) {
                console.error('Error deleting vehicle:', error)
                toast.push(error.response?.data?.message || 'Failed to delete vehicle', {
                    placement: 'top-end',
                    type: 'error'
                })
            }
        }
    }

    const handlePageChange = (page) => {
        fetchVehicles(page, pagination.pageSize)
    }

    const formatDate = (dateString) => {
        if (!dateString) return '-'
        return new Date(dateString).toLocaleDateString()
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'active':
                return 'text-green-600'
            case 'maintenance':
                return 'text-yellow-600'
            case 'inactive':
                return 'text-gray-600'
            case 'sold':
                return 'text-red-600'
            default:
                return 'text-gray-600'
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

    return (
        <Container>
            <div className="mb-4 flex items-center justify-between">
                <h4 className="text-2xl font-semibold">Vehicles</h4>
            </div>
            
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <div className="flex items-center justify-between">
                        <div>
                            <h6 className="text-gray-500">Total Vehicles</h6>
                            <h3 className="text-2xl font-bold">{statistics.total_vehicles}</h3>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="flex items-center justify-between">
                        <div>
                            <h6 className="text-gray-500">Active Vehicles</h6>
                            <h3 className="text-2xl font-bold">{statistics.active_vehicles}</h3>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="flex items-center justify-between">
                        <div>
                            <h6 className="text-gray-500">In Maintenance</h6>
                            <h3 className="text-2xl font-bold">{statistics.maintenance_vehicles}</h3>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="flex items-center justify-between">
                        <div>
                            <h6 className="text-gray-500">Available for Rental</h6>
                            <h3 className="text-2xl font-bold">{statistics.available_for_rental}</h3>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Vehicle List */}
            <div className="mt-6">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-semibold">Vehicle List</h4>
                    <Button 
                        variant="solid" 
                        size="sm"
                        icon={<HiOutlinePlus />}
                        onClick={handleAddVehicle}
                    >
                        Add Vehicle
                    </Button>
                </div>
                
                <Card>
                    <Table>
                        <THead>
                            <Tr>
                                <Th>Vehicle</Th>
                                <Th>Status</Th>
                                <Th>Mileage</Th>
                                <Th>Year</Th>
                                <Th>Last Service</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </THead>
                        <TBody>
                            {vehicles.length === 0 ? (
                                <Tr>
                                    <Td colSpan="6" className="text-center py-8">
                                        No vehicles found. <button onClick={handleAddVehicle} className="text-blue-600 hover:underline">Add your first vehicle</button>
                                    </Td>
                                </Tr>
                            ) : (
                                vehicles.map((vehicle) => (
                                    <Tr key={vehicle.id}>
                                        <Td>
                                            <div>
                                                <div className="font-medium">{vehicle.make} {vehicle.model}</div>
                                                <div className="text-sm text-gray-500">{vehicle.license_plate}</div>
                                            </div>
                                        </Td>
                                        <Td>
                                            <span className={`capitalize ${getStatusColor(vehicle.status)}`}>
                                                {vehicle.status}
                                            </span>
                                        </Td>
                                        <Td>{vehicle.mileage?.toLocaleString() || '-'}</Td>
                                        <Td>{vehicle.year}</Td>
                                        <Td>{formatDate(vehicle.last_service_date)}</Td>
                                        <Td>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="plain"
                                                    size="xs"
                                                    icon={<HiOutlineEye />}
                                                    onClick={() => handleViewVehicle(vehicle.id)}
                                                />
                                                <Button
                                                    variant="plain"
                                                    size="xs"
                                                    icon={<HiOutlinePencil />}
                                                    onClick={() => handleEditVehicle(vehicle.id)}
                                                />
                                                <Button
                                                    variant="plain"
                                                    size="xs"
                                                    icon={<HiOutlineTrash />}
                                                    onClick={() => handleDeleteVehicle(vehicle.id)}
                                                    className="text-red-600 hover:text-red-700"
                                                />
                                            </div>
                                        </Td>
                                    </Tr>
                                ))
                            )}
                        </TBody>
                    </Table>
                </Card>

                {/* Pagination */}
                {vehicles.length > 0 && (
                    <div className="mt-4 flex justify-end">
                        <Pagination
                            total={pagination.total}
                            pageSize={pagination.pageSize}
                            current={pagination.current}
                            onChange={handlePageChange}
                        />
                    </div>
                )}
            </div>
        </Container>
    )
}

export default Vehicles 