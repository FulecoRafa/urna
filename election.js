class candidate{
    constructor(name , num){
        this.name = name;
        this.num = num;
        this.votes = 0;
    }
}
let candidate1 = new candidate("Candidato 1" , 1);

class election{
    constructor(name){
        this.name = name;
        this.candidates = [
            candidate1
        ];
    }
}
let election1 = new election("Eleição 1");

let selectedIndex = 0;

let electionVector = [
    election1
];

let passwd = "";

loadElection();

//Passwd
function changePasswd(){
    if(passwd){
        let check = prompt("Insira sua senha atual:");
        if(check === passwd){
            let newPasswd1;
            let newPasswd2;
            while(true){
                newPasswd1 = prompt("Insira sua nova senha:");
                newPasswd2 = prompt("Insira a senha novamente:");
                if(newPasswd1 === newPasswd2){
                    passwd = newPasswd2;
                    break;
                }else{
                    alert("Senhas não são iguais!");
                }
            }
        }else{
            alert("Senha incorreta!");
            return 0;
        }
    }else{
        let newPasswd1;
        let newPasswd2;
        while(true){
            newPasswd1 = prompt("Insira sua nova senha:");
            newPasswd2 = prompt("Insira a senha novamente:");
            if(newPasswd1 === newPasswd2){
                passwd = newPasswd2;
                break;
            }else{
                alert("Senhas não são iguais!");
            }
        }
    }
}

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
    saveElection();
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
    saveElection();
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

        let index = electionVector[selectedIndex].candidates.indexOf(el);
        excludeButton.setAttribute('onclick' , 'excludeCandidate('+index+')');
        nameButton.setAttribute('onclick',"editInfo("+index+");")

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

function editInfo(index){
    candidateFormAppear();
    let candidate = electionVector[selectedIndex].candidates[index];
    document.querySelector(".candidateAdder input[name=candidateName]").value = candidate.name;
    document.querySelector(".candidateAdder input[name=candidateNum]").value = candidate.num;
    electionVector[selectedIndex].candidates.splice(index,1);
}

function excludeCandidate(index){
    electionVector[selectedIndex].candidates.splice(index , 1);
    console.log(electionVector[selectedIndex]);
    saveElection();
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
    saveElection();
    renderCandidates();
}

function candidateFormAppear(){
    let form = document.querySelector(".candidateAdder");
    form.style.visibility = "visible";
}

//Start Election
//---------------------------------
function startElection(){
    for(el of electionVector[selectedIndex].candidates){
        el.votes = 0;
    }
    let votingMachine = document.querySelector("#votingMachine");
    votingMachine.style.visibility = "visible"
    renderOptions();
}

function renderOptions(){
    let defaultOption = document.createElement('option');
    let defaultText = document.createTextNode("Candidato");
    let selector = document.querySelector("#candidateVote");
    defaultOption.appendChild(defaultText);
    selector.appendChild(defaultOption);
    for(el of electionVector[selectedIndex].candidates){
        let option = document.createElement('option');
        option.setAttribute('value' , el.num);
        let text = document.createTextNode(el.num);
        option.appendChild(text);

        selector.appendChild(option);
    }
}

function addVote(){
    let option = document.querySelector("#candidateVote");
    for(el of electionVector[selectedIndex].candidates){
        if(el.num == option.value){
            el.votes++;
            break;
        }
    }
    option.value="Candidato";
}

function countVotes(){
    let votingArray = [];
    for(el of electionVector[selectedIndex].candidates){
        votingArray.push(el);
    }
    let ordered = false;
    while(!ordered){
        ordered = true;
        for(let i = 0 ; i < votingArray.length-1 ; i++){
            if(votingArray[i].votes < votingArray[i+1].votes){
                let aux = votingArray[i];
                votingArray[i] = votingArray[i+1];
                votingArray[i+1] = aux;
                ordered = false;
            }
        }
    }
    document.querySelector("#endElection").style.visibility = "visible";
    console.log(votingArray);
    showResults(votingArray);
    document.querySelector("#votingMachine").style.visibility="hidden";
}

function showResults(votingArray){
    for(let i = 0 ; i < votingArray.length ; i++){
        let row = document.createElement('tr');
        let name = document.createElement('td');
        let num = document.createElement('td');
        let votes = document.createElement('td');
        let position = document.createElement('td');

        let nameText = document.createTextNode(votingArray[i].name);
        let numText = document.createTextNode(votingArray[i].num);
        let votesText = document.createTextNode(votingArray[i].votes);
        let positionText = document.createTextNode(i+1+'º');

        name.appendChild(nameText);
        num.appendChild(numText);
        votes.appendChild(votesText);
        position.appendChild(positionText);

        row.appendChild(name);
        row.appendChild(num);
        row.appendChild(votes);
        row.appendChild(position);

        document.querySelector("#endElection table").appendChild(row);
    }
}

function endOfAll(){
    document.querySelector("#endElection").style.visibility = "hidden";
    let table = document.querySelector("#endElection table");
    table.innerHTML = "";
    
    let caption = document.createElement('caption');
    let captionText = document.createTextNode("Resultados da eleição:");
    caption.appendChild(captionText);
    table.appendChild(caption);

    let row = document.createElement('tr');

    let name = document.createElement('th');
    let num = document.createElement('th');
    let votes = document.createElement('th');
    let position = document.createElement('th');

    let nameText = document.createTextNode("Nome:");
    let numText = document.createTextNode("Número:");
    let votesText = document.createTextNode("Quantidade de votos:");
    let positionText = document.createTextNode("Posição:");

    name.appendChild(nameText);
    num.appendChild(numText);
    votes.appendChild(votesText);
    position.appendChild(positionText);

    row.appendChild(name);
    row.appendChild(num);
    row.appendChild(votes);
    row.appendChild(position);
}

//save election
//---------------------------------------------------
function saveElection(){
    let saveFileText = JSON.stringify(electionVector,null,'\t');
    localStorage.setItem('data' , saveFileText);
    console.log(JSON.parse(localStorage.getItem('data')));
}

function loadElection(){
    let loadFile = JSON.parse(localStorage.getItem('data'));
    console.log(loadFile);
    electionVector = loadFile;
}

function clearStorage(){
    localStorage.clear();
    selectedIndex = 0;

    candidate1=new candidate("Candidato 1", 1);
    election1=new election("Eleição 1");


    electionVector = [election1];

    passwd = "";
    renderElections();
    renderCandidates();
}