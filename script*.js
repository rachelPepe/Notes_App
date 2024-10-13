const notesContainer = document.querySelector(".notes-container");      // controls the whole container
const createButton = document.querySelector(".btn");    // controls the create notes button 


    // load and display notes from local storage 
function showNotes(){
    const savedNotes = localStorage.getItem("notes") || "";
    notesContainer.innerHTML = savedNotes;

    // reassign event listeners for input changes on all loaded notes
    document.querySelectorAll(".input-box").forEach(note => {
        note.addEventListener("input", updateStorage);
    });
}
showNotes();

// saves notes to localStorage
function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML)  
}

    // Creates a new note with a delete button
createButton.addEventListener("click", ()=>{
    const note = document.createElement("div");     // use div to wrap content and button
    const inputBox = document.createElement("p");     //creates a new note with the p element 
    const img = document.createElement("img");    // creates element for the delete img that will be button to delete note

    note.className = "note";   // formats the actual note with delete button inside
    inputBox.className = "input-box";       // adds class to format each <p> into the editable note 
    inputBox.setAttribute("contenteditable", "true");   // makes each note so you can type note into it, adds attribute and value

    img.src = "images/delete.png";
    img.className = "delete-btn";

    note.appendChild(inputBox);
    note.appendChild(img);
    notesContainer.appendChild(note);

    // add event listener to save changes on input
    inputBox.addEventListener("input", updateStorage);
})

    // handles click event on delete button
notesContainer.addEventListener("click", function(e){
    if(e.target.classList.contains("delete-btn")){  
        e.target.parentElement.remove();    // deletes the <p> element (note) of the delete img that is clicked 
        updateStorage();    // deletes from local storage 
    }
})

    //makes it so user can click enter to go to a new line in each note
document.addEventListener("keydown", event => {
    if(event.key === "Enter"){
        document.execCommand("insertLineBreak")
        event.preventDefault();
    }
})