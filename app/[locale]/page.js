import {
  BlogSlider,
  CategorySlider,
  ProjectsSlider,
  HomeSlider,
} from "@/components/slider";

import FeatureTabs from "@/components/Home/FeatureTabs";
import { MoreButton } from "@/components/moreButton";
import { fetchhome } from "@/services/home";
import ReadMoreText from "@/components/module/ReadMoreText";
import { fetchTranslateWords } from "@/services/translate";
import { buildDictionary } from "@/utils/buildDictionary";

export default async function Home({ params }) {
  const { locale } = await params;
  const dataHome = await fetchhome(locale);
  const dictArray = await fetchTranslateWords(locale);
  const dict = buildDictionary(dictArray);

  return (
    <div
      className={`wrapper w-full h-full ${
        ["fa", "ar"].includes(locale) ? "font-fa" : "font-en"
      }`}
    >
      <HomeSlider
        data={dataHome?.home?.slides}
        route={"/products"}
        delay={dataHome?.delay}
        nameproduct={true}
      />
      <div className=" pt-[25px]  md:pt-[50px] mb-20 lg:mb-60">
        <p className="mb-[1.3rem] md:mb-0 text-center title font-[500] ">
          {dict["Categories"]}
        </p>
        <CategorySlider data={dataHome?.category?.categories} />
        <MoreButton
          text={dict["Products"]}
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
              {dict["DigitalAssistant"]}
            </p>
          </div>
          <FeatureTabs data={dataHome.tabsData} />
        </div>
      </div>
      <div className="pt-[45.8px] md:pt-[90px] lg:pt-0 mb-60px text-center ">
        <p className="title font-[500]">{dict["Projects"]}</p>
        <ProjectsSlider data={dataHome.desginStory.projects} />

        <MoreButton
          text={dict["More"]}
          width={263}
          height={46}
          className="mx-auto  my-[35px] md:my-[50px]"
          href={"/projects"}
        />
      </div>
      <div className=" py-[30px] md:py-[50px] ">
        <p className=" text-center title font-[500]  mb-[10px] md:mb-[50px]">
          {dict["Blog"]}
        </p>
        <BlogSlider data={dataHome?.blog} />

        <div className="flex flex-col items-center mt-[20x] lg:mt-[50px]">
          <MoreButton
            text={dict["More"]}
            width={263}
            height={46}
            className="mx-auto my-[50px]"
            href={"/blogs"}
          />
        </div>
      </div>
      <div>
        <div
          className="flex flex-col min-h-[422px] h-auto w-full py-[50px] px-20 md:px-40 lg:px-[80px] pe-auto bg-cover bg-center"
          style={{
            backgroundImage: `
      linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), 
      url(${process.env.NEXT_PUBLIC_API_URL}${dataHome?.about?.image})
    `,
          }}
        >
          <p className="text-center md:text-start title font-[500] text-gray-white mb-[40px]">
            {dataHome?.about?.title}
          </p>
          <div className="w-full md:w-[38dvw] text-justify">
            <div className=" mb-[35px] md:mb-[20px]">
              <ReadMoreText
                text={dataHome.about.description}
                textColor="text-white"
                isgradient={false}
              />
            </div>
            <MoreButton
              text={dict["MoreDetails"]}
              width={263}
              height={46}
              className="mx-auto py-[10px] md:mx-0"
              invert={true}
              href="/aboutus"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center px-[20px] md:px-40 py-[50px]  gap-[28px]">
        <Section locale={locale} title={dict["Subscribenewsletter"]} />
        <MoreButton
          text={dict["ecomeamember"]}
          width={239}
          height={46}
          href={"/newsletter"}
        />
      </div>
    </div>
  );
}

function Section({ title, descrption, locale }) {
  return (
    <div className="flex flex-col text-center">
      <h1
        className={`title font-[500] mb-[10px] leading-[50px] ${
          ["fa", "ar"].includes(locale) ? "font-fa" : "font-en"
        }`}
      >
        {title}
      </h1>
      <p className="text-[16px] font-[400] ">{descrption}</p>
    </div>
  );
}
