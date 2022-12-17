import React, { useEffect, useState, useCallback } from 'react'
import ReactStars from "react-rating-stars-component";
import Resource from '../../../../ApiManager/api/resources';
import { ResourceResponse, ReturnedResource, ReturnedResourceResponseSingle } from '../../../../ApiManager/interface/Interfaces';
import ImageViewer from 'react-simple-image-viewer';
import { AxiosResponse } from 'axios';
import Viewer from 'react-viewer';
import { useParams } from 'react-router-dom';
import styles from './viewresource.module.sass'

const ViewResource = () => {
    const { id } = useParams();
    const [resource, setResource] = useState<ReturnedResource>()
    const [visible, setVisible] = useState<boolean>(true);
    const [images, setImages] = useState<any>([])
    const [rating, setRating] = React.useState(0);

    const resourceApi = new Resource

    const getResource = async () => {
        const response: AxiosResponse<ReturnedResourceResponseSingle> = await resourceApi.getOneResource(id!)
        let imgs: {}[] = []
        if (response.data.data.file_type === "image") {
            response.data.data.link.map((item, i) => {
                imgs.push({ "src": item });
            })
            setImages(imgs)
        }
        setResource(response.data.data)


    }

    console.log(resource)

    // todo ; add where it auto sets the rating you gave

    const changeRating = async (newRating: number) => {
        const response: AxiosResponse<ResourceResponse> = await resourceApi.changeRating(id!, newRating)
    }

    const ratingChanged = (newRating: number) => {
        setRating(newRating);
    }



    useEffect(() => {
        getResource()
    }, [])


    return (
        <div className={styles.container}>
            {resource?.file_type === "pdf" ?
                <div className={styles.pdf}>
                    <div className={styles.header}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "10px" }}>
                            <h5 >{resource?.resource_title} </h5>
                            <div style={{ display: "flex", gap: "20px" }}>
                                <div>
                                    <p>{resource.rating}</p>
                                    <ReactStars
                                        count={5}
                                        onChange={changeRating}
                                        size={24}
                                        activeColor="#ffd700"
                                    />
                                </div>
                                <div>
                                    <img src={resource?.user_pfp} />
                                    <p>{resource?.username}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.pdf}>
                        {resource ? <iframe src={resource?.link[0].slice(0, -17) + "preview"} width="840" height="800px" allow="autoplay"></iframe> : null}
                    </div>
                </div>
                : null}
            {resource?.file_type === "image" ? <div className={styles.images}>
                <div className={styles.header}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                        <h5 >{resource?.resource_title}</h5>
                        <div>
                            <p>{resource.rating}</p>
                            <ReactStars
                                count={5}
                                onChange={changeRating}
                                size={24}
                                activeColor="#ffd700"
                            />
                        </div>
                    </div>
                    <div>
                        <img src={resource?.user_pfp} />
                        <p>{resource?.username}</p>
                    </div>
                </div>
                <div className={styles.imageviewer}>
                    <button onClick={() => { setVisible(true); }}>Show Images</button>
                    <Viewer
                        visible={visible}
                        onClose={() => { setVisible(false); }}
                        images={images}
                    />
                </div>
                {/* {images.map((src, index) => (
                    <img
                        src={src}
                        onClick={() => openImageViewer(index)}
                        width="300"
                        key={index}
                        style={{ margin: '2px', cursor: "pointer" }}
                        alt=""
                    />
                ))} */}
                {/* {isViewerOpen && (
                    <ImageViewer
                        src={images}
                        currentIndex={currentImage}
                        disableScroll={false}
                        closeOnClickOutside={true}
                        onClose={closeImageViewer}
                    />
                )} */}



            </div> : null}


        </div >
    )
}

export default ViewResource