import {useState} from "react";
import {Routes, Route} from 'react-router-dom';
import {getResource} from "../../services";
import {Layout} from "../layout";
import {MainPage} from "../../pages/main-page";
import {Menu} from "../../pages/menu";
import {CardDetailsPage} from "../../pages/card-details-page";
import {LinksPage} from "../../pages/links-page";
import {LinksLocationsPage} from "../../pages/links-locations-page";
import {LinksOriginsPage} from "../../pages/links-origins-page";
import {NotFound} from "../../pages/not-found";
import {ContextClick, ContextData, ContextPageNameDisplay} from "../context";

import "./app.css";
import "./media.css";

export default function App() {
    const [page, setPage] = useState({status: false});
    const [reqData, setReqData] = useState([]);

    function clickMenu(event, data) {
        setPage({display: data, status: true});

        getResource(`/${data}`)
            .then((info) => {
                setReqData(info);
            })
            .catch((err) => console.error("Error fetching:", err));
    }

    return (
        <ContextClick.Provider value={clickMenu}>
            <ContextPageNameDisplay.Provider value={page.display}>
                <ContextData.Provider value={reqData}>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<MainPage />} />
                            <Route path="character" element={<Menu />} />
                            <Route path="location" element={<Menu />} />
                            <Route path="episode" element={<Menu />} />
                            <Route path="character/:id" element={<CardDetailsPage />} />
                            <Route path="location/:id" element={<CardDetailsPage />} />
                            <Route path="episode/:id" element={<CardDetailsPage />} />
                            <Route path="origins/:id" element={<LinksOriginsPage />} />
                            <Route path="locations/:id" element={<LinksLocationsPage />} />
                            <Route path="episodes/:id" element={<LinksPage />} />
                            <Route path="residents/:id" element={<LinksPage />} />
                            <Route path="characters/:id" element={<LinksPage /> } />
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Routes>
                </ContextData.Provider>
            </ContextPageNameDisplay.Provider>
        </ContextClick.Provider>
    );
};