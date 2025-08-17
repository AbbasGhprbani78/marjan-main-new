"use client";
import React, { useState } from "react";
import Modal from "../module/Modal";
import IntroductionCard from "./IntroductionCard";
import { useTranslation } from "@/hook/useTranslation";
import { GallerySlider } from "../slider";

export default function ImagesContainer({ dataSingleProduct }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { t } = useTranslation();

  return (
    <>
      <p className="font-[500] title px-20 md:px-40 lg:px-80 pt-30 mb-[30px]">
        {t("Images")}
      </p>

      <div>
        <GallerySlider
          data={dataSingleProduct.gallery?.map((item) => ({
            id: item.id,
            image: item.url,
            products: item.products,
          }))}
          onClick={(item) => {
            setSelectedImage(item);
            setOpenModal(true);
          }}
        />
      </div>

      <Modal openModal={openModal} setOpenModal={setOpenModal}>
        {selectedImage && (
          <IntroductionCard
            setOpenModal={setOpenModal}
            singleProduct={{
              title: dataSingleProduct?.title,
              image: selectedImage?.image,
              size: dataSingleProduct?.size,
              color: dataSingleProduct?.colors,
              thickness: dataSingleProduct?.thickness,
              surface: dataSingleProduct?.surface,
              products: selectedImage?.products,
            }}
          />
        )}
      </Modal>
    </>
  );
}
