import {useParams, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {getResource} from "../../services";
import LinkElements from '../../components/link-elements';
import "./links-page.css";

export const LinksPage = () => {
    const {id} = useParams();
    const location = useLocation();
    const path = location.pathname.split("/")[1];
    const [dataList, setDataList] = useState(null);

    useEffect(() => {
        let pathType;
        if (path === "episodes" || path === "origins" || path === "locations") {
            pathType = "character";
        } else if (path === "residents") {
            pathType = "location";
        }
        else {
            pathType = "episode"
        }

        getResource(`/${pathType}/${id}`)
            .then(res => {
                if (path === "characters") setDataList(res.characters);
                else if (path === "residents") setDataList(res.residents);
                else if (path === "episodes") setDataList(res.episode);
            })
            .catch(err => console.error("Error loading links:", err));
    }, [id, path]);

    if (!dataList) return <p>Nothing found</p>;

    return (
        <div className="page links">
            <LinkElements dataElement={dataList} />
        </div>
    );
};
