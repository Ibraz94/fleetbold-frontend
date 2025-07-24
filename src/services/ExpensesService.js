import ApiService from './ApiService';

export async function apiFetchExpenses(params) {
    return ApiService.fetchDataWithAxios({
        url: '/expenses',
        method: 'get',
        params
    });
}

export async function apiFetchExpense(id) {
    return ApiService.fetchDataWithAxios({
        url: `/expenses/${id}`,
        method: 'get',
    });
}

export async function apiCreateExpenses(data) {
    return ApiService.fetchDataWithAxios({
        url: '/expenses',
        method: 'post',
        data
    });
}

export async function apiDeleteExpense(id) {
    return ApiService.fetchDataWithAxios({
        url: `/expenses/${id}`,
        method: 'delete'
    });
}

export async function apiUpdateExpense(id, data) {
    console.log("ID:", id, "Data:", data);
    return ApiService.fetchDataWithAxios({
        url: `/expenses/${id}`,
        method: 'put',
        data
    });
}

export async function apiOcrUpload(data) {
    return ApiService.fetchDataWithAxios({
        url: `/expenses/ocr-upload`,
        method: 'post',
        data
    });
}

// New endpoint: approve an expense
export async function apiApproveExpense(id) {
    return ApiService.fetchDataWithAxios({
        url: `/expenses/${id}/approve`,
        method: 'post'
    });
}

// New endpoint: reject an expense
export async function apiRejectExpense(id) {
    return ApiService.fetchDataWithAxios({
        url: `/expenses/${id}/reject`,
        method: 'post'
    });
}

// New endpoint: get the summary of expenses
export async function apiFetchExpenseSummary() {
    return ApiService.fetchDataWithAxios({
        url: '/expenses/summary',
        method: 'get'
    });
}

// New endpoint: process OCR for an expense
export async function apiProcessExpenseOCR(id, data) {
    return ApiService.fetchDataWithAxios({
        url: `/expenses/${id}/ocr-process`,
        method: 'post',
        data
    });
}

export async function apiExpenseSummary() {
    return ApiService.fetchDataWithAxios({
        url: `/expenses/summary`,
        method: 'get',
    });
}

// assign an expense to a reservation
export async function apiAssignExpenseToReservation(expenseId, reservationId) {
    return ApiService.fetchDataWithAxios({
        url: `/expenses/${expenseId}/assign`,
        method: 'post',
        data: { reservation_id: reservationId }
    });
}