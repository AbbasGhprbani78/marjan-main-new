import GallerySingleBlog from "@/app/components/Blogs/GallerySingleBlog";
import ReadMoreText from "@/app/components/module/ReadMoreText";
import { fetchSingleBlog } from "@/services/singleBlog";
import Image from "next/image";
import React from "react";

export const metadata = {
  title: "آموزش کامل استفاده از React در پروژه‌های واقعی",
  description:
    "در این مقاله با کاربردهای عملی React در پروژه‌های واقعی آشنا می‌شوید و تکنیک‌هایی برای توسعه مؤثرتر یاد می‌گیرید.",
  keywords: [
    "آموزش React",
    "پروژه واقعی",
    "ReactJS",
    "جاوااسکریپت",
    "برنامه‌نویسی فرانت‌اند",
    "Next.js",
  ],
  alternates: {
    canonical: "https://yourdomain.com/blogs/my-post",
  },
  openGraph: {
    title: "آموزش کاربردی React در پروژه واقعی",
    description:
      "تجربه استفاده از React در پروژه‌های واقعی همراه با نکات حرفه‌ای برای توسعه‌دهندگان.",
    url: "https://yourdomain.com/blogs/my-post",
    siteName: "YourSiteName",
    type: "article",
    locale: "fa_IR",
    publishedTime: "2025-06-27",
    images: [
      {
        url: "/images/38.png",
        width: 1200,
        height: 630,
        alt: "React در پروژه واقعی",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "آموزش React در پروژه واقعی",
    description:
      "مقاله‌ای برای یادگیری React در دنیای واقعی با مثال‌های کاربردی.",
    images: ["/images/38.png"],
  },
};

const aboutText = `
لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و بالورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
            کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.لورم ایپسوم
            متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان
            گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان
            که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع
            با هدف بهبود ابزارهای کاربردی می باشد. لورم ایپسوم متن ساختگی با
            تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
            چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و
            برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود
            ابزارهای کاربردی می باشد. لورم ایپسوم متن ساختگی با تولید سادگی
            نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و
            متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای
            شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود
            ابزارهای کاربردی می باشد. لورم ایپسوم متن ساختگی با تولید سادگی
            نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و
          
`;

<ReadMoreText text={aboutText} />;

const gallery = [
  "/images/1.png",
  "/images/2.png",
  "/images/3.png",
  "/images/4.png",
  "/images/5.png",
  "/images/6.png",
  "/images/7.png",
  "/images/8.png",
  "/images/9.png",
  "/images/10.png",
];

export default async function page({ params }) {
  const { locale } = await params;
  // const { id } = await params;
  // const singleBlog = await fetchSingleBlog(locale, 1);

  return (
    <main className="wrapper ">
      <h1 className="sr-only">وبلاگ</h1>
      <article>
        <section className="w-full relative wrapper_image flex items-center justify-center mt-[130px] lg:mt-0 ">
          <Image src={"/images/10.png"} fill alt="image project" className="" />
          <div className="absolute inset-0 bg-black/50 z-10" />
          <p className="w-max font-en text-white font-normal  text-[1.2rem] md:text-[2rem]  z-30">
            اسم مقاله
          </p>
        </section>
        <section className="mt-[2rem] px-20 md:px-40 lg:px-80 text-[var(--color-gray-900)] font-normal text-justify pb-[2rem]">
          <div className="leading-[30px] mb-[1rem] lg:mb-[2rem]">
            <ReadMoreText text={aboutText} />
          </div>
          <GallerySingleBlog media={gallery} />
          <div className="leading-[30px]  mt-[1rem] mb-[1rem] lg:mt-[2rem] lg:mb-[2rem]">
            <ReadMoreText text={aboutText} />
          </div>
          <div className="relative w-full  aspect-[3/2]  md:aspect-auto  md:w-2/3 md:mx-auto m lg:h-[331px]">
            <Image
              src="/images/40.png"
              fill
              alt="image project"
              className="object-cover "
            />
          </div>
        </section>
      </article>
    </main>
  );
}

// متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای
//           شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود
//           ابزارهای کاربردی می باشد. لورم ایپسوم متن ساختگی با تولید سادگی
//           نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و
//           متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای
//           شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود
//           ابزارهای کاربردی می باشد.لورم ایپسوم متن ساختگی با تولید سادگی
//           نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و
//           متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای
//           شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود
//           ابزارهای کاربردی می باشد. لورم ایپسوم متن ساختگی با تولید سادگی
//           نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و
//           متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای
//           شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود
//           ابزارهای کاربردی می باشد. لورم ایپسوم متن ساختگی با تولید سادگی
//           نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و
//           متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای
//           شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود
//           ابزارهای کاربردی می باشد. لورم ایپسوم متن ساختگی با تولید سادگی
//           نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و
//           متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای
//           شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود
//           ابزارهای کاربردی می باشد.
