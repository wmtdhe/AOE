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
            connection.query(query,function (err,row,fields) {
                if(err) {throw err;}
                // console.log('i got here too')
                res.send(row[0])
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


//export router
module.exports = router;