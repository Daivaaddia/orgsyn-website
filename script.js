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

graph.addVertex('Benzene');
const benzeneEdges = ['Nitrobenzene', 'Halobenzene', 'Alkylbenzene']; //'Benzene with Haloalkane Side Chain', 'Benzene with Carboxyl Side Chain'
for (const edge of benzeneEdges) {
    graph.addEdge('Benzene', edge);
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

graph.addVertex('Nitrobenzene');
graph.addVertex('Halobenzene');
graph.addVertex('Alkylbenzene');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const reactions = new rxnMap();

const frs = 'Free radical substitution';
const reflux = 'reflux';
const eAdd = 'Electrophilic addition';

let detail = new rxnDetail('Halogen + UV light', frs)
reactions.addRxn('Alkane Halo', detail);

detail = new rxnDetail('Steam + 330C + 6MPa + conc. H3PO4', eAdd);
reactions.addRxn('Alkene Alcohol', detail);





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