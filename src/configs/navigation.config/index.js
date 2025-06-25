import fleetBoldNavigationConfig from './fleetBold.navigation.config'
import superAdminNavigationConfig from './superAdmin.navigation.config'

const navigationConfig = [
    ...superAdminNavigationConfig,
    ...fleetBoldNavigationConfig,
]

export default navigationConfig
