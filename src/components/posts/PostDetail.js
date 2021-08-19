import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "./PostProvider";
import "./Posts.css";

export const PostDetails = (props) => {
  const { deletePost, getPostById } = useContext(PostContext);

  const [post, setPost] = useState({ location: {}, customer: {} });

  useEffect(() => {
    const postId = parseInt(props.match.params.postId);
    getPostById(postId).then(setPost);
  }, []);

  return (
    <section className="post">
      <h3 className="post__name">{post.title}</h3>
      <div className="post__category">{post.category_id}</div>
      <div className="post__publication_date">
        Publication Date: {post.publication_date}
      </div>
      <div className="post__content">Content: {post.content}</div>
      <div className="post__status">Approval Status: {post.approved}</div>

      <button
        onClick={() =>
          deletePost(post.id).then(() => props.history.push("/posts"))
        }
      >
        Delete Post
      </button>

      <button
        onClick={() => {
          props.history.push(`/posts/edit/${post.id}`);
        }}
      >
        Edit
      </button>
    </section>
  );
};
