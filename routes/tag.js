const router = require('express').Router();
const Controller = require('../controllers/tag');
const {saveFile} = require("../utils/gallery");
const {tokenValidate, validateBody, paramsValidate} = require("../utils/validator");
const {Schema} = require("../utils/schema");
router.get('/',Controller.all );
router.post('/',tokenValidate,saveFile,validateBody(Schema.TagsSchema),Controller.create);

router.route('/:id')
    .get(paramsValidate(Schema.AllSchema.id,'id'),Controller.getById)
    .patch(tokenValidate,paramsValidate(Schema.AllSchema.id,'id'),Controller.updateById)
    .delete(tokenValidate,paramsValidate(Schema.AllSchema.id,'id'),Controller.deleteById)

module.exports = router;