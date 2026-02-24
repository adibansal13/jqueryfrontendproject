$(document).ready(function () {
  function validateEmail(email) {
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function clearErrors() {
    $(".error").text("");
  }

  // Toggle Forms
  $("#showSignup").click(function () {
    $("form").addClass("hidden");
    $("#signupForm").removeClass("hidden");
  });

  $("#showLogin").click(function () {
    $("form").addClass("hidden");
    $("#loginForm").removeClass("hidden");
  });

  $("#forgotLink").click(function () {
    $("form").addClass("hidden");
    $("#forgotForm").removeClass("hidden");
  });

  // SIGNUP
  $("#signupForm").submit(function (e) {
    e.preventDefault();
    clearErrors();
    let valid = true;

    let name = $("#signupName").val().trim();
    let email = $("#signupEmail").val().trim();
    let password = $("#signupPassword").val().trim();
    let confirmPassword = $("#signupConfirmPassword").val().trim();

    if (name === "") {
      $("#signupNameError").text("Name required");
      valid = false;
    }

    if (!validateEmail(email)) {
      $("#signupEmailError").text("Valid email required");
      valid = false;
    }

    if (password.length < 6) {
      $("#signupPasswordError").text("Password must be 6+ characters");
      valid = false;
    }

    if (password !== confirmPassword) {
      $("#signupConfirmPasswordError").text("Passwords do not match");
      valid = false;
    }

    if (valid) {
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userPassword", password);
      alert("Signup Successful!");
      $("#showLogin").click();
    }
  });

  // LOGIN
  $("#loginForm").submit(function (e) {
    e.preventDefault();
    clearErrors();
    let valid = true;

    let email = $("#loginEmail").val().trim();
    let password = $("#loginPassword").val().trim();

    if (!validateEmail(email)) {
      $("#loginEmailError").text("Valid email required");
      valid = false;
    }

    if (password === "") {
      $("#loginPasswordError").text("Password required");
      valid = false;
    }

    let storedEmail = localStorage.getItem("userEmail");
    let storedPassword = localStorage.getItem("userPassword");

    if (valid) {
      if (email === storedEmail && password === storedPassword) {
        alert("Login Successful!");
        $("form").addClass("hidden");
        $("#changePasswordForm").removeClass("hidden");
      } else {
        alert("Invalid Credentials");
      }
    }
  });

  // FORGOT PASSWORD
  $("#forgotForm").submit(function (e) {
    e.preventDefault();
    clearErrors();
    let email = $("#forgotEmail").val().trim();

    let storedEmail = localStorage.getItem("userEmail");

    if (email === storedEmail) {
      alert("Redirecting to Change Password");
      $("form").addClass("hidden");
      $("#changePasswordForm").removeClass("hidden");
    } else {
      $("#forgotEmailError").text("Email not registered");
    }
  });

  // CHANGE PASSWORD
  $("#changePasswordForm").submit(function (e) {
    e.preventDefault();
    clearErrors();
    let valid = true;

    let newPass = $("#newPassword").val().trim();
    let confirmPass = $("#confirmNewPassword").val().trim();

    if (newPass.length < 6) {
      $("#newPasswordError").text("Password must be 6+ characters");
      valid = false;
    }

    if (newPass !== confirmPass) {
      $("#confirmNewPasswordError").text("Passwords do not match");
      valid = false;
    }

    if (valid) {
      localStorage.setItem("userPassword", newPass);
      alert("Password Changed Successfully!");
      $("#showLogin").click();
    }
  });
});
