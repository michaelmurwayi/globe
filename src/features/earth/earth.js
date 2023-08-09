import React, {useState, useRef, useEffect}  from "react";
import { connect } from "react-redux";
import "./earth.css"
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = "pk.eyJ1IjoibWljaGFlbG11cndheWkiLCJhIjoiY2xsMHRtNW04MDFvdTNsczBraHJuZnV2NCJ9.GksXjlbauDHoS9yqT4d8Ng"
function Earth ({token}) {    
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(37.057331);
    const [lat, setLat] = useState(-1.048576);
    const [zoom, setZoom] = useState(2);
    


    useEffect(()=>{
        if (map .current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v12",
            center: [lng, lat],
            zoom: zoom
        })
    })
        
        return(
            <div>
                <div ref={mapContainer} className="map-container" />
            </div>
            )
            
    }
    
export default Earth
        

