const BRIGHTNESS_POWER = 10; // percentage

let gridSize = 16;
let cellTarget = null;
let isMouseDown = false;

let paintColor = "yellow";
let borderColor = "red";
let borderWidth = "2px";
let brightnessMode = null;

function getCurrentCell(container, event)
{
    let rect = container.getBoundingClientRect();
    let column = Math.floor((event.clientX - rect.left) / container.clientWidth * gridSize);
    let row = Math.floor((event.clientY - rect.top) / container.clientHeight * gridSize);
    return container.children[row].children[column];
}
function applyPaintEffect(cell)
{
    if(cell.classList.contains("colored-effect"))
    {
        cell.style.removeProperty("background-color");
        cell.classList.remove("colored-effect");
        return;
    }
    cell.style.backgroundColor = paintColor;
    cell.classList.add("colored-effect");
}
function applyBrightnessEffect(cell, direction)
{
    const change = direction * BRIGHTNESS_POWER;
    const factor = (100 + change) / 100.0;

    const colorString = window.getComputedStyle(cell).backgroundColor;
    const rgbValues = colorString.match(/[\d.]+/g);
    
    const rgb = 
    {
        r : parseInt(rgbValues[0]) * factor,
        g : parseInt(rgbValues[1]) * factor,
        b : parseInt(rgbValues[2]) * factor
    };

    cell.style.backgroundColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}
function tryApplyEffects(container, event)
{
    if(!isMouseDown)
        return;
    
    let newCellTarget = getCurrentCell(container, event);
    if(cellTarget !== null && newCellTarget === cellTarget)
        return;
    cellTarget = newCellTarget;

    if(brightnessMode === null)
    {
        applyPaintEffect(cellTarget);
        return;
    }
    applyBrightnessEffect(cellTarget, brightnessMode);
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

function settupInputFields(container)
{
    document.getElementById("grid-size")
     .addEventListener("input", event => {
        gridSize = parseInt(event.target.value);
        replaceGrid(container);
    });

    document.getElementById("paint-color")
     .addEventListener("input", event => paintColor = event.target.value);
    document.getElementById("border-color")
     .addEventListener("input", event => {
        borderColor = event.target.value;
        replaceGrid(container);
    });
    document.getElementById("border-width")
     .addEventListener("input", event => {
        borderWidth = parseInt(event.target.value);
        replaceGrid(container);
    });
    
    const darkenInput = document.getElementById("darken-mode");
    const lightenInput = document.getElementById("lighten-mode");
    lightenInput.addEventListener("input", event => {
        let newValue = event.target.checked;
        if(!newValue)
        {
            brightnessMode = null;
            return;
        }
        brightnessMode = 1;
        darkenInput.checked = !newValue;
    });
    darkenInput.addEventListener("input", event => {
        let newValue = event.target.checked;
        if(!newValue)
        {
            brightnessMode = null;
            return;
        }
        brightnessMode = -1;
        lightenInput.checked = !newValue;
    });
}


let container = document.querySelector(".main-panel");
settupInputFields(container);
replaceGrid(container);

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
    tryApplyEffects(container, event);
});
container.addEventListener("mouseup", () => {
    cellTarget = null;
    isMouseDown = false;
});
container.addEventListener("mousemove", event => tryApplyEffects(container, event));