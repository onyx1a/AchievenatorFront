import React, { useState } from "react";

const ImageWithPlaceholder = (props) => {
    const { imageUrl, placeholder, ...rest } = props;
    const [isLoading, setImageLoaded] = useState(true);

    const handleImageLoad = () => {
        setImageLoaded(false);
    };

    return (
        <>
            {isLoading && <img src={placeholder} {...rest}/>}
            <img src={imageUrl} onLoad={handleImageLoad} style={{ display: isLoading ? 'none' : 'block' }} {...rest}/>
        </>
    );
};

export default ImageWithPlaceholder;