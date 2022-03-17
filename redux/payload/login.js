export const setPayloadLogin = (payload) => {
  console.log("payload", payload);
  if (payload.insertedId) {
    return {
      _id: payload.insertedId,
    };
  }
  return {
    email: payload.email,
    password: payload.password,
  };
};
