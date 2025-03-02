import prettier from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';

const formatCode = async (code) => {

  try {
    return await prettier.format(code, {
      parser: "babel",
      plugins: [parserBabel],
    });
  } catch (error) {
    console.error("Error formatting code:", error);
    return code; // Return unformatted code if an error occurs
  }
}

export default formatCode