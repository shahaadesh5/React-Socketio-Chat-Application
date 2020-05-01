const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=>{
    res.send("Server is running on router");
});

module.exports = router;