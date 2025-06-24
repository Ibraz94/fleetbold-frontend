import { lazy } from 'react'
import { ADMIN, USER, SUPER_ADMIN } from '@/constants/roles.constant'

const othersRoute = [
    {
        key: 'accessDenied',
        path: `/access-denied`,
        component: lazy(() => import('@/views/others/AccessDenied')),
        authority: [ADMIN, USER, SUPER_ADMIN],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
        },
    },
    {
        key: 'landing',
        path: `/landing`,
        component: lazy(() => import('@/views/others/Landing')),
        authority: [ADMIN, USER, SUPER_ADMIN],
        meta: {
            layout: 'blank',
            footer: false,
            pageContainerType: 'gutterless',
            pageBackgroundType: 'plain',
        },
    },
]

export default othersRoute
