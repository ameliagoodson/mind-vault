const processCategories = (categories) => {
  let processedCategories = [];

  if (Array.isArray(categories)) {
    console.log("categories: ", categories);

    processedCategories = categories.map((item) =>
      typeof item === "string" ? item.trim() : item.value.trim(),
    );

    console.log("processedCategories", processedCategories);
  } else if (typeof categories === "string") {
    processedCategories = categories.split(",").map((item) => item.trim());
  }

  return processedCategories;
};

export default processCategories;
