import React from "react";
import Accordion from "../module/Accardion";

export default function FaqItem({ item }) {
  return (
    <>
      <h3 className="font-medium text-[1.25rem] my-[1rem]">{item?.title}</h3>
      {item?.accordionItems?.map((accardionItem, i) => (
        <Accordion accardionItem={accardionItem} key={i} />
      ))}
    </>
  );
}
