export const isAuthenticated = () => {
  if (typeof window === "undefined") {
    return false;
  }

  if (sessionStorage.getItem("cb-superhero")) {
    return JSON.parse(sessionStorage.getItem("cb-superhero"));
  } else {
    return false;
  }
};

export const authenticate = jwt => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("cb-superhero", JSON.stringify(jwt));
  }
};

export const logout = cb => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("cb-superhero");
  }
  cb();
};
