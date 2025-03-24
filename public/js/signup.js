const form = document.querySelector(".signup-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const signUpData = {
    username: e.target.username.value,
    email: e.target.email.value,
    password: e.target.password.value,
  };
  axios.post("http://localhost:3000/user/signup", { signUpData });
});
