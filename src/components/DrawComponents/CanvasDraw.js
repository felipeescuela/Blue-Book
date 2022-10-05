//se nesecita la separacion de los componentes para poder usarlos en el App.js

const CanvasDraw = ({
    //recibe las funciones de DrawTools.js
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
}) => {

    return (
        <canvas
        id="canvas"
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}>
      </canvas>
    );
}


export default CanvasDraw;