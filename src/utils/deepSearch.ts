export const deepSearch = ({obj, searchString}: {obj: any, searchString: string}): boolean => {
  let found = false;

  if (typeof obj === "object" && obj !== null) {
    // If the input is an object
    for (const key in obj) {
      // Loop through all object properties
      if (deepSearch({obj: obj[key], searchString})) {
        // Call the function recursively
        found = true;
        break;
      }
    }
  } else if (Array.isArray(obj)) {
    // If the input is an array
    for (let i = 0; i < obj.length; i++) {
      if (deepSearch({obj: obj[i], searchString})) {
        // Call the function recursively
        found = true;
        break;
      }
    }
  } else {
    // If the input is a primitive value
    if (String(obj)?.toLowerCase()?.includes(searchString.toLowerCase().trim())) {
      // Check if it includes the search string
      found = true;
    }
  }

  return found;
};