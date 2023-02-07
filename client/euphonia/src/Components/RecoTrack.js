import React from "react"
import {useState} from 'react'

import { FaPlay, FaPlus, FaHeart, FaArrowUp } from "react-icons/fa";
import Playlists from './Playlists'

export default function TrackSearchResult({ track, playTrack, selectTrack, spotifyApi, user }) {
    const [added, setAdded] = useState()
    
    function handleAddTrack(){
        spotifyApi.addToMySavedTracks([track.id])
        .then(res => {
            console.log(res, 'was added')
        }).catch(error => {
            console.log(error.message)
        })
    }
    function addToPlaylist(){
        setAdded(track)

    }

    return ( 

      <div className='recoTrack'>
            
            <div className='iconBox'>
                <FaPlay className='play'onClick={()=>playTrack(track)}/>
            </div>
                
            <img src={track.albumUrl} className='cover' />
            <div className='info'>
                <h5>{track.title}</h5>
                <h5 className='artist'>{track.artist}</h5>
            </div>
            <div className="icons">
                <div className='iconBox'>
                    <FaHeart className='play' onClick={handleAddTrack}/>
                </div>
                <div className='iconBox'>
                    <FaPlus className='play'onClick={addToPlaylist}/>
                </div>
                {
                    added ?
                    <Playlists track={track} spotifyApi={spotifyApi} user={user}/>
                    :
                    <></>
                }
                <div className='iconBox'>
                    <FaArrowUp className='play'onClick={()=>selectTrack(track)}/>
                </div>

            </div>
            <h5 className="album">{track.albumTitle}</h5>
            <p className='duration'>{track.duration}</p>
      </div>
    )
}