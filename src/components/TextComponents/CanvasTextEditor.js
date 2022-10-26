import { Editor, EditorState } from 'draft-js';
import React from 'react';
import 'draft-js/dist/Draft.css';

const CanvasTextEditor = () => {
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );

    // Área de texto
    return (
        <div className="editors">
            <Editor
                editorState={editorState} onChange={setEditorState}
            />
        </div>
    );
}

export default CanvasTextEditor;
