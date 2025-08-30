import { validateIranianPhone } from "./validators";

export const validateForm4 = (data, setErrors) => {
  const newErrors = {};

  if (!data.job_application)
    newErrors.job_application = "شغل درخواستی الزامی است";
  if (!data.requested_rights)
    newErrors.requested_rights = "حقوق درخواستی الزامی است";
  if (!data.been_working_since)
    newErrors.been_working_since = "تاریخ شروع کار الزامی است";
  if (!data.fav_job_one) newErrors.fav_job_one = "اولویت شغلی 1 الزامی است";
  if (!data.fav_job_two) newErrors.fav_job_two = "اولویت شغلی 2 الزامی است";
  if (!data.fav_job_three) newErrors.fav_job_three = "اولویت شغلی 3 الزامی است";
  if (!data.personal_image) newErrors.personal_image = "تصویر الزامی است";
  if (!data.way_of_acquaintance)
    newErrors.way_of_acquaintance = "طریقه مطلع شدن الزامی است";
  if (data.reagent_phone && !validateIranianPhone(data.reagent_phone)) {
    newErrors.reagent_phone = "شماره تلفن معرف معتبر نیست";
  }

  if (!data.confirmation) newErrors.confirmation = "تاییدیه الزامی است";

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
