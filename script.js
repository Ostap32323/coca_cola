document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".registration-form");

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");


  const savedName = getCookie("userName");
  const savedEmail = getCookie("userEmail");
  const savedPassword = getCookie("userPassword");

  if (form && savedName && savedEmail && savedPassword) {
    window.location.href = "profile.html";
    return;
  }

 
  if (nameInput) nameInput.value = savedName || "";
  if (emailInput) emailInput.value = savedEmail || "";
  if (passwordInput) passwordInput.value = savedPassword || "";


  if (nameInput) {
    nameInput.addEventListener("input", () => {
      setCookie("userName", nameInput.value, 7);
    });
  }

  if (emailInput) {
    emailInput.addEventListener("input", () => {
      setCookie("userEmail", emailInput.value, 7);
    });
  }

  if (passwordInput) {
    passwordInput.addEventListener("input", () => {
      setCookie("userPassword", passwordInput.value, 7);
    });
  }

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      if (!name || !email || !password) {
        alert("Будь ласка, заповніть усі поля.");
        return;
      }

      if (!validateEmail(email)) {
        alert("Введіть правильну електронну адресу.");
        return;
      }

      
      setCookie("userName", name, 7);
      setCookie("userEmail", email, 7);
      setCookie("userPassword", password, 7);

     
      window.location.href = "profile.html";
    });
  }

 
  const profileName = document.getElementById("profile-name");
  const profileEmail = document.getElementById("profile-email");

  if (profileName && profileEmail) {
    if (savedName && savedEmail) {
      profileName.textContent = savedName;
      profileEmail.textContent = savedEmail;
    } else {
     
      window.location.href = "register.html";
    }
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + "; expires=" + expires + "; path=/";
  }

  function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const parts = cookies[i].split("=");
      if (parts[0] === name) {
        return decodeURIComponent(parts[1]);
      }
    }
    return null;
  }
});
