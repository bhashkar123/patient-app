import React, { useState, useEffect } from "react";
import ImageUploader from "react-images-upload";

const UploadImage = props => {
    const [pictures, setPictures] = useState([]);
    const [showPreview, setShowPreview] = useState(true);

    const resetSelectedImages = () => {
        console.log('pimages', props.selectedImages);
        setPictures(props.selectedImages);
        if (props.selectedImages)
            if (props.selectedImages.length === 0)
                setShowPreview(false);
    }

    //   useEffect(resetSelectedImages, [props.selectedImages]);

    const onDrop = picture => {
        console.log(picture);
        setShowPreview(true);
        setPictures([...pictures, picture]);

        props.onImagesSelected(picture);
    };
    return (
        <ImageUploader

            {...props}
            withIcon={true}
            withPreview={showPreview}
            withLabel={true}
            buttonText='Choose images'
            onChange={onDrop}
            imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg', '.pdf']}
            maxFileSize={524288}  //512kb
            label='Max file size: 512kb, Accepted: jpg, png, gif, jpeg'
        />
    );
};

export default UploadImage;