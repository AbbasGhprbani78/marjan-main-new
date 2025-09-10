import { validateIranianMobile, validateIranianPhone } from "./validators";

export const validateRepresentationrequest = (data, setErrors) => {
  const newErrors = {};

  if (!data.fullName.trim()) {
    newErrors.fullName = "لطفاً نام و نام خانوادگی را الزامی است";
  }

  if (!data.birthYear) {
    newErrors.birthYear = "سال تولد الزامی است";
  } else if (
    isNaN(data.birthYear) ||
    data.birthYear < 1330 ||
    data.birthYear > 1390
  ) {
    newErrors.birthYear = "سال تولد معتبر نیست";
  }

  if (!data.educationDegree.trim()) {
    newErrors.educationDegree = "مدرک تحصیلی الزامی است";
  }

  if (!data.fieldOfStudy.trim()) {
    newErrors.fieldOfStudy = "رشته تحصیلی الزامی است";
  }

  if (!data.phoneNumber.trim()) {
    newErrors.phoneNumber = "شماره موبایل الزامی است";
  } else if (!validateIranianMobile(data.phoneNumber)) {
    newErrors.phoneNumber = "شماره موبایل معتبر نیست";
  }

  if (!data.province.trim()) {
    newErrors.province = "استان الزامی است";
  }

  if (!data.storeName.trim()) {
    newErrors.storeName = "نام فروشگاه الزامی است";
  }

  if (!data.storeArea.trim()) {
    newErrors.storeArea = "متراژ فروشگاه الزامی است";
  }

  if (!data.storeOwnershipType.trim()) {
    newErrors.storeOwnershipType = "نوع مالکیت فروشگاه الزامی است";
  }

  if (!data.storePhone.trim()) {
    newErrors.storePhone = "تلفن فروشگاه الزامی است";
  } else if (!validateIranianPhone(data.storePhone)) {
    newErrors.storePhone = "تلفن فروشگاه معتبر نیست";
  }

  if (!data.storeAddress.trim()) {
    newErrors.storeAddress = "آدرس فروشگاه الزامی است";
  }

  if (!data.warehouseType.trim()) {
    newErrors.warehouseType = "نوع انبار الزامی است";
  }

  if (!data.warehouseArea.trim()) {
    newErrors.warehouseArea = "متراژ انبار الزامی است";
  }

  if (!data.warehouseFacilities.trim()) {
    newErrors.warehouseFacilities = "امکانات انبار الزامی است";
  }

  if (!data.warehouseOwnershipType.trim()) {
    newErrors.warehouseOwnershipType = "نوع مالکیت انبار الزامی است";
  }

  if (!data.warehousePhone.trim()) {
    newErrors.warehousePhone = "تلفن انبار الزامی است";
  } else if (!validateIranianPhone(data.warehousePhone)) {
    newErrors.warehousePhone = "تلفن انبار معتبر نیست";
  }

  if (!data.warehouseAddress.trim()) {
    newErrors.warehouseAddress = "آدرس انبار الزامی است";
  }

  if (!data.representativeCompanies.trim()) {
    newErrors.representativeCompanies = "شرکت‌های نمایندگی الزامی است";
  }

  if (!data.foreignTileActivity.trim()) {
    newErrors.foreignTileActivity = "فعالیت در زمینه کاشی خارجی الزامی است";
  }

  if (!data.reasonForChoosingMarjan.trim()) {
    newErrors.reasonForChoosingMarjan = "علت انتخاب مرجان الزامی است";
  }

  if (!data.salesExperienceYears) {
    newErrors.salesExperienceYears = "سابقه تجربه فروش الزامی است";
  } else if (
    isNaN(data.salesExperienceYears) ||
    data.salesExperienceYears < 0
  ) {
    newErrors.salesExperienceYears = "سابقه تجربه فروش معتبر نیست";
  }

  if (!data.additionalDescription.trim()) {
    newErrors.additionalDescription = "توضیحات تکمیلی الزامی است";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
