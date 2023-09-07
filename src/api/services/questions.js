export default (api) => ({
  getIssuesWithSort: (params) => api.get('/questions', { params }),
  getIssuesWithFilters: (params) => api.get('/questions', { params }),
  getIssuesWithSearch: (search) =>
    api.get(`/search?order=desc&sort=activity&intitle=${search}`),
  getIssuesById: (id) => api.get(`/questions/${id}?order=desc&sort=activity`),
  getIssues: () => api.get('/questions'),
})
