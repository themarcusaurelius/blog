import React, { useState } from "react";
import BlogDataService from "../services/BlogService";

const AddBlog = () => {
  const initialBlogState = {
    id: null,
    author: "",
    title: "",
    content: "",
    date: Date.now()
  };
  const [blog, setBlog] = useState(initialBlogState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setBlog({ ...blog, [name]: value });
  };

  const saveBlog = () => {
    var data = {
      id: blog.id,
      author: blog.author,
      title: blog.title,
      content: blog.content,
      date: blog.date
    };

    console.log(data)

    BlogDataService.create(data)
      .then(response => {
        setBlog({
          id: response.data.id,
          author: response.data.author,
          title: response.data.title,
          content: response.data.content,
          date: response.data.date
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newBlog = () => {
    setBlog(initialBlogState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newBlog}>
            Add
          </button>
        </div>
      ) : (
        <div>
            <div className="form-group">
                <label htmlFor="author">Author</label>
                <input
                type="text"
                className="form-control"
                id="author"
                required
                value={blog.author}
                onChange={handleInputChange}
                name="author"
                />
            </div>

            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                type="text"
                className="form-control"
                id="title"
                required
                value={blog.title}
                onChange={handleInputChange}
                name="title"
                />
            </div>

            <div className="form-group">
                <label htmlFor="content">Content</label>
                <textarea
                type="textarea"
                className="form-control"
                id="content"
                required
                value={blog.content}
                onChange={handleInputChange}
                name="content"
                />
            </div>

            <button onClick={saveBlog} className="btn btn-success">
                Submit
            </button>
        </div>
      )}
    </div>
  );
};

export default AddBlog;