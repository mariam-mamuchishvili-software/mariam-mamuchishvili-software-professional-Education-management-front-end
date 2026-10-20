const TOKEN_KEY = "eduhub.college-token";

/*
 * The signed-in college member's Sanctum token, kept in localStorage so the cabinet survives
 * reloads. Storage can be unavailable (private mode, blocked site data), so every access is
 * guarded and the member simply has to sign in again.
 */

export function getCollegeToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setCollegeToken(token: string) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    // storage unavailable — the token only lives for this page view
  }
}

export function clearCollegeToken() {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    // nothing stored
  }
}
