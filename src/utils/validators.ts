
const isValidUPI = (upi: string) => {}

/**
 * Validates a username based on the following rules:
 * - Must start with a letter (a–z or A–Z)
 * - Can contain letters, digits, and underscores
 * - Must be between 3 and 20 characters long
 * - Cannot contain double underscores `__`
 * - Cannot end with an underscore `_`
 * - Cannot contain double periods `..` (future-proofed)
 *
 * @param {string} username - The username to validate
 * @returns {boolean} - Returns true if the username is valid, false otherwise
 */

function isValidUsername(username: string): boolean {
  const usernameRegex = /^(?!.*__)(?!.*\.\.)(?!.*_$)[a-zA-Z][a-zA-Z0-9_]{2,19}$/;
  return usernameRegex.test(username);
}

/**
 * Validates an email address using a regular expression.
 * Accepts most common email formats:
 * - username@domain.com
 * - first.last@sub.domain.co
 * - user+alias@domain.org
 *
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}
