import Sortable  from './node_modules/@shopify/draggable/build/esm/Sortable/Sortable.mjs';
import SortAnimation from './node_modules/@shopify/draggable/build/esm/Plugins/SortAnimation/SortAnimation.mjs';
import DOMPurify from './node_modules/dompurify/dist/purify.es.mjs';

window.addEventListener("load", (e) => {

    let localStorageData = localStorage.getItem("containers");

    if (localStorageData !== null && localStorageData.trim() !== '')
    {
        let sanitizedHTML = DOMPurify.sanitize(localStorageData);

        document.getElementById("main").innerHTML = sanitizedHTML;

        let cards = document.querySelectorAll(".card");

        cards.forEach((card) => {

            card.addEventListener("click", (e) => {

                let editCardMessage = editCard(e.target.parentElement.parentElement.querySelector(".container-header h1").textContent, e);

                let blurBackgroundLayer = document.createElement("div");
                blurBackgroundLayer.className = "blur-background-layer";

                document.getElementById("page-container").append
                (
                    blurBackgroundLayer,
                    editCardMessage
                );

            })

        });

        let newCardButtons = document.querySelectorAll(".add-card");

        newCardButtons.forEach((button) => {

            button.addEventListener("click", (e) => {

                let eventHandler = () =>
                {
                    let cardName = document.querySelector(".popup-form input").value;
                    
                    if (cardName.length > 0)
                    {
                        const card = createCard(cardName, e.target.parentElement.querySelector(".container-header h1").textContent);
                    
                        e.target.parentElement.querySelector(".container-cards").appendChild(card);
            
                        updateLocalStorage()
                    
                        removePopupMessage();
                    } 
                    else
                    {
                            window.alert("Your container name can't be empty!");
                    }
                }
            
                createPopupMessage(
                        "New Card",
                        "Enter card name",
                        eventHandler
                )

            });

        })

        let editContainerButtons = document.querySelectorAll(".more-options-icon");

        editContainerButtons.forEach((button) => {

            button.addEventListener("click", (e) => {

                if (document.querySelector(".more-options-window"))
                {
                    document.querySelector(".more-options-window").remove();
                }
            
                let editWindow = document.createElement("div");
            
                let editContainerNameButton = document.createElement("div");
                let deleteContainerButton = document.createElement("div");
            
                editWindow.className = "more-options-window";
            
                editContainerNameButton.className = "edit-container";
                editContainerNameButton.textContent = "Edit";
            
                editContainerNameButton.addEventListener("click", () => {
            
                    
            
                });
            
                deleteContainerButton.className = "delete-container";
                deleteContainerButton.textContent = "Delete";
            
            
                deleteContainerButton.addEventListener("click", (e) => {
            
                    e.target.parentElement.parentElement.remove();
                    updateLocalStorage();
            
                });
            
                editWindow.append(
            
                    editContainerNameButton,
                    deleteContainerButton
                
                );
            
                e.target.parentElement.parentElement.style.position = "relative";
            
                e.target.parentElement.parentElement.appendChild(editWindow);
            
                document.addEventListener("click", (e) => {
            
                    documentFunction(e, e.target.parentElement.parentElement)
            
                })

            })

        })
    } 
 
});

function updateLocalStorage()
{
    const mainContent = document.getElementById("main").innerHTML; // string HTML

    localStorage.setItem("containers", mainContent);
}

const addContainerButton = document.querySelector(".add-container");
const pageContainer = document.getElementById("page-container");

const sortable = new Sortable(

    document.getElementById('main'), 
    {
        draggable: ".container",
        handle: ".drag-container",
        mirror: {
            constrainDimensions: true
        },
        sortAnimation: {

            duration: 300,
            easingFunction: 'ease-in-out',

        },
        plugins: [SortAnimation]
    }

);

addContainerButton.addEventListener("click", (e) => {

    let eventHandler = () => {

        let containerName = document.querySelector(".popup-form input").value;

        if (containerName.length > 0)
        {
            let container = createContainer(containerName);
            let main = document.getElementById("main");

            main.appendChild(container);

            updateLocalStorage();

            removePopupMessage();
        } 
        else
        {
            window.alert("Your container name can't be empty!");
        }

    }

    createPopupMessage(
        "New Container",
        "Enter container name",
        eventHandler
    );

});

function createPopupMessage(headingText, placeholder, eventHandler) 
{
    const popupMessage = document.createElement("div");
    const blurBackgroundLayer = document.createElement("div");

    const popupMessageHeading = document.createElement("h1");
    const popupMessageInput = document.createElement("input");
    const popupMessageButtons = document.createElement("div");
    const popupMessageCreateButton = document.createElement("button");
    const popupMessageCancelButton = document.createElement("button");

    blurBackgroundLayer.className = "blur-background-layer";
    popupMessage.className = "popup-form";

    popupMessageHeading.textContent = headingText;
    popupMessageInput.placeholder = placeholder;

    popupMessageInput.addEventListener("keydown", (e) => {

        if (e.key == "Enter")
        {
            eventHandler();
        }
    
    });

    popupMessageCancelButton.className = "cancel-button";
    popupMessageCreateButton.className = "create-button";
    
    popupMessageCancelButton.textContent = "Cancel";
    popupMessageCreateButton.textContent = "Create";
    
    popupMessageCancelButton.addEventListener("click", removePopupMessage);
    popupMessageCreateButton.addEventListener("click", eventHandler);

    popupMessageButtons.append(popupMessageCancelButton, popupMessageCreateButton);

    popupMessage.append(

        popupMessageHeading, 
        popupMessageInput, 
        popupMessageButtons

    );

    pageContainer.append(
        blurBackgroundLayer,
        popupMessage
    );

    popupMessageInput.focus();
}

function createContainer(name)
{
    const container = document.createElement("div");
    const containerHeader = document.createElement("div");
    const containerTasks = document.createElement("ul");
    const containerButton = document.createElement("button");
    const containerName = document.createElement("h1");
    const containerEditButton = document.createElement("i");
    const draggableArea = document.createElement("div");

    container.className = "container";
    containerHeader.className = "container-header";
    containerTasks.className = "container-cards";
    containerButton.className = "add-card";
    containerEditButton.className = "fa-solid fa-ellipsis-vertical more-options-icon";
    draggableArea.className = "drag-container";

    containerButton.textContent = "New Card";

    containerButton.addEventListener("click", (e) => {

        let eventHandler = () =>
        {
            let cardName = document.querySelector(".popup-form input").value;
        
            if (cardName.length > 0)
            {
                const card = createCard(cardName, name);
        
                containerTasks.appendChild(card);

                updateLocalStorage();
        
                removePopupMessage();
            } 
            else
            {
                window.alert("Your container name can't be empty!");
            }
        }

        createPopupMessage(

            "New Card",
            "Enter card name",
            eventHandler
        )

    });

    containerEditButton.addEventListener("click", () => {

        if (document.querySelector(".more-options-window"))
        {
            document.querySelector(".more-options-window").remove();
        }

        let editWindow = document.createElement("div");

            let editContainerNameButton = document.createElement("div");
            let deleteContainerButton = document.createElement("div");

            editWindow.className = "more-options-window";

            editContainerNameButton.className = "edit-container";
            editContainerNameButton.textContent = "Edit";

            editContainerNameButton.addEventListener("click", () => {

                editCard(name);

            });

            deleteContainerButton.className = "delete-container";
            deleteContainerButton.textContent = "Delete";


            deleteContainerButton.addEventListener("click", (e) => {

                e.target.parentElement.parentElement.remove();

            });

            editWindow.append(

                editContainerNameButton,
                deleteContainerButton
    
            );

            container.style.position = "relative";

            container.appendChild(editWindow);

            document.addEventListener("click", (e) => {

                documentFunction(e, container)

            })
    });

    containerName.textContent = name;

    containerHeader.append(
        
        containerName,
        draggableArea,
        containerEditButton
    
    );

    container.append(

        containerHeader,
        containerTasks,
        containerButton

    );

    return container;
}

function createCard(name, containerName)
{
    let card = document.createElement("li");

    card.addEventListener("click", (e) => {

        let editCardMessage = editCard(containerName, e);

        let blurBackgroundLayer = document.createElement("div");
        blurBackgroundLayer.className = "blur-background-layer";

        document.getElementById("page-container").append
        (
            blurBackgroundLayer,
            editCardMessage
        );

    });

    card.className = "card";
    card.textContent = name;

    return card;
}

function editCard(containerName, cardEventListener)
{
    let popupMessage = document.createElement("div");
    let popupMessageHeader = document.createElement("div");
    let popupMessageMain = document.createElement("div");

    let heading = document.createElement("h1");
    heading.textContent = `${containerName}`;
    let deleteCardButton = document.createElement("i");

    let inputLabel = document.createElement("label");
    let inputHint = document.createTextNode("Card Title");
    let breakTag = document.createElement("br");
    let textIcon = document.createElement("i");
    let input = document.createElement("input");

    input.addEventListener("keydown", (e) => {

        if (e.key == "Enter")
        {
            changeCardTitle();
        }
    });

    input.placeholder = "Enter new card title";
     
    let buttons = document.createElement("div");
    let cancelButton = document.createElement("button");
    let saveButton = document.createElement("button");

    deleteCardButton.addEventListener("click", (e) => {

        cardEventListener.target.remove();

        popupMessage.remove();
        document.querySelector(".blur-background-layer").remove();

    });

    cancelButton.addEventListener("click", (e) => {

        popupMessage.remove();
        document.querySelector(".blur-background-layer").remove();

    });

    saveButton.addEventListener("click", changeCardTitle)

    function changeCardTitle()
    {
        if (input.value.length > 0)
        {
            cardEventListener.target.textContent = input.value;
    
            popupMessage.remove();
            document.querySelector(".blur-background-layer").remove();
        } 
        else 
        {
            popupMessage.remove();
            document.querySelector(".blur-background-layer").remove();
        }
    }

    popupMessage.className = "edit-card-menu";
    popupMessageHeader.className = "edit-card-menu-header";
    popupMessageMain.className = "edit-card-menu-main";

    deleteCardButton.className = "fa-regular fa-trash-can delete-card";
    textIcon.className = "fa-solid fa-align-left";
    input.className = "new-card-title";

    buttons.className = "edit-card-menu-buttons";
    cancelButton.className = "cancel-button";
    saveButton.className = "save-button";

    cancelButton.textContent = "Cancel";
    saveButton.textContent = "Save";

    buttons.append(
        cancelButton,
        saveButton
    );

    popupMessageHeader.append(heading, deleteCardButton);

    inputLabel.append(textIcon, inputHint, breakTag, input);
    
    popupMessageMain.append(
        inputLabel,
        buttons
    );

    popupMessage.append(popupMessageHeader, popupMessageMain);

    return popupMessage;
}

function removePopupMessage()
{
    let nodeList = document.querySelectorAll(".popup-form, .blur-background-layer");

    nodeList.forEach((node) => node.remove());

    pageContainer.style.position = "static";
}

function documentFunction(e, container)
{
    // let optionsButton = document.querySelector(".fa-ellipsis-vertical");
    // let editWindow = document.querySelector(".more-options-window");
    // let editContainerNameButton = document.querySelector(".edit-container");
    // let deleteContainerButton = document.querySelector(".delete-container");
                    
    // if (
    //     e.target.parentElement.parentElement !== container
    //     && 
    //     e.target.className !== editContainerNameButton.className
    //     && 
    //     e.target.className !== deleteContainerButton.className
    // )
    // {
    //     container.childNodes[3].remove();
    //     document.removeEventListener("click", documentFunction);
    // }

    if (
        !e.target.matches('.edit-container')
        &&
        !e.target.matches('.delete-container')
        &&
        !e.target.matches('.more-options-icon')
    )
    {
        document.querySelector(".more-options-window").remove();
    }
}



