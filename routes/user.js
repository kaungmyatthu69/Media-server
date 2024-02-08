const express = require("express");
const router = express.Router();
const Controller = require("../controllers/user");
const {validateBody} = require("../utils/validator");
const {Schema} = require("../utils/schema")

router.post('/',Controller.login)
router.post('/register',[validateBody(Schema.UserRegister),Controller.register])
// router.route('/')
//     .get(controller.all)
//     .post(controller.create)
//
//
// router.route('/:id')
//     .get(controller.getById)
//     .delete(controller.deleteById)
//     .patch(controller.updateById)

module.exports= router;