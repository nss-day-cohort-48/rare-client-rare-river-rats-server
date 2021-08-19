import React from "react";
import { Route } from "react-router-dom";
import { PostProvider } from "./posts/PostProvider";
import { PostList } from "./posts/PostList";
import { ProfileProvider } from "./auth/ProfileProvider";
import { Profile } from "./auth/Profile.js"
import { PostForm } from "./posts/PostForm";
import { RareUserProvider } from "./rare_users/RareUserProvider";
import { RareUserList } from "./rare_users/RareUserList";
import { RareUserDetail } from "./rare_users/RareUserDetail";
import { RareUserSearch } from "./rare_users/RareUserSearch";
import { RareUserForm } from "./rare_users/RareUserForm";
import { CategoryProvider } from "./categories/CategoryProvider";
import { Category } from "./categories/Category";
import { CategoryForm } from "./categories/CategoryForm";
import { TagProvider } from "./tags/TagProvider";
import { Tag } from "./tags/Tag";
import { TagForm } from "./tags/TagForm";
// import { CommentProvider } from "./comments/CommentProvider";

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
          <TagProvider>
            <Route exact path="/">
              <PostList />
            </Route>
            <Route exact path="/posts/create">
              <PostForm />
            </Route>
            <Route exact path="/categories">
              <Category />
            </Route>
            <Route exact path="/categories/create">
              <CategoryForm />
            </Route>
            <Route exact path="/categories/edit/:categoryId(\d+)">
              <CategoryForm />
            </Route>
            <Route exact path="/tags">
              <Tag />
            </Route>
            <Route exact path="/tags/create">
              <TagForm />
            </Route>
            <Route exact path="/tags/edit/:tagId(\d+)">
              <TagForm />
            </Route>
          </TagProvider>
        </CategoryProvider>
      </PostProvider>
      
      <RareUserProvider>
        <Route exact path="/rare_users/create">
          <RareUserForm />
        </Route>
        <Route exact path="/rare_users/detail/:rareUserId(\d+)">
          <RareUserDetail />
        </Route>
        <Route exact path="/rare_users/edit/:rareUserId(\d+)">
          <RareUserForm />
        </Route>
        <Route exact path="/rare_users">
          <RareUserSearch />
          <RareUserList />
        </Route>
      </RareUserProvider>

      <RareUserProvider>
      <ProfileProvider>
                <Route exact path="/profiles">
                    <Profile />
                </Route>
                <Route exact path="/RareUser/:rareUserId(\d+)">
									<RareUserDetail />
                  </Route>
            </ProfileProvider>
            </RareUserProvider>
      
    </>
  );
};
