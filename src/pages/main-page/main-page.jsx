import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {getResource} from "../../services";
import {ImageTag} from "../../components/image-tag";
import rickAndMorty from "../../images/rick-and-morty.png";
import {SearchTag} from "../../components/search-tag";

import "./main-page.css";

export const MainPage = () => {
    const [searchValue, setSearchValue] = useState("");
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (searchValue) {
            getResource(`/character/?name=${searchValue}`)
                .then(data => setResults(data.results))
                .catch(() => setResults([]));
        } else {
            setResults([]);
        }
    }, [searchValue]);

    const handleSearchClick = () => {
        if (results.length > 0) {
            const firstResult = results[0];
            navigate(`/character/${firstResult.id}`);
        }
    };

    return (
        <div className="page">
            <ImageTag className="image-main-page" src={rickAndMorty} alt="rickAndMorty"/>
            <div className="page-content">
                <SearchTag
                    className="search-main-page"
                    type="text"
                    placeholder="Filter by name"
                    onSearch={setSearchValue}
                    searchValue={searchValue}
                    click={handleSearchClick}
                />
                <ul className="search-items-list">
                    {results.map(item => (

                        <li key={item.id}
                            onClick={() => {
                                setSearchValue(item.name);
                                setResults([item]);
                            }}
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
};


