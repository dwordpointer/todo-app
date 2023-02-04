var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
const db = require("../db");
var format = require('date-format');

router.post('/', async (req,res)=>{
  if(req.body.edit == ""){
    try {
      console.log(req.body);
      await db.execute("UPDATE todo SET text = ? where id=?",[req.body.name,req.body.edit_id]);
      res.redirect("/");
    } catch (err) {
        console.log(err);
    }
  }
  else if(req.body.delete == ""){
    console.log(req.body);
    try {
      await db.execute("DELETE FROM todo where id=?",[req.body.delete_id]);
      res.redirect("/");
    } catch (err) {
        console.log(err);
    }
  }
  else if (req.body.text)
  {
    var time = format('dd/MM/yyyy', new Date());
    try {
      await db.execute("INSERT INTO todo SET text=?,status='new', created=?",[req.body.text,time]);
      res.redirect("/");
    } catch (err) {
        console.log(err);
    }
  }
});

router.get('/', async (req, res) => {
  const [todo,] = await db.promise().query("select * from todo ORDER BY id DESC");
  res.render('index', 
  { 
    title:"Todo",
    array: todo
  });
});
module.exports = router;