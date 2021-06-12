import { loginFormHandler } from './utils/form-utils.js';

window.onload = () => {
  const loginForm = document.getElementById("loginForm");
  loginForm.addEventListener("submit", loginFormHandler);
}

