import { Navigate } from 'react-router'
import useAuthority from '@/utils/hooks/useAuthority'
import { useAuth } from '@/auth'
import { useEffect, useState } from 'react'
import { SUPER_ADMIN } from '@/constants/roles.constant'

const AuthorityGuard = (props) => {
    const { userAuthority = [], authority = [], children } = props
    const { user } = useAuth()
    const [isChecking, setIsChecking] = useState(true)

    // Use user authority from auth context as fallback
    const effectiveUserAuthority = userAuthority.length > 0 ? userAuthority : (user?.authority || [])
    
    const roleMatched = useAuthority(effectiveUserAuthority, authority)

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

    // If role doesn't match, determine where to redirect
    if (!roleMatched) {
        // If user is super admin but trying to access a regular route, redirect to super admin dashboard
        if (effectiveUserAuthority.includes(SUPER_ADMIN) && !authority.includes(SUPER_ADMIN)) {
            return <Navigate to="/super-admin/dashboard" replace />
        }
        
        // Otherwise, redirect to access denied
        return <Navigate to="/access-denied" replace />
    }

    return <>{children}</>
}

export default AuthorityGuard
