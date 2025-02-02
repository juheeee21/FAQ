const translate = require("google-translate-api");

const translateText = async (text, lang) => {
  try {
    const res = await translate(text, { to: lang });
    return res.text;
  } catch (error) {
    console.error("Translation Error:", error);
    return text;
  }
};

module.exports = { translateText };