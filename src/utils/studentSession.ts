const TOKEN_KEY = "eduhub.student-token";

/*
 * The signed-in student's Sanctum token, kept in localStorage so the cabinet survives reloads.
 * Storage can be unavailable (private mode, blocked site data), so every access is guarded and
 * the student simply has to sign in again.
 */

export function getStudentToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setStudentToken(token: string) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    // storage unavailable — the token only lives for this page view
  }
}

export function clearStudentToken() {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    // nothing stored
  }
}
