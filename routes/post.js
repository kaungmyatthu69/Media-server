const router = require("express").Router();
const controller = require("../controllers/post");

router.route('/')
        .get(controller.all)
        .post(controller.create)

router.route('/:id')
    .get(controller.getById)
    .delete(controller.deleteById)
    .patch(controller.updateById);


module.exports = router;