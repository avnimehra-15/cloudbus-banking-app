const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.static(__dirname));

let users = {};

// SIGNUP
app.post('/signup', (req, res) => {
    const { username, password, email, phone, age, gender, bank, balance } = req.body;

    if (!username || !password) {
        return res.json({ message: "Enter username & password" });
    }

    if (users[username]) {
        return res.json({ message: "User already exists" });
    }

    users[username] = {
        password,
        email,
        phone,
        age,
        gender,
        bank,
        balance: balance || 0,
        transactions: [`Account created with ₹${balance || 0}`]
    };

    res.json({ message: "Account created successfully" });
});

// LOGIN
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (users[username] && users[username].password === password) {
        res.json({ username });
    } else {
        res.json({ message: "Invalid login" });
    }
});

// PROFILE (NO TRANSACTIONS)
app.get('/profile/:user', (req, res) => {
    let user = req.params.user;

    if (!users[user]) {
        return res.json({ message: "User not found" });
    }

    let { email, phone, age, gender, bank } = users[user];
    res.json({ email, phone, age, gender, bank });
});

// BALANCE
app.get('/balance/:user', (req, res) => {
    let user = req.params.user;
    res.json({ balance: users[user]?.balance || 0 });
});

// TRANSFER
app.post('/transfer', (req, res) => {
    let { sender, receiver, bank, amount, purpose } = req.body;

    if (!users[sender]) {
        return res.json({ message: "User not found" });
    }

    if (amount > users[sender].balance) {
        return res.json({ message: "Insufficient funds" });
    }

    users[sender].balance -= amount;

    users[sender].transactions.push(
        `Sent ₹${amount} to ${receiver} (${bank}) - ${purpose}`
    );

    res.json({ balance: users[sender].balance });
});

// TRANSACTIONS
app.get('/transactions/:user', (req, res) => {
    res.json({ transactions: users[req.params.user]?.transactions || [] });
});

// HOME
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => {
    console.log("CloudBus running 🚀");
});