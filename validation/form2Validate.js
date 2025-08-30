export function validateForm2(data, setErrors) {
  const newErrors = {};

  if (
    !data.educational_background ||
    data.educational_background.length === 0
  ) {
    newErrors.educational_background = "حداقل یک مقطع تحصیلی باید وارد شود";
  } else {
    data.educational_background.forEach((edu, index) => {
      if (!edu.section) newErrors[`section_${index}`] = "مقطع الزامی است";
      if (!edu.field_of_study)
        newErrors[`field_of_study_${index}`] = "رشته الزامی است";
      if (!edu.field_orientation)
        newErrors[`field_orientation_${index}`] = "گرایش الزامی است";
      if (!edu.gpa) newErrors[`gpa_${index}`] = "معدل الزامی است";
      if (!edu.educational_institution)
        newErrors[`educational_institution_${index}`] = "نام موسسه الزامی است";
      if (!edu.state) newErrors[`state_${index}`] = "استان / شهر الزامی است";
      if (!edu.start_year)
        newErrors[`start_year_${index}`] = "سال شروع الزامی است";
      if (!edu.start_month)
        newErrors[`start_month_${index}`] = "ماه شروع الزامی است";
      if (!edu.end_year)
        newErrors[`end_year_${index}`] = "سال پایان الزامی است";
      if (!edu.end_month)
        newErrors[`end_month_${index}`] = "ماه پایان الزامی است";

      if (edu.start_year && edu.end_year && edu.end_year < edu.start_year) {
        newErrors[`end_year_${index}`] =
          "سال پایان نمی‌تواند قبل از سال شروع باشد";
      }
    });
  }

  if (!data.other_languages || data.other_languages.length === 0) {
    newErrors.other_languages = "حداقل یک زبان باید وارد شود";
  } else {
    data.other_languages.forEach((lang, index) => {
      if (!lang.languages)
        newErrors[`languages_${index}`] = "انتخاب زبان الزامی است";
      if (!lang.conversation_level)
        newErrors[`conversation_level_${index}`] = "سطح مکالمه الزامی است";
      if (!lang.translation_level)
        newErrors[`translation_level_${index}`] = "سطح ترجمه الزامی است";
      if (!lang.writing_level)
        newErrors[`writing_level_${index}`] = "سطح نوشتن الزامی است";
      if (!lang.comprehension_level)
        newErrors[`comprehension_level_${index}`] = "سطح درک مطلب الزامی است";
    });
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
}
