import api from "./api";

// Signup
// Creates a new user document after Firebase Authentication.

export const signup = async ({ uid, name, email }) => {
  const { data } = await api.post("/auth/signup", {
    uid,
    name,
    email,
  });

  return data;
};

// Login
// Returns the existing user document.

export const login = async ({ uid, name, email }) => {
  const { data } = await api.post("/auth/login", {
    uid,
    name,
    email,
  });

  return data;
};

// Google Authentication

export const googleLogin = async ({ uid, name, email }) => {
  const { data } = await api.post("/auth/google", {
    uid,
    name,
    email,
  });

  return data;
};
