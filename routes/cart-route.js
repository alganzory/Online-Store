const router = require ("express").Router();
const bodyParser = require ("body-parser")
const authGuard = require ("./guards/auth-guard")
const check = require ("express-validator").check
const cartController = require ("../controllers/cart-controller")
router.post ('/', 
    authGuard.isAuth, 
    bodyParser.urlencoded({extended:true}),
    check('amount')
        .not().isEmpty().withMessage ("Quantity is required!")
        .isInt ({min:1}),
    cartController.postCart
)

router.get('/', 
    authGuard.isAuth,
    cartController.getCart)

router.post ('/save',
    authGuard.isAuth, 
    bodyParser.urlencoded({extended:true}),
    check('amount')
        .not().isEmpty().withMessage ("Quantity is required!")
        .isInt ({min:1}),
    cartController.editCart
)

router.post ('/delete',
    authGuard.isAuth,
    bodyParser.urlencoded({extended:true}),
    cartController.deleteFromCart
)

router.post ('/delete-all',
    authGuard.isAuth,
    bodyParser.urlencoded({extended:true}),
    cartController.deleteAll
)


module.exports = router
