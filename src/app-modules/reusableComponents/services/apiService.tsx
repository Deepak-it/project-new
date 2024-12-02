import { API_ENDPOINTS } from '../apiEndpoints/api-endpoints.tsx';
import { customAxios } from './useExpressApi.tsx';
export const apiService = {
    addDocument: (data: any) => {
        return customAxios.post(`${API_ENDPOINTS.ADD_DOCUMENT}`, data)
    },

    getDocument: () => {
        return customAxios.get(`${API_ENDPOINTS.GET_DOCUMENT}`)
    },

    getDocumentById: (data: any) => {
        return customAxios.post(`${API_ENDPOINTS.GET_DOCUMENT_BY_ID}`, data)
    },

    login: (data: any) => {
        return customAxios.post(`${API_ENDPOINTS.LOGIN}`, data)
    },

    addStaff: (data: any) => {
        return customAxios.post(`${API_ENDPOINTS.ADD_STAFF}`, data)
    },

    getStaff: () => {
        return customAxios.get(`${API_ENDPOINTS.GET_STAFF}`)
    },

    deleteStaff: (data: { staffId: string }) => {
        return customAxios.delete(API_ENDPOINTS.DELETE_STAFF, {
            data: {
              staffId: data.staffId
            }
          });
    },

    getStaffById: (data: any) => {
        return customAxios.post(`${API_ENDPOINTS.GET_STAFF_BY_ID}`, data)
    },

    updateStaff: (data: any) => {
        return customAxios.post(`${API_ENDPOINTS.UPDATE_STAFF}`, data)
    },

    approveUnapproveDoc: (data: any) => {
        return customAxios.post(`${API_ENDPOINTS.APPROVE_UNAPPROVE_DOC}`, data)
    },

    getCommentsByDocumentId: (data: any) => {
        return customAxios.get(`${API_ENDPOINTS.GET_COMMENTS_BY_DOC_ID}?id=${data?.id}`);
    },

    addComment: (data: any) => {
        return customAxios.post(`${API_ENDPOINTS.ADD_DOC_COMMENT}`, data)
    },

}