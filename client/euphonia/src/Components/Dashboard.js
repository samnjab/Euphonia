// Modules
import SpotifyWebApi from "spotify-web-api-node"
import axios from "axios"
// Hooks
import { useState, useEffect } from "react"
// Components
import useAuth from "./useAuth"
import Player from "./Player"
import ApiSearch from "./ApiSearch"
import ToggleSwitch from "./ToggleSwitch"
import Selection from "./Selection"

const spotifyApi = new SpotifyWebApi({
    clientId: '0f4b9eb9ae8b479bb20f5cb8d21d54f9',
})

export default function Dashboard({ code }) {
    const accessToken = useAuth(code)
    const [lyrics, setLyrics] = useState("")
    const [searchParam, setSearchParam] = useState('track')
    
   

    const searchBy = (param) => {
        setSearchParam(param)
    }

    // useEffect(() => {
    //     if (!playingTrack) return
    //     axios
    //     .get("http://localhost:3001/lyrics", {
    //         params: {
    //           track: playingTrack.title,
    //           artist: playingTrack.artist,
    //         },
    //     })
    //     .then(res => {
    //       setLyrics(res.data.lyrics)
    //     })
    // }, [playingTrack])

    // useEffect(() => {
    //     if (!accessToken) return
    //     spotifyApi.setAccessToken(accessToken)
    // }, [accessToken])
    
    

    return (
        <div>
            <ApiSearch param={searchParam} spotifyApi={spotifyApi} accessToken={accessToken} />
            <ToggleSwitch label='Track/Artist'/>
            {/* <label htmlFor='energy'>Energy</label>
            <input type='range' className="slider" id='energy'/> 
            <label htmlFor='popularity'>Popularity</label>
            <input type='range' className="slider" id='popularity'/> 
            <label htmlFor='tempo'>Tempo</label>
            <input type='range' className="slider" id='tempo'/> 
            <label htmlFor='acousticness'>Acousticness</label>
            <input type='range' className="slider" id='acousticness'/> 
            <label htmlFor='Danceability'>Danceability</label>
            <input type='range' className="slider" id='danceability'/> 
            <label htmlFor='instrumentalness'>instrumentalness</label>
            <input type='range' className="slider" id='instrumentalness'/> 
            <label htmlFor='speechiness'>Speechiness</label>
            <input type='range' className="slider" id='speechiness'/>
            <label htmlFor='key'>Key</label>
            <input type='range' className="slider" id='key'/> */}
            <div>
                {
                    
                    // <Selection selectedTracks={selectedTracks}/>
                }
                {/* <Player accessToken={accessToken} trackUri={playingTrack?.uri} /> */}

            </div>
        </div>
  )
}