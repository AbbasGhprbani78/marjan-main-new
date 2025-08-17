// import React from "react";

// export default function test() {
//   return (
//     <main className="px-4 sm:px-8 md:px-20 lg:px-40 xl:px-80 mt-8 md:mt-[8rem]">
//       <section className="mt-6 md:mt-[2rem]">
//         <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
//           <p className="text-[.9rem] mb-2 md:mb-0">
//             برای محاسبه دقیق متراژ کاشی، جزئیات زیر را پر کنید.
//           </p>
//           <div className="w-full md:w-[230px]">
//             <SelectDropDown
//               label={"واحد اندازه‌گیری"}
//               data={[
//                 { id: 1, name: "Meter & CM" },
//                 { id: 2, name: "Feet & Inches" },
//               ]}
//               name={"UnitMeasurement"}
//               onChange={""}
//             />
//           </div>
//         </div>
//       </section>
//       <section className="mt-8 md:mt-[3rem]">
//         <div>
//           <p className="font-[600] text-[1rem] pb-4 md:pb-30">
//             نوع سطح و ابعاد اتاق{" "}
//           </p>

//           <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-[4rem] ">
//             {TABS.map((t) => (
//               <button
//                 key={t.value}
//                 onClick={() => setTab(t.value)}
//                 className={`
//        border-b
//         ${
//           tab === t.value
//             ? "bg-[#231f20] text-white "
//             : "bg-white text-[#231f20] font-normal"
//         }
//         text-[16px] md:text-[18px] py-2 md:py-[10px] px-4 md:px-8
//         cursor-pointer min-w-[80px] md:min-w-[100px] transition-all duration-200
//       `}
//               >
//                 {t.label}
//               </button>
//             ))}
//           </div>

//           <div className="flex flex-col md:flex-row items-start gap-6 md:gap-[5rem] mt-8 md:mt-[4rem]">
//             <div className="w-full md:min-w-[320px] bg-[#fafafa] border border-[#eee] rounded-[10px] py-6 md:py-[1.3rem] px-4 md:px-[1rem] shadow-[0px_0px_4px_0px_#00000040]">
//               <MySelect
//                 // label="شکل اتاق"
//                 data={shapes.map((s) => ({ id: s.value, name: s.label }))}
//                 value={shape}
//                 onChange={(selected) => {
//                   setShape(selected?.value || null);
//                   setInputs({});
//                 }}
//                 name="shape"
//                 isClearable={false}
//               />

//               <div className="flex flex-col items-center gap-2 mt-4 md:mt-[1rem]">
//                 <ShapeSVG shape={shape} />
//               </div>
//             </div>

//             <div className="w-full md:min-w-[350px] mt-6 md:mt-10">
//               <div className="font-bold text-[16px] md:text-[18px] mb-6 md:mb-[3rem]">
//                 ابعاد
//                 {tab === "floor"
//                   ? "کف"
//                   : tab === "wall"
//                   ? "دیوار"
//                   : "کف و دیوار"}
//               </div>
//               {shapeInputs.map((input) => (
//                 <div key={input.name} className="mb-8 md:mb-[4rem]">
//                   <Input
//                     label={input.label}
//                     name={input.name}
//                     value={inputs[input.name] || ""}
//                     onChange={(e) =>
//                       setInputs({
//                         ...inputs,
//                         [input.name]: e.target.value.replace(/\D/g, ""),
//                       })
//                     }
//                     inputMode="numeric"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>
//       <section className="mt-6 md:mt-[2rem]">
//         <div>
//           <p className="font-[600] text-[1rem] pb-4 md:pb-30">کسر</p>
//           <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-4 md:gap-0">
//             <div className="md:col-span-4">
//               <Options setIsTrue={setIsDeduction} isTrue={isDeduction} />
//             </div>

//             <div className="md:col-span-8 flex flex-col gap-6 md:gap-[2rem]">
//               <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-[1.2rem] mb-4 md:mb-[2rem] justify-center">
//                 {deductionItems.map((item, i) => (
//                   <button
//                     key={i}
//                     onClick={() => setSelectedTab(i)}
//                     className={`border-t border-b flex items-center justify-center gap-[5px] h-[35px] min-w-[100px] sm:min-w-[131px] px-2 sm:px-4 ${
//                       selectedTab === i ? "border-[#0781fe] font-bold" : ""
//                     }`}
//                   >
//                     {item.name}
//                     <div className="relative w-[20px] aspect-square">
//                       <Image
//                         src={item.image}
//                         className="object-fill"
//                         fill
//                         alt=""
//                       />
//                     </div>
//                   </button>
//                 ))}
//               </div>

//               <div>
//                 {tabRows[selectedTab]?.map((row, idx) => (
//                   <Inputs
//                     key={idx}
//                     index={idx}
//                     label={`${deductionItems[selectedTab].name} (${idx + 1})`}
//                     value={row}
//                     onChange={handleInputChange}
//                     onAdd={handleAddRow}
//                     onRemove={handleRemoveRow}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <section className="mt-6 md:mt-[2rem]">
//         <div>
//           <p className="font-[600] text-[1rem] pb-4 md:pb-30">درصد هدر دادن</p>
//           <CheckBox
//             label={
//               "۵٪ اضافه برای پوشش خسارات تصادفی در حین حمل و نقل یا در منزل"
//             }
//             checked={""}
//             onChange={""}
//             value={""}
//             name={""}
//           />
//         </div>
//       </section>
//       <section className="mt-8 md:mt-[4rem]">
//         <div>
//           <p className="font-[600] text-[1rem] pb-4 md:pb-30">سایز کاشی</p>
//           <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4 md:gap-0">
//             <div className="flex flex-col gap-2 md:gap-[1rem] md:col-span-4">
//               <p className="font-bold text-[.9rem]">
//                 آیا می‌خواهید اندازه کاشی برای هر سطح یکسان باشد؟
//               </p>
//               <Options isTrue={isSameSize} setIsTrue={setIsSameSize} />
//             </div>
//             <div className="flex flex-col md:flex-row items-end gap-2 md:gap-[1rem] md:col-span-8 justify-end w-full">
//               <span className="font-bold">اندازه کاشی : </span>
//               <div className="w-full md:w-[300px]">
//                 <SelectDropDown data={dimensions} label={"cm"} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <section className="flex flex-col md:flex-row items-center justify-center mt-8 md:mt-[4rem] pb-8 md:pb-[3rem] gap-4 md:gap-[2rem]">
//         <div className="flex flex-col md:flex-row items-center gap-4 md:gap-[2rem] w-full md:w-1/2">
//           <Button2 text={"برآورد متراژ کاشی"} onClick={""} icon={Calculator} />
//           <Button2 text={"تنظیم مجدد"} onClick={""} icon={Refresh} />
//         </div>
//       </section>
//     </main>
//   );
// }

// function Inputs({ index, label, value, onChange, onAdd, onRemove }) {
//   return (
//     <div className="flex flex-col sm:flex-row items-end gap-2 sm:gap-[1rem] mb-4 sm:mb-[2.3rem]">
//       <span className="font-bold">{label} :</span>
//       <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-[2rem] w-full sm:w-2/3">
//         <Input
//           label="طول (cm)"
//           value={value.height}
//           onChange={(e) => onChange(index, "height", e.target.value)}
//         />
//         <span>X</span>
//         <Input
//           label="عرض (cm)"
//           value={value.width}
//           onChange={(e) => onChange(index, "width", e.target.value)}
//         />
//       </div>
//       <button
//         type="button"
//         onClick={onAdd}
//         className="rounded-full w-[20px] h-[20px] flex items-center justify-center border mt-2 sm:mt-0"
//       >
//         <Icons.Add size="20" />
//       </button>
//       {index !== 0 && (
//         <button
//           type="button"
//           onClick={() => onRemove(index)}
//           className="rounded-full w-[20px] h-[20px] flex items-center justify-center border mt-2 sm:mt-0"
//         >
//           <Icons.Minus size="20" />
//         </button>
//       )}
//     </div>
//   );
// }
