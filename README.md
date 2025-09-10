This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

export default function Form2({
data,
setData,
onSuccess,
onPrev,
studyData,
dataLanguages,
}) {
const addSection = () => {
if (data.educational_background.length < 5) {
setData({
...data,
educational_background: [
...data.educational_background,
{
section: "",
field_of_study: "",
field_orientation: "",
gpa: "",
educational_institution: "",
state: "",
start_year: "",
start_month: "",
end_year: "",
end_month: "",
number_of_months_remaining: "",
},
],
});
}
};

const removeSection = (index) => {
if (data.educational_background.length > 1) {
const newArr = [...data.educational_background];
newArr.splice(index, 1);
setData({ ...data, educational_background: newArr });
}
};

const handleChange = (index, field, value) => {
const newArr = [...data.educational_background];
newArr[index][field] = value;
setData({ ...data, educational_background: newArr });
};

const handleLangChange = (index, field, value) => {
const newArr = [...data.other_languages];
newArr[index][field] = value;
setData({ ...data, other_languages: newArr });
};

const addLang = () => {
if (data.other_languages.length < 3) {
setData({
...data,
other_languages: [
...data.other_languages,
{
languages: "",
conversation_level: "",
translation_level: "",
writing_level: "",
comprehension_level: "",
description: "",
},
],
});
}
};

const removeLang = (index) => {
if (data.other_languages.length > 1) {
const newArr = [...data.other_languages];
newArr.splice(index, 1);
setData({ ...data, other_languages: newArr });
}
};

const yearOptions = Array.from({ length: 1490 - 1330 + 1 }, (\_, i) => {
const year = 1330 + i;
return { id: year, value: year };
});

const monthOptions = [
{ id: "فروردین", value: 1 },
{ id: "اردیبهشت", value: 2 },
{ id: "خرداد", value: 3 },
{ id: "تیر", value: 4 },
{ id: "مرداد", value: 5 },
{ id: "شهریور", value: 6 },
{ id: "مهر", value: 7 },
{ id: "آبان", value: 8 },
{ id: "آذر", value: 9 },
{ id: "دی", value: 10 },
{ id: "بهمن", value: 11 },
{ id: "اسفند", value: 12 },
];

const [errors, setErrors] = useState({});
const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
if (!validateForm2(data, setErrors)) return;

    if (data.specialization_description) {
      const lastIndex = data.educational_background.length - 1;
      if (lastIndex >= 0) {
        data.educational_background[lastIndex] = {
          ...data.educational_background[lastIndex],
          specialization_description: data.specialization_description,
        };
      }
    }

    setLoading(true);

    // console.log(JSON.stringify(data));
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/app/educational-background/`,
        data
      );
      if (response.status === 201) {
        console.log(response.data);
        onSuccess();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

};

return (

<form
className="w-full"
onSubmit={(e) => {
e.preventDefault();
handleSubmit();
}} >
<p className="text-[.8rem] font-bold">
{
"تکمیل کلیه مقاطع تحصیلی از دیپلم به بالا به صورت جدا گانه ضروری است (در صورت عدم ارائه اطلاعات کامل به پرسشنامه ترتیب اثر داده نخواهد شد)"
}
</p>
{data.educational*background.map((edu, index) => (
<div className="w-full" key={index}>
<div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
<div className="col-span-12 md:col-span-4">
<DropDown
value={edu.section}
onChange={(val) => handleChange(index, "section", val)}
options={[
{ id: "Undergraduate", value: "زیر دیپلم" },
{ id: "Diploma", value: "دیپلم" },
{ id: "Postgraduate diploma", value: "فوق دیپلم" },
{ id: "Bachelors degree", value: "لیسانس" },
{ id: "Masters degree", value: "فوق لیسانس" },
{ id: "Doctorate", value: "دکترا" },
]}
label="مقطع"
error={errors[`section*${index}`]}
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <DropDown
                value={edu.field_of_study}
                onChange={(val) => handleChange(index, "field_of_study", val)}
                options={studyData.map((study) => ({
                  id: study.id,
                  value: study.field,
                }))}
                label="رشته"
                error={errors[`field_of_study_${index}`]}
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <Input
                value={edu.field_orientation}
                onChange={(val) =>
                  handleChange(index, "field_orientation", val)
                }
                type="text"
                maxLength={256}
                label="گرایش"
                onlyPersian={true}
                error={errors[`field*orientation*${index}`]}
/>
</div>
</div>

          <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
            <div className="col-span-12 md:col-span-4">
              <DropDown
                value={edu.gpa}
                onChange={(val) => handleChange(index, "gpa", val)}
                options={[
                  { id: 10, value: 10 },
                  { id: 11, value: 11 },
                  { id: 12, value: 12 },
                  { id: 13, value: 13 },
                  { id: 14, value: 14 },
                  { id: 15, value: 15 },
                  { id: 16, value: 16 },
                  { id: 17, value: 17 },
                  { id: 18, value: 18 },
                  { id: 19, value: 19 },
                  { id: 20, value: 20 },
                ]}
                label="معدل"
                error={errors[`gpa_${index}`]}
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <Input
                value={edu.educational_institution}
                onChange={(val) =>
                  handleChange(index, "educational_institution", val)
                }
                type="text"
                maxLength={256}
                label="موسسه آموزشی"
                onlyPersian={true}
                error={errors[`educational_institution_${index}`]}
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <Input
                value={edu.state}
                onChange={(val) => handleChange(index, "state", val)}
                type="text"
                maxLength={256}
                label="استان / شهر"
                onlyPersian={true}
                error={errors[`state_${index}`]}
              />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
            <div className="col-span-6 md:col-span-3">
              <DropDown
                value={edu.start_year}
                onChange={(val) => handleChange(index, "start_year", val)}
                options={yearOptions}
                label="سال شروع"
                error={errors[`start_year_${index}`]}
              />
            </div>
            <div className="col-span-6 md:col-span-3">
              <DropDown
                value={edu.start_month}
                onChange={(val) => handleChange(index, "start_month", val)}
                options={monthOptions}
                label="ماه شروع"
                error={errors[`start_month_${index}`]}
              />
            </div>
            <div className="col-span-6 md:col-span-3">
              <DropDown
                value={edu.end_year}
                onChange={(val) => handleChange(index, "end_year", val)}
                options={yearOptions}
                label="سال پایان"
                error={errors[`end_year_${index}`]}
              />
            </div>
            <div className="col-span-6 md:col-span-3">
              <DropDown
                value={edu.end_month}
                onChange={(val) => handleChange(index, "end_month", val)}
                options={monthOptions}
                label="ماه پایان"
                error={errors[`end_month_${index}`]}
              />
            </div>
          </div>
          <p className="text-[.8rem] font-bold mt-[1rem]">
            در صورتی که درحال حاضر مشغول به تحصیل هستید تعداد ماه های باقی مانده
            از تحصیلتان را بنویسید.
          </p>

          <div className="grid grid-cols-12 gap-[1rem] w-full">
            <div className="col-span-12 md:col-span-6 lg:col-span-3">
              <Input
                value={edu.number_of_months_remaining || ""}
                onChange={(val) =>
                  handleChange(index, "number_of_months_remaining", val)
                }
                type="text"
                maxLength={256}
                label=""
                onlyNumber={true}
              />
            </div>
          </div>
        </div>
      ))}

      <div className=" w-full mt-[1rem]">
        <AddRemoveForm addForm={addSection} removeForm={removeSection} />
      </div>

      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-12">
          <Texterea
            value={data.specialization_description}
            onChange={(val) =>
              setData({ ...data, specialization_description: val })
            }
            maxLength={1000}
            label={
              "در صورتی که دوره تخصصی طی شده یا مهارت خاصی دارید ذکر نمایید"
            }
          />
        </div>
      </div>

      {data.other_languages.map((lang, index) => (
        <div
          className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]"
          key={index}
        >
          <div className="col-span-6 md:col-span-4 lg:col-span-2">
            <DropDown
              value={lang.languages}
              onChange={(val) => handleLangChange(index, "languages", val)}
              options={dataLanguages.map((item) => ({
                id: item.id,
                value: item?.languages,
              }))}
              label="زبان"
              error={errors[`languages_${index}`]}
            />
          </div>
          <div className="col-span-6 md:col-span-4 lg:col-span-2">
            <DropDown
              value={lang.conversation_level}
              onChange={(val) =>
                handleLangChange(index, "conversation_level", val)
              }
              options={[
                { id: "Weak", value: "ضعیف" },
                { id: "Medium", value: "متوسط" },
                { id: "Good", value: "خوب" },
                { id: "Excellent", value: "عالی" },
              ]}
              label="سطح مکالمه"
              error={errors[`conversation_level_${index}`]}
            />
          </div>
          <div className="col-span-6 md:col-span-4 lg:col-span-2">
            <DropDown
              value={lang.translation_level}
              onChange={(val) =>
                handleLangChange(index, "translation_level", val)
              }
              options={[
                { id: "Weak", value: "ضعیف" },
                { id: "Medium", value: "متوسط" },
                { id: "Good", value: "خوب" },
                { id: "Excellent", value: "عالی" },
              ]}
              label="سطح ترجمه"
              error={errors[`translation_level_${index}`]}
            />
          </div>
          <div className="col-span-6 md:col-span-4 lg:col-span-2">
            <DropDown
              value={lang.writing_level}
              onChange={(val) => handleLangChange(index, "writing_level", val)}
              options={[
                { id: "Weak", value: "ضعیف" },
                { id: "Medium", value: "متوسط" },
                { id: "Good", value: "خوب" },
                { id: "Excellent", value: "عالی" },
              ]}
              label="سطح نوشتن"
              error={errors[`writing_level_${index}`]}
            />
          </div>
          <div className="col-span-6 md:col-span-4 lg:col-span-2">
            <DropDown
              value={lang.comprehension_level}
              onChange={(val) =>
                handleLangChange(index, "comprehension_level", val)
              }
              options={[
                { id: "Weak", value: "ضعیف" },
                { id: "Medium", value: "متوسط" },
                { id: "Good", value: "خوب" },
                { id: "Excellent", value: "عالی" },
              ]}
              label="سطح درک مطلب"
              error={errors[`comprehension_level_${index}`]}
            />
          </div>
          <div className="col-span-6 md:col-span-4 lg:col-span-2">
            <Input
              value={lang.description}
              onChange={(val) => handleLangChange(index, "description", val)}
              type="text"
              maxLength={256}
              label="توضیحات"
              error={errors[`description_${index}`]}
            />
          </div>
        </div>
      ))}

      <div className=" w-full mt-[1rem]">
        <AddRemoveForm addForm={addLang} removeForm={removeLang} />
      </div>
      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-6">
          <button
            type="button"
            className="w-full flex justify-center items-center h-[34px] bg-gray-500 text-white"
          >
            قبلی
          </button>
        </div>
        <div className="col-span-6">
          <button
            disabled={loading}
            type="submit"
            className={`w-full flex justify-center items-center h-[34px] text-white bg-gray-500 transition-opacity duration-200
    ${
      loading ? "opacity-50 cursor-not-allowed" : "opacity-100 cursor-pointer"
    }`}
          >
            {loading ? "در حال ارسال" : "بعدی"}
          </button>
        </div>
      </div>
    </form>

);
}
/////////////////////////

///////////
export default function Form4({
data,
setData,
onSuccess,
onPrev,
dataJobs,
dataWaysofacquaintance,
}) {
const [errors, setErrors] = useState({});
const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
if (!validateForm4(data, setErrors)) return;
setLoading(true);

    try {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (key === "personal_image" && data[key] instanceof File) {
          formData.append(key, data[key]);
        } else if (key !== "personal_image") {
          formData.append(key, data[key] || "");
        }
      });

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/app/request-details/`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 201) {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

};

return (

<form
className="w-full"
onSubmit={(e) => {
e.preventDefault();
handleSubmit();
}} >
<div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
<div className="col-span-12 md:col-span-6">
<DropDown
value={data.job_application}
onChange={(val) => setData({ ...data, job_application: val })}
options={dataJobs.map((item) => ({ id: item.id, value: item.job }))}
label="شغل درخواستی"
error={errors.job_application}
/>
</div>
<div className="col-span-12 md:col-span-6">
<Input
value={data.requested_rights}
onChange={(val) => setData({ ...data, requested_rights: val })}
type="text"
maxLength={256}
label="حقوق درخواستی (تومان)"
onlyNumber={true}
error={errors.requested_rights}
/>
</div>
</div>

      <p className="text-[.8rem] font-bold mt-[1rem]">
        از چه تاریخی می توانید مشغول به کار شوید؟
      </p>
      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-12">
          <DatePicker
            value={data.been_working_since}
            onChange={(val) => setData({ ...data, been_working_since: val })}
            startYear={1404}
            endYear={1490}
            error={errors.been_working_since}
          />
        </div>
      </div>

      <p className="text-[.8rem] font-bold mt-[1rem]">
        به چه مشاغلی علاقه مند هستید؟
      </p>
      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-12 md:col-span-4">
          <DropDown
            value={data.fav_job_one}
            onChange={(val) => setData({ ...data, fav_job_one: val })}
            options={dataJobs.map((item) => ({ id: item.id, value: item.job }))}
            label="اولویت 1"
            error={errors.fav_job_one}
          />
        </div>
        <div className="col-span-12 md:col-span-4">
          <DropDown
            value={data.fav_job_two}
            onChange={(val) => setData({ ...data, fav_job_two: val })}
            options={dataJobs.map((item) => ({ id: item.id, value: item.job }))}
            label="اولویت 2"
            error={errors.fav_job_two}
          />
        </div>
        <div className="col-span-12 md:col-span-4">
          <DropDown
            value={data.fav_job_three}
            onChange={(val) => setData({ ...data, fav_job_three: val })}
            options={dataJobs.map((item) => ({ id: item.id, value: item.job }))}
            label="اولویت 3"
            error={errors.fav_job_three}
          />
        </div>
      </div>

      <p className="text-[.8rem] font-bold mt-[1rem]">
        در صورتی که قبلا برای استخدام در این شرکت اقدام نموده اید تاریخ آن را
        وارد نمایید.
      </p>
      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-12">
          <DatePicker
            value={data.previous_job_application_date}
            onChange={(val) =>
              setData({ ...data, previous_job_application_date: val })
            }
            startYear={1372}
            endYear={1490}
          />
        </div>
      </div>

      <p className="text-[.8rem] font-bold mt-[1rem]">معرف</p>
      <p className="text-[.8rem] font-bold mt-[1rem]">
        مشخصات یک نفر که ترجیحا از خویشاوندانتان نباشد را به عنوان معرف به طور
        کامل بنویسد.
      </p>
      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-12 md:col-span-4">
          <Input
            value={data.reagent_full_name}
            onChange={(val) => setData({ ...data, reagent_full_name: val })}
            type="text"
            maxLength={256}
            label="نام و نام خانوادگی"
            onlyPersian={true}
            error=""
          />
        </div>
        <div className="col-span-12 md:col-span-4">
          <Input
            value={data.reagent_job}
            onChange={(val) => setData({ ...data, reagent_job: val })}
            type="text"
            maxLength={256}
            label="شغل"
            onlyPersian={true}
            error=""
          />
        </div>
        <div className="col-span-12 md:col-span-4">
          <Input
            value={data.reagent_type_of_acquaintance}
            onChange={(val) =>
              setData({ ...data, reagent_type_of_acquaintance: val })
            }
            type="text"
            maxLength={256}
            label="نوع آشنایی"
            onlyPersian={true}
            error=""
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-12 md:col-span-9">
          <Input
            value={data.reagent_address}
            onChange={(val) => setData({ ...data, reagent_address: val })}
            type="text"
            maxLength={256}
            label="آدرس"
            error=""
          />
        </div>
        <div className="col-span-12 md:col-span-3">
          <Input
            value={data.reagent_phone}
            onChange={(val) => setData({ ...data, reagent_phone: val })}
            type="text"
            maxLength={256}
            label="تلفن"
            onlyNumber={true}
            error={errors.reagent_phone}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-12">
          <Input
            value={data.specific_disease}
            onChange={(val) => setData({ ...data, specific_disease: val })}
            type="text"
            maxLength={256}
            label="در صورت داشتن بیماری خاص یا سابقه جراحی نام آن یا نوع عمل جراحی را ثبت فرمایید."
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-12">
          <DropDown
            value={data.way_of_acquaintance}
            onChange={(val) => setData({ ...data, way_of_acquaintance: val })}
            options={dataWaysofacquaintance.map((item) => ({
              id: item.id,
              value: item.way,
            }))}
            label="از چه طریقی جهت استخدام به این شرکت معرفی شده و یا از استخدام این شرکت مطلع شده اید ؟"
            error={errors.way_of_acquaintance}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-12">
          <Upload
            label="تصویر پرسنلی (با فرمت jpg)"
            value={data.personal_image}
            onChange={(val) => setData({ ...data, personal_image: val })}
            error={errors.personal_image}
          />
        </div>
      </div>

      <div className="flex items-start gap-5 mt-[1rem]">
        <input
          type="checkbox"
          checked={data.confirmation || false}
          onChange={(e) => setData({ ...data, confirmation: e.target.checked })}
          className="mt-4"
        />
        <p className="text-[.8rem] font-bold">
          تایید میکنم که به پرسش های فوق با آگاهی صحیح از مفهوم آنها به طور کامل
          و صحیح پاسخ داده ام و شرکت مرجان می تواند درباره آنها تحقیق نماید و
          چنانچه کذب هر یک از پاسخ ها محرز گردد شرکت حق دارد در هر مرحله از
          استخدام به کار استخدام خاتمه دهد و در این صورت حق ادعای هرگونه حقی را
          از خود سلب می نمایم.
        </p>
      </div>
      {errors.confirmation && (
        <span className="text-red-500 text-sm">{errors.confirmation}</span>
      )}

      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-6">
          <button
            type="button"
            onClick={onPrev}
            className="w-full flex justify-center items-center h-[34px] bg-gray-500 text-white"
          >
            قبلی
          </button>
        </div>
        <div className="col-span-6">
          <button
            disabled={loading}
            type="submit"
            className={`w-full flex justify-center items-center h-[34px] text-white bg-gray-500 transition-opacity duration-200
    ${
      loading ? "opacity-50 cursor-not-allowed" : "opacity-100 cursor-pointer"
    }`}
          >
            {loading ? "در حال ارسال" : "بعدی"}
          </button>
        </div>
      </div>
    </form>

);
}
