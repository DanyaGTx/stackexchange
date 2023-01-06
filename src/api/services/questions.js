export default api => ({
    getIssuesWithSort: ( params ) => api.get(`/questions`, { params }),
    getIssuesById: ( id ) => api.get(`/questions/${id}?order=desc&sort=activity&site=stackoverflow`)
})
