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
    //     if(!selectedTracks) return
    //     if(!accessToken) return
    //     const seedTracks = []
    //     const seedArtists = []
    
    //     selectedTracks.forEach(track=>{
    //         seedTracks.push(track.id)
    //         seedArtists.push(track.artistId)
    //     })
    //     console.log('seed tracks:', seedTracks)
    //     console.log('seed artists:', seedArtists)
    //     spotifyApi.getRecommendations({
    //         // seed_artists:seedArtists,
    //         // seed_tracks:seedTracks,
    //         // min_energy: 0.4,
    //         seed_artists: seedArtists,
    //         // min_popularity: 50
    //     }).then(data=>{
    //         const recommendations = data.body;
    //         console.log('recommendations are ', recommendations)
    //     }).catch(error=>{
    //         console.log(error.message)
    //     })

    // },[selectedTracks])

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
            <div>
                {
                    
                    // <Selection selectedTracks={selectedTracks}/>
                }
                {/* <Player accessToken={accessToken} trackUri={playingTrack?.uri} /> */}

            </div>
        </div>
  )
}