import ApiService from './ApiService'

// Reservation CRUD Operations
export async function apigetReservations(params) {
    return ApiService.fetchDataWithAxios({
        url: '/reservations',
        method: 'get',
        params
    })
}

// Create new reservation
export async function apiCreateReservation(data) {
    return ApiService.fetchDataWithAxios({
        url: '/reservations',
        method: 'post',
        data,
    })
}
export async function apiupdateReservation(id, data) {
    return ApiService.fetchDataWithAxios({
        url: `/reservations/${id}`,
        method: 'put',
        data,
    })
}
export async function apigetReservation(id) {
    return ApiService.fetchDataWithAxios({
        url: `/reservations/${id}`,
        method: 'get',
    })
}

export async function apiDeleteReservation(id) {
    return ApiService.fetchDataWithAxios({
        url: `/reservations/${id}`,
        method: 'delete',
    })
}
