const express = require("express");
const app=express()
const Post = require("../Model/model.js");
const router = express.Router();
const path = require("path");

// Set up the rendering engine for Handlebars
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../Views"));

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

exports.createPost = async (req, res) => {
  try {
    const user = new Post({
      title: req.body.title,
      post: req.body.post,
    });

    await user.save();
    res.redirect("/");
  } catch (err) {
    if (err.name === "ValidationError") {
      const errorMessages = [];
      for (let field in err.errors) {
        errorMessages.push(err.errors[field].message);
      }
      res.json({ message: errorMessages.join(", "), type: "danger" });
    } else {
      res.json({ message: err.message, type: "danger" });
    }
  }
};
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.render("posts.hbs", { posts });
  } catch (error) {
    res.json({ message: error.message, type: "danger" });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedPostData = req.body.post;

    // Find the post by ID and update it
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { post: updatedPostData },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ message: 'Post updated successfully', updatedPost });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update post', details: error.message });
  }
};
exports.deletePost=async (req, res) => {
  try {
    const postId = req.params.id;

    // Find the post by ID and delete it
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post', details: error.message });
  }
}

