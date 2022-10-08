import Filee from "./Filee";

const FileManager = ({ files }) => {
    return (
        <ul className="arbol">
            {files.map(file => <Filee name={file.name} type={file.type} files={file.files || []} />)}
        </ul>
    )
}

export default FileManager;
