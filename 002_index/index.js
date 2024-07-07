
function validateForm(event) {
    event.preventDafault();
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const birthDate = document.getElementById("birth-date").value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const agree = document.getElementById("agree").checked;
    if (password !== confirmPassword) {
        alert("Passwords do not match!")
        return false;
    }
    if (password.lenght < 8) {
        alert("Password must contain at least 8 charpters!")
        return false;
    }
    if (!firstName || !lastName || !email || !password || !confirmPassword || !birthDate || !gender || !agree) {
        alert("Please fill in all field")
        return false;
    }
    alert("Thanks for registration ${firstName} ${lastName}! Your data sucessfuly updated.")
    return true;
}