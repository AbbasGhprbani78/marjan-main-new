"use client";
import Image from "next/image";
import React, { useState } from "react";
import LinkButton from "../module/LinkButton";
import { useTranslation } from "@/hook/useTranslation";
import { MoreButton } from "../moreButton";
import Button from "../module/Button";
import Button2 from "../module/Button2";
import Modal from "../module/Modal";
import QuestionForm from "../module/QuestionForm";
import * as Icons from "iconsax-reactjs";

export default function QuestionUs({ data }) {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div className="bg-[#181617] text-white flex flex-col  lg:flex-row items-center pt-[2rem] md:pt-[3rem] pb-[2rem]">
        <div className="px-20  ps-20 w-full md:px-40 lg:px-80 flex flex-col gap-[1.5rem] text-white md:w-[calc(50% - .5rem)]">
          <h2 className="font-medium title text-center md:text-start">
            {data.title}
          </h2>
          <p className="font-normal  text-justify">{data.text}</p>
          <div className="hidden w-[250px]  lg:block">
            <Button2 text={t("Contactus")} onClick={() => setOpenModal(true)} />
          </div>
        </div>
        <div className="relative w-full md:w-[calc(50% - .5rem)] aspect-[3/1]">
          <Image
            src={"/images/55.png"}
            alt="image contact us"
            className="object-cover"
            fill
          />
        </div>
        <div className=" w-[250px] mx-auto lg:hidden">
          <MoreButton
            text={t("Contactus")}
            width={250}
            height={46}
            className="mx-auto my-[25px] "
            href={"/newsletter"}
          />
        </div>
      </div>

      <Modal openModal={openModal} setOpenModal={setOpenModal}>
        <div className="bg-white  px-[2rem] pb-[2rem] pt-[1rem] flex flex-col ">
          <div className="flex items-center justify-between pb-[2rem]">
            <span className="font-medium text-[1.2rem]">
              {t("AskQuestion")}
            </span>
            <Icons.CloseCircle
              size={25}
              className="cursor-pointer"
              onClick={() => setOpenModal(false)}
            />
          </div>
          <QuestionForm openModal={openModal} />
        </div>
      </Modal>
    </>
  );
}
