const express = require('express');
const mysql = require('mysql');
const config = {
    host: 'localhost',
    user: 'root',
    password: 'qw159951',
    database: 'recipeweb'
}
const pool = mysql.createPool(
    config
)

const router = express.Router();

//return query results
router.route('/').get(function (req,res,next) {
    // res.send(req.query)
    let keyword = req.query.keyword;
    console.log(keyword)
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        //connection.query(sql_query,callback)
        //query based on keywords percentage
        let relevantQuery = `select r.*,q.portion_left from (select id,
       (length(replace(lower(name),'${keyword}',''))+length(replace(lower(description),'${keyword}',''))+length(replace(lower(ingredients),'${keyword}','')))
            /(length(name)+length(description)+length(ingredients)) as portion_left
from recipes) q, (select * from recipes where name like '%${keyword}%' or description like '%${keyword}%' or ingredients like '%${keyword}%') r where q.id=r.id order by q.portion_left asc`;

        let query = `SELECT * FROM recipes r WHERE r.name LIKE '%${keyword}%' OR r.description LIKE '%${keyword}%' OR r.ingredients LIKE '%${keyword}%'`
        connection.query(relevantQuery,(err,tuples,fields)=>{
            if(err) throw err+' search fault';
            // let result = 'haha:111';
            if(tuples.length!=0){
                console.log(tuples.length);
                res.json(tuples);
            }
            else{
                res.send('no results found')
            }

            connection.release();
        })
    })
})

module.exports = router;