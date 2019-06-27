var express = require('express');
var router = express.Router();

const GetUsersApi = require('./apis/get-users')
/* GET users listing. */
router.get('/', GetUsersApi.get);

module.exports = router;
