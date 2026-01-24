export const saveUser = (user) => {
  if (!user) return;
  localStorage.setItem("user", JSON.stringify(user));
};

export function getUser() {
  try {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  } catch {
    localStorage.removeItem("user");
    return null;
  }
}

export const clearUser = () => {
  localStorage.removeItem("user");
};

// helper
export const getToken = () => {
  const user = getUser(); // ✅ no ESLint error
  return user?.token || null;
};
