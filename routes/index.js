const express = require("express");
const models  = require("../models/index")
const router = express.Router();


const todos= [];
const completed=[];


//
// function generateId() {
//
//   let id = 1;
//   let isIdFound = true;
//
//   while (isIdFound) {
//     let item = todos.find(function(item) {
//       return item.id == id;
//     });
//
//     if (item) {
//       id++;
//     } else {
//       isIdFound = false;
//     }
//   }
//
//   return id;
// }

router.get("/", function(req, res) {
  models.todo.findAll({}).then(function (data) {
    console.log(data);
    res.render("todo", {todos: todos, completed: completed , data:data});
  })

});

router.get("/:id", function (req, res) {
  models.todo.findOrCreate({
  where: {
    id:  req.params.id

  },

  defaults:{

    todo: "clean"
  }
})
  .then(function(data) {
    console.log(data);
    res.render("todo", {todo: data});
  });
});


router.post("/create", function(req, res) {
  models.todo.create({
    todo: req.body.todo,
    completed:false
  })
  // let obj = {
  //
  //   complete: false,
  //   text: req.body.todo
  // };
  // console.log(obj);
  // todos.push(obj);
  .then(function(data){
    data = data;
    res.redirect("/");
  })



});

router.post("/destroy/:id", function (req, res) {
  models.todo.destroy({
  where: {
    id: req.params.id
  }
})
  .then(function(data) {
    res.redirect("/");
  });
});

router.post("/edit/:id", function (req, res) {
  models.todo.update({
  todo: req.body.edit

}, {
  where:{
    id: req.params.id
  }
})
  .then(function(data) {
    res.redirect("/");
  });
});

router.post("/", function (req,res) {
  models.todo.create({
    todo: req.body.todo

  })
  .then(function(data) {
    console.log(data);
    res.redirect("/");
  });

});






router.post("/completed/:id", function(req, res) {
 models.todo.update({
   completed:true
 },
 {
   where:{
     id:req.params.id
   }
 }).then(function (data) {
   res.redirect("/");
 })



});







module.exports = router;
