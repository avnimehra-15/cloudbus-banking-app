// SHOW SIGNUP (KEEP SAME UI BEHAVIOR)
function showSignup() {
    document.getElementById("extraFields").style.display = "block";

    let btn = document.getElementById("createBtn");
    btn.innerText = "Submit Account";
    btn.onclick = signup;
}

// SIGNUP (NO BACKEND)
function signup() {
    let users = JSON.parse(localStorage.getItem("users")) || {};

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let email = document.getElementById("email")?.value || "";
    let phone = document.getElementById("phone")?.value || "";
    let age = document.getElementById("age")?.value || "";
    let gender = document.getElementById("gender")?.value || "";
    let bank = document.getElementById("bank")?.value || "";
    let balance = Number(document.getElementById("initialBalance")?.value) || 0;

    if (!username || !password) {
        alert("Enter username & password");
        return;
    }

    if (users[username]) {
        alert("User already exists");
        return;
    }

    users[username] = {
        password,
        email,
        phone,
        age,
        gender,
        bank,
        balance,
        transactions: [`Account created with ₹${balance}`]
    };

    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");
}

// LOGIN (NO BACKEND)
function login() {
    let users = JSON.parse(localStorage.getItem("users")) || {};

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (users[username] && users[username].password === password) {
        localStorage.setItem("user", username);
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid login");
    }
}