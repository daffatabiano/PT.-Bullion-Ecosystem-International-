export const validation = (input, type = "register") => {
  const errors = {};

  const isEmailValid = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isPasswordStrong = (password) =>
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/.test(password);

  if (type === "login") {
    if (!input.email) {
      errors.email = "Email is required";
    } else if (!isEmailValid(input.email)) {
      errors.email = "Invalid email format";
    }

    if (!input.password) {
      errors.password = "Password is required";
    } else if (input.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
  }

  if (type === "register") {
    if (!input.firstName) {
      errors.firstName = "First name is required";
    }

    if (!input.lastName) {
      errors.lastName = "Last name is required";
    }

    if (!input.gender) {
      errors.gender = "Gender is required";
    }

    if (!input.dateOfBirth) {
      errors.dateOfBirth = "Date of birth is required";
    }

    if (!input.email) {
      errors.email = "Email is required";
    } else if (!isEmailValid(input.email)) {
      errors.email = "Invalid email format";
    }

    if (!input.phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    }

    if (!input.address) {
      errors.address = "Address is required";
    }

    if (!input.photo) {
      errors.photo = "Profile photo is required";
    } else {
      const allowedTypes = ["image/jpeg", "image/jpg"];
      if (!allowedTypes.includes(input.photo.type)) {
        errors.photo = "Photo must be JPG or JPEG";
      } else if (input.photo.size > 5 * 1024 * 1024) {
        errors.photo = "Photo must be less than 5MB";
      }
    }

    if (!input.password) {
      errors.password = "Password is required";
    } else if (!isPasswordStrong(input.password)) {
      errors.password =
        "Password must be at least 8 characters, include uppercase letter, a number, and a letter";
    }

    if (!input.confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    } else if (input.confirmPassword !== input.password) {
      errors.confirmPassword = "Passwords do not match";
    }
  }

  return errors;
};
