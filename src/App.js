import DrawTools from "./components/DrawComponents/DrawTools.js";
import CanvasDraw from "./components/DrawComponents/CanvasDraw.js";
import FileManager from "./components/FileManagerComponents/FileManager.js";

import "./App.css"

const filesExample = [
    {
        name: "carpeta nº1",
        type: "folder",
        files: []
    }, {
        name: "carpeta nº2",
        type: "folder",
        files: [{
            name: "interno nº2",
            type: "file",
        }, {
            name: "interno nº3",
            type: "file",
        }, {
            name: "carpeta nº2",
            type: "folder",
            files: [{
                name: "interno nº2",
                type: "file",
            }, {
                name: "interno nº3",
                type: "file",
            }]
        },],
    }, {
        name: "carpeta nº3",
        type: "folder",
        files: []
    }
]

const App = () => {
    const { Tools: ToolsDraw, handleMouseDown, handleMouseMove, handleMouseUp } = DrawTools();
    {/*la funcion de los id por el momento es solo ilustrativa */ }
    return (
        <div>
            <header>
                <h1>Informatica</h1>
                <div id="title_menu">
                    <h3>File</h3>
                    <h3>Edit</h3>
                    <h3>View</h3>
                    <h3>WorkTable</h3>
                </div>
                <div id="buscador">
                    <input type="text" placeholder="Buscar" />
                </div>
            </header>

            <div id="main">
                <div id="tools">
                    <div id="color_selector">
                    </div>

                    <div id="text_tools">
                    </div>

                    <ToolsDraw />

                    <div id="diagram_tools">
                    </div>
                </div>

                <div id="content">

                    <div id="indice">
                        <h3>indice</h3>
                    </div>
                    <div id="pagina">
                        <CanvasDraw handleMouseDown={handleMouseDown} handleMouseMove={handleMouseMove} handleMouseUp={handleMouseUp} />
                    </div>
                    <div id="gestor de archivos">
                        <FileManager files={filesExample}></FileManager>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
