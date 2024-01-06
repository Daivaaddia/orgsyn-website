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

// graph.addVertex('Benzene');
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

detail = new rxnDetail('H<sub>2</sub>, Ni catalyst, 150&#176C, 5 atm', eAdd);
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

detail = new rxnDetail('Concentrated H<sub>2</sub>SO<sub>4</sub> + heat', detail);
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

reactions.printMap();

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

//find_paths('Alkene', 'Carboxylic acid');
//console.log(paths);

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

    if (init.length === 0 || product.length === 0) {
        document.getElementById("output").innerHTML = "Please input both an initial and product compound!";
        return;
    }

    if (!graph.doesExist(init) || !graph.doesExist(product)) {
        document.getElementById("output").innerHTML = "Compound doesn't exist!";
        return;
    }

    // Check if length is valid, or make it so that only valid inputs can be entered

    find_paths(init, product);

    if (paths.length === 0) {
        document.getElementById("output").innerHTML = "No pathways found!";
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
    }

    let numPaths = 1;
    outputPaths.forEach((path) => {
        outputsHTML += ` ${numPaths}. `;
        for (const j in path) {
            outputsHTML += path[j];
            if (j < path.length - 1) {
                outputsHTML += ' -> ';
            }
        }
        outputsHTML += '<br><br>';
        numPaths++;
    })

    document.getElementById("output").innerHTML = outputsHTML;
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