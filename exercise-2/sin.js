function calculateResult(x, y, z) {
    let sumXY = x + y;
    let sumProductYZ = sumXY * z;
    let finalResult = Math.sin(sumProductYZ);

    return finalResult;
};

console.log(calculateResult(2, 6, 12));