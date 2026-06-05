
function toggleCollapseParent(element)
{
    element.parentElement.classList.toggle("collapesed");
}

function main()
{
    let collapseButton = document.querySelector(".collapse-button");
    collapseButton.addEventListener("click", event => {
        toggleCollapseParent(event.target);
    });
}
main();