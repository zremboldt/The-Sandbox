// There's a road in Meadowfield that connects Alice's House and Bob's House.
// There's a road in Meadowfield that connects Alice's House and Cabin.
// etc.
const roads = [
  "Alice's House-Bob's House",   
  "Alice's House-Cabin",
  "Alice's House-Post Office",   
  "Bob's House-Town Hall",
  "Daria's House-Ernie's House", 
  "Daria's House-Town Hall",
  "Ernie's House-Grete's House", 
  "Grete's House-Farm",
  "Grete's House-Shop",          
  "Marketplace-Farm",
  "Marketplace-Post Office",     
  "Marketplace-Shop",
  "Marketplace-Town Hall",       
  "Shop-Town Hall"
];

// Let’s convert the list of roads to a data structure that, for each place, tells us what can be reached from there.
function buildGraph(edges) {
  let graph = {};

  // If this key doesn't yet exist in graph then create it and give it an array containing the current "to" value
  // but if there is already an array started, just push the next "to" item into it.
  function addEdge(from, to) {
    if (!graph[from]) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }

  for (let [from, to] of edges.map(road => road.split('-'))) {
    addEdge(from, to);
    addEdge(to, from);
  }

  return graph;
}

const roadGraph = buildGraph(roads);
console.log(roadGraph)

// class VillageState {
//   constructor(place, parcels) {
//     this.place = place;
//     this.parcels = parcels;
//   }

//   move(destination) {
//     if (!roadGraph[this.place])
//   }
// }