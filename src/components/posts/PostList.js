import React, { useState, useContext, useEffect } from "react";
import { PostContext } from "./PostProvider";
import Post from "./Post";
import "./Posts.css";

export const PostList = ({ history }) => {
  const { posts, getPosts } = useContext(PostContext);

  // const [filteredposts, setFiltered] = useState([])

  // Initialization effect hook -> Go get post data
  useEffect(() => {
    getPosts();
  }, []);

  // useEffect(() => {
  //     const matchingposts = posts.filter(post => post.name.toLowerCase().includes(searchTerms.toLowerCase()))
  //     setFiltered(matchingposts)
  // }, [searchTerms])

  // useEffect(() => {
  //     setFiltered(posts)
  // }, [posts])

  return (
    <div style={{ marginTop: "2rem" }}>
      <button onClick={() => history.push("/posts/create")}>Add Post</button>
      <div className="posts">
        {posts.map((post) => (
          <div className="post" id={`post--${post.id}`} key={post.id}>
            <div className="post__title">Title: {post.title}</div>
            <div className="post__content"> Content: {post.content}</div>
          </div>

          //   <Post key={post.id} post={post}
          //   />
        ))}
      </div>
    </div>
  );
};
