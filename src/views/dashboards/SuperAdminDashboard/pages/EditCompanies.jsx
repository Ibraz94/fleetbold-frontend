import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Card, Button, Input, Select, Tabs } from '@/components/ui';
import { Form } from '@/components/ui/Form';
import Container from '@/components/shared/Container';
import { HiOutlineArrowLeft, HiOutlineCheck } from 'react-icons/hi';
import { toast } from '@/components/ui/toast';
import { apiGetCompany, apiUpdateCompany } from '@/services/companiesService';

const { TabNav, TabList, TabContent } = Tabs;

const EditCompany = () => {
  const navigate = useNavigate();
  const { companyId } = useParams(); // Get the company id from the URL
  const [loading, setLoading] = useState(false); // Loading state for both fetching and submitting
  const [formData, setFormData] = useState({
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
    street_address: '',
    facebook_url: '',
    instagram_url: '',
    linkedin_url: '',
    twitter_url: '',
    currency: '',
    postal_code: '',
    website: '',
  });

  const [activeTab, setActiveTab] = useState('basic');

  // Fetch company data on page load
  useEffect(() => {
    const fetchCompany = async () => {
      setLoading(true); // Set loading to true when fetching data
      try {
        const response = await apiGetCompany(companyId);
        console.log(response)
        setFormData(response); // Fill the form with the existing data
      } catch (error) {
        toast.push(error.response?.data?.message || 'Failed to fetch company data.', {
          placement: 'top-end',
          type: 'error',
        });
      } finally {
        setLoading(false); // Reset loading to false after fetching is complete
      }
    };

    fetchCompany();
  }, [companyId]);

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting data
    try {
      // Prepare the data for API call
      const updatedCompanyData = {
        ...formData,
        phone: parseInt(formData.phone),
        postal_code: parseInt(formData.postal_code),
      };

      await apiUpdateCompany(companyId, updatedCompanyData); // Send the updated data

      toast.push('Company updated successfully!', {
        placement: 'top-end',
        type: 'success',
      });

      navigate('/fleetbold/companies'); // Navigate back to companies list after success
    } catch (error) {
      console.error('Error updating company:', error);
      toast.push(error.response?.data?.message || 'Failed to update company.', {
        placement: 'top-end',
        type: 'error',
      });
    } finally {
      setLoading(false); // Reset loading to false after submitting is complete
    }
  };

  const handleBack = () => {
    navigate('/super-admin/companies');
  };

  const businessTypeOptions = [
    { value: 'Transportation', label: 'Transportation' },
    { value: 'Logistics', label: 'Logistics' },
    { value: 'Rental', label: 'Rental' },
    { value: 'Management services', label: 'Management services' },
  ];

  const currencyTypeOptions = [
    { value: 'USD', label: 'USD' },
    { value: 'PKR', label: 'PKR' },
  ];

  return (
    <Container>
      <div className="mb-6">
        <div className="mb-4 flex items-center gap-3">
          <Button variant="plain" size="sm" icon={<HiOutlineArrowLeft />} onClick={handleBack}>
            Back
          </Button>
          <h4 className="text-2xl font-semibold">Edit Company</h4>
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
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input
                      placeholder="Enter company name"
                      value={formData.name}
                      onChange={handleInputChange('name')}
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      placeholder="Enter Email address"
                      value={formData.email}
                      onChange={handleInputChange('email')}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="admin_name" className="text-sm font-medium">
                      Admin Name
                    </label>
                    <Input
                      placeholder="Enter admin name"
                      value={formData.admin_name}
                      onChange={handleInputChange('admin_name')}
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="admin_email" className="text-sm font-medium">
                      Admin Email
                    </label>
                    <Input
                      placeholder="Enter admin email"
                      value={formData.admin_email}
                      onChange={handleInputChange('admin_email')}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone Number
                    </label>
                    <Input
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={handleInputChange('phone')}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="business_type" className="text-sm font-medium">
                      Business Type
                    </label>
                    <Select
                      placeholder="Select Business type"
                      options={businessTypeOptions}
                      value={businessTypeOptions.find((option) => option.value === formData.business_type)}
                      onChange={(option) => setFormData((prev) => ({ ...prev, business_type: option?.value || '' }))}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="currency" className="text-sm font-medium">
                      Currency
                    </label>
                    <Select
                      placeholder="Select Currency type"
                      options={currencyTypeOptions}
                      value={currencyTypeOptions.find((option) => option.value === formData.currency)}
                      onChange={(option) => setFormData((prev) => ({ ...prev, currency: option?.value || '' }))}
                    />
                  </div>

                  {/* Additional fields */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="title" className="text-sm font-medium">
                      Title
                    </label>
                    <Input
                      placeholder="Enter title"
                      value={formData.title}
                      onChange={handleInputChange('title')}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="country" className="text-sm font-medium">
                      Country
                    </label>
                    <Input
                      placeholder="Enter country"
                      value={formData.country}
                      onChange={handleInputChange('country')}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="state" className="text-sm font-medium">
                      State
                    </label>
                    <Input
                      placeholder="Enter state"
                      value={formData.state}
                      onChange={handleInputChange('state')}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="street" className="text-sm font-medium">
                      Street
                    </label>
                    <Input
                      placeholder="Enter street"
                      value={formData.street_address}
                      onChange={handleInputChange('street_address')}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="facebook" className="text-sm font-medium">
                      Facebook
                    </label>
                    <Input
                      placeholder="Enter Facebook URL"
                      value={formData.facebook_url}
                      onChange={handleInputChange('facebook_url')}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="instagram" className="text-sm font-medium">
                      Instagram
                    </label>
                    <Input
                      placeholder="Enter Instagram URL"
                      value={formData.instagram_url}
                      onChange={handleInputChange('instagram_url')}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="linkedin" className="text-sm font-medium">
                      LinkedIn
                    </label>
                    <Input
                      placeholder="Enter LinkedIn URL"
                      value={formData.linkedin_url}
                      onChange={handleInputChange('linkedin_url')}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="twitter" className="text-sm font-medium">
                      Twitter
                    </label>
                    <Input
                      placeholder="Enter Twitter URL"
                      value={formData.twitter_url}
                      onChange={handleInputChange('twitter_url')}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="postalCode" className="text-sm font-medium">
                      Postal Code
                    </label>
                    <Input
                      placeholder="Enter postal code"
                      value={formData.postal_code}
                      onChange={handleInputChange('postal_code')}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="website" className="text-sm font-medium">
                      Website
                    </label>
                    <Input
                      placeholder="Enter website"
                      value={formData.website}
                      onChange={handleInputChange('website')}
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
            {loading ? 'Updating...' : 'Update Company'}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default EditCompany;
