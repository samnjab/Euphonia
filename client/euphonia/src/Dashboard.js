import { useState, useEffect } from "react"
import useAuth from "./useAuth"
import Player from "./Player"
import TrackSearchResult from "./TrackSearchResult"
import Selection from "./Selection"
import SpotifyWebApi from "spotify-web-api-node"
import axios from "axios"

const spotifyApi = new SpotifyWebApi({
    clientId: '0f4b9eb9ae8b479bb20f5cb8d21d54f9',
})

export default function Dashboard({ code }) {
    const accessToken = useAuth(code)
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [selectedTracks, setSelectedTracks] = useState([])
    const [playingTrack, setPlayingTrack] = useState()
    const [lyrics, setLyrics] = useState("")

    function playTrack(track) {
        setPlayingTrack(track)
        setSearch("")
        setLyrics("")
    }

    const selectTrack = (track) =>{
        console.log('selecting track', track)
        setSelectedTracks([...selectedTracks, track])
    }

    useEffect(() => {
        if(!selectedTracks) return
        selectedTracks.forEach(track=>{
            seed_tracks.push(track.id)
            seed_genres.push([...track.genres])
            if (track.artists?.length > 1){
                

            }
            track.artists?.id
        })
        spotifyApi.getRecommendations({
            seed_artists:[],
            seed_tracks:[],
            seed_genres:[]
        })

    },[selectedTracks])

    useEffect(() => {
        if (!playingTrack) return
        axios
        .get("http://localhost:3001/lyrics", {
            params: {
              track: playingTrack.title,
              artist: playingTrack.artist,
            },
        })
        .then(res => {
          setLyrics(res.data.lyrics)
        })
    }, [playingTrack])

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])
    
    useEffect(() => {
        if (!search) return setSearchResults([])
        if (!accessToken) return
        let cancel = false
        spotifyApi.searchTracks(search)
        .then(res => {
            if (cancel) return
            setSearchResults(
                res.body.tracks.items.map(track => {
                    const smallestAlbumImage = track.album.images.reduce(
                        (smallest, image) => {
                            if (image.height < smallest.height) return image
                            return smallest
                        },
                        track.album.images[0]
                    )
                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: smallestAlbumImage.url,
                    }
                })
            )
        })

    return () => (cancel = true)
  }, [search, accessToken])

    return (
        <div>
            <input
                type="text"
                placeholder="Search Songs/Artists"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <div>
                {searchResults.map(track => (
                <TrackSearchResult
                track={track}
                key={track.uri}
                playTrack={playTrack}
                selectTrack={selectTrack}/>
                 ))}
                {/* {searchResults.length === 0 && (
                <div style={{ whiteSpace: "pre" }}>
                {lyrics}
                </div>
                )} */}
            </div>
            <div>
                <Selection selectedTracks={selectedTracks}/>
                {/* <Player accessToken={accessToken} trackUri={playingTrack?.uri} /> */}

            </div>
        </div>
  )
}