import React from "react";

const handleFileInputChange = (event, setPhoto, setPhotoError) => {
    const file = event.target.files[0];

    if (file) {
        // Perform additional validation on the file if needed
        if (!isFileTypeValid(file)) {
            setPhotoError("Only JPEG, PNG, and GIF files are allowed.");
            event.target.value = "";
            return;
        }

        // File is valid, proceed with further processing or upload
        ReadAndDisplayFile(file, setPhoto);
        setPhotoError("");
//         setPhoto("a"); // Clear the file error if it was previously set
    }
};

 export const ReadAndDisplayFile = (file, setPhoto) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        setPhoto(reader.result)
    });
    reader.readAsDataURL(file);
};




const isFileTypeValid = (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    return allowedTypes.includes(file.type);
};

export function Photo({ photo, setPhoto, photoError, setPhotoError }) {
    return (
        <div className="d-flex flex-row align-items-center mb-4">
            <div className="form-outline flex-fill mb-0">
                <input
                    type="file"
                    className={`form-control ${photoError ? "is-invalid" : ""}`}
                    id="image-input"
                    accept="image/jpeg, image/png, image/gif"
//                           onChange={(e) => setName(e.target.value)}

                    onChange={(e) => handleFileInputChange(e, setPhoto, setPhotoError)}
                    title="Only JPEG, PNG, and GIF files are allowed"
                />
                <label htmlFor="image-input" className="form-label"></label>
                {photoError && <p className="text-danger">{photoError}</p>}
            </div>
        </div>
    );
}