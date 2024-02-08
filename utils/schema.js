const Joi = require('joi');
const Schema = {
    category:Joi.object({
        name: Joi.string().required(),
        image:Joi.string().required()
    }),
    UserRegister:Joi.object({
        name: Joi.string().required(),
        email:Joi.string().email().required(),
        phone:Joi.string().min(8).max(12).required(),
        password:Joi.string().min(8).max(25).required()
    }),
    PostSchema:Joi.object({
        user:Joi.optional(),
        category:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        tag:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        image:Joi.string().required(),
        title:Joi.string().required(),
        content:Joi.string().required()
    }),
    CommentSchema:Joi.object({
        user:Joi.optional(),
        name:Joi.string().required(),
        postId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        content:Joi.string().required()
    }),
    TagsSchema:Joi.object({
        name:Joi.string().required(),
        image:Joi.string().required(),
        user:Joi.optional()
    }),
    AllSchema:{
        id:Joi.object({
            id:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
        page:Joi.object({
            page:Joi.number().required()
        }),
    }
}
module.exports = {
    Schema
}