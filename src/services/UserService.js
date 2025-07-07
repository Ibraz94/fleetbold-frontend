import ApiService from './ApiService';

export async function apiFetchUsers(params) {
    return ApiService.fetchDataWithAxios({
        url: '/users',
        method: 'get',
        params
    })
}

export async function apiEditRole(id, data) {
    return ApiService.fetchDataWithAxios({
    url: `/users/${id}`,
    method: 'patch',
    data
    })
}

export async function apiDeleteuser(params) {
    return ApiService.fetchDataWithAxios({
        url: '/users',
        method: 'put',
        params
    })
}