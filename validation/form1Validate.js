import {
  validateNationalCode,
  validateBirthCertificateNumber,
  validateIranianMobile,
  validateIranianPhone,
} from "./validators";

const toDate = (str) => (str ? new Date(str.replace(/\//g, "-")) : null);
export const validateForm1 = (data, setErrors) => {
  const newErrors = {};

  if (!data.gender) newErrors.gender = "جنسیت الزامی است";
  if (!data.first_name) newErrors.first_name = "نام الزامی است";
  if (!data.last_name) newErrors.last_name = "نام خانوادگی الزامی است";
  if (!data.father_name) newErrors.father_name = "نام پدر الزامی است";
  if (!data.certificate_number) {
    newErrors.certificate_number = "شماره شناسنامه الزامی است";
  } else if (!validateBirthCertificateNumber(data.certificate_number)) {
    newErrors.certificate_number = "شماره شناسنامه معتبر نیست";
  }
  if (!data.national_code) {
    newErrors.national_code = "کد ملی الزامی است";
  } else if (!validateNationalCode(data.national_code)) {
    newErrors.national_code = "کد ملی معتبر نیست";
  }
  if (!data.birth_date) newErrors.birth_date = "تاریخ تولد الزامی است";
  if (!data.birth_location) newErrors.birth_location = "محل تولد الزامی است";
  if (!data.religion) newErrors.religion = "دین و مذهب الزامی است";
  if (!data.marital_status) newErrors.marital_status = "وضعیت تاهل الزامی است";
  if (!data.height) newErrors.height = "قد الزامی است";
  if (!data.weight) newErrors.weight = "وزن الزامی است";
  if (!data.state_name) newErrors.state_name = "استان الزامی است";
  if (!data.mobile) {
    newErrors.mobile = "تلفن همراه الزامی است";
  } else if (!validateIranianMobile(data.mobile)) {
    newErrors.mobile = "شماره موبایل معتبر نیست";
  }
  if (data.landline && !validateIranianPhone(data.landline)) {
    newErrors.landline = "شماره تلفن ثابت معتبر نیست";
  }
  if (!data.address) newErrors.address = "آدرس الزامی است";

  if (data.gender === "male" && !data.duty_status) {
    newErrors.duty_status = "وضعیت نظام وظیفه الزامی است";
  }

  if (data.marital_status === "married" && !data.spouse_job) {
    newErrors.spouse_job = "شغل همسر الزامی است";
  }

  if (!data.fother_job) newErrors.fother_job = "شغل پدر الزامی است";
  if (!data.mother_job) newErrors.mother_job = "شغل مادر الزامی است";
  if (!data.dependents) newErrors.dependents = "افراد تحت تکفل الزامی است";

  if (data.service_deficit_amount && !data.type_of_service_deficit) {
    newErrors.type_of_service_deficit = " توع کسری خدمت الزامی است";
  }

  const needsServiceDates =
    data.gender === "male" &&
    ["End of service", "Other cases"].includes(data.duty_status);

  if (needsServiceDates) {
    if (!data.service_start_date) {
      newErrors.service_start_date = "تاریخ شروع خدمت الزامی است";
    }

    if (!data.service_end_date) {
      newErrors.service_end_date = "تاریخ پایان خدمت الزامی است";
    }

    if (data.service_start_date && data.service_end_date) {
      const start = toDate(data.service_start_date);
      const end = toDate(data.service_end_date);

      if (end < start) {
        newErrors.service_end_date =
          "تاریخ پایان خدمت نمی‌تواند قبل از تاریخ شروع باشد";
      }
    }
  }

  if (
    data.gender === "male" &&
    data.duty_status !== "End of service" &&
    data.duty_status !== "Included" &&
    !data.explanation_of_the_duty_system
  ) {
    newErrors.explanation_of_the_duty_system =
      "توضیح وضعیت نظام وظیفه الزامی است";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};
