import {useState} from 'react'
import '../componentStyles/Slider.css' 
import classnames from 'classnames'

export default function Slider({ min, max, handleRecoParam, recoParam}) {
    const [lower, setLower] = useState(min)
    const [upper, setUpper] = useState(max)

    return (
    <>
        <div className="slider">
            <p>{recoParam}</p>
            <label htmlFor={`min-${recoParam}`}>Min</label>
            <input
                type="range"
                min={min}
                max={max}
                value={lower}
                onChange={(e)=>{
                    const value = Math.min(+e.target.value, upper)
                    console.log(value)
                    setLower(value)
                    // e.target.value = value.toString()
                    handleRecoParam(recoParam, lower, upper)
                }}
                className={classnames("thumb thumbZindex3", {
                "thumb--zindex-5": lower > max - 1
                })}
                id={`min-${recoParam}`}

            />
            <label htmlFor={`max-${recoParam}`}>Max</label>
            <input
                type="range"
                min={min}
                max={max}
                value={upper}
                onChange={(e)=>{
                    const value = Math.max(+e.target.value, lower)
                    console.log(value)
                    setUpper(value)

                    // e.target.value = value.toString()
                    handleRecoParam(recoParam, lower, upper)

                }}
                className="thumb thumbZindex4"
                id={`max-${recoParam}`}
            />
            <div className="sliderTrack" />
            <div className="sliderRange" />
        </div>
    </>
  );
};

