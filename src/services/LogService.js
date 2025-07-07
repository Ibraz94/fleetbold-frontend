import ApiService from './ApiService'

export async function apiGetLog(params) {
    return ApiService.fetchDataWithAxios({
        url: '/auth/activity-logs',
        method: 'get',
        params,
    })
}

// Keep the old function for backward compatibility
export async function apiGetLogs(params) {
    return apiGetLog(params)
}
