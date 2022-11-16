import { Editor, EditorState } from 'draft-js';
import React from 'react';
import 'draft-js/dist/Draft.css';

const TextEditor = ({ new_dimensions, actul_editor }) => {
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );

    // Área de texto
    return (
        <div className="editors"
            style={{ width: new_dimensions.width, height: new_dimensions.height, zIndex: actul_editor == "text" ? 2 : -1 }}>

            <Editor
                editorState={editorState} onChange={setEditorState}
            />
        </div>
    );
}

export default TextEditor;
