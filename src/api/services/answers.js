export default (api) => ({
  getIssueAnswer: (id) =>
    api.get(
      `/questions/${id}/answers?order=desc&sort=activity&site=stackoverflow&filter=!*MZqiH2sG_7iJpC*`
    ),
})
