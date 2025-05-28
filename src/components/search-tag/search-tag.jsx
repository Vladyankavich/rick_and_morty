import {ImageTag} from "../image-tag";
import iconSearch from "../../images/Icon-search.svg";

export const SearchTag = ({className, type, placeholder, onSearch, searchValue, click}) => {
    return (
        <div className={className}>
            <div className="search-box">
                <ImageTag className="icon-search"
                          src={iconSearch}
                          alt="iconSearch"
                          onClick={click}
                />
                <input
                    type={type}
                    placeholder={placeholder}
                    value={searchValue}
                    onChange={(e) => onSearch(e.target.value)}
                />
            </div>
        </div>
    );
};