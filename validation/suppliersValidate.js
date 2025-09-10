export const validateSupliers = (data, setErrors) => {
  const newErrors = {};

  if (!data.phone_number?.trim()) {
    newErrors.phone_number = "شماره تلفن الزامی است";
  } else if (!/^\d{8,15}$/.test(data.phone_number)) {
    newErrors.phone_number = "شماره تلفن معتبر نیست";
  }

  if (data.email?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    newErrors.email = "ایمیل معتبر نیست";
  }

  if (data.postal_code?.trim() && !/^\d{10}$/.test(data.postal_code)) {
    newErrors.postal_code = "کد پستی معتبر نیست";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
