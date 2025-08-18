import { Anchor } from "@/app/components/SingleProduct/anchor";
import Image from "next/image";
import React from "react";
import * as Icons from "iconsax-reactjs";
import Table from "@/app/components/SingleProduct/Table";
import ImageFeature from "@/app/components/SingleProduct/ImageFeature";
import Texture from "@/app/components/SingleProduct/Texture";
import ImagesContainer from "@/app/components/SingleProduct/ImagesContainer";
import CertificateContainer from "@/app/components/SingleProduct/CertificateContainer";
import GuideSection from "@/app/components/SingleProduct/GuideSection";
import VideoContainer from "@/app/components/SingleProduct/VideoContainer";
import ProjectsContainer from "@/app/components/SingleProduct/ProjectsContainer";
import fa from "@/i18n/fa.json";
import en from "@/i18n/en.json";
import ReadMoreText from "@/app/components/module/ReadMoreText";
import { fetchSingleProduct, getSubjects } from "@/services/singleProduct";
export default async function page({ params }) {
  const { id } = await params;
  const { locale } = await params;
  const t = locale === "fa" ? fa : en;
  const dataSingleProduct = await fetchSingleProduct(locale, id);
  const allsubjects = await getSubjects(locale);

  console.log(dataSingleProduct);

  return (
    <div className="wrapper">
      <Anchor data={dataSingleProduct?.projects?.length} />
      <Image
        src={`${process.env.NEXT_PUBLIC_API_URL}${dataSingleProduct?.mainImage}`}
        alt="Background Image"
        className="aspect-square object-cover w-full  h-[60dvh]  md:min-h-[400px] lg:h-[72dvh] "
        width={1980}
        height={1080}
      />
      {/* <Table
        title={dataSingleProduct?.title}
        thickness={dataSingleProduct?.thickness}
        colors={dataSingleProduct?.colors}
        surface={dataSingleProduct?.surface}
        size={dataSingleProduct?.size}
      /> */}

      <div className="px-20 md:px-40 lg:px-80 mt-[2rem] pt-35 pb-61  border-b-1 border-t-1 border-gray-500 ">
        <div className="  text-justify " id="catalog">
          {
            <ReadMoreText
              text={dataSingleProduct?.description}
              textColor={"text-gray-700"}
            />
          }
        </div>
        <div className="flex flex-wrap pt-[1.5rem] md:pt-54 gap-[1.5rem]  md:gap-42 lg:gap-52 flex-col md:flex-row">
          <GuideSection
            text={t.AskQuestion}
            icon={"MessageQuestion"}
            typeModel={"questions"}
            subjects={allsubjects}
          />
          <GuideSection
            text={t.WhereToBuy}
            icon={"Location"}
            isLink={"true"}
            href="/representatives"
          />
          <GuideSection
            text={t.Catalog}
            icon={"MenuBoard"}
            isLink={"true"}
            href="/catalog"
          />
          <GuideSection
            text={t.SmartLayout}
            icon={"Box2"}
            isLink={"true"}
            href="https://marjan.ariisco.com/"
          />
          <GuideSection
            text={t.CategoryTable}
            icon={"Box"}
            typeModel={"categories"}
          />
          <GuideSection
            text={t.TechnicalSpecsTable}
            icon={"InfoCircle"}
            typeModel={"properties"}
          />
        </div>
      </div>
      <div className="border-b-1 border-gray-500" id="gallery">
        <ImagesContainer dataSingleProduct={dataSingleProduct} />
        <div className="  pb-40 pt-[40px]" id="colors">
          <Texture textureImage={dataSingleProduct?.Tiles} />
        </div>
      </div>
      <div
        dir="ltr"
        className="border-b-1 border-gray-500 flex flex-wrap items-center px-20 md:px-40 lg:px-80 gap-[2rem] md:gap-[3rem] pt-[3rem] pb-[4rem]"
      >
        {dataSingleProduct?.features?.map((item, i) => (
          <ImageFeature key={i} item={item} />
        ))}
      </div>

      {dataSingleProduct.projects.length > 0 && (
        <div id="projects">
          <ProjectsContainer data={dataSingleProduct?.projects} />
        </div>
      )}

      <div id="certificates">
        <CertificateContainer data={dataSingleProduct?.certifications} />
      </div>
      {dataSingleProduct?.video && (
        <VideoContainer video={dataSingleProduct?.video} />
      )}

      <div className=" flex  items-start pb-40 pt-35  px-20 md:px-40 lg:px-80 gap-[10px]">
        <div className=" border-2 border-gray-500">
          <Icons.Danger size={15} className="m-3" />
        </div>
        <p className="text-gray-900 text-justify">{t.TextSizeInfo}</p>
      </div>
    </div>
  );
}
