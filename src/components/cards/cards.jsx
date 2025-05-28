import { useEffect, useState } from "react";
import { getCorrectURL, getResource } from "../../services";
import { Card } from "../card";
import Spinner from "../spinner";
import { useLocation, useSearchParams } from "react-router-dom";

export const Cards = () => {
    const [data, setData] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [nextPage, setNextPage] = useState(null);

    const location = useLocation();
    const pageNameDisplay = location.pathname.split("/")[1];

    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page")) || 1;

    const loadPage = () => {
        const query = `/${pageNameDisplay}?page=${page}`;
        const url = getCorrectURL(query);

        getResource(url)
            .then((info) => {
                setData(info);
                setNextPage(info.info.next);
                setPrevPage(info.info.prev);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            })
            .catch((err) => {
                console.error("Error loading page:", err);
                setData(null);
            });
    };

    useEffect(() => {
        loadPage();
    }, [page, pageNameDisplay]);

    const clickButtonNext = () => {
        if (nextPage) {
            setSearchParams({ page: page + 1 });
        }
    };

    const clickButtonPrev = () => {
        if (prevPage && page > 1) {
            setSearchParams({ page: page - 1 });
        }
    };

    if (!data) return <Spinner />;
    const arr = data.results;

    return (
        <div className="cards">
            <div className={pageNameDisplay}>
                {arr.map((el) => (
                    el.image ? (
                        <Card key={el.id}
                              id={el.id}
                              img={el.image}
                              name={el.name}
                              species={el.species}
                              category={pageNameDisplay} />
                    ) : el.type ? (
                        <Card key={el.id}
                              id={el.id}
                              name={el.name}
                              type={el.type}
                              dimension={el.dimension}
                              category={pageNameDisplay} />
                    ) : (
                        <Card key={el.id}
                              id={el.id}
                              name={el.name}
                              airDate={el.air_date}
                              episode={el.episode}
                              category={pageNameDisplay} />
                    )
                ))}
            </div>

            <div className="buttons">
                <button onClick={clickButtonPrev} disabled={!prevPage || page <= 1}>
                    {`<< PREV`}
                </button>

                <span>Page: {page}</span>

                <button onClick={clickButtonNext} disabled={!nextPage}>
                    {`NEXT >>`}
                </button>
            </div>
        </div>
    );
};

