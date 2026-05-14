export function getInvestors(authRequest) {
  return authRequest("/api/investors?limit=100");
}

export function createInvestor(authRequest, payload) {
  return authRequest("/api/investors", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function getInvestorHoldings(authRequest, investorId) {
  return authRequest(`/api/investors/${investorId}/holdings`);
}

export function getInvestorNetWorth(authRequest, investorId) {
  return authRequest(`/api/investors/${investorId}/networth`);
}
