import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Card, Button, Input, Select, Tabs, Spinner } from '@/components/ui';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { toast } from '@/components/ui/toast';
import Container from '@/components/shared/Container';
import { apiGetCompany } from '@/services/companiesService';

const { TabNav, TabList, TabContent } = Tabs;

const CompanyView = () => {
  const navigate = useNavigate();
  const { companyId } = useParams(); // Get the company id from the URL
  const [loading, setLoading] = useState(false); // Loading state for fetching
  const [companyData, setCompanyData] = useState({
    name: '',
    email: '',
    admin_name: '',
    admin_email: '',
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
    statistics: {},
    subscription_plan: '',
  });

  const [activeTab, setActiveTab] = useState('basic');

  // Fetch company data on page load
  useEffect(() => {
    const fetchCompany = async () => {
      setLoading(true); // Set loading to true when fetching data
      try {
        const response = await apiGetCompany(companyId);
        setCompanyData(response); // Set the data for the company
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

  const handleBack = () => {
    navigate('/super-admin/companies');
  };

  return (
    <Container>
      <div className="mb-6">
        <div className="mb-4 flex items-center gap-3">
          <Button variant="plain" size="sm" icon={<HiOutlineArrowLeft />} onClick={handleBack}>
            Back
          </Button>
          <h4 className="text-2xl font-semibold">View Company Details</h4>
        </div>
      </div>

      {/* Show a loading spinner when fetching data */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner size="lg" />
        </div>
      ) : (
        <Card>
          <Tabs value={activeTab} onChange={setActiveTab}>
            <TabList>
              <TabNav value="basic">Company Information</TabNav>
            </TabList>

            <div className="mt-6">
              <TabContent value="basic">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Company Name */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input
                      placeholder="Company name"
                      value={companyData.name}
                      readOnly
                    />
                  </div>

                  {/* Company Email */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      placeholder="Email address"
                      value={companyData.email}
                      readOnly
                    />
                  </div>

                  {/* Admin Name */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="admin_name" className="text-sm font-medium">
                      Admin Name
                    </label>
                    <Input
                      placeholder="Admin name"
                      value={companyData.admin_name}
                      readOnly
                    />
                  </div>

                  {/* Admin Email */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="admin_email" className="text-sm font-medium">
                      Admin Email
                    </label>
                    <Input
                      placeholder="Admin email"
                      value={companyData.admin_email}
                      readOnly
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone Number
                    </label>
                    <Input
                      placeholder="Phone number"
                      value={companyData.phone}
                      readOnly
                    />
                  </div>

                  {/* Title */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="title" className="text-sm font-medium">
                      Title
                    </label>
                    <Input
                      placeholder="Title"
                      value={companyData.title}
                      readOnly
                    />
                  </div>

                  {/* Country */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="country" className="text-sm font-medium">
                      Country
                    </label>
                    <Input
                      placeholder="Country"
                      value={companyData.country}
                      readOnly
                    />
                  </div>

                  {/* City */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="city" className="text-sm font-medium">
                      City
                    </label>
                    <Input
                      placeholder="City"
                      value={companyData.city}
                      readOnly
                    />
                  </div>

                  {/* State */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="state" className="text-sm font-medium">
                      State
                    </label>
                    <Input
                      placeholder="State"
                      value={companyData.state}
                      readOnly
                    />
                  </div>

                  {/* Street Address */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="street" className="text-sm font-medium">
                      Street Address
                    </label>
                    <Input
                      placeholder="Street address"
                      value={companyData.street_address}
                      readOnly
                    />
                  </div>

                  {/* Facebook URL */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="facebook" className="text-sm font-medium">
                      Facebook
                    </label>
                    <Input
                      placeholder="Facebook URL"
                      value={companyData.facebook_url || 'N/A'}
                      readOnly
                    />
                  </div>

                  {/* Instagram URL */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="instagram" className="text-sm font-medium">
                      Instagram
                    </label>
                    <Input
                      placeholder="Instagram URL"
                      value={companyData.instagram_url || 'N/A'}
                      readOnly
                    />
                  </div>

                  {/* LinkedIn URL */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="linkedin" className="text-sm font-medium">
                      LinkedIn
                    </label>
                    <Input
                      placeholder="LinkedIn URL"
                      value={companyData.linkedin_url || 'N/A'}
                      readOnly
                    />
                  </div>

                  {/* Twitter URL */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="twitter" className="text-sm font-medium">
                      Twitter
                    </label>
                    <Input
                      placeholder="Twitter URL"
                      value={companyData.twitter_url || 'N/A'}
                      readOnly
                    />
                  </div>

                  {/* Postal Code */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="postalCode" className="text-sm font-medium">
                      Postal Code
                    </label>
                    <Input
                      placeholder="Postal code"
                      value={companyData.postal_code || 'N/A'}
                      readOnly
                    />
                  </div>

                  {/* Website */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="website" className="text-sm font-medium">
                      Website
                    </label>
                    <Input
                      placeholder="Website"
                      value={companyData.website || 'N/A'}
                      readOnly
                    />
                  </div>

                  {/* Subscription Plan */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="subscription_plan" className="text-sm font-medium">
                      Subscription Plan
                    </label>
                    <Input
                      placeholder="Subscription Plan"
                      value={companyData.subscription_plan || 'N/A'}
                      readOnly
                    />
                  </div>
                </div>
              </TabContent>
            </div>
          </Tabs>
        </Card>
      )}
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="plain" onClick={handleBack}>
          Back to List
        </Button>
      </div>
    </Container>
  );
};

export default CompanyView;
