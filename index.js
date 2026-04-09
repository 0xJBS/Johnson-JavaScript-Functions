


module.exports = {
  ...(typeof createLoginTracker !== 'undefined' && { createLoginTracker })
};

/**
 * Creates a login tracker for a specific user.
 * @param {Object} userInfo - Contains username and password.
 * @returns {Function} - An arrow function that tracks login attempts.
 */
function createLoginTracker(userInfo) {
    //Initialize Attempt Count
    let attemptCount = 0;

    //Create and return nested arrow function
    return (passwordAttempt) => {
        //Increment attempt count
        attemptCount++;

        // Check if the account is already locked (exceeded 3 attempts)
        if (attemptCount > 3) {
            return "Account locked due to too many failed login attempts";
        }

        // Check if the password is correct
        if (passwordAttempt === userInfo.password) {
            return "Login successful";
        } else {
            // Password failed, but within the 3-attempt limit
            return `Attempt ${attemptCount}: Login failed`;
        }
    };
}

// Example Usage (For Testing)

const myUser = { username: "barasa", password: "moringa254" };
const login = createLoginTracker(myUser);

console.log(login("wrong1"));      // Output: Attempt 1: Login failed
console.log(login("wrong2"));      // Output: Attempt 2: Login failed
//console.log(login("wrong3"));    // Output: Attempt 3: Account locked due to too many failed login attempts.
// If you keep calling it after 3 tries, it stays locked:

console.log(login("moringa254")); // Output: Login successful
