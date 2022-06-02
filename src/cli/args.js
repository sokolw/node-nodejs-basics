export const parseArgs = () => {
  const resultString = process.argv
      .slice(2)
      .reduce((previousValue, currentValue, index, array) => {
        if (index % 2 === 0) {
          previousValue += currentValue;
        } else {
          previousValue += ` is ${currentValue}`;
          previousValue += index < array.length - 1 ? ', ' : '';
        }
        return previousValue;
      }, '');

  console.log(resultString);
};

parseArgs();