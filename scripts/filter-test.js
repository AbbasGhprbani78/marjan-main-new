// Simple reproduction of AllProducts filtering logic
const normStr = (v) => String(v).trim().toLowerCase();
const normThickness = (v) => {
  const s = String(v).replace(",", ".");
  const n = Number(s.replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : NaN;
};
const normSize = (v) =>
  String(v).trim().toLowerCase().replace(/\s+/g, "").replace(/[×x*]/gi, "x");

const filterKeyMap = {
  color: "colors",
  size: "sizes",
  industrie: "industry",
  environment: "environment",
  style: "style",
  surface: "surface",
  thicknesses: "thickness",
};

function filterProducts(products, filters = {}, searchTerm = "") {
  return products.filter((product) => {
    if (searchTerm.trim().length >= 3) {
      const lowerSearch = searchTerm.toLowerCase();
      const inTitle = String(product.title || "")
        .toLowerCase()
        .includes(lowerSearch);
      const inCode = (product.tile_variants || []).some((variant) =>
        String(variant.code || "")
          .toLowerCase()
          .includes(lowerSearch)
      );
      if (!inTitle && !inCode) return false;
    }

    return Object.entries(filters).every(([key, values]) => {
      if (!values?.length) return true;

      const keyLower = String(key).toLowerCase();
      const productKey = filterKeyMap[keyLower];
      if (!productKey) return true;

      const field = product?.[productKey];
      if (field == null) return false;

      const selectedStrs = values.map((val) =>
        productKey === "sizes" || keyLower === "size"
          ? normSize(val)
          : normStr(val)
      );

      if (keyLower === "thicknesses" || keyLower === "thickness") {
        const productNum = normThickness(field);
        return (
          Number.isFinite(productNum) &&
          selectedStrs.some((val) => normThickness(val) === productNum)
        );
      }

      if (Array.isArray(field)) {
        const normalizedField = field.map((f) =>
          productKey === "sizes" ? normSize(f) : normStr(f)
        );
        return selectedStrs.some((val) => normalizedField.includes(val));
      }

      return selectedStrs.some(
        (val) =>
          (productKey === "sizes" ? normSize(field) : normStr(field)) === val
      );
    });
  });
}

// sample products from your message
const products = [
  {
    id: 25,
    title: "Arena",
    sizes: ["100×100"],
    thickness: "10.00",
    colors: ["کرم", "خاکستری"],
    environment: ["مسکونی", "تجاری و پر تردد"],
    style: ["سنگ"],
    tile_variants: [],
  },
  {
    id: 26,
    title: "onyx",
    sizes: ["120×60", "100×100"],
    thickness: "10.00",
    colors: ["خاکستری", "کرم"],
    environment: ["مسکونی"],
    style: ["مرمریت"],
    tile_variants: [],
  },
  {
    id: 30,
    title: "Small",
    sizes: ["60×60"],
    thickness: "12.00",
    colors: ["سفید"],
    tile_variants: [],
  },
];

const tests = [
  { filters: { Size: ["100×100"] }, expectIds: [25, 26] },
  { filters: { Size: ["120×60"] }, expectIds: [26] },
  { filters: { Size: ["60x60"] }, expectIds: [30] },
  { filters: { Thickness: ["10 mm"] }, expectIds: [25, 26] },
  { filters: { Thickness: ["12 mm"] }, expectIds: [30] },
  {
    filters: { Size: ["100 x 100"], Thickness: ["10mm"] },
    expectIds: [25, 26],
  },
];

for (const t of tests) {
  const res = filterProducts(products, t.filters);
  console.log("\nTest filters:", t.filters);
  console.log(
    "Matched ids:",
    res.map((p) => p.id)
  );
  console.log("Expected ids:", t.expectIds);
}
