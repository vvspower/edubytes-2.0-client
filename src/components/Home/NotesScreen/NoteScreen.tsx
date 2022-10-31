import React, { useState, useEffect, ChangeEvent, useRef, useReducer } from 'react'
import styles from './NoteScreen.module.sass'
import Resource from '../../../ApiManager/api/resources';

const NoteScreen = () => {
    const resouceApi = new Resource()

    const hiddenImageFileInput = useRef<HTMLInputElement>(null);
    const hiddenpPDFileInput = useRef<HTMLInputElement>(null);

    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

    const [image, setImage] = useState<string[]>([]);
    const [imageURL, setImageURL] = useState<string[]>([]);
    const [imageFile, setImageFile] = useState<Blob[] | null>(null);



    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            let imageNew: string[] = image
            imageNew.push(URL.createObjectURL(event.target.files[0]!))
            setImage(imageNew)
            forceUpdate()
            let imageFileNew: Blob[] = imageFile!
            imageFileNew.push(event.target.files[0])
            setImageFile(imageFileNew);
        }
    }

    const uploadImage = async () => {
        imageFile?.map(async (file, i) => {
            let formData: FormData | undefined = new FormData();
            if (imageFile !== null) {
                formData.append("file", file);
                formData.append("upload_preset", "mb3hrwz7");
            } else {
                formData = undefined;
            }
            const response: string = await resouceApi.uploadImage(formData!)
            const url = imageURL
            url.push(response)
            setImageURL(url)
        })
    }

    const hanldePDFChange = () => {

    }

    const uploadPDF = () => {

    }

    return (
        <div className={styles.container}>
            <div className={styles.upload}>
                <h2>Upload</h2>
                <div>
                    {image.length === 0 ? <div>
                        <button>PDF</button>
                        <button onClick={() => {
                            hiddenImageFileInput.current!.click()
                        }}>Image</button>
                        <input
                            type="file"
                            accept="image/*"
                            id="upload-file-button"
                            hidden
                            onChange={handleImageChange}
                            ref={hiddenImageFileInput}
                        />
                    </div> :
                        <div className={styles.images}>
                            <div className={styles.image}>
                                {image.map((img, i) => {
                                    return <img src={img} />
                                })}
                            </div>
                            <div>
                                <button onClick={() => {
                                    hiddenImageFileInput.current!.click()
                                }} >Add Images</button>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="upload-file-button"
                                    hidden
                                    onChange={handleImageChange}
                                    ref={hiddenImageFileInput}
                                />
                            </div>
                        </div>}
                    {<div className={styles.notes_info}>
                        <input placeholder='Title' />
                        <input placeholder='Price' />

                    </div>}
                </div>
            </div>
        </div >
    )
}


export default NoteScreen