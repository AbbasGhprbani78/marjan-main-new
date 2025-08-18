import {
  BlogSlider,
  CategorySlider,
  ProjectsSlider,
  HomeSlider,
} from "@/app/components/slider";
import fa from "@/i18n/fa.json";
import en from "@/i18n/en.json";

import FeatureTabs from "@/app/components/Home/FeatureTabs";
import { MoreButton } from "@/app/components/moreButton";
import { fetchhome } from "@/services/home";
import ChatBot from "../components/module/ChatBot/ChatBot";

export default async function Home({ params }) {
  const { locale } = await params;
  const t = locale === "fa" ? fa : en;

  const dataHome = await fetchhome(locale);

  return (
    <div className="wrapper w-full h-full font-fa ">
      <HomeSlider data={dataHome?.home?.slides} route={"/products"} />
      <div className=" pt-[25px]  md:pt-[50px] mb-20 lg:mb-60">
        <p className="mb-[1.3rem] md:mb-0 text-center title font-[500] ">
          {t.Categories}
        </p>
        <CategorySlider data={dataHome?.category?.categories} />
        <MoreButton
          text={t.Products}
          width={263}
          height={46}
          className="mx-auto my-[35px] lg:my-[50px]"
          href={"/products"}
        />
      </div>
      <div className=" inset-0 flex flex-col items-center justify-center border-t border-gray-100">
        <div className="w-full ">
          <div className="pb-[20px] pt-[1.3rem] md:p-[50px]">
            <p className="text-center  title font-[500] ">
              {t.DigitalAssistant}
            </p>
          </div>
          <FeatureTabs data={dataHome.tabsData} />
        </div>
      </div>
      <div className="pt-[45.8px] md:pt-[90px] lg:pt-0 mb-60px text-center border-b border-gray-100">
        <p className="text-[1.7rem] font-[500]">{t.Projects}</p>
        <ProjectsSlider data={dataHome.desginStory.projects} />

        <MoreButton
          text={t.More}
          width={263}
          height={46}
          className="mx-auto  my-[35px] md:my-[50px]"
          href={"/projects"}
        />
      </div>
      <div className=" py-[30px] md:py-[50px] ">
        <p className=" text-center title font-[500]  mb-[10px] md:mb-[50px]">
          {t.Blog}
        </p>
        <BlogSlider data={dataHome?.blog} />

        <div className="flex flex-col items-center mt-[20x] lg:mt-[50px]">
          <MoreButton
            text={t.More}
            width={263}
            height={46}
            className="mx-auto my-[50px]"
            href={"/blogs"}
          />
        </div>
      </div>
      <div>
        <div className="flex flex-col  min-h-[422px] h-auto w-full py-[50px] px-20 md:px-40 lg:px-[80px] pe-auto bg-[linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.2)),url('/images/65.jpg')] bg-cover bg-center">
          <p className="text-center md:text-start title font-[500] text-gray-white mb-[40px]">
            {dataHome?.about?.title}
          </p>
          <div className=" w-full  md:w-[73dvw] lg:w-[57dvw]  text-justify ">
            <p className="text-[16px] font-[400] text-gray-white mb-[35px] md:mb-[20px]">
              {dataHome.about.description}
            </p>
            <MoreButton
              text={t.MoreDetails}
              width={263}
              height={46}
              className="mx-auto py-[10px] md:mx-0 "
              invert={true}
              href={"/aboutus"}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center px-[20px] md:px-40 py-[50px]  gap-[28px]">
        <Section
          title={t.Subscribenewsletter}
          descrption={
            "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با . . استفاده از طراحان گرافیک است"
          }
        />
        <MoreButton
          text={t.Becomeamember}
          width={239}
          height={46}
          href={"/newsletter"}
        />
      </div>
      <ChatBot />
    </div>
  );
}

function Section({ title, descrption }) {
  return (
    <div className="flex flex-col text-center">
      <h1 className="title font-[500] mb-[10px] font-fa leading-[50px] ">
        {title}
      </h1>
      <p className="text-[16px] font-[400] ">{descrption}</p>
    </div>
  );
}
