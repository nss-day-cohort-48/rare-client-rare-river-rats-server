import React from "react";
import { Route } from "react-router-dom";
import { PostProvider } from "./posts/PostProvider";
import { PostList } from "./posts/PostList";
// import { ProfileProvider } from "./auth/AuthProvider";
// import { RareUserProvider } from "./RareUser/RareUserProvider";
import { CategoryProvider } from "./categories/CategoryProvider";
import { Category } from "./categories/Category";
import { CategoryForm } from "./categories/CategoryForm";
// import { CommentProvider } from "./comments/CommentProvider";
// import { TagProvider } from "./tags/TagProvider";

export const ApplicationViews = () => {
  return (
    <>
      <main
        style={{
          margin: "5rem 2rem",
          lineHeight: "1.75rem",
        }}
      ></main>
      <PostProvider>
        <CategoryProvider>
        <Route exact path="/">
          <PostList />
        </Route>
      <Route exact path="/categories">
                    <Category />
                </Route>
                <Route exact path="/categories/create">
                    <CategoryForm />
                </Route>
            </CategoryProvider>
      </PostProvider>
      
                
    </>
  );
};
