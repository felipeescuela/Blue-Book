import React, { useRef, useLayoutEffect, useState } from "react";

//se nesecita la separacion de los componentes para poder usarlos en el App.js

const CanvasDraw = ({
    //recibe las funciones de DrawTools.js
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
}) => {

    //#region variables
    const window_ref = useRef();
    const [dimensions, setDimensions] = useState({ width: 680, height: 680 });

    //variable auxiliar para el timer
    let time_post_change = null;
    //el tiempo en milisegundos que debe estar el tamaño de la ventana igual despues de un cambio para que se resetee el tamaño
    const TIME_TO_RESET = 100;
    //#endregion


    const get_dimensions = () => {
        if (window_ref.current) {
            setDimensions({
                //me falta un poco de explicacion para entender esto(el flaco no sabia explicarlo)
                width: window_ref.current.offsetWidth,
                height: window_ref.current.offsetHeight
            });
        }
    }

    //El primer get dimensions
    useLayoutEffect(() => {
        get_dimensions();
    }, []);

    window.addEventListener('resize', () => {
        clearInterval(time_post_change);
        //set time out es como un invoke, espera un tiempo para ejecutar una funcion
        time_post_change = setTimeout(get_dimensions, TIME_TO_RESET);
    });

    return (
        <canvas
        id="canvas"
        width={dimensions.width}
        height={dimensions.height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}>
        
      </canvas>
    );
}


export default CanvasDraw;