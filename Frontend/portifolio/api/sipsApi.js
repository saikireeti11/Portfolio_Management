export function getSips(authRequest) {
  return authRequest("/api/sips?limit=100");
}

export function createSip(authRequest, payload) {
  return authRequest("/api/sips", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function processSip(authRequest, sipId) {
  return authRequest(`/api/sips/${sipId}/process`, {
    method: "POST"
  });
}

export function getSipTransactions(authRequest, sipId) {
  return authRequest(`/api/sips/${sipId}/transactions`);
}
