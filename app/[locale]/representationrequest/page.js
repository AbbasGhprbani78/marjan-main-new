import Representationrequest from "@/components/templates/Representationrequest";
import React from "react";

export default async function page() {
  return (
    <div className="wrapper">
      <h1 className="sr-only">Representation request</h1>
      <Representationrequest />
    </div>
  );
}
