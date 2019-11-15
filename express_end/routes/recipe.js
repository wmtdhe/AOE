const router = require('express').Router();
const mysql = require('mysql');
const path = require('path');

const config = {
    host: 'localhost',
    user: 'root',
    password: 'qw159951',
    database: 'recipeweb'
}
const pool = mysql.createPool(
    config
)
// connection.connect()
// connection.query('SELECT * FROM recipes', function (err, rows, fields) {
//     if (err) throw err
//
//     console.log( rows[0])
// })
// connection.end()

router.route('/').get((req,res)=>{
    // console.log('im got here');
    let recipe = req.query.id;
    console.log(recipe);
    // res.send('hhh')
    if(recipe){
        //This is a shortcut for the pool.getConnection() -> connection.query() -> connection.release() code flow.
        // Using pool.getConnection() is useful to share connection state for subsequent queries.
        // This is because two calls to pool.query()
        // may use two different connections and run in parallel. This is the basic structure:
        pool.getConnection(function (err,connection) {
            if(err) throw err;
            //use the connect
            let query = `SELECT * FROM recipes r, nutrition n WHERE r.id=${recipe} AND r.id=n.id`
            connection.query(query,function (err,row1,fields) {
                if(err) {throw err;}
                // console.log('i got here too')
                let subquery = `select count(c.id) as count from recipes r, comments c where c.belong_to_r=r.id and r.id=${recipe}`
                connection.query(subquery,function (err,row,fields) {
                    if(err) {throw err}
                    if(row1[0]){
                        row1[0].count=row[0].count
                        res.send(row1[0])
                    }
                    else{
                        res.send(row1[0])
                    }
                })

                //when done with the connection, release it
                connection.release();
            })
        })
        // connection.end();
        // console.log('end db')
    }else{
        res.send('not found')
    }

    // console.log('direct in recipe page')
    }
)

router.get('/comments',function (req,res) {
    console.log(req.query)
    let page=req.query.page
    let cid=req.query.cid
    pool.getConnection(function (err,connection) {
        if(err){throw err}
        let query = `select * from comments where belong_to_r=${cid} and id between ${page-1}*5+1 and ${page}*5`
        connection.query(query,function (err,row,fields) {
            if(err){throw err}
            res.send(row)
        })
        connection.release()
    })

})

//export router
module.exports = router;