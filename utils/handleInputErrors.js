export const handleInputErrors = (errors, name) => {
  let message = "";
  const input = errors[name];
 
  if (!input) return {error : false, message :false};
  switch (input.type) {
    case "required":
      message = "This field is required";
      break;

    default:
      break;
  }
  return { error: true, message: message };
};
