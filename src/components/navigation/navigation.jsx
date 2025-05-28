import {useContext, useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {getResource, showLink, showName} from "../../services";
import Spinner from "../spinner";
import {ContextClick} from "../context";

export const Navigation = () => {
    const [changeTitle, setChangeTitle] = useState([]);
    const [changeLink, setChangeLink] = useState([]);
    const click = useContext(ContextClick)

    useEffect(() => {
        getResource("")
            .then((info) => {
                setChangeTitle(showName(info));
                setChangeLink(showLink(info));
            })
            .catch((err) => console.error("Error fetching navigation data:", err));
    }, []);

    // Поки дані не завантажились — не рендеримо
    if (changeLink.length < 3 || changeTitle.length < 3) {
        return <Spinner />;
    }

    return (
        <nav className="navigation">
            {changeLink.map((link, index) => (
                <NavLink
                    key={index}
                    to={`/${link}`}
                    className="nav-item"
                    onClick={(event) => click(event, link)}
                >
                    {changeTitle[index]}
                </NavLink>
            ))}
        </nav>
    );
};