import {useContext} from "react";
import {Link} from 'react-router-dom';
import {showDisplayName, showId} from "../../services";
import {ContextClick} from "../context";

export default function LinkElements({dataElement, dataLocation, dataOrigin}) {
    const click = useContext(ContextClick);

    return (
        <>
            {dataElement ? dataElement.map((url) => {
                    return <Link key={showId(url)}
                                 to={`/${showDisplayName(url)}/${showId(url)}`}
                                 onClick={(event) => click(event, showDisplayName(url))}>
                        {url}
                    </Link>
                })
                : dataLocation ?
                    <Link key={showId(dataLocation)}
                          to={`/${showDisplayName(dataLocation)}/${showId(dataLocation)}`}
                          onClick={(event) => click(event, showDisplayName(dataLocation))}>
                        {dataLocation}
                    </Link>

                : dataOrigin ?
                    <Link key={showId(dataOrigin)}
                          to={`/${showDisplayName(dataOrigin)}/${showId(dataOrigin)}`}
                          onClick={(event) => click(event, showDisplayName(dataOrigin))}>
                        {dataOrigin}
                    </Link>
                : null}
        </>
    );
};
