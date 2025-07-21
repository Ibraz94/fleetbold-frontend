import ApiService from './ApiService';

export async function apiFetchUploads(params) {
    return ApiService.fetchDataWithAxios({
        url: '/uploads',
        method: 'get',
        params,
    });
}

export async function apiFetchUpload(id) {
    return ApiService.fetchDataWithAxios({
        url: `/uploads/${id}`,
        method: 'get',
    });
}

export async function apiCreateUpload(data) {
    return ApiService.fetchDataWithAxios({
        url: '/uploads',
        method: 'post',
        data,
    });
}

export async function apiDeleteUpload(id) {
    return ApiService.fetchDataWithAxios({
        url: `/uploads/${id}`,
        method: 'delete',
    });
}

export async function apiBatchProcessUploads(data) {
    return ApiService.fetchDataWithAxios({
        url: '/uploads/batch-process',
        method: 'post',
        data,
    });
}

export async function apiProcessUploadOCR(id, data) {
    return ApiService.fetchDataWithAxios({
        url: `/uploads/${id}/process-ocr`,
        method: 'post',
        data,
    });
}
