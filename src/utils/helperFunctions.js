//to create an arry based on the dynamic input(row and colums)
export const createArrayUpTo = (n) => {
  let array = [];
  for (let i = 1; i <= n; i++) {
    array.push(i);
  }
  return array;
};
