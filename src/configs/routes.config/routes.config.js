import dashboardsRoute from './dashboardsRoute'
import conceptsRoute from './conceptsRoute'
import uiComponentsRoute from './uiComponentsRoute'
import authRoute from './authRoute'
import authDemoRoute from './authDemoRoute'
import guideRoute from './guideRoute'
import othersRoute from './othersRoute'
import fleetBoldRoute from './fleetBoldRoute'
import superAdminRoute from './superAdminRoute'

export const publicRoutes = [...authRoute]

export const protectedRoutes = [
    ...dashboardsRoute,
    ...conceptsRoute,
    ...uiComponentsRoute,
    ...authDemoRoute,
    ...guideRoute,
    ...othersRoute,
    ...fleetBoldRoute,
    ...superAdminRoute,
]
