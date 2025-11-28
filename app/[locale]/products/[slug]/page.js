import { Anchor } from "@/components/SingleProduct/anchor";
import Image from "next/image";
import React from "react";
import * as Icons from "iconsax-reactjs";
import Table from "@/components/SingleProduct/Table";
import ImageFeature from "@/components/SingleProduct/ImageFeature";
import Texture from "@/components/SingleProduct/Texture";
import ImagesContainer from "@/components/SingleProduct/ImagesContainer";
import CertificateContainer from "@/components/SingleProduct/CertificateContainer";
import GuideSection from "@/components/SingleProduct/GuideSection";
import VideoContainer from "@/components/SingleProduct/VideoContainer";
import ProjectsContainer from "@/components/SingleProduct/ProjectsContainer";
import ReadMoreText from "@/components/module/ReadMoreText";
import { fetchSingleProduct } from "@/services/singleProduct";
import { fetchTranslateWords } from "@/services/translate";
import { buildDictionary } from "@/utils/buildDictionary";
import { notFound } from "next/navigation";

import translations from "@/components/module/translations";

export const revalidate = 300;
export const dynamicParams = true;
export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const dict = translations[locale] || translations["en"];
  const pageKey = "Product";

  return {
    title: `${dict.websiteName} | ${dict[pageKey] || "Product"}`,
  };
}

export default async function page({ params }) {
  const { slug } = await params;
  const { locale } = await params;

  try {
    const dataSingleProduct = await fetchSingleProduct(locale, slug);
    const dictArray = await fetchTranslateWords(locale);
    const dict = buildDictionary(dictArray);
    console.log(dataSingleProduct);
    return (
      <div className="wrapper">
        <Anchor data={dataSingleProduct?.projects?.length} />
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}${dataSingleProduct?.mainImage}`}
          alt="Background Image"
          className="aspect-[4/3] object-fill lg:object-cover w-full  md:min-h-[400px] lg:h-[72dvh] mt-[130px] lg:mt-0"
          width={1980}
          height={1080}
          quality={100}
          unoptimized={true}
          priority
        />
        <Table
          title={dataSingleProduct?.title}
          thickness={dataSingleProduct?.thickness}
          colors={dataSingleProduct?.Tiles}
          surface={dataSingleProduct?.surface}
          size={dataSingleProduct?.size}
        />

        <div className="px-20 md:px-40 lg:px-80 mt-[2rem] pt-35 pb-61  border-b-1 border-t-1 border-[#919191] ">
          <div id="catalog">
            {
              <ReadMoreText
                text={dataSingleProduct?.description}
                textColor={"text-gray-700"}
              />
            }
          </div>
          <div className="flex flex-wrap pt-[1.5rem] md:pt-54 gap-[1.5rem]  md:gap-42 lg:gap-52 flex-col md:flex-row">
            <GuideSection
              text={dict["AskQuestion"]}
              icon={"MessageQuestion"}
              typeModel={"questions"}
              id={dataSingleProduct?.product_id}
            />
            <GuideSection
              text={dict["WhereToBuy"]}
              icon={"Location"}
              isLink={"true"}
              href="/representatives"
            />
            <GuideSection
              text={dict["Catalog"]}
              icon={"MenuBoard"}
              iscatalog={true}
              value={dataSingleProduct.catalog}
              is_industrial={dataSingleProduct?.is_industrial}
              category={dataSingleProduct?.category}
            />
            <GuideSection
              text={dict["SmartLayout"]}
              icon={"Box2"}
              isLink={"true"}
              href="https://marjan.ariisco.com/en"
            />
            <GuideSection
              text={dict["CategoryTable"]}
              icon={"Box"}
              typeModel={"categories"}
              dataPack={dataSingleProduct?.packing_tables}
            />
            <GuideSection
              text={dict["TechnicalSpecsTable"]}
              icon={"InfoCircle"}
              typeModel={"properties"}
              dataTechnical={dataSingleProduct?.technical_specifications}
            />
          </div>
        </div>
        <div className="border-b-1 border-[#919191]" id="gallery">
          {dataSingleProduct.gallery.length > 0 && (
            <ImagesContainer
              dataSingleProduct={dataSingleProduct}
              images={dataSingleProduct?.Tiles}
            />
          )}
          {dataSingleProduct?.Tiles.length > 0 && (
            <div className="  pb-40 pt-[40px]" id="colors">
              <Texture
                textureImage={dataSingleProduct?.Tiles}
                isrevers={
                  dataSingleProduct?.title === "Embossed Elegance" ||
                  dataSingleProduct?.title === "embossed elegance" ||
                  dataSingleProduct?.title === "Embossed elegance" ||
                  dataSingleProduct?.title === "EmbossedElegance" ||
                  dataSingleProduct?.title === "embossedelegance"
                }
              />
            </div>
          )}
        </div>

        {dataSingleProduct?.icons.length > 0 && (
          <div
            dir="ltr"
            className="border-b-1 border-[#919191] flex flex-wrap items-center px-20 md:px-40 lg:px-80 gap-[2rem] md:gap-[3rem] pt-[3rem] pb-[4rem]"
          >
            {dataSingleProduct?.icons?.map((item, i) => (
              <ImageFeature key={i} item={item} />
            ))}
          </div>
        )}

        {dataSingleProduct.projects.length > 0 && (
          <div id="projects">
            <ProjectsContainer data={dataSingleProduct?.projects} />
          </div>
        )}

        {dataSingleProduct?.certifications.length > 0 && (
          <div id="certificates">
            <CertificateContainer data={dataSingleProduct?.certifications} />
          </div>
        )}

        {dataSingleProduct?.aparat_video && (
          <VideoContainer video={dataSingleProduct?.aparat_video} />
        )}

        <div className=" flex  items-start pb-40 pt-35  px-20 md:px-40 lg:px-80 gap-[10px]">
          <div className=" border-2 border-[#919191]">
            <Icons.Danger size={15} className="m-3" />
          </div>
          <p className="text-gray-900 ">{dict["TextSizeInfo"]}</p>
        </div>
      </div>
    );
  } catch (error) {
    if (error.status === 404) {
      notFound();
    }
    throw error;
  }
}
