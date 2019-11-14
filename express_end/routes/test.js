const router = require('express').Router();
const path = require('path');

router.route('/:id').get(function (req,res) {
    //change on id
    // console.log(__dirname)
    // console.log(__filename)
    console.log(req.path)
    let id = req.path.replace('/','');
    let option = {
        root:path.join(__dirname,'../statics')
    }
    res.sendFile(`/recipe-${id}.jpg`,option)
})

module.exports = router;
