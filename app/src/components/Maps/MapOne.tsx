"use client";
//import jsVectorMap from "jsvectormap";
import jsVectorMap from 'jsvectormap';
import "jsvectormap/dist/jsvectormap.css";
import React, { useEffect } from "react";
import "../../js/us-aea-en";
import "../../js/brasil";

interface Marker {
  name: string;
  coords: [number, number];
  style?: {
    fill?: string;
    stroke?: string;
  };
}

const markers: Marker[] = [
  { name: 'Foo', coords: [-14.2350, -51.9253] },
  { name: 'Chicago', coords: [-17.2216, -46.8750] },
];

const MapOne: React.FC = () => {
  
  useEffect(() => {

    const mapOne = new jsVectorMap ({

      selector: "#mapOne",
      map: "brasil",
      zoomButtons: true,

      markers: markers,

      markerStyle: {
        initial: {
          stroke: '#676767',
          strokeWidth: 2.5,
          fill: '#ff5566',
          fillOpacity: 1
        },
        hover: {},
        selected: {},
        selectedHover: {}
      },

      regionStyle: {
        initial: {
          fill: "#C8D0D8",
        },
        hover: {
          fillOpacity: 1,
          fill: "#3056D3",
        },        
      },
      regionLabelStyle: {
        initial: {
          fontFamily: "Satoshi",
          fontWeight: "semibold",
          fill: "#fff",
        },
        hover: {
          cursor: "pointer",
        },
      },          

      labels: {
        regions: {
          render(code: string) {
            return code.split("-")[1];
          },
        },
      },

      

    });

    mapOne.setSelectedRegions('PR');

    mapOne.addMarkers({
      coords: [-25.4278,-49.2731],
      name: `Curitiba`
    });

    return () => {
      const map = document.getElementById("mapOne");
      if (map) {
        mapOne.addMarkers({
          coords: [-25.4278,-49.2731],
          name: `Curitiba`
        });
        map.innerHTML = "";
      }
      // mapOne.destroy();    
    };
  }, []);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-7">
      <h4 className="mb-2 text-xl font-semibold text-black dark:text-white">
        Locais de Solicitação de Renders
      </h4>
      <div className="h-[500px]">
        <div id="mapOne" className="mapOne map-btn"></div>
      </div>
    </div>
  );
};

export default MapOne;
