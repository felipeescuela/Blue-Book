import FileManager from "./FileManager";

function Filee({ name, type, files }) {


    return (
        <li><img alt="unable to load" className="icon" src={type + ".svg"} />{name}
            {files && <FileManager files={files} />}
        </li>
    )
}

export default Filee
