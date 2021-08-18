import React, {useContext, useEffect, useState} from "react";
import { PostContext } from "./PostProvider"
import "./Posts.css";
import { useHistory, useParams  } from "react-router";

export const Post = () => {
  const { posts, getPosts } = useContext(PostContext)
  const [ post, setPost ] = useState({})

  const { postId } = useParams();

  const history = useHistory();


  useEffect(() => {
    getPosts()
  }, [])

  useEffect(() => {
    const 
  })
  <section className="post">
    <h3 className="post__title">
      <div>{post.title}</div>
    </h3>
    <div className="post__content">{post.content}</div>
  </section>
};
