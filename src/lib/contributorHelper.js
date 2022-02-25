// Lifted from:
// https://stackoverflow.com/questions/34954347/using-reduce-to-build-a-filter-function-in-javascript
function reduce(array, combine, start) {
  var current = start;
  for (var i = 0; i < array.length; i++)
    current = combine(current, array[i]);
  return current;
}

function filterForHumans(contributors, test) {
  return reduce(contributors, function(arr, el) {
    // Only add to the array if the test function is true
    if (!el.login.includes("[bot]")) { // filter deependabot
      arr.push(el.login);
    }

    // Always return the same array so you can keep filling it
    return arr;
  }, []); // Give it an empty array to start with
}

async function fetchContributorNames (contributors) {
  return filterForHumans(contributors);
}

export default fetchContributorNames;
