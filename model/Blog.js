const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema(
    {
        authorId: {
            type: String,
            required: true,
        },
        authorName: {
            type: String,
            required: true,
        },
        authorDP: {
            type: String,
            default: '',
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            default: 'other',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Blog', BlogSchema);
