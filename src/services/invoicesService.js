import ApiService from './ApiService'

// Create new invoice
export async function apiCreateInvoice(data) {
    return ApiService.fetchDataWithAxios({
        url: 'invoices/generate',
        method: 'post',
        data,
    })
}