import { Navigate, Outlet } from 'react-router'
import appConfig from '@/configs/app.config'
import { useAuth } from '@/auth'
import { SUPER_ADMIN } from '@/constants/roles.constant'

const { authenticatedEntryPath } = appConfig

const PublicRoute = () => {
    const { authenticated, user } = useAuth()

    if (authenticated) {
        // Check if user is super admin and redirect accordingly
        if (user?.authority?.includes(SUPER_ADMIN)) {
            return <Navigate to="/super-admin/dashboard" />
        }
        return <Navigate to={authenticatedEntryPath} />
    }

    return <Outlet />
}

export default PublicRoute
