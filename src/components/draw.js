import React, {  useLayoutEffect, useState } from "react";
import rough from 'roughjs/bundled/rough.esm.js';

const generator = rough.generator();

const Draw = () => {
    const [elements, setElements] = useState([]);
    const [action, setAction] = useState(false);
    const [tool, setTool] = useState("line");
    const [selectedElement, setSelectedElement] = useState(null);


    useLayoutEffect(() => {
  //Esto se esta reaciendo constantemente como el update de unity
        const canvas = document.getElementById("canvas");
        const roughCanvas = rough.canvas(canvas);
        const context = canvas.getContext("2d");
        context.clearRect(0,0,canvas.width,canvas.height);
  
       elements.forEach(({roughElement}) => roughCanvas.draw(roughElement));
      //cual es la diferencia?  elements.forEach(element => roughCanvas.draw(element.roughElement));
    }, [elements]);//explicar esto tambien
  

    const updateElement = (id,x1,y1,x2,y2,type) => {
      const updateElement = createElement(id,x1,y1,x2,y2,type);
  
      //tambien que es el ...
      const elementCopy = [...elements];
      elementCopy[id] = updateElement;
      setElements(elementCopy);
    }

    const handleMouseDown = (event) => {
      const { clientX,clientY } = event;
      if(tool === "selection"){
        const element = getElementAtPosition(clientX,clientY,elements);
        console.log("handle mouse down element:"+element);
        if(element){
          const offsetX= clientX - element.x1;
          const offsetY= clientY - element.y1;
          setSelectedElement({...element,offsetX,offsetY});
          setAction("moving");
      
        }} 
      else{
      setAction("drawing");
        
      const id = elements.length;
      const element = createElement(id,clientX,clientY,clientX,clientY,tool);
  
      //   que explique que es prevState y porque asi
      setElements(prevState => [...prevState, element]);
    }
  };
  
    const handleMouseMove = (event) => {
      const { clientX,clientY } = event;
      if(action === "drawing"){ 
        const index =  elements.length - 1; 
        const{x1,y1} = elements[index];
        updateElement(index,x1,y1,clientX,clientY,tool);
      }
      else if( action === "moving"){
        const {id, x1,x2,y1,y2,type,offsetX,offsetY} =selectedElement;
        const width = x2 - x1;  
        const height = y2 - y1;
        const nexX1 = clientX  - offsetX;
        const nexY1 = clientY  - offsetY;
        updateElement(id,nexX1,nexY1,clientX + width,clientY+height,type);
      }
    };
    const handleMouseUp = () => {
      if(action === "drawing"){
        const index =  elements.length - 1; 
        const{id,type} = elements[index];
        const {x1,x2,y1,y2} = adjustElementCoordinates(elements[index]);
        updateElement(id,x1,x2,y1,y2,type);

      }
      setAction("none");
      setSelectedElement(null);
    };
    const nearPoint(x,y,x1,y2,name){
      return Math.abs(x - x1) < 5 && Math.abs(y - y2) < 5 ? name : null;; 
    }


    const PositionWithinElement = (x,y,element) => {
      const {type,x1,x2,y1,y2} = element;

      if (type ==="rect"){                
        const topLeft = nearPoint(x,y,x1,y1,"tl");
        const topRight = nearPoint(x,y,x2,y1,"tl");
        const bottomLeft = nearPoint(x,y,x1,y2,"tl");
        const bottomRight = nearPoint(x,y,x2,y2,"tl");  
        const inside = x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside":null;
        return topLeft ||topRight||bottomLeft||bottomRight || inside;
      }
      else if(type === "line"){
        const a = {x:x1,y:y1};
        const b = {x:x2,y:y2};
        const c = {x,y};
        const offset  = distance(a,b) - (distance(a,c) + distance(b,c)); 
        const start = nearPoint(x,y,x1,y1,"start");
        const end = nearPoint(x,y,x2,y2,"end");
        const inside = Math.abs(offset) < 1 ? "inside":null; 
        return start || end || inside;
      }
      else if(type === "circle"){
          //por hacer
      }
    } 
//hipotenusa
    const distance = (a,b) => Math.sqrt(Math.pow(a.x - b.x,2) + Math.pow(a.y - b.y,2));

    const getElementAtPosition = (x,y,elements) => {
      return elements.map(element => ({PositionWithinElement(x,y,element)}));
    }

    const adjustElementCoordinates = (element) => {
        const{type,x1,x2,y1,y2} = element;
        if(type === "rect"){
          const minX = Math.min(x1,x2);
          const maxX = Math.max(x1,x2);
          const minY = Math.min(y1,y2);
          const maxY = Math.max(y1,y2);
          return {x1:minX,x2:maxX,y1:minY,y2:maxY,type};
        }
        else if(type === "line"){
          if(x1<x2|| (x1 === x2 && y1 <y2)){
            return {x1,y1,x2,y2};
          }
          else{
            return {x1: x2,y1:y2,x2:x1,y2:y1};
          }
        }
    };

    function createElement(id,x1,y1,x2,y2 ,type){
      let roughElement = generator.line(x1,y1,x2,y2);
      if(type === "line"){
         roughElement = generator.line(x1,y1,x2,y2);
      }
      if(type === "rect"){
         roughElement = generator.rectangle(x1,y1,x2-x1,y2-y1);
      } 
  
      if(type === "circle"){
         roughElement = generator.ellipse(x1,y1,x2,y2);
      }
      return {id,x1,y1,x2,y2, type,roughElement};
    }
    
  
  
    return (
      <div>
        <div style={{position:"fixed"}}>
        <input
          type={"radio"}
          id={"selection"}
          checked ={tool === "selection"}
          onChange={() => setTool("selection")}
          />
          <label htmlFor={"selection"}>selection</label>
          <input
          type={"radio"}
          id={"line"}
          checked ={tool === "line"}
          onChange={() => setTool("line")}
          />
          <label htmlFor={"line"}>Line</label>
          <input
          type={"radio"}
          id={"rect"}
          checked ={tool === "rect"}
          onChange={() => setTool("rect")}
          />
          <label htmlFor={"rect"}>Rect</label>
  
          <input
          type={"radio"}
          id={"circle"}
          checked ={tool === "circle"}
          onChange={() => setTool("circle")}
          />
          <label htmlFor={"circle"}>Circle</label>
        </div>
      <canvas id="canvas"
        style={{ borderStyle: "solid" }}
        width="500"
        height="500" 
  
  
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      ></canvas>
    </div>
      
    );
}

export default Draw;