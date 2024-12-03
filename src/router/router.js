import { createBrowserRouter } from "react-router-dom";
import Home from "../screen/Home"
import AddCompany from "../screen/AddCompany"
import { MainLayout } from "../layouts/Main";
const routes =  createBrowserRouter([
    {
        path:"/",
        element:<MainLayout/>,
        errorElement : <div>Aradığınız sayfa bununamamıştır. <a href="/">Ana Sayfa</a></div>,
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