(function () {
  'use strict';

  /** @type {HTMLFormElement | null} */
  const form = document.getElementById('registrationForm');
  if (!form) return;

  const firstName = /** @type {HTMLInputElement} */ (document.getElementById('firstName'));
  const lastName = /** @type {HTMLInputElement} */ (document.getElementById('lastName'));
  const email = /** @type {HTMLInputElement} */ (document.getElementById('email'));
  const password = /** @type {HTMLInputElement} */ (document.getElementById('password'));
  const confirmPassword = /** @type {HTMLInputElement} */ (document.getElementById('confirmPassword'));
  const terms = /** @type {HTMLInputElement} */ (document.getElementById('terms'));
  const submitBtn = /** @type {HTMLButtonElement} */ (document.getElementById('submitBtn'));
  const successFeedback = document.getElementById('formSuccess');

  function setError(id, message) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = message || '';
  }

  function clearErrors() {
    setError('firstName-error', '');
    setError('lastName-error', '');
    setError('email-error', '');
    setError('password-error', '');
    setError('confirmPassword-error', '');
    setError('terms-error', '');
  }

  function isEmailValid(value) {
    // Simple robust email pattern for demo
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return pattern.test(value);
  }

  function isPasswordStrong(value) {
    if (value.length < 8) return false;
    const hasLetter = /[A-Za-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    return hasLetter && hasNumber;
  }

  function validate() {
    clearErrors();
    let valid = true;

    if (!firstName.value.trim()) {
      setError('firstName-error', 'First name is required.');
      valid = false;
    }
    if (!lastName.value.trim()) {
      setError('lastName-error', 'Last name is required.');
      valid = false;
    }

    if (!email.value.trim()) {
      setError('email-error', 'Email is required.');
      valid = false;
    } else if (!isEmailValid(email.value.trim())) {
      setError('email-error', 'Enter a valid email address.');
      valid = false;
    }

    if (!password.value) {
      setError('password-error', 'Password is required.');
      valid = false;
    } else if (!isPasswordStrong(password.value)) {
      setError('password-error', 'Password must be 8+ chars and include a letter and a number.');
      valid = false;
    }

    if (!confirmPassword.value) {
      setError('confirmPassword-error', 'Please confirm your password.');
      valid = false;
    } else if (confirmPassword.value !== password.value) {
      setError('confirmPassword-error', 'Passwords do not match.');
      valid = false;
    }

    if (!terms.checked) {
      setError('terms-error', 'You must agree to the terms to continue.');
      valid = false;
    }

    return valid;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!validate()) return;

    submitBtn.disabled = true;

    // Simulate async submit
    window.setTimeout(function () {
      if (successFeedback) {
        successFeedback.hidden = false;
      }
      form.reset();
      submitBtn.disabled = false;
    }, 600);
  });
})();
