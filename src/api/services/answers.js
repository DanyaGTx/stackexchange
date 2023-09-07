export default (api) => ({
  getIssueAnswer: (id, pageSize = 2) =>
    api.get(
      `/questions/${id}/answers?order=desc&sort=activity&filter=!*MZqiH2sG_7iJpC*&pagesize=${pageSize}`
    ),
})
