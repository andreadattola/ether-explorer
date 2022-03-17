export const setPayloadRegistration = (payload) => {
  console.log("payload", payload);
  return {
    email: payload.email,
    password: payload.password,
    apiKey: payload.apiKey,
  };
};
