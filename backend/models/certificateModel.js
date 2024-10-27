const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const certificateSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    pdf: {
        key: {
            type: String,
            required: true,
            unique: true
        },
        downloadUrl: String
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    department: {
        type: String,
        required: true
    }
});

certificateSchema.methods.downloadUrlReset = function () {
    const doc = this;
    if (doc.pdf.downloadUrl) {
        setTimeout(async function () {
            doc.pdf.downloadUrl = undefined;
            await doc.save(); 
        }, 60 * 60 * 1000); 
    }
};

certificateSchema.pre('save', function (next) {
    if (this.isModified('pdf.downloadUrl')) {
        this.downloadUrlReset();
    }
    next();
});

const Certificate = mongoose.model('Certificate', certificateSchema);
module.exports = Certificate;
