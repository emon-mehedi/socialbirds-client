import { todayString } from "@/lib/format";

export type Errors = Record<string, string>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function isValidUrl(text: string) {
  try {
    const url = new URL(text);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

// Login
export function validateLogin(values: { email: string; password: string }) {
  const errors: Errors = {};
  if (!emailPattern.test(values.email.trim())) errors.email = "Please enter a valid email address";
  if (!values.password) errors.password = "Password is required";
  return errors;
}

//Register
export function validatePassword(password: string) {
  if (password.length < 6) return "Password must be at least 6 characters";
  if (!/[A-Z]/.test(password)) return "Password must have an uppercase letter";
  if (!/[a-z]/.test(password)) return "Password must have a lowercase letter";
  return "";
}

export function validateRegister(values: {
  name: string;
  email: string;
  photoURL: string;
  password: string;
}) {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name";
  if (!emailPattern.test(values.email.trim())) errors.email = "Please enter a valid email address";
  if (!isValidUrl(values.photoURL.trim())) errors.photoURL = "Please enter a valid photo URL (https://...)";
  const passwordError = validatePassword(values.password);
  if (passwordError) errors.password = passwordError;
  return errors;
}

//Profile
export function validateProfile(values: { name: string; photoURL: string }) {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name";
  if (values.photoURL.trim() && !isValidUrl(values.photoURL.trim())) {
    errors.photoURL = "Please enter a valid photo URL (https://...)";
  }
  return errors;
}

export type EventValues = {
  title: string;
  description: string;
  category: string;
  thumbnailImageUrl: string;
  location: string;
  date: string;
};

export function validateEvent(values: EventValues, originalDate?: string) {
  const errors: Errors = {};
  if (values.title.trim().length < 3) errors.title = "Title must be at least 3 characters";
  if (values.description.trim().length < 10) errors.description = "Description must be at least 10 characters";
  if (!values.category) errors.category = "Please choose an event type";
  if (!isValidUrl(values.thumbnailImageUrl.trim())) errors.thumbnailImageUrl = "Please enter a valid image URL (https://...)";
  if (!values.location.trim()) errors.location = "Location is required";

  if (!values.date) {
    errors.date = "Please choose a date";
  } else if (values.date < todayString() && values.date !== originalDate) {
    errors.date = "The date must be today or in the future";
  }
  return errors;
}
