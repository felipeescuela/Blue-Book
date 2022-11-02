import CanvasDraw from "./DrawComponents/CanvasDraw";
import CanvasTextEditor from "./components/DrawComponents/CanvasTextEditor";



const Sheet = ({
    //recibe las funciones de DrawTools.js
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
}) => {

    return (
        <div className="sheet">
            <CanvasDraw handleMouseDown={handleMouseDown} handleMouseMove={handleMouseMove} handleMouseUp={handleMouseUp} />
            <CanvasTextEditor />
        </div>
    );
}
export default Sheet;