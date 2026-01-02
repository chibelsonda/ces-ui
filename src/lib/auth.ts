export function getToken() {
  return localStorage.getItem("token");
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

export function getUserRoles(): string[] {
  const token = getToken();
  if (!token) return [];

  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload["role"]
    ? Array.isArray(payload["role"])
      ? payload["role"]
      : [payload["role"]]
    : [];
}
