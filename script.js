function showSignup() {
    document.getElementById("extraFields").style.display = "block";

    let btn = document.getElementById("createBtn");
    btn.innerText = "Submit Account";
    btn.onclick = signup;
}

async function signup() {
    let data = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        age: document.getElementById("age").value,
        gender: document.getElementById("gender").value,
        bank: document.getElementById("bank").value,
        balance: Number(document.getElementById("initialBalance").value)
    };

    if (!data.username || !data.password) {
        alert("Enter username & password");
        return;
    }

    let res = await fetch("/signup", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });

    let result = await res.json();
    alert(result.message);
}

async function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    let res = await fetch("/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username: user, password: pass })
    });

    let data = await res.json();

    if (data.username) {
        localStorage.setItem("user", data.username);
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid login");
    }
}