import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getResource} from "../../services";
import LinkElements from "../../components/link-elements";
import "./links-locations-page.css";

export const LinksLocationsPage = () => {
    const {id} = useParams();
    const [locationUrl, setLocationUrl] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        getResource(`/character/${id}`)
            .then(res => {
                setLocationUrl(res.location.url);
                setName(res.location.name);
            })
            .catch(err => console.error("Error loading location:", err));
    }, [id]);

    if (!locationUrl) return <p>No location data</p>;

    return (
        <div className="links">
            <h2>{name}</h2>
            <LinkElements dataLocation={locationUrl} />
        </div>
    );
};
