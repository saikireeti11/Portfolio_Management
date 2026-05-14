export function getFunds(authRequest) {
  return authRequest("/api/funds?limit=100");
}

export function createFund(authRequest, payload) {
  return authRequest("/api/funds", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function updateFundNav(authRequest, fundId, latestNav) {
  return authRequest(`/api/funds/${fundId}/nav`, {
    method: "PUT",
    body: JSON.stringify({ latest_nav: latestNav })
  });
}
