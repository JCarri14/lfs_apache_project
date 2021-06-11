import { loginFormHandler } from './utils/form-utils.js';

const state = {
  isLoggedIn: false,
  currentUser: null,
};

window.onload = () => {

  const loginForm = document.getElementById("loginForm");
  loginForm.addEventListener("submit", loginFormHandler);
}

