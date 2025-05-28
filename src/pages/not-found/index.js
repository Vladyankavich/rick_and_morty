import "./not-found.css"

export const NotFound = () => {
    return (
        <div className="page">
            <h2 className="not-found">
                <span>{`<<<`}</span>
                {`Page not fount`}
                <span>{`>>>`}</span>
            </h2>
        </div>
    );
};