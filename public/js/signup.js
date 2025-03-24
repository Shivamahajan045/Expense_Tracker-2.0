const form = document.querySelector(".signup-form");
const errMsg = document.createElement("p");
errMsg.classList.add("text-red-500", "mt-2");
form.appendChild(errMsg);
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const signUpData = {
    username: e.target.username.value,
    email: e.target.email.value,
    password: e.target.password.value,
  };

  try {
    let response = await axios.post(
      "http://localhost:3000/user/signup",
      signUpData
    );
    console.log("Full Response Object:", response); // Debugging
    console.log("Response Data:", response.data); // Debugging
    console.log("Response Message:", response.data.message); // This should now print
    errMsg.textContent = "";
    form.reset();
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data.message) {
      errMsg.textContent = error.response.data.message; // Show error message below form
    } else {
      errMsg.textContent = "Something went wrong. Please try again.";
    }
  }
});
