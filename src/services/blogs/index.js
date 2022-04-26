import express from "express"
import createError from "http-errors"
import BlogsModel from "./model.js"

const blogsRouter = express.Router()

blogsRouter.get("/", async (req, res, next) => {
  try {
    const blogs = await BlogsModel.find()
    res.status(200).send(blogs)
  } catch (error) {
    next(error)
  }
})

blogsRouter.get("/blogId", async (req, res, next) => {
  try {
    const blog = await BlogsModel.findById(req.params.blogId)
    // here it happens the validation of req.body, if it is not ok Mongoose will throw an error (if it is ok it is NOT saved in db yet)

    if (blog) {
      res.status(200).send(blog)
    } else {
      next(createError(404, "user not found"))
    }
  } catch (error) {
    next(error)
  }
})

blogsRouter.post("/", async (req, res, next) => {
  try {
    const newBlog = new BlogsModel(req.body).save()
    res.status(201).send(newBlog.id)
  } catch (error) {
    next(error)
  }
})

export default blogsRouter
