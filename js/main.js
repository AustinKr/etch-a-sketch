
let gridSize = 16;

function main()
{
    // TODO: Delegate events to one single listener
    
    let collapseButton = document.querySelector(".collapse-button");
    collapseButton.addEventListener("click", () => {
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
            cell.style.backgroundColor = "grey";
            cell.style.flex = "1 0 auto";
            cell.style.border = "2px solid red";
            cell.textContent = "duh..";
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}
main();