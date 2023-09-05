const express = require('express');
const router = express.Router();
const controller = require('../Controllers/controll'); // Import your controller

// Define your routes using the controller functions
router.post("/add", controller.createPost);
router.get("/posts", controller.getAllPosts);
router.put('/posts/:id', controller.updatePost);
router.delete('/posts/:id',controller.deletePost)

// Render the 'BLOG' template
router.get("/", (req, res) => {
  res.render("BLOG.hbs");
});
router.get("/About",(req,res)=>{
res.render("About.hbs");
})
router.get("/Contact",(req,res)=>{
res.render("Contact.hbs");
})

module.exports = router;