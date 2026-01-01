export const saveUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  const raw = localStorage.getItem("user");
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error("Invalid user data in localStorage");
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("user");
};
