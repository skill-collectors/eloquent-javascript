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

const candidates = {
  randomRobot,
  routeRobot,
  goalOrientedRobot,
  daveRobot
};

const results = [];
for(robot of Object.keys(candidates)) {
  console.log(`Testing ${robot}`);
  const robotResults = [];
  for(let i = 0; i < 100; i++) {
    robotResults.push(runRobot(VillageState.random(), candidates[robot], []));
  }
  const average = robotResults.reduce((prev, cur) => prev + cur) / robotResults.length;
  results.push(`${robot} finished in an average of ${average} turns.`);
}
console.log(results);
