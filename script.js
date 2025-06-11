document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".registration-form");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!name || !email || !password) {
        alert("Будь ласка, заповніть усі поля.");
        return;
      }

      if (!validateEmail(email)) {
        alert("Введіть правильну електронну адресу.");
        return;
      }

      
      const user = { name, email };
      localStorage.setItem("user", JSON.stringify(user));

      
      window.location.href = "profile.html";
    });
  }

 
  const profileName = document.getElementById("profile-name");
  const profileEmail = document.getElementById("profile-email");

  if (profileName && profileEmail) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      profileName.textContent = user.name;
      profileEmail.textContent = user.email;
    } else {
      window.location.href = "register.html";
    }
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});
