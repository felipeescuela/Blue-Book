import React, {  useLayoutEffect, useState } from "react";
import rough from 'roughjs/bundled/rough.esm.js';

const generator = rough.generator();


//enum with the types of tools
const types = {
    line: "line",
    rectangle: "rectangle",
    ellipse: "ellipse",
    pencil : "pencil"
}

//dibuja el obj y lo devuelve junto sus datos
const CreateElement = (id,x1,y1,x2,y2,type) => {
    let roughElement;
    switch(type){
        case types.line:
            roughElement = generator.line(x1,y1,x2,y2); 
            return {id,x1,y1,x2,y2,type,roughElement};
            break;
        case types.rectangle:
            //la resta al final sirve para poner el mouse en el vertice inferior derecho
            roughElement = generator.rectangle(x1,y1,x2-x1,y2-y1); 
            return {id,x1,y1,x2,y2,type,roughElement};
            break;
        case types.ellipse:
            //hay que buscar la manera para que el mouse no quede en el centro
            roughElement = generator.ellipse(x1,y1,x2-x1,y2-y1);
            return {id,x1,y1,x2,y2,type,roughElement};
        default:
            throw new Error("Invalid type");
    }
};
