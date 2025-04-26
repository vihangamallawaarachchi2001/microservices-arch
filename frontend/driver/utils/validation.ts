export const validateSignIn = (data: Record<string, any>) => {
  const errors: Record<string, string> = {};

  if (!data.username) {
    errors.username = "Username is required";
  } else if (data.username.length < 3) {
    errors.username = "Username must be at least 3 characters";
  }

  if (!data.email) {
    errors.email = "Email is required";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.email = "Invalid email format";
    }
  }

  if (!data.phoneNumber) {
    errors.phoneNumber = "Phone number is required";
  } else if (!/^\d{10}$/.test(data.phoneNumber)) {
    errors.phoneNumber = "Phone number must be 10 digits";
  }

  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!data.address) {
    errors.address = "Address is required";
  }

  return errors;
};

export const validateLogin = (data: Record<string, any>) => {
  const errors: Record<string, string> = {};

  if (!data.emailOrUsername) {
    errors.emailOrUsername = "Email or username is required";
  } else if (data.emailOrUsername.includes("@")) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.emailOrUsername)) {
      errors.emailOrUsername = "Invalid email format";
    }
  } else if (data.emailOrUsername.length < 3) {
    errors.emailOrUsername = "Username must be at least 3 characters";
  }
  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};