
// ==========================================
// DISCOVER PENANG - JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. MOBILE NAVIGATION
    // ==========================================

    const menuButton = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".navbar ul");

    if (menuButton && navLinks) {
        menuButton.addEventListener("click", function () {
            navLinks.classList.toggle("open");
        });
    }


    // ==========================================
    // 2. TICKET COST CALCULATOR
    // ==========================================

    const ticketForm = document.getElementById("ticket-form");

    if (ticketForm) {

        // Attraction ticket prices
        const ticketPrices = {

            penanghill: {
                malaysian: { adult: 16, child: 8 },
                foreigner: { adult: 40, child: 20 }
            },

            warmuseum: {
                malaysian: { adult: 22, child: 12 },
                foreigner: { adult: 38, child: 20 }
            },

            fortcornwallis: {
                malaysian: { adult: 10, child: 5 },
                foreigner: { adult: 20, child: 10 }
            }

        };

        const attraction = document.getElementById("attraction");
        const citizenship = document.getElementById("citizenship");

        const adultPrice = document.getElementById("adult-price");
        const childPrice = document.getElementById("child-price");

        const expressOption = document.getElementById("express-option");
        const expressLane = document.getElementById("express-lane");

        const message = document.getElementById("calculator-message");

        // Update ticket prices automatically
        function updatePrices() {

            const selectedAttraction = attraction.value;
            const selectedCitizenship = citizenship.value;

            // Show Express Lane only for Penang Hill
            if (selectedAttraction === "penanghill") {

                expressOption.style.display = "block";

            } else {

                expressOption.style.display = "none";
                expressLane.value = "standard";

            }

            if (!selectedAttraction || !selectedCitizenship) {

                adultPrice.textContent = "RM 0.00";
                childPrice.textContent = "RM 0.00";

                return;
            }

            const prices =
                ticketPrices[selectedAttraction][selectedCitizenship];

            adultPrice.textContent =
                "RM " + prices.adult.toFixed(2);

            childPrice.textContent =
                "RM " + prices.child.toFixed(2);
        }

        attraction.addEventListener("change", updatePrices);
        citizenship.addEventListener("change", updatePrices);


        // Calculate ticket total
        ticketForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const selectedAttraction = attraction.value;
            const selectedCitizenship = citizenship.value;

            const adults = Number(
                document.getElementById("adults").value
            );

            const children = Number(
                document.getElementById("children").value
            );

            // Validate selection
            if (!selectedAttraction || !selectedCitizenship) {

                message.textContent =
                    "Please select citizenship and attraction.";

                message.style.color = "red";
                return;
            }

            // Validate visitor numbers
            if (
                !Number.isInteger(adults) ||
                !Number.isInteger(children) ||
                adults < 0 ||
                children < 0 ||
                adults > 100 ||
                children > 100 ||
                adults + children === 0
            ) {

                message.textContent =
                    "Please enter valid visitor numbers.";

                message.style.color = "red";
                return;
            }

            // Get selected attraction prices
            const prices =
                ticketPrices[selectedAttraction][selectedCitizenship];

            // Calculate adult and child tickets
            const adultTotal = adults * prices.adult;
            const childTotal = children * prices.child;

            // Calculate Express Lane
            let expressTotal = 0;

            if (
                selectedAttraction === "penanghill" &&
                expressLane.value === "express"
            ) {

                expressTotal = (adults + children) * 20;

            }

            // Calculate final amount
            const total = adultTotal + childTotal + expressTotal;

            // Get attraction and citizenship names
            const attractionName =
                attraction.options[attraction.selectedIndex].text;

            const citizenshipName =
                citizenship.options[citizenship.selectedIndex].text;

            // Display total
            document.getElementById("total").textContent =
                "RM " + total.toFixed(2);

            // Display calculation breakdown
            let breakdown =

                "Attraction: " + attractionName + "<br>" +

                "Citizenship: " + citizenshipName + "<br>" +

                adults + " Adults × RM " +
                prices.adult.toFixed(2) +
                " = RM " + adultTotal.toFixed(2) + "<br>" +

                children + " Children × RM " +
                prices.child.toFixed(2) +
                " = RM " + childTotal.toFixed(2) + "<br>";

            if (expressTotal > 0) {

                breakdown +=
                    "Express Lane: " + (adults + children) +
                    " × RM 20.00 = RM " +
                    expressTotal.toFixed(2) + "<br>";

            }

            breakdown +=
                "<strong>Total: RM " +
                total.toFixed(2) + "</strong>";

            document.getElementById("calculation-breakdown").innerHTML =
                breakdown;

            message.textContent = "Calculation successful!";
            message.style.color = "green";

        });

    }


    // ==========================================
    // 3. USER REGISTRATION
    // ==========================================

    const registerForm = document.getElementById("register-form");

    if (registerForm) {

        registerForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name = document.getElementById("full-name").value.trim();

            const email = document.getElementById("reg-email").value
                .trim().toLowerCase();

            const phone = document.getElementById("phone").value.trim();

            const password =
                document.getElementById("reg-password").value;

            const confirmPassword =
                document.getElementById("confirm-password").value;

            const message =
                document.getElementById("register-message");

            if (name.length < 2) {
                message.textContent = "Please enter your full name.";
                message.style.color = "red";
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                message.textContent = "Please enter a valid email.";
                message.style.color = "red";
                return;
            }

            if (!/^[0-9+\-\s]{8,15}$/.test(phone)) {
                message.textContent = "Please enter a valid phone number.";
                message.style.color = "red";
                return;
            }

            if (password.length < 8) {
                message.textContent =
                    "Password must contain at least 8 characters.";
                message.style.color = "red";
                return;
            }

            if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
                message.textContent =
                    "Password must contain letters and numbers.";
                message.style.color = "red";
                return;
            }

            if (password !== confirmPassword) {
                message.textContent = "Passwords do not match.";
                message.style.color = "red";
                return;
            }

            const users = JSON.parse(
                localStorage.getItem("discoverPenangUsers") || "[]"
            );

            const existingUser = users.find(
                user => user.email === email
            );

            if (existingUser) {
                message.textContent = "Email is already registered.";
                message.style.color = "red";
                return;
            }

            // Classroom demonstration only
            users.push({
                name: name,
                email: email,
                phone: phone,
                password: password
            });

            localStorage.setItem(
                "discoverPenangUsers",
                JSON.stringify(users)
            );

            message.textContent =
                "Registration successful! You can now login.";

            message.style.color = "green";

            registerForm.reset();

        });

    }


    // ==========================================
    // 4. USER LOGIN
    // ==========================================

    const loginForm = document.getElementById("login-form");

    if (loginForm) {

        loginForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const email = document.getElementById("login-email").value
                .trim().toLowerCase();

            const password =
                document.getElementById("login-password").value;

            const message =
                document.getElementById("login-message");

            const users = JSON.parse(
                localStorage.getItem("discoverPenangUsers") || "[]"
            );

            const foundUser = users.find(function (user) {

                return user.email === email &&
                    user.password === password;

            });

            if (foundUser) {

                message.textContent =
                    "Welcome " + foundUser.name + "! Login successful.";

                message.style.color = "green";

                localStorage.setItem(
                    "discoverPenangCurrentUser",
                    JSON.stringify({
                        name: foundUser.name,
                        email: foundUser.email
                    })
                );

            } else {

                message.textContent =
                    "Invalid email or password. Please register first.";

                message.style.color = "red";

            }

        });

    }

});
