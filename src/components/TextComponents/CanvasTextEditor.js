import React from 'react';
import ReactDOM from 'react-dom';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

const CanvasTextEditor = () => {
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );

    //Funciones para cambiar el estado de la letra

    const _onBoldClick = () => {
        console.log(editorState)
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
    }

    const _onItalicClick = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
    }

    const _onUnderlineClick = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
    }

    const _onCodeClick = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'CODE'));
    }

    // Botones y area de edicion de texto

    return (
        <div>
            <div >
                <button onClick={_onBoldClick}>B</button>
                <button onClick={_onItalicClick}><em>I</em></button>
                <button onClick={_onUnderlineClick}>U</button>
                <button onClick={_onCodeClick}>Code</button>
            </div>

            <div className="editors">
                <Editor
                    editorState={editorState} onChange={setEditorState}
                />
            </div>


        </div>
    );

}

export default CanvasTextEditor;