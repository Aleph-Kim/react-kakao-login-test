import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import FixedBtn from "../components/common/FixedBtn";

export default function Root() {
    return (
        <>
            <Outlet />
        </>
    );
}
