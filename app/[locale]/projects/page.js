import React from "react";
import { HomeSlider } from "@/app/components/slider";
import { projects, categories } from "@/app/dataProjects";
import Projects from "@/app/components/templates/Projects";
import { fetchAllProjects } from "@/services/allProjects";

export const metadata = {
  title: "پروژه‌ها | شرکت شما",
  description:
    "مجموعه‌ای از پروژه‌های شاخص طراحی و توسعه‌ی ما، شامل نمونه‌کارهای وب‌سایت، اپلیکیشن و راهکارهای نرم‌افزاری اختصاصی.",
  keywords:
    "پروژه‌ها, نمونه‌کارها, طراحی سایت, توسعه نرم‌افزار, اپلیکیشن, React, Next.js, شرکت طراحی",
  openGraph: {
    title: "پروژه‌های ما | شرکت شما",
    description:
      "نگاهی به پروژه‌های موفق انجام‌شده توسط تیم حرفه‌ای ما در زمینه طراحی و توسعه وب و نرم‌افزار.",
    url: "https://yourdomain.com/projects",
    siteName: "شرکت شما",
    type: "website",
    images: [
      {
        url: "/images/24.png",
        width: 1200,
        height: 630,
        alt: "نمونه پروژه‌های شرکت شما",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "پروژه‌ها | شرکت شما",
    description:
      "برخی از پروژه‌های حرفه‌ای که توسط تیم ما طراحی و پیاده‌سازی شده‌اند.",
    images: ["/images/24.png"],
  },
  alternates: {
    canonical: "https://yourdomain.com/projects",
  },
};

export default async function page({ params }) {
  const { locale } = await params;
  const dataProjects = await fetchAllProjects(locale);

  console.log(dataProjects);
  return (
    <div className="wrapper">
      <h1 className="sr-only">پروژه ها</h1>
      <section>
        <HomeSlider data={projects.slides} route={"/projects"} />
      </section>
      <Projects data={projects} categories={categories} />
    </div>
  );
}
