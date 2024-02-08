const router = require('express').Router();
const Controller = require('../controllers/comment');
const {tokenValidate, validateBody, paramsValidate} = require("../utils/validator");
const {Schema} = require("../utils/schema");


router.post('/',tokenValidate,validateBody(Schema.CommentSchema),Controller.add);
router.get('/:id',paramsValidate(Schema.AllSchema.id,'id'),tokenValidate,Controller.all);
router.delete('/:id',paramsValidate(Schema.AllSchema.id,'id'),tokenValidate,Controller.drop);
module.exports = router;