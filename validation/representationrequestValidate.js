import { validateIranianMobile, validateIranianPhone } from "./validators";

export const validateRepresentationrequest = (data, setErrors, t) => {
  const newErrors = {};

  if (!data.fullName.trim()) {
    newErrors.fullName = t("Full name is required");
  }

  if (!data.birthYear) {
    newErrors.birthYear = t("Birth year is required");
  } else if (
    isNaN(data.birthYear) ||
    data.birthYear < 1330 ||
    data.birthYear > 1390
  ) {
    newErrors.birthYear = t("Invalid birth year");
  }

  if (!data.educationDegree.trim()) {
    newErrors.educationDegree = t("Education degree is required");
  }

  if (!data.fieldOfStudy.trim()) {
    newErrors.fieldOfStudy = t("Field of study is required");
  }

  if (!data.phoneNumber.trim()) {
    newErrors.phoneNumber = t("Mobile number is required");
  } else if (!validateIranianMobile(data.phoneNumber)) {
    newErrors.phoneNumber = t("Invalid mobile number");
  }

  if (!data.province.trim()) {
    newErrors.province = t("Province is required");
  }

  if (!data.storeName.trim()) {
    newErrors.storeName = t("Store name is required");
  }

  if (!data.storeArea.trim()) {
    newErrors.storeArea = t("Store area is required");
  }

  if (!data.storeOwnershipType.trim()) {
    newErrors.storeOwnershipType = t("Store ownership type is required");
  }

  if (!data.storePhone.trim()) {
    newErrors.storePhone = t("Store phone is required");
  } else if (!validateIranianPhone(data.storePhone)) {
    newErrors.storePhone = t("Invalid store phone number");
  }

  if (!data.storeAddress.trim()) {
    newErrors.storeAddress = t("Store address is required");
  }

  if (!data.warehouseType.trim()) {
    newErrors.warehouseType = t("Warehouse type is required");
  }

  if (!data.warehouseArea.trim()) {
    newErrors.warehouseArea = t("Warehouse area is required");
  }

  if (!data.warehouseFacilities.trim()) {
    newErrors.warehouseFacilities = t("Warehouse facilities are required");
  }

  if (!data.warehouseOwnershipType.trim()) {
    newErrors.warehouseOwnershipType = t(
      "Warehouse ownership type is required"
    );
  }

  if (!data.warehousePhone.trim()) {
    newErrors.warehousePhone = t("Warehouse phone is required");
  } else if (!validateIranianPhone(data.warehousePhone)) {
    newErrors.warehousePhone = t("Invalid warehouse phone number");
  }

  if (!data.warehouseAddress.trim()) {
    newErrors.warehouseAddress = t("Warehouse address is required");
  }

  if (!data.representativeCompanies.trim()) {
    newErrors.representativeCompanies = t(
      "Representative companies are required"
    );
  }

  if (!data.foreignTileActivity.trim()) {
    newErrors.foreignTileActivity = t("Foreign tile activity is required");
  }

  if (!data.reasonForChoosingMarjan.trim()) {
    newErrors.reasonForChoosingMarjan = t(
      "Reason for choosing Marjan is required"
    );
  }

  if (!data.salesExperienceYears) {
    newErrors.salesExperienceYears = t("Sales experience years are required");
  } else if (
    isNaN(data.salesExperienceYears) ||
    data.salesExperienceYears < 0
  ) {
    newErrors.salesExperienceYears = t("Invalid sales experience years");
  }

  if (!data.additionalDescription.trim()) {
    newErrors.additionalDescription = t("Additional description is required");
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
