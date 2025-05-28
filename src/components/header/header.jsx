import { Link } from "react-router-dom";
import logoBlack from "../../images/logo-black.svg";
import {Navigation} from "../navigation";
import {ImageTag} from "../image-tag";

import "./header.css";

export const Header = () => {
    return (
        <div className="header">
            <Link to="/">
                <ImageTag className="logo-black" src={logoBlack} alt="logoBlack" />
            </Link>
            <Navigation />
        </div>
    );
};