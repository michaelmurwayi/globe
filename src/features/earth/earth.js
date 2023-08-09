import React, {useState, useRef, useEffect}  from "react";
import { connect } from "react-redux";
import "./earth.css"
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

function Earth ({token, longitude, latitude, zoomRatio}) {   
    
    mapboxgl.accessToken = token
    
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(longitude);
    const [lat, setLat] = useState(latitude);
    const [Zoom, setZoom] = useState(zoomRatio);
    


    useEffect(()=>{
        if (map .current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v12",
            center: [lng, lat],
            zoom: Zoom
        })
        map.current.on('move',()=>{
            setLat(map.current.getCenter().lat.toFixed(4));
            setLng(map.current.getCenter().lng.toFixed(4));
            })
            
    })

        return(
            <div className="row">
                    <div className="card">
                        <div className="overlay">
                            <h2>Location</h2>
                            <hr/>
                            <p>Longitude: <b>{lng}</b> </p>
                            <p>Latitude: <b>{lat}</b> </p>
                        </div>
                </div>
                <div ref={mapContainer} className="map-container" />

            </div>
            )
            
    }

    const mapStateToProps = (state) =>{
        return{
            token: state.mapReducer.mapBoxToken,
            longitude: state.mapReducer.initialViewPoint.longitude,
            latitude: state.mapReducer.initialViewPoint.latitude,
            zoomRatio: state.mapReducer.initialViewPoint.zoom
        }

    }
export default connect(mapStateToProps)(Earth)
        

