export const ImageTag = ({className, src, alt, onClick}) => {
    return (
        <div className={className}>
            <img src={src} alt={alt} onClick={onClick} />
        </div>
    );
};