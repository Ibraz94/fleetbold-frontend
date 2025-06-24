import { Button } from '@/components/ui'
import Tabs from '@/components/ui/Tabs'
import { HiRefresh, HiShieldCheck } from 'react-icons/hi'

const { TabNav, TabList } = Tabs

const SuperAdminHeader = ({ selectedTab, onTabChange, onRefresh }) => {
    const tabs = [
        { key: 'overview', label: 'Overview' },
        { key: 'expenses', label: 'Disputed Expenses' },
        { key: 'plans', label: 'Plans & Limits' },
        { key: 'audit', label: 'Audit Logs' },
    ]

    return (
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-indigo-100 rounded-lg">
                    <HiShieldCheck className="text-indigo-600 text-xl" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Super Admin Panel</h1>
                    <p className="text-gray-600">Global oversight of all client companies and activities</p>
                </div>
            </div>
            
            <div className="flex items-center gap-4">
                <Button
                    variant="outline"
                    size="sm"
                    icon={<HiRefresh />}
                    onClick={onRefresh}
                >
                    Refresh
                </Button>
            </div>
            
            <div className="w-full lg:w-auto">
                <Tabs value={selectedTab} onChange={onTabChange}>
                    <TabList>
                        {tabs.map(tab => (
                            <TabNav key={tab.key} value={tab.key}>
                                {tab.label}
                            </TabNav>
                        ))}
                    </TabList>
                </Tabs>
            </div>
        </div>
    )
}

export default SuperAdminHeader 