import React from "react"
import { Route } from "react-router-dom"
import { Category } from "./categories/Category"
import { CategoryForm } from "./categories/CategoryForm"
import { CategoryProvider } from "./categories/CategoryProvider"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <CategoryProvider>
                <Route exact path="/categories">
                    <Category />
                </Route>
                <Route exact path="/categories/create">
                    <CategoryForm />
                </Route>
            </CategoryProvider>
        </main>
    </>
}
