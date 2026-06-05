
let gridSize = 16;

function main()
{
    // TODO: Delegate events to one single listener
    
    let collapseButton = document.querySelector(".collapse-button");
    collapseButton.addEventListener("click", () => {
        collapseButton.parentElement.classList.toggle("collapesed");
        collapseButton.classList.toggle("collapesed-button");
    });

    let container = document.querySelector(".grid-container");
    let cellSize = container.offsetWidth / gridSize;
    for(let i = 0; i < gridSize*gridSize; i++)
    {
        let cell = document.createElement("div");
        cell.style.backgroundColor = "grey";
        cell.style.width = cellSize;
        cell.style.height = cellSize;
        cell.style.flex = "0 0 auto";
        cell.textContent = "duh..";
        container.appendChild(cell);
    }
}
main();