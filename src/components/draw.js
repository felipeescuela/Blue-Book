import React, {  useLayoutEffect, useState } from "react";
import rough from 'roughjs/bundled/rough.esm.js';

const generator = rough.generator();

const Draw = () => {
    const [elements, setElements] = useState([]);
    const [drawing, setDrawing] = useState(false);
    const [tool, setElementType] = useState("line");
  
    useLayoutEffect(() => {
  //Esto se esta reaciendo constantemente como el update de unity
        const canvas = document.getElementById("canvas");
        const roughCanvas = rough.canvas(canvas);
        const context = canvas.getContext("2d");
        context.clearRect(0,0,canvas.width,canvas.height);
  
       elements.forEach(({roughElement}) => roughCanvas.draw(roughElement));
      //cual es la diferencia?  elements.forEach(element => roughCanvas.draw(element.roughElement));
    }, [elements]);//explicar esto tambien
  
  
    const handleMouseDown = (event) => {
      setDrawing(true);
  
      
      const { clientX,clientY } = event;
      const element = createElement(clientX,clientY,clientX,clientY,tool);
  
      //   que explique que es prevState y porque asi
      setElements(prevState => [...prevState, element]);
    };
  
    const handleMouseMove = (event) => {
      if(!drawing) return;
      const { clientX,clientY } = event;
      const index =  elements.length - 1; 
      //pedir profe que explique bien
      const{x1,y1} = elements[index];
      const updateElement = createElement(x1,y1,clientX,clientY,tool);
  
      //tambien que es el ...
      const elementCopy = [...elements];
      elementCopy[index] = updateElement;
      setElements(elementCopy);
  
    }
    const handleMouseUp = () => {
      setDrawing(false);
    };
  
  
    function createElement(x1,y1,x2,y2){
      let roughElement = generator.line(x1,y1,x2,y2);
      if(tool === "line"){
         roughElement = generator.line(x1,y1,x2,y2);
      }
      if(tool === "rect"){
         roughElement = generator.rectangle(x1,y1,x2-x1,y2-y1);
      } 
  
      if(tool === "circle"){
         roughElement = generator.ellipse(x1,y1,x2,y2);
      }
      return {x1,y1,x2,y2, roughElement};
    }
    
  
  
    return (
      <div>
        <div style={{position:"fixed"}}>
        <input
          type={"radio"}
          id={"selection"}
          checked ={tool === "selection"}
          onChange={() => setElementType("selection")}
          />
          <input
          type={"radio"}
          id={"line"}
          checked ={tool === "line"}
          onChange={() => setElementType("line")}
          />
          <label htmlFor={"line"}>Line</label>
          <input
          type={"radio"}
          id={"rect"}
          checked ={tool === "rect"}
          onChange={() => setElementType("rect")}
          />
          <label htmlFor={"rect"}>Rect</label>
  
          <input
          type={"radio"}
          id={"circle"}
          checked ={tool === "circle"}
          onChange={() => setElementType("circle")}
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