const oddNumbersUpToN = (n) => {
    if (typeof n !== 'number' || n <= !Number.isInteger(n)) {
        return 'Please enter a positive integer.';
    }

    const odd = [];

    for (let i = 1; i <= n; i+=2) {
        odd.push(i);
    }

    return odd;
};

const result = oddNumbersUpToN(9);
console.log(result);