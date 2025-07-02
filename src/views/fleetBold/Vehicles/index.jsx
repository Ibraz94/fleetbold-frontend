import { Card, Pagination, Button } from '@/components/ui'
import Container from '@/components/shared/Container'
import Table from '@/components/ui/Table'
import { useNavigate } from 'react-router'
import { HiOutlinePlus } from 'react-icons/hi'
const { THead, Tr, Th, TBody, Td } = Table

const Vehicles = () => {
    const navigate = useNavigate()

    const handleAddVehicle = () => {
        navigate('/fleetbold/vehicles/add')
    }

    return (
        <Container>
            <div className="mb-4 flex items-center justify-between">
                <h4 className="text-2xl font-semibold">Vehicles</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                    <div className="flex items-center justify-between">
                        <div>
                            <h6 className="text-gray-500">Total Vehicles</h6>
                            <h3 className="text-2xl font-bold">24</h3>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="flex items-center justify-between">
                        <div>
                            <h6 className="text-gray-500">Active Vehicles</h6>
                            <h3 className="text-2xl font-bold">18</h3>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="flex items-center justify-between">
                        <div>
                            <h6 className="text-gray-500">In Maintenance</h6>
                            <h3 className="text-2xl font-bold">6</h3>
                        </div>
                    </div>
                </Card>
            </div>
            <div className="mt-6">
                <div className="flex items-center justify-between">
                    <h4 className="text-xl font-semibold mb-4">Vehicle List</h4>
                <Button 
                    variant="solid" 
                    size="sm"
                    icon={<HiOutlinePlus />}
                    onClick={handleAddVehicle}
                >
                        Add Vehicle
                    </Button>
                </div>
                <Table>
                    <THead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Status</Th>
                            <Th>Mileage</Th>
                            <Th>Model</Th>
                            <Th>Year</Th>
                            <Th>Last Service Date</Th>
                        </Tr>
                    </THead>
                    <TBody>
                        {[
                            { id: 1, name: 'Toyota Camry', status: 'Active', mileage: '45,000', model: 'Camry', year: '2023', lastServiceDate: '2023-10-15' },
                            { id: 2, name: 'Honda Accord', status: 'Active', mileage: '32,000', model: 'Accord', year: '2022', lastServiceDate: '2023-09-20' },
                            { id: 3, name: 'Ford Focus', status: 'Maintenance', mileage: '60,000', model: 'Focus', year: '2021', lastServiceDate: '2023-11-05' },
                            { id: 4, name: 'Chevrolet Malibu', status: 'Active', mileage: '28,000', model: 'Malibu', year: '2023', lastServiceDate: '2023-08-10' },
                            { id: 5, name: 'Nissan Altima', status: 'Maintenance', mileage: '55,000', model: 'Altima', year: '2022', lastServiceDate: '2023-10-25' },
                            { id: 6, name: 'Hyundai Sonata', status: 'Active', mileage: '38,000', model: 'Sonata', year: '2023', lastServiceDate: '2023-09-30' },
                        ].map((vehicle) => (
                            <Tr key={vehicle.id}>
                                <Td>{vehicle.name}</Td>
                                <Td>{vehicle.status}</Td>
                                <Td>{vehicle.mileage}</Td>
                                <Td>{vehicle.model}</Td>
                                <Td>{vehicle.year}</Td>
                                <Td>{vehicle.lastServiceDate}</Td>
                            </Tr>
                        ))}
                    </TBody>
                </Table>
                <div className="mt-4 flex justify-end">
                    <Pagination
                        total={6}
                        pageSize={3}
                        defaultCurrent={1}
                        onChange={(page) => console.log('Page:', page)}
                    />
                </div>
            </div>
        </Container>
    )
}

export default Vehicles 