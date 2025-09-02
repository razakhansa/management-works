console.log("Login service loaded");


function loginUser(event) {
  event.preventDefault(); // Prevent form submission  


console.log("Login function called");
const email = event.target.email.value;
const password = event.target.password.value;
console.log("Email:", email);
console.log("Password:", password);
 
  fetch('http://localhost:3000/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        email: email,
        password: password
    })
  })
  .then(response => response.json()).catch(error => {
    console.error('Error during fetch:', error);
    alert('An error occurred. Please try again.');
  })
  .then(data => {
    if (data && data.success) {
      alert('Login successful!');
      // Redirect or perform other actions on successful login
    } else {
      alert('Login failed: ' + (data?.message || 'Unknown error'));
    }
  });    
}
 