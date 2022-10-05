import React, { useLayoutEffect, useState } from "react";
import rough from 'roughjs/bundled/rough.esm.js';

const generator = rough.generator();

//#region  enums
//enum with the types of tools
const types = {
    line: "line",
    rectangle: "rectangle",
    ellipse: "ellipse",
    pencil: "pencil"
}

const actions = {
    drawing: "drawing",
    moving: "moving",
    resizing: "resizing",
    none: "none"
}

const tools = {
    selection: "selection",
    line: "line",
    rectangle: "rectangle",
    pencil: "pencil",
    ellipse: "ellipse",
    none: "none"
}
//#endregion
//dibuja el obj y lo devuelve junto sus datos
const CreateElement = (id, x1, y1, x2, y2, type) => {
    let roughElement;
    switch (type) {
        case types.line:
            roughElement = generator.line(x1, y1, x2, y2);
            return { id, x1, y1, x2, y2, type, roughElement };
            break;
        case types.rectangle:
            //la resta al final sirve para poner el mouse en el vertice inferior derecho
            roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1);
            return { id, x1, y1, x2, y2, type, roughElement };
            break;
        case types.ellipse:
            //hay que buscar la manera para que el mouse no quede en el centro
            roughElement = generator.ellipse(x1, y1, x2 - x1, y2 - y1);
            return { id, x1, y1, x2, y2, type, roughElement };
        default:
            throw new Error("Invalid type");
    }
};

const type_verify = (type) => ["line", "rectangle", "ellipse"].includes(type);

const DrawTools = () => {
    //#region states
    const [elements, setElements] = useState([]);
    const [actual_action, setAction] = useState(actions.none);
    const [actual_tool, setTool] = useState(tools.none);
    const [selected_element, setSelectedElement] = useState(null);
    //#endregion

    //espera a que todo cargue, y obtiene todo lo del canvas y dibuja los elementos
    useLayoutEffect(() => {
        //obtine el canvas y toda la parte 2d de el y la limpia
        const canvas = document.getElementById("canvas");
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);

        //instancia el canvas de rough en canvas
        const roughCanvas = rough.canvas(canvas);

        //dibuja cada elemento
        elements.forEach(({ roughElement }) => roughCanvas.draw(roughElement));
    });

    //crea una copia de los elementos la edita y luego sobreescribe los elementos
    const UpdateElement = (id, x1, y1, x2, y2, type) => {
        const elements_copy = [...elements];
        elements_copy[id] = CreateElement(id, x1, y1, x2, y2, type);
        setElements(elements_copy, true);
    };


    //#region  resize
    const ResizeCoordinates = (clientX, clientY, position, coordinates) => {
        const { x1, y1, x2, y2 } = coordinates;
        switch (position) {
            //start y end para las lineas
            //retorna los valores cambiados a partir de que punto se esta moviendo
            case "top-left":
            case "start":
                return { x1: clientX, y1: clientY, x2, y2 };
            case "top-right":
                return { x1, y1: clientY, x2: clientX, y2 };
            case "bottom-left":
                return { x1: clientX, y1, x2, y2: clientY };
            case "bottom-right":
            case "end":
                return { x1, y1, x2: clientX, y2: clientY };
            default:
                return null; //esto no deberia pasar
        }
    };

    const AdjustElementCoordinates = element => {
        const { type, x1, y1, x2, y2 } = element;
        if (type === types.rectangle) {
            const minX = Math.min(x1, x2);
            const minY = Math.min(y1, y2);
            const maxX = Math.max(x1, x2);
            const maxY = Math.max(y1, y2);
            //ajusta los valores del rectangulo para que el XY2 siempre sea el mayor    
            return { x1: minX, y1: minY, x2: maxX, y2: maxY };
        }
        else {
            //le da mas importancia a X y solo se preocupa por Y si X es igual
            if (x1 < x2 || (x1 === x2 && y1 < y2)) {
                return { x1, y1, x2, y2 };
            }
            else {
                return { x1: x2, y1: y2, x2: x1, y2: y1 };
            }
        }
    };


    //retorna el estilo de movimiento del mouse
    const CursorPointerResize = position => {
        switch (position) {
            case "top-left":
            case "bottom-right":
            case "start":
            case "end":
                return "nwse-resize";
            case "top-right":
            case "bottom-left":
                return "nesw-resize";
            default:
                return "default";
        }
    };

    //#endregion

    //#region Mouse events
    const handleMouseDown = (event) => {
        const { clientX, clientY } = event;
        if (actual_tool === tools.selection) {
            const element = GetElementAtPosition(clientX, clientY);

            if (element) {
                const offsetX = clientX - element.x1;
                const offsetY = clientY - element.y1;
                setSelectedElement({ ...element, offsetX, offsetY });
            }
            setElements(prevState => prevState);

            if (element.position === "inside") {
                setAction(actions.moving);
            }
            else {
                setAction(actions.resizing);
            }
        }
        else {
            //crea un nuevo elemento y lo deja seleccionado
            const id = elements.length;
            const element = CreateElement(id, clientX, clientY, clientX, clientY, actual_tool);

            setElements(prevState => [...prevState, element]);
            setSelectedElement(element);

            setAction(actions.drawing);
        }
    };

    const handleMouseMove = (event) => {
        const { clientX, clientY } = event;
        if (actual_tool === tools.selection) {
            const element = GetElementAtPosition(clientX, clientY);
            //cambia el estilo del mouse
            event.target.style.cursor = element ? CursorPointerResize(element.position) : "default";
        }

        if (actual_action === actions.drawing) {
            const index = elements.length - 1;
            const { x1, y1 } = elements[index];
            UpdateElement(index, x1, y1, clientX, clientY, actual_tool);
        }
        else if (actual_action === actions.moving) {
            const { id, x1, x2, y1, y2, type, offsetX, offsetY } = selected_element;
            const width = x2 - x1;
            const height = y2 - y1;
            const newX1 = clientX - offsetX;
            const newY1 = clientY - offsetY;
            UpdateElement(id, newX1, newY1, newX1 + width, newY1 + height, type);
        }
        else if (actual_action === actions.resizing) {
            const { id, type, position, ...coordinates } = selected_element;
            const { x1, y1, x2, y2 } = ResizeCoordinates(clientX, clientY, position, coordinates);
            UpdateElement(id, x1, y1, x2, y2, type);
        }
    }

    const handleMouseUp = (event) => {
        const { clientX, clientY } = event;
        if (selected_element) {
            const index = elements.length - 1;
            const { id, type } = elements[index];
            if ((actual_action === actions.drawing || actual_action === actions.resizing) && type_verify(type)) {
                const { x1, y1, x2, y2 } = AdjustElementCoordinates(elements[index]);
                UpdateElement(index, x1, y1, x2, y2, type);
            }
        }
        setAction("none");
        setSelectedElement(null);
    }

    //#endregion


    //#region  Seleccion de elementos

    //obtiene la distancia entre dos puntos mediante el teorema de pitagoras
    const distance = (a, b) => Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

    //devuelve el elemento solo si este se encuentra dentro del area del offset(5)
    const OffsetOverPoint = (x, y, x1, y1, name) => {
        return Math.abs(x - x1) < 5 && Math.abs(y - y1) < 5 ? name : null;
    };


    //devuelve el objeto si el la posicion es dentro de el,es solo para lineas
    const OnTheObject = (x1, y1, x2, y2, x, y, maxDistance = 1) => {
        const a = { x: x1, y: y1 };
        const b = { x: x2, y: y2 };
        const c = { x, y };
        const offset = distance(a, b) - (distance(a, c) + distance(b, c));
        return Math.abs(offset) < maxDistance ? "inside" : null;
    };


    //devuelve las posiciones de los distintos puntos del elemento si este se encuentra dentro del offset
    const PositionInsideElement = (x, y, element) => {
        const { type, x1, x2, y1, y2 } = element;
        switch (type) {
            case "line":
                const on = OnTheObject(x1, y1, x2, y2, x, y);
                const start = OffsetOverPoint(x, y, x1, y1, "start");
                const end = OffsetOverPoint(x, y, x2, y2, "end");
                return start || end || on;
            case "rectangle":
                const topLeft = OffsetOverPoint(x, y, x1, y1, "top-left");
                const topRight = OffsetOverPoint(x, y, x2, y1, "top-right");
                const bottomLeft = OffsetOverPoint(x, y, x1, y2, "bottom-left");
                const bottomRight = OffsetOverPoint(x, y, x2, y2, "bottom-right");
                const inside = x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;
                return topLeft || topRight || bottomLeft || bottomRight || inside;
            default:
                throw new Error(`Type not recognised: ${type}`);
        }
    };

    //encuentra el elemento que se encuentra en la posicion x,y
    const GetElementAtPosition = (x, y) => {
        return elements
            .map(element => ({ ...element, position: PositionInsideElement(x, y, element) }))
            .find(element => element.position !== null);
    };
    //#endregion
    const Tools = () => {

        return (
            <div>

                {/*element selector*/}
                <div >
                    <input
                        id="selection"
                        type="radio"
                        checked={actual_tool === tools.selection}
                        onChange={() => setTool(tools.selection)}
                    />
                    <label htmlFor="selection">Selection</label>

                    <input
                        id="line"
                        type="radio"
                        checked={actual_tool === "line"}
                        onChange={() => setTool(tools.line)}
                    />
                    <label htmlFor="line">Line</label>

                    <input
                        id="rectangle"
                        type="radio"
                        checked={actual_tool === "rectangle"}
                        onChange={() => setTool(tools.rectangle)}
                    />
                    <label htmlFor="rectangle">Rectangle</label>
                </div>


            </div>
        )
    }


    return {
        Tools,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp
    }
}

export default DrawTools;
