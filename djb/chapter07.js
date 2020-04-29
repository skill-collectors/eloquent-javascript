/* The Robot */
function daveRobot({place, parcels}, route) {
  if (route.length == 0) {
    route = parcels.map(parcel => {
      if (parcel.place === place) {
        // This parcel is collected. Find route to it's drop off place
        return findRoute(roadGraph, place, parcel.address);
      } else {
        // This parcel is uncollected. Find route to it's pickup place
        return findRoute(roadGraph, place, parcel.place);
      }
    }).reduce((best, candidate) => {
      // Find the shortest route.
      if(best === null) {
        return candidate;
      } else {
        return candidate.length < best.length ? candidate : best;
      }
    }, null);
  }
  return {direction: route[0], memory: route.slice(1)};
}

function daveRobot2({place, parcels}, route) {
  if (route.length == 0) {
    route = parcels.map(parcel => {
      if (parcel.place === place) {
        // This parcel is collected. Find route to it's drop off place
        return { priority: 0, route: findRoute(roadGraph, place, parcel.address) };
      } else {
        // This parcel is uncollected. Find route to it's pickup place
        return { priority: 1, route: findRoute(roadGraph, place, parcel.place) };
      }
    }).reduce((best, candidate) => {
      // Find the shortest route.
      if(best === null) {
        return candidate;
      } else if(candidate.route.length === best.route.length) {
        // compare priority. Prefer pickups to deliveries.
        return candidate.priority > best.priority ? candidate : best;
      } else if(candidate.route.length < best.route.length) {
        return candidate;
      } else {
        return best;
      }
    }, null).route;
  }
  return {direction: route[0], memory: route.slice(1)};
}

const candidates = {
  randomRobot,
  routeRobot,
  goalOrientedRobot,
  daveRobot,
  daveRobot2,
};

const tests = [];
const results = [];
for(let i = 0; i < 100; i++) {
  tests.push(VillageState.random());
}

for(robot of Object.keys(candidates)) {
  console.log(`Testing ${robot}`);
  const robotResults = tests.map(test => runRobot(test, candidates[robot], []));
  const average = robotResults.reduce((prev, cur) => prev + cur) / robotResults.length;
  results.push(`${robot} finished in an average of ${average} turns.`);
}
console.log(results);

/* PGroup */
class PGroup {
  constructor(items) {
    this.items = items || [];
  }
  static empty =  new PGroup([]);
  
  static from(arr) {
    return new PGroup(arr);
  }
  
  has(x) {
    return this.items.includes(x);
  }
  
  add(x) {
    const newItems = [...this.items];
    if(!this.has(x)) {
      newItems.push(x);
    }
    return new PGroup(newItems);
  }
  
  delete(x) {
    return new PGroup(this.items.filter(item => item !== x));
  }
}

let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log(b.has("b"));
// → true
console.log(a.has("b"));
// → false
console.log(b.has("a"));
// → false
