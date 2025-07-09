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

export async function apiDeleteuser(id) {
    return ApiService.fetchDataWithAxios({
        url: `/users/${id}`,
        method: 'delete',
    })
}

export async function apiSendInvitation(data) {
    return ApiService.fetchDataWithAxios({
        url: '/users/invite',
        method: 'post',
        data
    })
}
