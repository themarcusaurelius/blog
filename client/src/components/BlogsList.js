import React, { useState, useEffect } from "react";
import BlogDataService from "../services/BlogService";

const BlogsList = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  
  useEffect(() => {
    retrieveBlogs();
  }, []);

  const retrieveBlogs = () => {
    BlogDataService.getAll()
      .then(response => {
        setBlogs(response.data);
        console.log(response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const setActiveBlog = (blog, index) => {
    setCurrentBlog(blog);
    setCurrentIndex(index);
  };

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Blogs List</h4>

        <ul className="list-group">
          {blogs &&
            blogs.map((blog, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveBlog(blog, index)}
                key={index}
              >
                {blog.title}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentBlog ? (
          <div>
            <h4>Blog</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentBlog.title}
            </div>
          </div>
        ) : (
          <div>
            <br />
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsList;