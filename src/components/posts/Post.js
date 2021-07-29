import React from "react";
import "./Posts.css";
// import { Link } from "react-router-dom"

export default ({ post }) => (
  <section className="post">
    <h3 className="post__title">
      <div>{post.title}</div>
    </h3>
    <div className="post__content">{post.content}</div>
  </section>
);
