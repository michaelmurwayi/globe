import React, {useState, useRef, useEffect}  from "react";
import { connect } from "react-redux";
import "./earth.css"
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

function Earth ({token, longitude, latitude, zoomRatio}) {   
    
    mapboxgl.accessToken = token
    
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [marker, setMarker] = useState(null)
    const [lng, setLng] = useState(longitude);
    const [lat, setLat] = useState(latitude);
    const [Zoom, setZoom] = useState(zoomRatio);
    
    const [cursorClass, setCursorClass] = useState('')


    useEffect(()=>{
        if (map .current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v12",
            center: [lng, lat],
            zoom: Zoom
        })
        map.current.on('move',()=>{
            setLat(map.current.getCenter().lat.toFixed(6));
            setLng(map.current.getCenter().lng.toFixed(6));
            })
            
    })

    
    
    const addCountryMarker = (e)=>{
            if(!map) return;
            setCursorClass = 'pin-cursor'
        }
        
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
                    <div className="card-2">
                            <div className="functionality row">
                                <button className="addMarker btn btn-outline-primary col-md-2 m-2">+</button>
                                <button className="removeMarker btn btn-outline-danger col-md-2 m-2">-</button>
                                <button className="clear btn btn-warning col-md-4 m-2">clear</button>
                            </div>
                    </div>
                    <div ref={mapContainer} onClick={addCountryMarker} className="map-container" />

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
        

