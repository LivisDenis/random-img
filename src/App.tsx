import React, {useEffect, useState} from 'react'
import {RingLoader} from "react-spinners";
import axios from "axios";
import styles from './styles/style.module.scss'
import './styles/App.css'

type animeData = {
    image_id: number
    height: number
    width: number
    preview_url: string
    signature: string
    url: string
}

type animeType = {
    images: animeData[]
}

const animeTags = [
    'uniform', 'maid', 'waifu', 'marin-kitagawa', 'mori-calliope', 'raiden-shogun',
    'oppai', 'selfies', 'ero', 'hentai', 'milf', 'oral', 'paizuri', 'ecchi'
]

const App = () => {
    const [anime, setAnime] = useState<animeType>()
    const [tag, setTag] = useState<string | undefined>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const selectedTag = tag ? `?included_tags=${tag}` : ''

    const onClickRandom = () => {
        setIsLoading(true)
        axios.get(process.env.REACT_APP_API_URL + selectedTag)
            .then(res => setAnime(res.data))
            .then(() => setTimeout(() => setIsLoading(false), 300))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        onClickRandom()
    }, [tag])

    const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTag(e.target.value)
    }

    return (
        <div>
            <div className={styles.random__change}>
                <select className="form-select" onChange={onChangeSelect} aria-label="Default select example">
                    <option value=''>Random</option>
                    {animeTags.map((tag, i) =>
                        <option key={i} value={tag}>{tag}</option>
                    )}
                </select>
                <button onClick={onClickRandom} className={styles.random__btn} role="button">CHANGE</button>
            </div>
            {isLoading
                ? <div className={styles.random__loading}>
                    <RingLoader color="#AF40FF" size={100}/>
                </div>
                : <div className={styles.random__img}>
                    <img className='w-100' src={anime?.images[0].url} alt=""/>
                </div>
            }
        </div>
    )
}

export default App
