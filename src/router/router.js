import { createBrowserRouter } from "react-router-dom";
import Home from "../screen/Home"
import AddCompany from "../screen/AddCompany"
import { MainLayout } from "../layouts/Main";
const routes =  createBrowserRouter([
    {
        path:"/",
        element:<MainLayout/>,
        errorElement : "Home Error Page",
        children:[
            {
                index:true,
                element:<Home/>
            },
            {
                path:"addcompany",
                element:<AddCompany/>
            },
        ]
    },
])

export default routes;