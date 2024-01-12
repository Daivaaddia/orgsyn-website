class Graph {
    constructor() {
        this.adjList = new Map;
    }

    addVertex(newVertex) {
        this.adjList.set(newVertex, []);
    }

    addEdge(source, dest) {
        this.adjList.get(source).push(dest);
    }

    doesExist(comp) {
        if (typeof(this.adjList.get(comp)) === "undefined") {
            return false;
        } else {
            return true;
        }
    }

    printGraph() {
        for (const key of this.adjList.keys()) {
            console.log(key + " -> ");
            const destinations = this.adjList.get(key);

            for (const dest of destinations) {
                console.log(dest + ", ");
            }

            console.log("\n");
        }
    }
}

class rxnDetail {
    constructor(rnc, type) {
        this.rnc = rnc;
        this.type = type;
    }

    addNote(note) {
        this.note = note;
    }
}

class rxnMap {
    constructor() {
        this.map = new Map;
    }

    addRxn(name, detail) {
        this.map.set(name, detail);
    }

    printMap() {
        for (const key of this.map.keys()) {
            console.log(key + " -> ");
            console.log(this.map.get(key));
            console.log('\n');
        }
    }
}

const graph = new Graph();

graph.addVertex('Alkane');
const alkaneEdges = ['Halogenoalkane'];
for (const edge of alkaneEdges) {
    graph.addEdge('Alkane', edge);
}

graph.addVertex('Alkene');
const alkeneEdges = ['Alcohol', 'Alkane', 'Carboxylic acid', 'Ketone', 'Halogenoalkane'];
for (const edge of alkeneEdges) {
    graph.addEdge('Alkene', edge);
}

graph.addVertex('Halogenoalkane');
const haloalkaneEdges = ['Alcohol', 'Alkene', 'Amine', 'Nitrile'];
for (const edge of haloalkaneEdges) {
    graph.addEdge('Halogenoalkane', edge);
}

graph.addVertex('Alcohol');
const alcEdges = ['Halogenoalkane', 'Alkene', 'Ketone', 'Aldehyde', 'Carboxylic acid', 'Ester'];
for (const edge of alcEdges) {
    graph.addEdge('Alcohol', edge);
}

graph.addVertex('Carboxylic acid');
const carboxyEdges = ['Alcohol', 'Ester', 'Acyl chloride'];
for (const edge of carboxyEdges) {
    graph.addEdge('Carboxylic acid', edge);
}

graph.addVertex('Ester');
const esterEdges = ['Carboxylic acid'];
for (const edge of esterEdges) {
    graph.addEdge('Ester', edge);
}

graph.addVertex('Ketone');
const ketoneEdges = ['Nitrile', 'Alcohol'];
for (const edge of ketoneEdges) {
    graph.addEdge('Ketone', edge);
}

graph.addVertex('Aldehyde');
const aldehydeEdges = ['Nitrile', 'Alcohol', 'Carboxylic acid'];
for (const edge of aldehydeEdges) {
    graph.addEdge('Aldehyde', edge);
}

graph.addVertex('Acyl chloride');
const acylEdges = ['Ester', 'Carboxylic acid', 'Amide'];
for (const edge of acylEdges) {
    graph.addEdge('Acyl chloride', edge);
}

graph.addVertex('Amine');
const amineEdges = ['Amide'];
for (const edge of amineEdges) {
    graph.addEdge('Amine', edge);
}

graph.addVertex('Amide');
const amideEdges = ['Carboxylic acid', 'Amine'];
for (const edge of amideEdges) {
    graph.addEdge('Amide', edge);
}

graph.addVertex('Nitrile');
const nitrileEdges = ['Amine', 'Carboxylic acid'];
for (const edge of nitrileEdges) {
    graph.addEdge('Nitrile', edge);
}

graph.addVertex('Benzene');
// const benzeneEdges = ['Nitrobenzene', 'Halobenzene', 'Alkylbenzene']; //'Benzene with Haloalkane Side Chain', 'Benzene with Carboxyl Side Chain'
// for (const edge of benzeneEdges) {
//     graph.addEdge('Benzene', edge);
// }

// graph.addVertex('Nitrobenzene');
// graph.addVertex('Halobenzene');
// graph.addVertex('Alkylbenzene');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const reactions = new rxnMap();

const frs = 'Free radical substitution';
const eAdd = 'Electrophilic addition';
const oxdn = 'Oxidation';
const redn = 'Reduction';
const nuSubs = 'Nucleophilic substitution';
const nuAdd = 'Nucleophilic addition';
const addElim = 'Addition elimination';

let detail = new rxnDetail('Halogen + UV light', frs)
reactions.addRxn('Alkane Halogenoalkane', detail);

detail = new rxnDetail('Steam + 330&#176C + 6 MPa + conc. H<sub>3</sub>PO<sub>4</sub>', eAdd);
reactions.addRxn('Alkene Alcohol', detail);

detail = new rxnDetail('H<sub>2</sub> + Ni catalyst + 150&#176C + 5 atm', eAdd);
reactions.addRxn('Alkene Alkane', detail);

detail = new rxnDetail('Hot, acidified, concentrated KMnO<sub>4</sub>', oxdn)
detail.addNote('Alkene must have exactly one H adjacent to the C=C double bond');
reactions.addRxn('Alkene Carboxylic acid', detail);

detail = new rxnDetail('Hot, acidified, concentrated KMnO<sub>4</sub>', oxdn);
detail.addNote('Alkene must have no H adjacent to the C=C double bond');
reactions.addRxn('Alkene Ketone', detail);

detail = new rxnDetail('Hydrogen halide (e.g. HBr) at room temperature', eAdd);
reactions.addRxn('Alkene Halogenoalkane', detail);

detail = new rxnDetail('NaOH(aq) + heat', nuSubs);
reactions.addRxn('Halogenoalkane Alcohol', detail);

detail = new rxnDetail('Ethanolic NaOH + reflux', 'Elimination');
reactions.addRxn('Halogenoalkane Alkene', detail);

detail = new rxnDetail('NH<sub>3</sub> in ethanol + heat under pressure', nuSubs);
reactions.addRxn('Halogenoalkane Amine', detail);

detail = new rxnDetail('Ethanolic KCN + reflux', nuSubs);
reactions.addRxn('Halogenoalkane Nitrile', detail);

detail = new rxnDetail('Concentrated hydrogen halide (e.g. HBr) + heat', nuSubs);
reactions.addRxn('Alcohol Halogenoalkane', detail);

detail = new rxnDetail('Concentrated H<sub>2</sub>SO<sub>4</sub> + heat', 'Dehydration');
reactions.addRxn('Alcohol Alkene', detail);

detail = new rxnDetail('KMnO<sub>4</sub>(aq) + H<sub>2</sub>SO<sub>4</sub> + heat', oxdn);
detail.addNote('Must be secondary alcohol');
reactions.addRxn('Alcohol Ketone', detail);

detail = new rxnDetail('KMnO<sub>4</sub>(aq) + H<sub>2</sub>SO<sub>4</sub> + heat', oxdn);
detail.addNote('Must be primary alcohol');
reactions.addRxn('Alcohol Aldehyde', detail);

detail = new rxnDetail('KMnO<sub>4</sub>(aq) + H<sub>2</sub>SO<sub>4</sub> + reflux', oxdn);
detail.addNote('Must be primary alcohol');
reactions.addRxn('Alcohol Carboxylic acid', detail);

detail = new rxnDetail('Carboxylic acid + conc. H<sub>2</sub>SO<sub>4</sub> + heat or acyl chloride at room temperature', 'Esterification');
reactions.addRxn('Alcohol Ester', detail);

detail = new rxnDetail('LiAlH<sub>4</sub> in dry ether', redn);
reactions.addRxn('Carboxylic acid Alcohol', detail);

detail = new rxnDetail('Alcohol + conc. H<sub>2</sub>SO<sub>4</sub> + heat', 'Esterification');
reactions.addRxn('Carboxylic acid Ester', detail);

detail = new rxnDetail('PCl<sub>5</sub> or PCl<sub>3</sub> + heat', 'Placeholder');
reactions.addRxn('Carboxylic acid Acyl chloride', detail);

detail = new rxnDetail('Dilute acid (e.g. H<sub>2</sub>SO<sub>4</sub>(aq)) + heat', 'Hydrolisis');
reactions.addRxn('Ester Carboxylic acid', detail);

detail = new rxnDetail('HCN + KCN + reflux', nuAdd);
reactions.addRxn('Ketone Nitrile', detail);

detail = new rxnDetail('LiAlH<sub>4</sub> in dry ether', redn);
reactions.addRxn('Ketone Alcohol', detail);

detail = new rxnDetail('HCN + KCN + reflux', nuAdd);
reactions.addRxn('Aldehyde Nitrile', detail);

detail = new rxnDetail('LiAlH<sub>4</sub> in dry ether', redn);
reactions.addRxn('Aldehyde Alcohol', detail);

detail = new rxnDetail('NaBH<sub>4</sub> + aqueous alkaline solution + heat', redn);
reactions.addRxn('Aldehyde Carboxylic acid', detail);

detail = new rxnDetail('Alcohol + reflux in anhydrous conditions', addElim);
reactions.addRxn('Acyl chloride Ester', detail);

detail = new rxnDetail('Water', addElim);
reactions.addRxn('Acyl chloride Carboxylic acid', detail);

detail = new rxnDetail('NH<sub>3</sub> in anhydrous conditions', addElim);
reactions.addRxn('Acyl chloride Amide', detail);

detail = new rxnDetail('Acyl chloride at room temperature', addElim);
reactions.addRxn('Amine Amide', detail);

detail = new rxnDetail('Dilute acid (e.g. H<sub>2</sub>SO<sub>4</sub>(aq)) + heat', 'Hydrolisis');
reactions.addRxn('Amide Carboxylic acid', detail);

detail = new rxnDetail('LiAlH<sub>4</sub> in dry ether (or any reducing agent', redn);
reactions.addRxn('Amide Amine', detail);

detail = new rxnDetail('LiAlH<sub>4</sub> in dry ether (or any reducing agent', redn);
reactions.addRxn('Nitrile Amine', detail);

detail = new rxnDetail('Dilute acid (e.g. H<sub>2</sub>SO<sub>4</sub>(aq)) + heat', 'Hydrolisis');
reactions.addRxn('Nitrile Carboxylic acid', detail);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// find all paths from source to dest
let paths = [];

function find_paths(source, dest) {
    const visited = [];
    const path = [];
    dfs(source, dest, path, visited);
}

function dfs(curr, dest, path, visited) {
    visited.push(curr);
    path.push(curr);
    if (curr === dest) {
        paths.push(path);
    }

    for (const child of graph.adjList.get(curr)) {
        curr = child;
        if (!visited.includes(child)) {
            const pathcpy = [];
            for (let i = 0; i < path.length; i++) {
                pathcpy[i] = path[i];
            }
            const visitedcpy = [];
            for (let i = 0; i < visited.length; i++) {
                visitedcpy[i] = visited[i];
            }
            dfs(curr, dest, pathcpy, visitedcpy);
        }
    }
}

function input(event) {
    event.preventDefault();
    paths = [];
    let outputPaths = [];
    let outputsHTML = '';
    let isFiltered = false;

    let init = document.getElementById("initial").value.toLowerCase();
    init = init.charAt(0).toUpperCase() + init.slice(1);
    let product = document.getElementById("product").value.toLowerCase();
    product = product.charAt(0).toUpperCase() + product.slice(1);
    let targetLen = document.getElementById("length").value;

    if (targetLen.length !== 0) {
        targetLen = parseInt(targetLen);
        isFiltered = true;
    }

    output = document.getElementById('output-container');

    if (init.length === 0 || product.length === 0) {
        output.innerHTML = "Please input both an initial and product compound!";
        document.querySelector('.main-container').style.animation = 'invalid-input .3s';
        setTimeout(function() {
            document.querySelector('.main-container').style.animation = '';
        }, 300);
        return;
    }

    if (!graph.doesExist(init) || !graph.doesExist(product)) {
        output.innerHTML = "Compound doesn't exist!";
        document.querySelector('.main-container').style.animation = 'invalid-input .3s';
        setTimeout(function() {
            document.querySelector('.main-container').style.animation = '';
        }, 300);
        return;
    }

    if (init === product) {
        output.innerHTML = "No loops!!!";
        return;
    }

    find_paths(init, product);

    if (paths.length === 0) {
        output.innerHTML = "No pathways found!";
        return;
    }

    paths = sortPaths(paths);
    
    // filter paths
    if (!isFiltered) {
        outputPaths = paths;
    } else {
        paths.forEach((path) => {
            if (path.length === targetLen) {
                outputPaths.push(path);
            }
        })

        if (outputPaths.length === 0) {
            output.innerHTML = "No pathways of length " + targetLen + " found!";
            return;
        }
    }

    printPathways(outputPaths);
}

function sortPaths(pathsArr) {
    let noSwaps = false;
    while (!noSwaps) {
        noSwaps = true;
        for (let i = 0; i < pathsArr.length - 1; i++) {
            if (pathsArr[i + 1].length < pathsArr[i].length) {
                let tmp = pathsArr[i];
                pathsArr[i] = pathsArr[i + 1];
                pathsArr[i + 1] = tmp;
                noSwaps = false;
            }
        }
    }

    return pathsArr;
}

arrowSvg = '<svg fill="#000000" width="25px" height="25px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g data-name="Layer 2"><g data-name="arrow-ios-downward"><rect width="24" height="24" opacity="0"/><path d="M12 16a1 1 0 0 1-.64-.23l-6-5a1 1 0 1 1 1.28-1.54L12 13.71l5.36-4.32a1 1 0 0 1 1.41.15 1 1 0 0 1-.14 1.46l-6 4.83A1 1 0 0 1 12 16z"/></g></g></svg>';

function printPathways(outputPaths) {
    const outputContainer = document.getElementById('output-container');
    outputContainer.innerHTML = '';

    for (let i = 0; i < outputPaths.length; i++) {
        // draw pathway title
        let path = outputPaths[i];
        let pathwayNameText = '';

        const reactionContainerDiv = document.createElement('div');
        reactionContainerDiv.classList.add('reaction-container');
        outputContainer.appendChild(reactionContainerDiv);

        const reactionContainerHeaderDiv = document.createElement('div');
        reactionContainerHeaderDiv.classList.add('reaction-container-header');
        reactionContainerDiv.appendChild(reactionContainerHeaderDiv);

        // give id to reaction container
        reactionContainerDiv.setAttribute('id', 'reaction-' + (i + 1));

        const pathwayName = document.createElement('span');
        pathwayName.classList.add('pathway');

        for (const j in path) {
            pathwayNameText += path[j];
            if (j < path.length - 1) {
                pathwayNameText += ' -> ';
            }
        }
        pathwayName.appendChild(document.createTextNode(pathwayNameText));
        reactionContainerHeaderDiv.appendChild(pathwayName);

        const expandArrow = document.createElement('span');
        expandArrow.classList.add('svg-container');
        expandArrow.innerHTML = arrowSvg;
        reactionContainerHeaderDiv.appendChild(expandArrow);
        expandArrow.addEventListener('click', () => {
            expandReaction(reactionContainerDiv.id);
        });
    }

}

function expandReaction(parentContainerID) {
    const parentContainer = document.getElementById(parentContainerID);
    const existingChild = parentContainer.querySelector('.reaction-detail');
    const arrow = parentContainer.querySelector('.reaction-container-header').querySelector('.svg-container');
    if (existingChild !== null) {
        arrow.className = 'svg-container close';
        existingChild.remove();
        return;
    } 
    arrow.className = 'svg-container open';
    const detailDiv = document.createElement('div');
    detailDiv.classList.add('reaction-detail');
    
    const titleSpan = parentContainer.querySelector('span');
    const pathway = titleSpan.textContent.split(' -> ');
    
    for (let i = 0; i < pathway.length - 1; i++) {
        let stepName = pathway[i] + ' ' + pathway[i + 1];
        let stepObj = reactions.map.get(stepName);
        let newLine = document.createElement('br');

        const stepSubtitle = document.createElement('div');
        stepSubtitle.classList.add('step-subtitle');
        stepSubtitle.innerHTML = pathway[i] + ' -> ' + pathway[i + 1];
        detailDiv.appendChild(stepSubtitle);

        let typeDiv = document.createElement('div');
        typeDiv.innerHTML = 'Reaction type: ' + stepObj.type;
        detailDiv.appendChild(typeDiv);

        let rncDiv = document.createElement('div');
        rncDiv.innerHTML = 'Reagents and conditions: ' + stepObj.rnc;
        detailDiv.appendChild(rncDiv);

        if (stepObj.hasOwnProperty('note')) {
            let noteDiv = document.createElement('div');
            noteDiv.innerHTML = 'Note: ' + reactions.map.get(stepName).note;
            detailDiv.appendChild(noteDiv);
        }
    }
    parentContainer.appendChild(detailDiv);
}

function autocomplete(inp) {
    let parent = inp.parentNode;

    document.addEventListener("click", (event) => {
        if (parent.querySelector('.autocomplete-div') !== null) { 
            if (event.target.closest('.autocomplete-div') || event.target.closest('.autocomplete')) {
                return;
            } 
            parent.querySelector('.autocomplete-div').remove();
        }
    })
    
    let arr = Array.from(graph.adjList.keys());
    let outputs = [];

    inp.addEventListener('input', () => {
        updateAutocomplete(inp, parent, arr);
    })

    inp.addEventListener('click', () => {
        updateAutocomplete(inp, parent, arr);
    })
}

function updateAutocomplete(inp, parent, arr) {
    if (parent.querySelector('.autocomplete-div') !== null) {
        parent.querySelector('.autocomplete-div').remove();
    }

    let text = inp.value;
    outputs = [];
    container = document.createElement('div');
    container.classList.add('autocomplete-div');
    parent.appendChild(container);

    arr.forEach(comp => {
        if (text.toLowerCase() === comp.substr(0, text.length).toLowerCase()) {
            let outputComp = '<strong>' + comp.substr(0, text.length) + '</strong>' + comp.substr(text.length);
            outputs.push(outputComp);
        }
    })

    outputs.sort();
    outputs.forEach(out => {
        let newItem = document.createElement('div');
        newItem.classList.add('autocomplete-item');
        newItem.setAttribute("id", 'autocomplete-item-' + out);
        newItem.innerHTML = out;
        newItem.addEventListener("click", () => {
            autocompleteClick(newItem);
        })
        container.appendChild(newItem);
    })
}

function autocompleteClick(item) {
    console.log(item);
    let parentDiv =  item.parentNode.parentNode;
    let form = parentDiv.querySelector('.compound-input');
    let output = item.innerHTML.replace('<strong>', '').replace('</strong>', '');
    form.value = output;
    parentDiv.querySelector('.autocomplete-div').remove();
}



autocomplete(document.getElementById('initial'));
autocomplete(document.getElementById('product'));