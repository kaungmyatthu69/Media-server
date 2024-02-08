const router = require("express").Router();
const controller = require("../controllers/post");
const {tokenValidate,validateBody, paramsValidate} = require("../utils/validator");
const {Schema} = require("../utils/schema")
const {saveFile} = require("../utils/gallery");

router.route('/')
        .get(controller.all)
        .post(tokenValidate,saveFile,validateBody(Schema.PostSchema),controller.create)

router.route('/:id')
    .get(controller.getById)
    .delete(tokenValidate,controller.deleteById)
    .patch(tokenValidate,controller.updateById);

router.get('/category/:id',paramsValidate(Schema.AllSchema.id,'id'),controller.getByCategory)
router.get('/user/:id',paramsValidate(Schema.AllSchema.id,'id'),controller.getByUser)
router.get('/tag/:id',paramsValidate(Schema.AllSchema.id,'id'),controller.getByTag)
router.get('/paginate/:page',paramsValidate(Schema.AllSchema.page,'page'),controller.paginate)
router.get('/like/toggle/:id/:page',paramsValidate(Schema.AllSchema.id,'id'),controller.toggleLike)
module.exports = router;