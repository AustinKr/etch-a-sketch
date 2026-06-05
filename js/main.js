
let gridSize = 16;
let isMouseDown = false;
let cellTarget = null;

function tryApplyEffect(container, event)
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
    cellTarget.classList.toggle("hover-effect");
}


function main()
{
    // TODO: Delegate events to one single listener
    
    let collapseButton = document.querySelector(".collapse-button");
    collapseButton.addEventListener("click",
        () => {
        collapseButton.parentElement.classList.toggle("collapesed");
        collapseButton.classList.toggle("collapesed-button");
    });

    let container = document.querySelector(".main-panel");
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
            row.appendChild(cell);
        }
        container.appendChild(row);
    }

    container.addEventListener("mousedown", (event) => {
        if(!event.target.classList.contains("grid-cell"))
            return;
        isMouseDown = true;
        tryApplyEffect(container, event);
    });
    container.addEventListener("mouseup", () => {
        isMouseDown = false;
        cellTarget = null;
    });
    container.addEventListener("mousemove", event => tryApplyEffect(container, event));
}
main();