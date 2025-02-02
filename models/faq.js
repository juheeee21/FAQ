const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    translations: {
        question_hi: String,
        answer_hi: String,
        question_bn: String,
        answer_bn: String,
    }
});

faqSchema.methods.getTranslatedText = function (lang) {
    return {
        question: this.translations[`question_${lang}`] || this.question,
        answer: this.translations[`answer_${lang}`] || this.answer
    }
}

module.exports = mongoose.model('Faq', faqSchema);