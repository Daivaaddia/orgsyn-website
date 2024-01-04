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

const graph = new Graph();
graph.addVertex('Alkane');
const alkaneEdges = ['Halogenoalkane'];
for (const edge of alkaneEdges) {
    graph.addEdge('Alkane', edge);
}

graph.addVertex('Alkene');
const alkeneEdges = ['Alcohol', 'Alkane', 'Carboxylic Acid', 'Ketone'];
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
const alcEdges = ['Halogenoalkane', 'Alkene', 'Ketone', 'Carboxylic Acid', 'Ester'];
for (const edge of alcEdges) {
    graph.addEdge('Alcohol', edge);
}

graph.addVertex('Carboxylic Acid');
const carboxyEdges = ['Alcohol', 'Ester', 'Acyl Chloride'];
for (const edge of carboxyEdges) {
    graph.addEdge('Carboxylic Acid', edge);
}

graph.addVertex('Ketone');
const ketoneEdges = ['Nitrile', 'Alcohol', 'Carboxylic Acid'];
for (const edge of ketoneEdges) {
    graph.addEdge('Ketone', edge);
}

graph.addVertex('Amine');
graph.addVertex('Nitrile');
graph.addVertex('Nitrobenzene');
graph.addVertex('Halobenzene');
graph.addVertex('Alkylbenzene');
graph.addVertex('Ester');
graph.addVertex('Acyl Chloride');


//graph.printGraph();

//console.log("-----------------------------------");


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

//find_paths('Alkene', 'Carboxylic Acid');
//console.log(paths);

function input(event) {
    event.preventDefault();
    paths = [];
    let outputsHTML = '';
    let init = document.getElementById("initial").value;
    let product = document.getElementById("product").value;

    if (init.length === 0 || product.length === 0) {
        document.getElementById("output").innerHTML = "Please input both an initial and product compound!";
        return;
    }

    if (!graph.doesExist(init) || !graph.doesExist(product)) {
        document.getElementById("output").innerHTML = "Compound doesn't exist!";
        return;
    }

    find_paths(init, product);

    if (paths.length === 0) {
        document.getElementById("output").innerHTML = "No pathways found!";
        return;
    }
    
    let numPaths = 1;
    paths.forEach((path) => {
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