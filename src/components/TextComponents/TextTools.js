import React from 'react';
import { EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

const TextTools = () => {
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

    // Botones de estilo

    return (
        <div className='styleButtons'>

            <button onClick={_onBoldClick}>B</button>
            <button onClick={_onItalicClick}><em>I</em></button>
            <button onClick={_onUnderlineClick}>U</button>
            
        </div>
    );

}

export default TextTools;