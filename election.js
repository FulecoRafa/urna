class candidate{
    constructor(name , num){
        this.name = name;
        this.num = num;
        this.votes = 0;
    }
}
let candidate1 = new candidate("Candidato 1" , 1);
let candidate2 = new candidate("Candidato 2" , 2);

class election{
    constructor(name){
        this.name = name;
        this.candidates = [
            candidate1,
            candidate2
        ];
    }
}
let election1 = new election("Eleição 1");
let election2 = new election("Eleição 2");
let election3 = new election("Eleição 3");

let selectedIndex = 0;

let electionVector = [
    election1,
    election2,
    election3
];

//Elections
//----------------------------------------------------------------------

function renderElections(){
    const elections = document.querySelector(".elections");
    elections.innerHTML = "";
    for(el of electionVector){
        let listElement = document.createElement('li');
        let nameButton = document.createElement('button');
        let excludeButton = document.createElement('button');
        const x = document.createTextNode("X");
        let name = document.createTextNode(el.name);
        let empty = document.createTextNode(" ");

        listElement.classList = "election";
        excludeButton.classList = "exclude";
        nameButton.classList = "name";

        let index = electionVector.indexOf(el);
        excludeButton.setAttribute('onclick' , 'excludeElection('+index+')');
        nameButton.setAttribute('onclick' , 'selectElection('+index+')');

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
        let newElection = new election(name.value);
        electionVector.push(newElection);
    }
    name.value = "";
    form.style.visibility = "hidden";
    renderElections();
}

function electionFormAppear(){
    let form = document.querySelector(".electionAdder");
    form.style.visibility = "visible";
}

function selectElection(index){
    selectedIndex = index;
    renderCandidates();
}

//Candidates
//--------------------------------------------------

function renderCandidates(){
    let candidates = document.querySelector(".candidates");
    candidates.innerHTML = "";
    for(el of electionVector[selectedIndex].candidates){
        let listElement = document.createElement('li');
        let nameButton = document.createElement('button');
        let excludeButton = document.createElement('button');
        const x = document.createTextNode("X");
        let name = document.createTextNode(el.name);
        let empty = document.createTextNode(" ");

        let index = electionVector[selectedIndex].candidates.indexOf(el.name);
        excludeButton.setAttribute('onclick' , 'excludeCandidate('+index+')');

        listElement.classList = "candidate";
        excludeButton.classList = "exclude";
        nameButton.classList = "name";

        excludeButton.appendChild(x);
        nameButton.appendChild(name);
        listElement.appendChild(nameButton);
        listElement.appendChild(empty);
        listElement.appendChild(excludeButton);
        
        candidates.appendChild(listElement);
    }
}
renderCandidates();

function excludeCandidate(index){
    electionVector[selectedIndex].candidates.splice(index , 1);
    console.log(electionVector[selectedIndex]);
    renderCandidates();
}

function candidateAdd(){
    let form = document.querySelector(".candidateAdder");
    let name = document.querySelector(".candidateAdder input[name = candidateName]");
    let num = document.querySelector(".candidateAdder input[name = candidateNum]");
    if(name.value && num.value){
        let newCandidate = new candidate(name.value , num.value);
        electionVector[selectedIndex].candidates.push(newCandidate);
    }
    name.value = "";
    num.value = "";
    form.style.visibility = "hidden";
    renderCandidates();
}

function candidateFormAppear(){
    let form = document.querySelector(".candidateAdder");
    form.style.visibility = "visible";
}