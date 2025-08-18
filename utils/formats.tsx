export const ToLocalDate = (date: any) => {
  if (date) {
    return date.toDate().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } else {
    return "Date Not Provided";
  }
};
export const validateAndFormatPhoneNumber = (phoneNumber: any) => {
  const southAfricaRegex = /^0\d{9}$/;
  if (southAfricaRegex.test(phoneNumber)) {
    return `+27${phoneNumber.slice(1)}`;
  }
  return null;
};