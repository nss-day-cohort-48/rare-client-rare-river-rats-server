export const CategoryProvider = (props) => {
    const [categories, setCategories] = useState([])

    const getCategoryById = (id) => {
        return fetch(`http://localhost:8000/categories/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`
            }
        })
        .then(res => res.json())
    }

    const getCategories = () => {
        return fetch("http://localhost:8000/categories", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`
            }
        })
        .then(res => res.json())
        .then(setCategories)
    }
    const addCategory = category => {
        return fetch("http://localhost:8000/categories", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(category)
        })
        .then(response => response.json())
    }

    const updateCategory = categoryObj => {
        return fetch(`http://localhost:8000/categories/${categoryObj.id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(categoryObj)
        })
        .then(getCategories)
    }

    const deleteCategory = categoryId => {
        return fetch(`http://localhost:8000/categories/${categoryId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`,
                "Content-Type": "application/json"
            },
        })
        .then(getCategories)
    }

    /*
        You return a context provider which has the
        `categories` state, `getCategories` function,
@@ -37,7 +69,7 @@ export const CategoryProvider = (props) => {
    */
    return (
        <CategoryContext.Provider value={{
            categories, getCategories, addCategory, updateCategory, deleteCategory, getCategoryById
        }}>
            {props.children}
        </CategoryContext.Provider>
