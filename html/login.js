document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the username and password from the form
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Create an object to hold the login data
    const loginData = {
        name: username, // Use 'name' instead of 'username' to match your LoginRequest DTO
        password: password
    };

    // Send the login data to the server for validation
    fetch('http://localhost:2222/api/login/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => {
        console.log("Response Status Code:", response.status); // Log the response status code
        if (response.status === 200 || response.status === 201) {
            response.json().then(data => {
                const customerId = data.custId;
                const isAdmin = data.isAdmin === 1; // Convert admin to boolean

                console.log(isAdmin)
                // Store both values in localStorage
                localStorage.setItem("customerId", customerId);
                localStorage.setItem("isAdmin", isAdmin);

                // Now you can access customerId and isAdmin as needed
                console.log("Customer ID:", customerId);
                console.log("Is Admin:", isAdmin);

                // Redirect to the appropriate page (e.g., dashboard)
                window.location.href = "index.html";
            });
        } else if (response.status === 401) {
            // Authentication failed
            alert("Authentication failed. Please check your username and password.");
        } else {
            // Handle other response status codes as needed
            alert("An error occurred. Please try again later.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("An error occurred. Please try again later.");
    });
});
