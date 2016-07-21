"use strict";
const SCRIPT_INJECT = /.*<script>.*/g;
const VALID_PASSWORD = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z !@#$%^&*()-_=+\[\[{}|\\;:'",<.>/?`~\d]{8,}$/;

function login() {
  validateEmail();
  validatePassword();
}

function validateEmail() {
  var validEmail = /^(([0-9a-zA-Z\!#\$%&'\*\+\-\/\=\?\^_`\{\|\}~("")]+?\.)*[0-9a-zA-Z\!#\$%&'\*\+\-\/\=\?\^_`\{\|\}~("")]+?)@(?:(?:(:?[0-9a-zA-Z\-]+\.)*[0-9a-zA-Z\-]+)|(?:\[.+?\]))$/g;
  var emailObject = document.getElementsByName('email')[0];
  var errorMsgObject = document.getElementById('emailError');
  errorMsgObject.innerHTML = "";
  var email = emailObject.value;
  email.trim();
  if (email === "") {
    emptyError("Email", emailObject, errorMsgObject);
  } else if (!validEmail.test(email)) {
    invalidError("Email", emailObject, errorMsgObject);
  } else {
    emailObject.setAttribute("class", "greenBorder");
    return 1;
  }
}

function emptyError(fieldName, fieldObject, errorMsgObject) {
  fieldObject.setAttribute("class", "redBorder");
  errorMsgObject.innerHTML = fieldName + " required";
}

function invalidError(fieldName, fieldObject, errorMsgObject) {
  fieldObject.setAttribute("class", "redBorder");
  errorMsgObject.innerHTML = fieldName + " is invalid";
}

function validatePassword() {
  var passwordObject = document.getElementsByName('password')[0];
  var errorMsgObject = document.getElementById('passwordError');
  errorMsgObject.innerHTML = "";
  var password = passwordObject.value;
  password = password.trim();
  if (password === "") {
    emptyError("Password", passwordObject, errorMsgObject);
  } else if (!VALID_PASSWORD.test(password)) {
    invalidError("Password", passwordObject, errorMsgObject);
  } else {
    passwordObject.setAttribute("class", "greenBorder");
  }
  return 1;
}

function register() {
//  copyAddress();
  var cross = 1;
  var firstName, lastName, email, password, confirmPassword, phone, address = 0;  
  firstName = validateFirstName();
   lastName = validateLastName();
   email = validateEmail();
  password = validatePassword();
  confirmPassword = validateConfirmPassword();
  phone = validatePhone();
  address = validatePermanentAddress();
  cross = firstName * lastName * email * password * confirmPassword * phone * address;
  if(cross === 1) {
    document.getElementById('reg').submit();
  }
}

function validateFirstName() {
  var firstNameObject = document.getElementsByName('firstName')[0];
  var firstName = firstNameObject.value;
  var nameFormat = /^[A-Za-z ,.'-]+$/i;
  var errorMsgObject = document.getElementById('firstNameError');
  errorMsgObject.innerHTML = "";
  firstName = firstName.trim();
  if (firstName === "") {
    emptyError("First name", firstNameObject, errorMsgObject);
  } else if (!nameFormat.test(firstName) || SCRIPT_INJECT.test(name)) {
    invalidError("First name", firstNameObject, errorMsgObject);
  } else {
    firstNameObject.setAttribute("class", "greenBorder");
    return 1;
  }
}

function validateLastName() {
  var lastNameObject = document.getElementsByName('lastName')[0];
  var lastName = lastNameObject.value;
  var nameFormat = /^[a-zA-Z ,.'-]+$/i;
  var errorMsgObject = document.getElementById('lastNameError');
  errorMsgObject.innerHTML = "";
  lastName = lastName.trim();
  if (lastName === "") {
    emptyError("Last name", lastNameObject, errorMsgObject);
  } else if (!nameFormat.test(lastName) || SCRIPT_INJECT.test(lastName)) {
    invalidError("Last name", lastNameObject, errorMsgObject);
  } else {
    lastNameObject.setAttribute("class", "greenBorder");
    return 1;
  }
}

function validateConfirmPassword() {
  var confirmPasswordObject = document.getElementsByName('confirmPassword')[0];
  var confirmPassword = confirmPasswordObject.value;
  var passwordObject = document.getElementsByName('password')[0];
  var password = passwordObject.value;
  var errorMsgObject = document.getElementById('confirmPasswordError');
  errorMsgObject.innerHTML = "";
  confirmPassword = confirmPassword.trim();
  password = password.trim();
  if (confirmPassword === "") {
    emptyError("Password confirmation", confirmPasswordObject, errorMsgObject);
  } else if (!(password === confirmPassword)) {
    invalidError("Password confirmation", confirmPasswordObject, errorMsgObject);
  } else if (VALID_PASSWORD.test(confirmPassword) && password === confirmPassword) {
    confirmPasswordObject.setAttribute("class", "greenBorder");
  } else if (!VALID_PASSWORD.test(confirmPassword)) {
    confirmPasswordObject.value = "";
  }
  return 1;
}

function validatePhone() {
  var phoneObject = document.getElementsByName('phone')[0];
  var phone = phoneObject.value;
  var errorMsgObject = document.getElementById('phoneError');
  errorMsgObject.innerHTML = "";
  phone = phone.trim();
  phone = phone.replace(/-/g, "");
  var validPhoneNumber = /\d{10}/;
  if (phone === "") {
    emptyError("Phone number", phoneObject, errorMsgObject);
  } else if (!validPhoneNumber.test(phone) || phone.length != 10 || SCRIPT_INJECT.test(phone)) {
    invalidError("Phone number", phoneObject, errorMsgObject);
  } else {
    phoneObject.setAttribute("class", "greenBorder");
  }
  return 1;
}

function validatePermanentAddress() {
  var permanentAddressObject = document.getElementsByName('permanentAddress')[0];
  var permanentAddress = permanentAddressObject.value;
  var errorMsgObject = document.getElementById('permanentAddressError');
  errorMsgObject.innerHTML = "";
  permanentAddress = permanentAddress.trim();
  if (permanentAddress === "") {
    emptyError("Permanent address", permanentAddressObject, errorMsgObject);
  } else if (SCRIPT_INJECT.test(permanentAddress)) {
    invalidError("Permanent address", permanentAddressObject, errorMsgObject);
  } else {
    permanentAddressObject.setAttribute("class", "greenBorder");
  }
  return 1;
}

function copyAddress() {
  var check = document.getElementById('addressCheck');
  var contactAddressObject = document.getElementsByName('contactAddress')[0];
  var permanentAddressObject = document.getElementsByName('permanentAddress')[0];
  if (check.checked) {
    contactAddressObject.value = permanentAddressObject.value;
    contactAddressObject.setAttribute('readonly', 'readonly');
  } else {
    contactAddressObject.removeAttribute('readonly');
  }
}

function validateContactAddress() {
  var contactAddressObject = document.getElementsByName('contactAddress')[0];
  var contactAddress = contactAddressObject.value;
  var errorMsgObject = document.getElementById('contactAddressError');
  errorMsgObject.innerHTML = "";
  contactAddress = contactAddress.trim();
  if (contactAddress === "") {
    emptyError("Contact address", contactAddressObject, errorMsgObject);
  } else if (SCRIPT_INJECT.test(contactAddress)) {
    invalidError("Contact address", contactAddressObject, errorMsgObject);    
  } else {
    contactAddressObject.setAttribute("class", "greenBorder");
  }
}

function validateGender() {
  var male = document.getElementById('male').checked;
  var female = document.getElementById('female').checked;
  var errorMsgObject = document.getElementById('genderError');
  errorMsgObject.innerHTML = "";
  if (!(male || female)) {
    errorMsgObject.innerHTML = "Please select gender";
  }
}

function phoneSplit() {
  var phoneObject = document.getElementsByName('phone')[0];
  var phone = phoneObject.value.trim();
  phone = phone.replace(/-/g, "");
  if (phone.length === 10) {
    var phoneFormat = phone.slice(0, 3) + "-" + phone.slice(3, 6) + "-" + phone.slice(6);
    phoneObject.value = phoneFormat;
  }
}