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
        key: 'fleetBold.vehicles',
        path: `${FLEETBOLD_PREFIX_PATH}/vehicles`,
        component: lazy(() => import('@/views/fleetBold/Vehicles')),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },
    {
        key: 'fleetBold.vehicles.add',
        path: `${FLEETBOLD_PREFIX_PATH}/vehicles/add`,
        component: lazy(() => import('@/views/fleetBold/Vehicles/AddVehicle')),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },
    {
        key: 'fleetBold.vehicles.detail',
        path: `${FLEETBOLD_PREFIX_PATH}/vehicles/:id`,
        component: lazy(() => import('@/views/fleetBold/Vehicles/VehicleDetail')),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },
    {
        key: 'fleetBold.vehicles.edit',
        path: `${FLEETBOLD_PREFIX_PATH}/vehicles/edit/:id`,
        component: lazy(() => import('@/views/fleetBold/Vehicles/EditVehicle')),
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
        key: 'fleetBold.reservations',
        path: `${FLEETBOLD_PREFIX_PATH}/reservations/add`,
        component: lazy(() => import('@/views/fleetBold/Reservations/AddReservations')),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },
    {
        key: 'fleetBold.editreservations',
        path: `${FLEETBOLD_PREFIX_PATH}/reservations/edit`,
        component: lazy(() => import('@/views/fleetBold/Reservations/EditReservations')),
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