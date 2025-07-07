import ApiService from './ApiService'

// Vehicle CRUD Operations
export async function apiCreateVehicle(data) {
    return ApiService.fetchDataWithAxios({
        url: '/vehicles',
        method: 'post',
        data,
    })
}

export async function apiUpdateVehicle(id, data) {
    return ApiService.fetchDataWithAxios({
        url: `/vehicles/${id}`,
        method: 'put',
        data,
    })
}

export async function apiDeleteVehicle(id) {
    return ApiService.fetchDataWithAxios({
        url: `/vehicles/${id}`,
        method: 'delete',
    })
}

export async function apiGetVehicle(id) {
    return ApiService.fetchDataWithAxios({
        url: `/vehicles/${id}`,
        method: 'get',
    })
}

export async function apiGetVehicles(params) {
    return ApiService.fetchDataWithAxios({
        url: '/vehicles',
        method: 'get',
        params,
    })
}

export async function apiBulkCreateVehicles(data) {
    return ApiService.fetchDataWithAxios({
        url: '/vehicles/bulk',
        method: 'post',
        data,
    })
}

export async function apiGetVehiclesStatistics(params) {
    return ApiService.fetchDataWithAxios({
        url: '/vehicles/statistics',
        method: 'get',
        params,
    })
}
