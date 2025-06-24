export const superAdminData = {
    companies: [
        {
            id: 1,
            name: 'TechCorp Inc.',
            email: 'admin@techcorp.com',
            logo: '/img/avatars/thumb-1.jpg',
            planType: 'Premium',
            activeUsers: 45,
            totalUsers: 50,
            totalVehicles: 120,
            totalReservations: 2340,
            status: 'Active',
            lastActive: '2 hours ago',
            monthlyCost: 149,
            customBranding: true,
            userLimit: 50,
            exportRetention: 365
        },
        {
            id: 2,
            name: 'Global Fleet Solutions',
            email: 'admin@globalfleet.com',
            logo: '/img/avatars/thumb-2.jpg',
            planType: 'Business',
            activeUsers: 28,
            totalUsers: 35,
            totalVehicles: 85,
            totalReservations: 1200,
            status: 'Active',
            lastActive: '1 day ago',
            monthlyCost: 79,
            customBranding: false,
            userLimit: 35,
            exportRetention: 90
        },
        {
            id: 3,
            name: 'FleetMax Industries',
            email: 'admin@fleetmax.com',
            logo: '/img/avatars/thumb-3.jpg',
            planType: 'Basic',
            activeUsers: 12,
            totalUsers: 15,
            totalVehicles: 35,
            totalReservations: 480,
            status: 'Trial',
            lastActive: '3 hours ago',
            monthlyCost: 29,
            customBranding: false,
            userLimit: 15,
            exportRetention: 30
        },
        {
            id: 4,
            name: 'Metro Transport Co.',
            email: 'admin@metrotransport.com',
            logo: '/img/avatars/thumb-4.jpg',
            planType: 'Business',
            activeUsers: 0,
            totalUsers: 25,
            totalVehicles: 60,
            totalReservations: 890,
            status: 'Suspended',
            lastActive: '2 weeks ago',
            monthlyCost: 79,
            customBranding: true,
            userLimit: 25,
            exportRetention: 90
        },
        {
            id: 5,
            name: 'Swift Logistics',
            email: 'admin@swiftlogistics.com',
            logo: '/img/avatars/thumb-5.jpg',
            planType: 'Premium',
            activeUsers: 67,
            totalUsers: 75,
            totalVehicles: 200,
            totalReservations: 4500,
            status: 'Active',
            lastActive: '30 minutes ago',
            monthlyCost: 149,
            customBranding: true,
            userLimit: 75,
            exportRetention: 365
        }
    ],
    auditLogs: [
        {
            id: 1,
            user: 'John Smith',
            userAvatar: '/img/avatars/thumb-6.jpg',
            company: 'TechCorp',
            action: 'Updated vehicle assignment for Fleet Vehicle #TC-001',
            actionType: 'Edit',
            module: 'Reservations',
            time: '2 hours ago',
            beforeAfter: {
                before: 'Driver: Mike Johnson',
                after: 'Driver: Sarah Wilson'
            }
        },
        {
            id: 2,
            user: 'Emma Davis',
            userAvatar: '/img/avatars/thumb-7.jpg',
            company: 'GlobalFleet',
            action: 'Exported monthly expense report',
            actionType: 'Export',
            module: 'Reports',
            time: '4 hours ago',
            beforeAfter: null
        },
        {
            id: 3,
            user: 'Admin User',
            userAvatar: '/img/avatars/thumb-8.jpg',
            company: 'FleetMax',
            action: 'Changed user role from User to Admin',
            actionType: 'Role Change',
            module: 'Users',
            time: '6 hours ago',
            beforeAfter: {
                before: 'Role: User',
                after: 'Role: Admin'
            }
        },
        {
            id: 4,
            user: 'Michael Brown',
            userAvatar: '/img/avatars/thumb-9.jpg',
            company: 'TechCorp',
            action: 'Deleted expired toll transaction record',
            actionType: 'Delete',
            module: 'Expenses',
            time: '8 hours ago',
            beforeAfter: {
                before: 'Transaction ID: TXN-12345',
                after: 'Record deleted'
            }
        },
        {
            id: 5,
            user: 'Lisa Chen',
            userAvatar: '/img/avatars/thumb-10.jpg',
            company: 'Swift Logistics',
            action: 'Created new vehicle maintenance schedule',
            actionType: 'Create',
            module: 'Maintenance',
            time: '12 hours ago',
            beforeAfter: null
        },
        {
            id: 6,
            user: 'David Wilson',
            userAvatar: '/img/avatars/thumb-11.jpg',
            company: 'GlobalFleet',
            action: 'Updated company billing information',
            actionType: 'Edit',
            module: 'Settings',
            time: '1 day ago',
            beforeAfter: {
                before: 'Payment Method: **** 1234',
                after: 'Payment Method: **** 5678'
            }
        }
    ],
    disputedExpenses: {
        tolls: [
            {
                id: 1,
                company: 'TechCorp',
                vehicle: 'TC-001',
                description: 'Highway 101 Toll',
                location: 'San Francisco, CA',
                amount: 12.50,
                date: '2024-01-15',
                status: 'Disputed',
                daysOverdue: 15
            },
            {
                id: 2,
                company: 'GlobalFleet',
                vehicle: 'GF-045',
                description: 'Bridge Toll Fee',
                location: 'Oakland, CA',
                amount: 8.75,
                date: '2024-01-10',
                status: 'Expired',
                daysOverdue: 20
            }
        ],
        tickets: [
            {
                id: 3,
                company: 'FleetMax',
                vehicle: 'FM-012',
                description: 'Speeding Violation',
                location: 'Interstate 5',
                amount: 250.00,
                date: '2024-01-08',
                status: 'Disputed',
                daysOverdue: 22
            },
            {
                id: 4,
                company: 'Metro Transport',
                vehicle: 'MT-089',
                description: 'Parking Violation',
                location: 'Downtown LA',
                amount: 75.00,
                date: '2024-01-12',
                status: 'Expired',
                daysOverdue: 18
            }
        ],
        invoices: [
            {
                id: 5,
                company: 'Swift Logistics',
                vehicle: 'SL-156',
                description: 'Fuel Surcharge Dispute',
                location: 'Various Locations',
                amount: 450.00,
                date: '2024-01-05',
                status: 'Disputed',
                daysOverdue: 25
            }
        ]
    },
    stats: {
        totalCompanies: 247,
        activeUsers: 1289,
        pendingIssues: 23,
        monthlyRevenue: 145600,
        suspendedCompanies: 5,
        disputedExpenses: 12
    }
} 