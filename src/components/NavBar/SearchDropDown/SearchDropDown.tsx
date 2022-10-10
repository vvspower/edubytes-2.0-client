import React from 'react'
import styles from './search.module.sass'
import example_pfp from './../../../assets/example_pfp.jpg'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface Props {
    search: string
}

const SearchDropDown = (props: Props) => {

    const Post: JSX.Element = (
        <div className={styles.post}>
            <div className={styles.header}>
                <img src={example_pfp} height={30} width={30} />
                <p>username</p>
            </div>
            <div className={styles.main}>
                <div>
                    <p>Soluta sunt ullam laboriosam totam. Maxime ducimus doloremque sed perspiciatis reprehenderit aspernatur. Et id molestiae velit at aut. A voluptatem omnis vitae consequatur expedita. Cumque ut autem in. Ea hic mollitia ut eligendi.</p>
                </div>
                <div>

                </div>
            </div>
        </div>

    )


    
    return (
        <div className={styles.container}>
            <span>Search results for "{props.search}" in posts</span>
            <div className={styles.postcontainer} >
                <div>{Post}</div>
                <div>{Post}</div>
                <KeyboardArrowDownIcon fontSize='large' sx={{ fill: "#adb5bd" }} />
            </div>
            <div className={styles.extra}>
                <span>Search results for "{props.search}" in Resources</span>
                <span>Search results for "{props.search}" in Universities</span>
                <span>Search results for "{props.search}" in Bazaar</span>
            </div>
        </div>
    )
}

export default SearchDropDown