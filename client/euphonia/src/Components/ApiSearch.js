import React from "react"
import { useState, useEffect } from 'react'
import TrackSearchResult from './TrackSearchResult'
import ArtistSearchResult from './ArtistSearchResult'
import Selection from "./Selection"
import DisplayTrack from "./DisplayTrack"
import DisplayArtist from "./DisplayArtist"
import RecoTrack from './RecoTrack'
import Player from './Player'
import Slider from './Slider'
export default function ApiSearch({ param, spotifyApi, accessToken}){
    const [trackSearch, setTrackSearch] = useState('')
    const [artistSearch, setArtistSearch] = useState('')
    const [searchTrackResults, setSearchTrackResults] = useState([])
    const [searchArtistResults, setSearchArtistResults] = useState([])
    const [revealStatus, setRevealStatus] = useState(false)
    // const [currentTrackSelection, setCurrentTrackSelection] = useState({})
    // const [currentArtistSelection, setCurrentArtistSelection] = useState({})
    const [selectedTracks, setSelectedTracks] = useState([])
    const [selectedArtists, setSelectedArtists] = useState([])
    const [recommendations, setRecommendations] = useState([])
    const [playingTrack, setPlayingTrack] = useState([])
    const [recoParams, setRecoParams] = useState({popularity:{}, energy:{}, tempo:{}, valence:{},acousticness:{}, danceability:{}, instrumentalness:{}, speechiness:{}})

    const handleRecoParam = (recoParam, lower, upper) => {
        let min = lower/100
        let max = upper/100
        if (recoParam ==='popularity'){
            min = lower
            max = upper  
        }else if(recoParam==='tempo'){
            min = lower * 1.6 + 40
            max = upper * 1.6 + 40
        }
        setRecoParams(
            {
                ...recoParams,
                [recoParam]:{min:min, max:max}
            }

        )
    }
    const handlePlayTrack = (track) => {
        setPlayingTrack(track)
    }
    const selectTrack = (track) =>{
        // setCurrentTrackSelection(track)
        setSelectedTracks([...selectedTracks, track])
        setTrackSearch([])
        setRevealStatus(false)
    }
    const selectArtist = (artist) => {
        // setCurrentArtistSelection(artist)
        setSelectedArtists([...selectedArtists, artist])
        setTrackSearch([])
        setRevealStatus(false)
    }
    useEffect(() => {
        if(!accessToken) return
        if(!selectedTracks && !selectedArtists) return
        console.log(selectedTracks, selectedArtists)
        // const seedTracks = []
        const seedTracks = selectedTracks.map(track => {
            return track.id
        })
        const seedArtists = selectedArtists.map(artist=>{
            return artist.id
        })
        if (!seedTracks && !seedArtists) return 
    
        // selectedTracks.forEach(track=>{
        //     seedTracks.push(track.id)
        //     // seedArtists.push(track.artistId)
        // })
        // selectedArtists.forEach(artist => {
        //     seedArtists.push(artist.id)
        // })
        console.log('seed tracks:', seedTracks)
        console.log('seed artists:', seedArtists)
        const requestParams = {}
        for (let key in recoParams){
            if (recoParams[key]?.min){
                requestParams[`min_${key}`] = recoParams[key].min
            }
            if (recoParams[key]?.max){
                requestParams[`max_${key}`] = recoParams[key].max
            }
        }
        console.log('request params are', requestParams)
        spotifyApi.getRecommendations({
            // seed_artists:seedArtists,
            seed_tracks: seedTracks,
            seed_artists:seedArtists,
            ...requestParams
            

        }).then(data => {
            const recommendations = data.body;
            console.log('recommendations are ', recommendations)
            setRecommendations(
                data.body?.tracks?.map(track => {
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

        }).catch(error=>{
            console.log(error.message)
        })

    },[selectedTracks, selectedArtists, recoParams])
    
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
            setSearchArtistResults(
                res.body.artists.items.map(artist => {
                    console.log(artist)
                    const smallestArtistImage = artist.images.reduce(
                        (smallest, image) => {
                            if (image.height < smallest.height) return image
                            return smallest
                        },
                        artist.images[0]
                    )
                    return {
                        id: artist.id,
                        name: artist.name,
                        uri: artist.uri,
                        artistImg: smallestArtistImage.url,
                    }
                })
            )
            console.log(searchArtistResults)
        })

        return () => (cancel = true)
    }, [artistSearch, accessToken])

    return(
        <div>
            <input
                    type="text"
                    placeholder="Search Songs/Artists"
                    value={param==='artist' ? artistSearch : trackSearch}
                    onChange={e => param==='artist' ? setArtistSearch(e.target.value) : setTrackSearch(e.target.value) }
                    onClick={e => setRevealStatus(true)}
                />
                <div className='sliders'>
                    <Slider min={0} max={100} handleRecoParam={handleRecoParam} recoParam={'popularity'} />
                    <Slider min={0} max={100} handleRecoParam={handleRecoParam} recoParam={'energy'} />
                    <Slider min={0} max={100} handleRecoParam={handleRecoParam} recoParam={'tempo'} />
                    <Slider min={0} max={100} handleRecoParam={handleRecoParam} recoParam={'valence'} />
                    <Slider min={0} max={100} handleRecoParam={handleRecoParam} recoParam={'acousticness'} />
                    <Slider min={0} max={100} handleRecoParam={handleRecoParam} recoParam={'instrumentalness'} />
                    <Slider min={0} max={100} handleRecoParam={handleRecoParam} recoParam={'danceability'} />

                </div>



            {   revealStatus ? (
                    param ==='artist' ? 
                    searchArtistResults.map(artist => {
                        return <ArtistSearchResult 
                        artist={artist}
                        key={artist.uri}
                        selectArtist={selectArtist}
                        /> 
                    })
                    :
                    searchTrackResults.map(track => {

                        return <TrackSearchResult
                        track={track}
                        key={track.uri}
                        selectTrack={selectTrack}
                    />
                    })
                )  
                : <div> results are hidden</div>
            }
            {
                param === 'artist' ? 
                selectedArtists.map(artist => {
                    return <DisplayArtist artist = {artist} /> 
                })
                : selectedTracks.map(track => {
                    return <DisplayTrack track={track} />
                })
            }
            {
               recommendations ? 
               recommendations.map(track => {
                   return <RecoTrack track={track} playTrack= {handlePlayTrack} />
               })
               :  <div> No recos </div>
                
            }
            <Player accessToken={accessToken} trackUri={playingTrack?.uri} />

            
                {/* {searchTrackResults.length === 0 && (
                <div style={{ whiteSpace: "pre" }}>
                {lyrics}
                </div>
                )} */}

        </div>

        
    )
}