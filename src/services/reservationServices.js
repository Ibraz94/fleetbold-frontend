import ApiService from './ApiService'

// Reservation CRUD Operations
export async function apigetReservations() {
    return ApiService.fetchDataWithAxios({
        url: '/reservations',
        method: 'get',
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
export async function apiupdateReservation(data) {
    return ApiService.fetchDataWithAxios({
        url: '/reservations',
        method: 'patch',
        data,
    })
}
export async function apigetReservation(id) {
    return ApiService.fetchDataWithAxios({
        url: `/reservations/${id}`,
        method: 'get',
    })
}