const processCategories = (categories) => {

  // categories have to be comma separated to be counted as separate categories
  let processedCategories;
  if (Array.isArray(categories)) {
    processedCategories = categories.map((item) => item.trim());
  } else {
    processedCategories = categories.split(",").map((item) => item.trim());
  }

  return processedCategories
}
export default processCategories