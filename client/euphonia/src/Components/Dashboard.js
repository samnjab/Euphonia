// Modules
import SpotifyWebApi from "spotify-web-api-node"
import axios from "axios"
// Hooks
import { useState, useEffect } from "react"
// Components
import useAuth from "./useAuth"
import Player from "./Player"
import TrackSearchResult from "./TrackSearchResult"
import Selection from "./Selection"
import ToggleSwitch from "./ToggleSwitch"

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
    const [searchParam, setSearchParam] = useState()

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
        if(!accessToken) return
        const seedTracks = []
        const seedArtists = []
    
        selectedTracks.forEach(track=>{
            seedTracks.push(track.id)
            seedArtists.push(track.artistId)
        })
        console.log('seed tracks:', seedTracks)
        console.log('seed artists:', seedArtists)
        spotifyApi.getRecommendations({
            // seed_artists:seedArtists,
            // seed_tracks:seedTracks,
            // min_energy: 0.4,
            seed_artists: seedArtists,
            // min_popularity: 50
        }).then(data=>{
            const recommendations = data.body;
            console.log('recommendations are ', recommendations)
        }).catch(error=>{
            console.log(error.message)
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
                    console.log(track)
                    const smallestAlbumImage = track.album.images.reduce(
                        (smallest, image) => {
                            if (image.height < smallest.height) return image
                            return smallest
                        },
                        track.album.images[0]
                    )
                    return {
                        artist: track.artists[0].name,
                        artistId: track.artists[0].id,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: smallestAlbumImage.url,
                        id:track.id
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
                <ToggleSwitch label='Track/Artist'/>
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