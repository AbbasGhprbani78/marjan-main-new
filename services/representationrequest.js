export const fetchProvinces = async (lang) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/app/provinces/`, {
    method: "GET",
    headers: {
      "Accept-Language": lang,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
};

export const fetchOwnership = async (lang) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/app/ownership-types/`,
    {
      method: "GET",
      headers: {
        "Accept-Language": lang,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
};

export const fetchWarehouse = async (lang) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/app/warehouse-types/`,
    {
      method: "GET",
      headers: {
        "Accept-Language": lang,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
};

export const fetchBirthYears = async (lang) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/app/birth-years/`,
    {
      method: "GET",
      headers: {
        "Accept-Language": lang,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
};

export const fetchWarehouseFacilities = async (lang) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/app/warehouse-facilities/`,
    {
      method: "GET",
      headers: {
        "Accept-Language": lang,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
};
