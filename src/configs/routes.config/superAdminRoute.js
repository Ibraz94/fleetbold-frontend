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
]

export default superAdminRoute 