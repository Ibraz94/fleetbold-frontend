import ApiService from './ApiService';

export async function apiFetchExpenses(params) {
    return ApiService.fetchDataWithAxios({
        url: '/expenses',
        method: 'get',
        params
    })
}

export async function apiCreateExpenses(data) {
    return ApiService.fetchDataWithAxios({
        url: '/expenses',
        method: 'post',
        data
    })
}

export async function apiDeleteExpense(id) {
    return ApiService.fetchDataWithAxios({
        url: `/expenses/${id}`,
        method: 'delete'
    })
}