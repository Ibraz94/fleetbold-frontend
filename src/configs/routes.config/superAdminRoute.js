import { lazy } from 'react'
import { SUPER_ADMIN_PREFIX_PATH } from '@/constants/route.constant'
import { SUPER_ADMIN } from '@/constants/roles.constant'

const superAdminRoute = [
    {
        key: 'superAdmin.dashboard',
        path: `${SUPER_ADMIN_PREFIX_PATH}/dashboard`,
        component: lazy(() => import('@/views/dashboards/SuperAdminDashboard')),
        authority: [SUPER_ADMIN],
        meta: {
            pageContainerType: 'contained',
        },
    },
    {
        key: 'superAdmin.companies',
        path: `${SUPER_ADMIN_PREFIX_PATH}/companies`,
        component: lazy(() => import('@/views/dashboards/SuperAdminDashboard/pages/CompanyDirectory')),
        authority: [SUPER_ADMIN],
        meta: {
            pageContainerType: 'contained',
        },
    },
    {
        key: 'superAdmin.expenses',
        path: `${SUPER_ADMIN_PREFIX_PATH}/expenses`,
        component: lazy(() => import('@/views/dashboards/SuperAdminDashboard/pages/DisputedExpenses')),
        authority: [SUPER_ADMIN],
        meta: {
            pageContainerType: 'contained',
        },
    },
    {
        key: 'superAdmin.plans',
        path: `${SUPER_ADMIN_PREFIX_PATH}/plans`,
        component: lazy(() => import('@/views/dashboards/SuperAdminDashboard/pages/PlansAndLimits')),
        authority: [SUPER_ADMIN],
        meta: {
            pageContainerType: 'contained',
        },
    },
    {
        key: 'superAdmin.audit',
        path: `${SUPER_ADMIN_PREFIX_PATH}/audit`,
        component: lazy(() => import('@/views/dashboards/SuperAdminDashboard/pages/AuditLogs')),
        authority: [SUPER_ADMIN],
        meta: {
            pageContainerType: 'contained',
        },
    },
    {
        key: 'superAdmin.billing',
        path: `${SUPER_ADMIN_PREFIX_PATH}/billing`,
        component: lazy(() => import('@/views/dashboards/SuperAdminDashboard/pages/BillingOverview')),
        authority: [SUPER_ADMIN],
        meta: {
            pageContainerType: 'contained',
        },
    },
    {
        key: 'addCompanies',
        path: `${SUPER_ADMIN_PREFIX_PATH}/company/add`,
        component: lazy(() => import('@/views/dashboards/SuperAdminDashboard/pages/AddCompanies')),
        authority: [SUPER_ADMIN],
        meta: {
            pageContainerType: 'contained',
        },
    },
    {
        key: 'manageCompanies',
       path: `${SUPER_ADMIN_PREFIX_PATH}/company/manage/:companyId`,
        component: lazy(() => import('@/views/dashboards/SuperAdminDashboard/pages/EditCompanies')),
        authority: [SUPER_ADMIN],
        meta: {
            pageContainerType: 'contained',
        },
    },
    {
        key: 'viewCompany',
       path: `${SUPER_ADMIN_PREFIX_PATH}/company/view/:companyId`,
        component: lazy(() => import('@/views/dashboards/SuperAdminDashboard/pages/ViewCompany')),
        authority: [SUPER_ADMIN],
        meta: {
            pageContainerType: 'contained',
        },
    },
    {
        key: 'fetchUsers',
        path: `${SUPER_ADMIN_PREFIX_PATH}/users/view`,
        component: lazy(() => import('@/views/dashboards/SuperAdminDashboard/pages/UserManagement')),
        authority: [SUPER_ADMIN],
        meta: {
            pageContainerType: 'contained',
        },
    },
]

export default superAdminRoute 