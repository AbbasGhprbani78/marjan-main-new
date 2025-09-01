import React from "react";
import * as Icons from "iconsax-reactjs";
export default function AddRemoveForm({ addForm, removeForm }) {
  return (
    <div className="flex items-center gap-5">
      <Icons.AddCircle size="25" onClick={addForm} className="cursor-pointer" />
      <Icons.MinusCirlce
        size="25"
        onClick={removeForm}
        className="cursor-pointer"
      />
    </div>
  );
}
