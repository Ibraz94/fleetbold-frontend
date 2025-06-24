import { superAdminData } from '../data/superAdminData'

export default {
    getSuperAdminDashboard: () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(superAdminData)
            }, 500)
        })
    },
} 