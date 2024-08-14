const { blog } = require("../models/index.js");

async function newBlog(req, res) {
  try {
    const createBlog = await blog.create(req.body);
    res
      .status(201)
      .json({ message: "blog created successfully", new: createBlog });
  } catch (error) {
    console.log(error);
  }
}
async function getAllBlogs(req, res) {
  try {
    const allBlogs = await blog.findAll();

    res.status(200).json({ message: "all blogs gotten", get: allBlogs });
  } catch (error) {
    console.log(error);
  }
}
async function getBlog(req, res) {
  try {
    const blogById = await blog.findOne({
      where: { id: req.params.id },
      attributes: ["id", "title", "description"],
    });
    if (blogById) {
      res.status(200).json({ message: "blog gotten", get: blogById });
    } else {
      return res.status(400).json({ message: "blog doesn't exist" });
    }
  } catch (error) {
    console.log(error);
  }
}
async function editBlog(req, res) {
  try {
    const blogExist = await blog.findOne({ where: { id: req.params.id } });
    if (blogExist) {
      const edit = await blogExist.update(req.body, {
        return: "after",
      });
      res.status(200).json({
        message: "blog updated",
        update: {
          title: blogExist.title,
          description: blogExist.description,
        },
      });
    } else {
      return res.status(400).json({ message: "blog does not exist" });
    }
  } catch (error) {
    console.log(error);
  }
}
async function deleteBlog(req, res) {
  try {
    const deleteBlog = await blog.destroy({ where: { id: req.params.id } });
    if (deleteBlog) {
      res.status(207).json({ message: "blog deleted" });
    } else {
      return res
        .status(400)
        .json({ message: "blog already deleted or doesn't exist" });
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = { newBlog, getAllBlogs, getBlog, editBlog, deleteBlog };
