import ApiService from './ApiService'

export async function apiGetLogs(params) {
    return ApiService.fetchDataWithAxios({
        url: 'auth/activity-logs',
        method: 'get',
        params,
    })
}
