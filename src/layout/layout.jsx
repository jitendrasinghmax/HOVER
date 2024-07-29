import Header from "@/components/header";
import { Outlet } from "react-router-dom";
const Layout=()=>{
    return(
        <>
          <Header></Header>
          <Outlet/>
          {/* footer */}
        </>
    )
}
export default Layout;