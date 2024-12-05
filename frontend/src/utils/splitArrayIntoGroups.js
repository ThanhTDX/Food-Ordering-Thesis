// Function to split the array into groups of specified size
const splitArrayIntoGroups = (array, groupSize) => {
  const groups = [];
  for (let i = 0; i < array.length; i += groupSize) {
    groups.push(array.slice(i, i + groupSize));
  }
  return groups;
};

export default splitArrayIntoGroups;