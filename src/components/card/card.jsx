import {Link} from "react-router-dom";
import {ImageTag} from "../image-tag";

export const Card =({id, img, name, species, type, dimension, airDate, episode, category }) => {

    return (
        <Link className={`card card-${category}`}
              to={`/${category}/${id}`}
        >
            {img && <ImageTag className="card-image"
                              src={img}
                              alt={name}
            />}
            <h4>{name}</h4>
            <p>{species || type || airDate}</p>
            {dimension ? <p>{dimension}</p>
                : episode ? <p>{episode}</p>
                : null}
        </Link>
    );
};