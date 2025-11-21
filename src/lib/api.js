export const signUpApi = {
  sendEmail: async ({ email }) => {
    return fetch("/api/signup/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
  },

  finishSignup: async ({ email, password }) => {
    return fetch("/api/signup/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then((res) => res.json());
  },
};
