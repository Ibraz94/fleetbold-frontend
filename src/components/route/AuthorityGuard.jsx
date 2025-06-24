import { Navigate } from 'react-router'
import useAuthority from '@/utils/hooks/useAuthority'
import { useAuth } from '@/auth'
import { useEffect, useState } from 'react'
import { SUPER_ADMIN, ADMIN, USER } from '@/constants/roles.constant'

const AuthorityGuard = (props) => {
    const { userAuthority = [], authority = [], children } = props
    const { user } = useAuth()
    const [isChecking, setIsChecking] = useState(true)

    // Use user authority from auth context as fallback
    const effectiveUserAuthority = userAuthority.length > 0 ? userAuthority : (user?.authority || [])
    
    // Check if user has required authority
    let roleMatched = useAuthority(effectiveUserAuthority, authority)

    // Special handling for super admins: they should have access to all ADMIN and USER routes
    if (!roleMatched && effectiveUserAuthority.includes(SUPER_ADMIN)) {
        // If the route requires ADMIN or USER access, allow super admin to access it
        if (authority.includes(ADMIN) || authority.includes(USER)) {
            roleMatched = true
        }
    }

    useEffect(() => {
        // Give a small delay to ensure user data is fully loaded
        const timer = setTimeout(() => {
            setIsChecking(false)
        }, 100)

        return () => clearTimeout(timer)
    }, [effectiveUserAuthority])

    // Show loading state briefly to prevent immediate redirect
    if (isChecking) {
        return null
    }

    // If no authority required, allow access
    if (!authority || authority.length === 0) {
        return children
    }

    // If role doesn't match, redirect to access denied
    if (!roleMatched) {
        return <Navigate to="/access-denied" replace />
    }

    return <>{children}</>
}

export default AuthorityGuard
