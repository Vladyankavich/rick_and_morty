import {useEffect, useState} from "react";
import {useParams, useLocation, Link} from "react-router-dom";
import {getResource} from "../../services";
import {ImageTag} from "../../components/image-tag";
import Spinner from "../../components/spinner";
import "./card-details-page.css";

export const CardDetailsPage = () => {
    const [data, setData] = useState(null);
    const {id} = useParams();
    const location = useLocation();
    const pageNameDisplay = location.pathname.split("/")[1];

    useEffect(() => {
        getResource(`${pageNameDisplay}/${id}`)
            .then((res) => setData(res))
            .catch((err) => console.error("Error loading details:", err));
    }, [id, pageNameDisplay]);

    if (!data) return <Spinner />;

    return (
        <div className="page">
            <div className="card-details">
                <h2 className="details-header">{data.name}</h2>
                {data.image && <ImageTag className="details-image" src={data.image} alt={data.name} />}
                <div className="details-information">
                    {data.type && <div><span>Type:</span> {data.type}</div>}
                    {data.status ? <div><span>Status:</span> {data.status}</div>
                        : data.dimension ? <div><span>Dimension:</span> {data.dimension}</div>
                            : <div><span>Air_date:</span> {data.air_date}</div>}
                    {data.species && <div><span>Species:</span> {data.species}</div>}
                    {data.gender && <div><span>Gender:</span> {data.gender}</div>}
                </div>
            </div>
            <div className="details-button">
                {pageNameDisplay === "character" && (
                    <>
                        <Link to={`/origins/${id}`}><button>Origin</button></Link>
                        <Link to={`/locations/${id}`}><button>Location</button></Link>
                        <Link to={`/episodes/${id}`}><button>Episode</button></Link>
                    </>
                )}
                {pageNameDisplay === "location" && (
                    <Link to={`/residents/${id}`}><button>Residents</button></Link>
                )}
                {pageNameDisplay === "episode" && (
                    <Link to={`/characters/${id}`}><button>Characters</button></Link>
                )}
            </div>
        </div>
    );
};