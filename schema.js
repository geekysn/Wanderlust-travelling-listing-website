const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    filename: Joi.string().allow(''),
    url: Joi.string().allow(''),
    price: Joi.number().required(),
    country: Joi.string().required(),
    location: Joi.string().required()
});

module.exports.reviewSchema = Joi.object({
    review : Joi.object({
        rating: Joi.number().required().min(0).max(5),
        comment: Joi.string().required()
    }).required()
})