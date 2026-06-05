
let gridSize = 16;
let isMouseDown = false;
let cellTarget = null;
let paintColor = "yellow";
let borderColor = "red";
let borderWidth = "2px";

function tryToggleEffect(container, event)
{
    if(!isMouseDown)
        return;
    let rect = container.getBoundingClientRect();
    let column = Math.floor((event.clientX - rect.left) / container.clientWidth * gridSize);
    let row = Math.floor((event.clientY - rect.top) / container.clientHeight * gridSize);
    let newCellTarget = container.children[row].children[column];
    if(cellTarget !== null && newCellTarget === cellTarget)
        return;
    cellTarget = newCellTarget;

    if(cellTarget.classList.contains("colored-effect"))
    {
        cellTarget.style.removeProperty("background-color");
        cellTarget.classList.remove("colored-effect");
        return;
    }
    cellTarget.style.backgroundColor = paintColor;
    cellTarget.classList.add("colored-effect");
}
function setActiveState(element, state)
{
    if(state)
    {
        element.style.pointerEvents = 'none';
        element.style.display = 'none';
        return;
    }
    element.style.pointerEvents = 'auto';
    element.style.display = 'block';
}

function replaceGrid(container)
{
    container.replaceChildren();
    let cellSize = container.offsetWidth / gridSize;
    for(let j = 0; j < gridSize; j++)
    {
        let row = document.createElement("div");
        row.style.width = "100%";
        row.style.height = `${cellSize}px`;
        row.style.display = "flex";

        for(let i = 0; i < gridSize; i++)
        {
            let cell = document.createElement("div");
            cell.classList.add("grid-cell")
            cell.style.borderColor = borderColor;
            cell.style.borderWidth = borderWidth;
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

let container = document.querySelector(".main-panel");
let gridSizeInput = document.getElementById("grid-size");
let paintColorInput = document.getElementById("paint-color");
let borderColorInput = document.getElementById("border-color");
let borderWidthInput = document.getElementById("border-width");
gridSizeInput.addEventListener("input", event => {
    gridSize = parseInt(event.target.value);
    replaceGrid(container);
});
paintColorInput.addEventListener("input", event => paintColor = event.target.value);
borderColorInput.addEventListener("input", event => {
    borderColor = event.target.value;
    replaceGrid(container);
});
borderWidthInput.addEventListener("input", event => {
    borderWidth = parseInt(event.target.value);
    replaceGrid(container);
});

let sidePanel = document.querySelector(".side-panel");
let topPanel = document.querySelector(".top-panel");
let collapseButton = document.querySelector(".collapse-button");
collapseButton.addEventListener("click",
    () => {
   sidePanel.classList.toggle("collapesed");
   let isCollapsed = collapseButton.classList.toggle("collapesed-button");
   setActiveState(topPanel, isCollapsed);
});

container.addEventListener("mousedown", (event) => {
    if(!event.target.classList.contains("grid-cell"))
        return;
    isMouseDown = true;
    tryToggleEffect(container, event);
});
container.addEventListener("mouseup", () => {
    isMouseDown = false;
    cellTarget = null;
});
container.addEventListener("mousemove", event => tryToggleEffect(container, event));

replaceGrid(container);