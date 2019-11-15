
let electionVector = [
    "Eleição 1",
    "Eleição 2",
    "Eleição 3"
]

function renderElections(){
    const elections = document.querySelector(".elections");
    elections.innerHTML = "";
    for(el of electionVector){
        let listElement = document.createElement('li');
        let nameButton = document.createElement('button');
        let excludeButton = document.createElement('button');
        const x = document.createTextNode("X");
        let name = document.createTextNode(el);
        let empty = document.createTextNode(" ");

        listElement.classList = "election";
        excludeButton.classList = "exclude";
        nameButton.classList = "name";

        let index = electionVector.indexOf(el);
        excludeButton.setAttribute('onclick' , 'excludeElection('+index+')');

        excludeButton.appendChild(x);
        nameButton.appendChild(name);
        listElement.appendChild(nameButton);
        listElement.appendChild(empty);
        listElement.appendChild(excludeButton);
        
        elections.appendChild(listElement);
    }
}

renderElections();

function excludeElection(index){
    electionVector.splice(index,1);
    renderElections();
}

function electionAdd(){
    let form = document.querySelector(".electionAdder");
    let name = document.querySelector(".electionAdder input[type = text]");
    if(name.value){
        electionVector.push(name.value);
    }
    name.value = "";
    form.style.visibility = "hidden";
    renderElections();
}

function electionFormAppear(){
    let form = document.querySelector(".electionAdder");
    form.style.visibility = "visible";
}