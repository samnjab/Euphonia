import React from "react"
import { useState, useEffect } from 'react'
import TrackSearchResult from './TrackSearchResult'
import ArtistSearchResult from './ArtistSearchResult'
import Selection from "./Selection"
export default function ApiSearch({ param, spotifyApi, accessToken}){
    const [trackSearch, setTrackSearch] = useState('')
    const [artistSearch, setArtistSearch] = useState('')
    const [searchTrackResults, setSearchTrackResults] = useState([])
    const [searchArtistResults, setSearchArtistResults] = useState([])
    const [selectedTracks, setSelectedTracks] = useState([])
    const [selectedArtists, setSelectedArtists] = useState([])

     const selectTrack = (track) =>{
        console.log('selecting track', track)
        setSelectedTracks([...selectedTracks, track])
        // setTrackSearch([])
        // setSearchTrackResults([])
    }
    const selectArtist = (artist) => {
        setSelectedArtists([...selectedArtists, artist])
        // setSearchArtistResults([])
    }
    
    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    // function playTrack(track) {
    //     // setPlayingTrack(track)
    //     setSearch("")
    //     setLyrics("")
    // }

   
    // const [accessToken, setAccessToken] = useState('')
    // setAccessToken(accessToken)
    useEffect(() => {
        if (!trackSearch) return setSearchTrackResults([])
        if (!accessToken) return
        let cancel = false
        spotifyApi.searchTracks(trackSearch)
        .then(res => {
            if (cancel) return
            setSearchTrackResults(
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
    }, [trackSearch, accessToken])
    
    useEffect(() => {
        if (!artistSearch) return setSearchArtistResults([])
        if (!accessToken) return
        let cancel = false
        spotifyApi.searchArtists(artistSearch)
        .then(res => {
            if (cancel) return
            console.log(res.body)
            // setSearchResults(
            //     // res.body.tracks.items.map(track => {
            //     //     console.log(track)
            //     //     const smallestAlbumImage = track.album.images.reduce(
            //     //         (smallest, image) => {
            //     //             if (image.height < smallest.height) return image
            //     //             return smallest
            //     //         },
            //     //         track.album.images[0]
            //     //     )
            //     //     return {
            //     //         artist: track.artists[0].name,
            //     //         artistId: track.artists[0].id,
            //     //         title: track.name,
            //     //         uri: track.uri,
            //     //         albumUrl: smallestAlbumImage.url,
            //     //         id:track.id
            //     //     }
            //     // })
            // )
        })

        return () => (cancel = true)
    }, [artistSearch, accessToken])

    return(
        <div>
            <input
                    type="text"
                    placeholder="Search Songs/Artists"
                    value={trackSearch}
                    onChange={e => param==='artist' ? setArtistSearch(e.target.value) : setTrackSearch(e.target.value)}
                />
            {searchTrackResults.map(track => {

                return <TrackSearchResult
                track={track}
                key={track.uri}
                // playTrack={playTrack}
                selectTrack={selectTrack}
               />
            })}
            {searchArtistResults.map(artist => {
                return <ArtistSearchResult 
                artist={artist}
                key={artist.uri}
                selectArtist={selectArtist}
                
                />
            })}
            {
                searchTrackResults.length === 0 && (
                    
                    <Selection selectedTracks={selectedTracks}/>

                )
            }
            
                {/* {searchTrackResults.length === 0 && (
                <div style={{ whiteSpace: "pre" }}>
                {lyrics}
                </div>
                )} */}

        </div>

        
    )
}