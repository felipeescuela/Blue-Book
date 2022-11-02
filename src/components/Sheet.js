import React, { useState } from "react";
import CanvasDraw from "./DrawComponents/CanvasDraw";
import TextEditor from "./TextComponents/TextEditor";
//context explicacion https://medium.com/@danfyfe/using-react-context-with-functional-components-153cbd9ba214
const Editors = {
    canvas: "canvas",
    text: "text"
}
const Sheet = ({
    //recibe las funciones de DrawTools.js
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
}) => {
    const [dimensions, setDimensions] = useState({ width: 210 * 3, height: 297 * 3 });
    const [editor, setEditor] = useState(Editors.text);
    //pasalo a estado





    return (
        <div className="sheet">
            <CanvasDraw new_dimensions={dimensions} handleMouseDown={handleMouseDown} handleMouseMove={handleMouseMove} handleMouseUp={handleMouseUp} />
            <TextEditor new_dimensions={dimensions} />
        </div>
    );
}
export default Sheet;