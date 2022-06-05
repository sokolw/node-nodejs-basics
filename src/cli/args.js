export const parseArgs = () => {
  const resultString = process.argv
      .slice(2)
      .reduce((previousValue, currentValue, index, array) => {
        if (index % 2 === 0) {
          previousValue += currentValue.replace(/-/gi, '');
        } else {
          previousValue += ` is ${currentValue.replace(/-/gi, '')}`;
          previousValue += index < array.length - 1 ? ', ' : '';
        }
        return previousValue;
      }, '');

  console.log(resultString);
};

// call function for test
parseArgs();