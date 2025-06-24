import { lazy } from 'react'
import { FLEETBOLD_PREFIX_PATH } from '@/constants/route.constant'
import { ADMIN, USER } from '@/constants/roles.constant'

const fleetBoldRoute = [
    {
        key: 'fleetBold.dashboard',
        path: `${FLEETBOLD_PREFIX_PATH}/dashboard`,
        component: lazy(() => import('@/views/fleetBold/Dashboard')),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },
    {
        key: 'fleetBold.search',
        path: `${FLEETBOLD_PREFIX_PATH}/search`,
        component: lazy(() => import('@/views/fleetBold/Search')),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },
    {
        key: 'fleetBold.reservations',
        path: `${FLEETBOLD_PREFIX_PATH}/reservations`,
        component: lazy(() => import('@/views/fleetBold/Reservations')),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },
    {
        key: 'fleetBold.expenses',
        path: `${FLEETBOLD_PREFIX_PATH}/expenses`,
        component: lazy(() => import('@/views/fleetBold/Expenses')),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },
    {
        key: 'fleetBold.invoices',
        path: `${FLEETBOLD_PREFIX_PATH}/invoices`,
        component: lazy(() => import('@/views/fleetBold/Invoices')),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },
    {
        key: 'fleetBold.export',
        path: `${FLEETBOLD_PREFIX_PATH}/export`,
        component: lazy(() => import('@/views/fleetBold/Export')),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },
    {
        key: 'fleetBold.users',
        path: `${FLEETBOLD_PREFIX_PATH}/users`,
        component: lazy(() => import('@/views/fleetBold/Users')),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },
    {
        key: 'fleetBold.settings',
        path: `${FLEETBOLD_PREFIX_PATH}/settings`,
        component: lazy(() => import('@/views/fleetBold/Settings')),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },
]

export default fleetBoldRoute 