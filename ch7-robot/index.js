const roads = [
  "Alice's House-Bob's House", "Alice's House-Cabin",
  "Alice's House-Post Office", "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop", "Marketplace-Farm",
  "Marketplace-Post Office", "Marketplace-Shop",
  "Marketplace-Town Hall", "Shop-Town Hall"
];

function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (let [from, to] of edges.map(r => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

const roadGraph = buildGraph(roads);

class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels.map(p => {
        if (p.place != this.place) return p;
        return { place: destination, address: p.address };
      }).filter(p => p.place != p.address);
      return new VillageState(destination, parcels);
    }
  }
}

// let first = new VillageState(
//   "Post Office",
//   [{ place: "Post Office", address: "Alice's House" }]
// );
// let next = first.move("Alice's House");

// console.log(next.place);
// // → Alice's House
// console.log(next.parcels);
// // → []
// console.log(first.place);
// // → Post Office

function runRobot(state, robot, memory) {
  for (let turn = 0; ; turn++) {
    if (state.parcels.length == 0) {
      // console.log(`Done in ${turn} turns`);
      return turn;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    // console.log(`Moved to ${action.direction}`);
  }
}

function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

function randomRobot(state) {
  return { direction: randomPick(roadGraph[state.place]) };
}

VillageState.random = function (parcelCount = 5) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph));
    let place;
    do {
      place = randomPick(Object.keys(roadGraph));
    } while (place == address);
    parcels.push({ place, address });
  }
  return new VillageState("Post Office", parcels);
};

// runRobot(VillageState.random(), randomRobot);


const mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];

function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return { direction: memory[0], memory: memory.slice(1) };
}

function findRoute(graph, from, to) {
  let work = [{ at: from, route: [] }];
  for (let i = 0; i < work.length; i++) {
    let { at, route } = work[i];
    for (let place of graph[at]) {
      if (place == to) return route.concat(place);
      if (!work.some(w => w.at == place)) {
        work.push({ at: place, route: route.concat(place) });
      }
    }
  }
}

function goalOrientedRobot({ place, parcels }, route) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      // console.log("Picking up parcel at " + parcel.place);
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      // console.log("Delivery parcel to " + parcel.address);
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return { direction: route[0], memory: route.slice(1) };
}

const compareRobots = (robot1, robot2, numTasks = 1000) => {
  let robot1Steps = 0;
  let robot2Steps = 0;

  for (let num = 0; num < numTasks; num++) {
    const task = VillageState.random();
    robot1Steps += runRobot(task, robot1, []);
    robot2Steps += runRobot(task, robot2, []);
  }

  const robot1Average = robot1Steps / numTasks;
  const robot2Average = robot2Steps / numTasks;

  console.log("Robot 1 Average: " + robot1Average);
  console.log("Robot 2 Average: " + robot2Average);
};

const andyRobot = ({ place, parcels }, route) => {
  if (route.length == 0) {
    let possibleRoutes = parcels.map(parcel => {
      if (place == parcel.place) {
        return { parcel, route: findRoute(roadGraph, place, parcel.address) };
      } else {
        return { parcel, route: findRoute(roadGraph, place, parcel.place) };
      }
    }).sort((a, b) => a.route.length - b.route.length);

    const closestRoute = possibleRoutes[0];
    // if (closestRoute.parcel.place == place) {
    //   console.log("Delivering parcel to " + closestRoute.parcel.address);
    // } else {
    //   console.log("Picking up parcel at " + closestRoute.parcel.place);
    // }

    return { direction: closestRoute.route[0], memory: closestRoute.route.slice(1) };
  } else {
    return { direction: route[0], memory: route.slice(1) };
  }
}

console.log("1 = Random; 2 = Route");
compareRobots(randomRobot, routeRobot);
console.log("1 = Route; 2 = Goal-Oriented");
compareRobots(routeRobot, goalOrientedRobot);
console.log("1 = Goal-Oriented; 2 = Andy");
compareRobots(goalOrientedRobot, andyRobot);

// runRobotAnimation(VillageState.random(), goalOrientedRobot, []);
// runRobotAnimation(VillageState.random(), andyRobot, []);
