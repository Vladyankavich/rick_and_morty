import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getResource, showId} from "../../services";
import LinkElements from "../../components/link-elements";
import "./links-origins-page.css";

export const LinksOriginsPage = () => {
    const {id} = useParams();
    const [originUrl, setOriginUrl] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        getResource(`/character/${id}`)
            .then(res => {
                setOriginUrl(res.origin.url);
                setName(res.origin.name);
            })
            .catch(err => console.error("Error loading origin:", err));
    }, [id]);

    if (!originUrl) return <h3 className="no-origin">No origin data</h3>;

    return (
        <div className="links">
            <h2>{name}</h2>
            <LinkElements dataOrigin={originUrl} />
        </div>
    );
};