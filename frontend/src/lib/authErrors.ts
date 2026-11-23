// Turns a Firebase error into a short, friendly sentence. Returns "" when there is nothing to tell the user.
function codeOf(error: unknown): string {
  if (typeof error === "object" && error !== null && "code" in error) {
    return String((error as { code: unknown }).code);
  }
  return "";
}

export function authErrorMessage(error: unknown): string {
  switch (codeOf(error)) {
    // With "email enumeration protection" on, a wrong password and an unknown email look the same on purpose.
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "That email and password don't match. Please check them and try again.";
    case "auth/invalid-email":
      return "That doesn't look like a valid email address.";
    case "auth/email-already-in-use":
      return "An account with that email already exists. Try signing in instead.";
    case "auth/weak-password":
      return "Please choose a password with at least 6 characters.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a few minutes and try again.";
    case "auth/network-request-failed":
      return "We couldn't reach the server. Check your internet connection and try again.";
    case "auth/popup-closed-by-user":
      return "The Google window was closed before sign-in finished.";
    case "auth/popup-blocked":
      return "Your browser blocked the Google sign-in window. Allow pop-ups for this site and try again.";
    case "auth/cancelled-popup-request":
      return ""; // a second click while a window was already open: nothing to say
    case "auth/operation-not-allowed":
      return "This sign-in method isn't turned on yet.";
    case "auth/unauthorized-domain":
      return "Sign-in isn't set up for this web address yet.";
    case "permission-denied":
      return "You don't have permission to do that.";
    case "unavailable":
      return "We couldn't reach the database. Check your connection and try again.";
    case "app/invalid-org-name":
      return "Please enter an organization name (1 to 80 characters).";
    case "app/unavailable":
      return "Sign-in isn't available right now. Please try again later.";
    default:
      return "Something went wrong. Please try again.";
  }
}
