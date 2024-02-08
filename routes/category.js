const router = require('express').Router();
const Controller = require('../controllers/category');
const {saveFile} = require("../utils/gallery");
const {Schema} = require("../utils/schema");
const {validateBody,paramsValidate} = require('../utils/validator')
router.route('/')
    .get(Controller.all)
    .post([saveFile,validateBody(Schema.category),Controller.create])

router.route('/:id')
    .get(paramsValidate(Schema.AllSchema.id,'id'),Controller.getById)
    .patch(paramsValidate(Schema.AllSchema.id,'id'),Controller.updateById)
    .delete(paramsValidate(Schema.AllSchema.id,'id'),Controller.deleteById)


module.exports = router;