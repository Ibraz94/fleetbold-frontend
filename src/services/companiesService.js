import ApiService from './ApiService'

// Company CRUD Operations
export async function apiCreateCompany(data) {
    return ApiService.fetchDataWithAxios({
        url: '/companies',
        method: 'post',
        data,
    })
}

export async function apiUpdateCompany(id, data) {
    return ApiService.fetchDataWithAxios({
        url: `/companies/${id}`,
        method: 'put',
        data,
    })
}

export async function apiGetCompany(id) {
    return ApiService.fetchDataWithAxios({
        url: `/companies/${id}`,
        method: 'get',
    })
}

export async function apiGetCompanies(params) {
    return ApiService.fetchDataWithAxios({
        url: '/companies',
        method: 'get',
        params,
    })
}

export async function apiActivateCompany(id) {
    return ApiService.fetchDataWithAxios({
        url: `/companies/${id}/activate`,
        method: 'post',
    })
}

export async function apiDeactivateCompany(id) {
    return ApiService.fetchDataWithAxios({
        url: `/companies/${id}/deactivate`,
        method: 'post',
    })
}

export async function apiGetCompaniesStatistics(params) {
    return ApiService.fetchDataWithAxios({
        url: '/companies/statistics',
        method: 'get',
        params,
    })
} 