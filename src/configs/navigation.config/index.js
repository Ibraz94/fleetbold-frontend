import fleetBoldNavigationConfig from './fleetBold.navigation.config'
import superAdminNavigationConfig from './superAdmin.navigation.config'
import conceptsNavigationConfig from './concepts.navigation.config'

const navigationConfig = [
    ...superAdminNavigationConfig,
    ...fleetBoldNavigationConfig,
    ...conceptsNavigationConfig,
]

export default navigationConfig
