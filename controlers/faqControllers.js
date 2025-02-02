const {translateText} = require("../utils/translate");
const FAQ = require("../models/faq");
const {redisClient} = require("../utils/cache");

const PostFaq = async (req, res) => {
  try {
    const { question, answer } = req.body;

    const question_hi = await translateText(question, "hi");
    const question_bn = await translateText(question, "bn");
    const answer_hi = await translateText(answer, "hi");
    const answer_bn = await translateText(answer, "bn");

    const newFAQ = new FAQ({
      question,
      answer,
      translations: { question_hi, question_bn, answer_hi, answer_bn },
    });

    await newFAQ.save();
    res.status(201).json(newFAQ);
  } catch (error) {
    res.status(500).json({ message: "Error saving FAQ", error });
  }
};

const GetFaq = async (req, res) => {
  try {
    const { lang } = req.query;
    const faqs = await FAQ.find();

    const translatedFAQs = faqs.map((faq) => faq.getTranslatedText(lang));

    // Cache response
    await redisClient.set(
      req.originalUrl,
      JSON.stringify(translatedFAQs),
      "EX",
      3600
    );

    res.json(translatedFAQs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching FAQs", error });
  }
};


const DeleteFaqById = async (req, res) => {
    try {
        const { id } = req.params;
        const faq = await FAQ.findById(id);
        if (!faq) {
            return res.status(404).json({ message: "FAQ not found" });
        }
        await faq.remove();
        res.json({ message: "FAQ removed" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting FAQ", error });
    }
};

module.exports = { PostFaq, GetFaq, DeleteFaqById };