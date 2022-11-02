//#region imports
import DrawTools from "./components/DrawComponents/DrawTools.js";
import CanvasDraw from "./components/DrawComponents/CanvasDraw.js";
import FileManager from "./components/FileManagerComponents/FileManager.js";
import CanvasTextEditor from "./components/TextComponents/CanvasTextEditor.js";
import TextTools from "./components/TextComponents/TextTools.js";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Sheet from "./components/Sheet.js";
import "./App.css"
//#endregion

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
        <div id="BodySim">
            {/*TODO arreglar el desplazamiento de todo la pagina  */}
            <header>
                <Grid id="headin" container columns={{ xs: 2 }} >
                    <Grid container id="title_menu" rows={{ xs: 3 }} xs={3}>
                        <h1 id="title">Informatica</h1>

                        <Grid>
                            <TextTools />
                        </Grid>

                        <Grid>
                            <ul className="navmenu">
                                <li><Button variant="text">File</Button></li>
                                <li><Button variant="text">Edit</Button></li>
                                <li><Button variant="text">View</Button></li>
                                <li><Button variant="text">WorkTable</Button></li>
                            </ul>
                        </Grid>
                        <div id="tools">
                            {/*TODO <div id="color_selector">
                    </div>*/}

                            {/*TODO<div id="text_tools">
                    </div>*/}

                            <ToolsDraw />

                            {/*TODO <div id="diagram_tools">
                    </div>*/}
                        </div>
                    </Grid>
                    <div id="buscador">
                        <input type="text" placeholder="Buscar" />
                    </div>

                </Grid>
            </header>

            <Grid container columns={{ md: 16, lg: 20 }} id="main">

                <Grid container columns={{ md: 16, lg: 20 }} id="content">

                    <Grid md={3} lg={2} id="indice">
                        <ul className="lista">
                            <li>Indice
                                <ul>
                                    <li><a href="#canvas">Titulo 1</a></li>
                                </ul>
                            </li>
                        </ul>
                    </Grid>

                    <Grid md={10} lg={15} id="pagina">
                        <Sheet handleMouseDown={handleMouseDown} handleMouseMove={handleMouseMove} handleMouseUp={handleMouseUp} />
                    </Grid>
                    <Grid md={3} lg={3} id="gestor de archivos">
                        <FileManager files={filesExample}></FileManager>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
