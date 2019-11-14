const router = require('express').Router()
const mysql = require('mysql');
const config = {
    host: 'localhost',
    user: 'root',
    password: 'qw159951',
    database: 'recipeweb'
}


router.route('/signup').post(function (req,res) {
    // console.log(req.body)
    return new Promise((resolve,reject)=>{
        let pool = mysql.createPool(config)
        pool.getConnection(function (err,connection) {
            if(err) throw err;
            let email = req.body.email
            let pass = req.body.pass
            let query = `insert into users values((select prev.id+1 from users prev order by prev.id desc limit 1),'${email}','${pass}')`
            // console.log(query)
            try{
                connection.query(query,function (err,tuples,fields) {
                    if(err){
                        res.redirect('/user/signup/')
                        // console.log(err)
                    }
                    else{
                        res.redirect('/')
                    }
                })
            }
            catch (e) {
                console.log('my error is ',e)
                res.redirect('/user/signup')
            }
            connection.release();
        })
    })

})


module.exports = router;