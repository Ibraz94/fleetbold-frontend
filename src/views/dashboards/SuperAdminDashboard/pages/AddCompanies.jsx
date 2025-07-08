import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Card, Button, Input, Select, Tabs } from '@/components/ui'
import { Form } from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import { HiOutlineArrowLeft, HiOutlineCheck } from 'react-icons/hi'
import { apiCreateVehicle } from '@/services/vehiclesServices'
import { toast } from '@/components/ui/toast'
import { apiCreateCompany } from '@/services/companiesService'

const { TabNav, TabList, TabContent } = Tabs

const AddCompany = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        // Basic Information
        name: '',
        email: '',
        admin_name: '',
        admin_email: '',
        admin_password: '',
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
        createdAt: Date.now,
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
            const companyData = {
                ...formData,
                // Time
                // createdAt:  formData.createdAt?  formData.createdAt : null,

                // Company inputs
                name: formData.name ? formData.name.toString() : '',
                email: formData.email ? formData.email : '',
                admin_name: formData.admin_name ? formData.admin_name : '',
                admin_email: formData.admin_email ? formData.admin_email : '',
                admin_password: formData.admin_password ? formData.admin_password : '',
                phone: formData.phone ? parseInt(formData.phone) : null,
                title: formData.title ? formData.title : '',
                country: formData.country ? formData.country : '',
                city: formData.city ? formData.city : '',
                state: formData.state ? formData.state : '',
                street: formData.street ? formData.street : '',
                facebook: formData.facebook ? formData.facebook : '',
                instagram: formData.instagram ? formData.instagram : '',
                linkedin: formData.linkedin ? formData.linkedin : '',
                twitter: formData.twitter ? formData.twitter : '',
                currency: formData.currency ? formData.currency : '',
                postalCode: formData.postalCode ? parseInt(formData.postalCode) : '',
                website: formData.website ? formData.website : '',
            }

            await apiCreateCompany(companyData)
            
            toast.push('Company created successfully!', {
                placement: 'top-end',
                type: 'success'
            })
            
        // Navigate back to vehicles list after successful creation
        navigate('/fleetbold/companies')
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
        { value: 'transportation', label: 'transportation' },
        { value: 'logistics', label: 'logistics' },
        { value: 'Rental', label: 'Rental' },
        { value: 'Management services', label: 'Management service' }
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
                    <h4 className="text-2xl font-semibold">Add New Company</h4>
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
                                            placeholder="Enter company name"
                                            value={formData.name}
                                            onChange={handleInputChange('name')}
                                            required
                                        />

                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                                        <Input
                                            placeholder="Enter Email address"
                                            value={formData.email}
                                            onChange={handleInputChange('email')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="admin_name" className="text-sm font-medium">Admin Name</label>

                                        <Input
                                            placeholder="Enter admin name"
                                            value={formData.admin_name}
                                            onChange={handleInputChange('admin_name')}
                                            required
                                        />

                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="email" className="text-sm font-medium">Admin Email</label>
                                        <Input
                                            placeholder="Enter Email address"
                                            value={formData.admin_email}
                                            onChange={handleInputChange('admin_email')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="admin_password" className="text-sm font-medium">Admin Password</label>
                                        <Input
                                            placeholder="create password"
                                            value={formData.admin_password}
                                            onChange={handleInputChange('admin_password')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="make" className="text-sm font-medium">Phone Number</label>
                                        <Input
                                            placeholder="Enter phone number"
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
                                            placeholder="Company title"
                                            value={formData.title}
                                            onChange={handleInputChange('title')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="country" className="text-sm font-medium">Country</label>
                                        <Input
                                            type="text"
                                            placeholder="Enter Country name"
                                            value={formData.country}
                                            onChange={handleInputChange('country')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="city" className="text-sm font-medium">City</label>
                                        <Input
                                            placeholder="City name"
                                            value={formData.city}
                                            onChange={handleInputChange('city')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="state" className="text-sm font-medium">State</label>
                                        <Input
                                            placeholder="State name"
                                            value={formData.state}
                                            onChange={handleInputChange('state')}
                                        />
                                    </div>
                                                                        <div className="flex flex-col gap-2">
                                        <label htmlFor="street" className="text-sm font-medium">Street Address</label>
                                        <Input
                                            placeholder="Street Address"
                                            value={formData.street}
                                            onChange={handleInputChange('street')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="postalCode" className="text-sm font-medium">Postal Code</label>
                                        <Input
                                            placeholder="00000"
                                            type="number"
                                            value={formData.postalCode}
                                            onChange={handleInputChange('postalCode')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="website" className="text-sm font-medium">website</label>
                                        <Input
                                            placeholder="abc@demo.com"
                                            value={formData.website}
                                            onChange={handleInputChange('website')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="facebook" className="text-sm font-medium">Facebook</label>
                                        <Input
                                            placeholder="facebook.com/profile"
                                            value={formData.facebook}
                                            onChange={handleInputChange('facebook')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="instagram" className="text-sm font-medium">Instagram</label>
                                        <Input
                                            placeholder="instagram.com/profile"
                                            value={formData.instagram}
                                            onChange={handleInputChange('instagram')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="linkedin" className="text-sm font-medium">Linkedin</label>
                                        <Input
                                            placeholder="linkedin.com/profile"
                                            value={formData.linkedin}
                                            onChange={handleInputChange('linkedin')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="twitter" className="text-sm font-medium">Twitter</label>
                                        <Input
                                            placeholder="twitter.com/profile"
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
                        {loading ? 'Creating...' : 'Add Company'}
                    </Button>
                </div>
            </Form>
        </Container>
    )
}

export default AddCompany 