
// Seperate distances

function createProximityLevels(minProportion, maxProportion)
{
    let levels = [];
    let n = 9;
    for (let i = 0; i < n; i++)
    {
        levels.push(minProportion + i*(maxProportion - minProportion)/(n-1));
    }

    return levels;
}

function returnProximityLevel(areaProportion, levels){
    if(areaProportion<levels[0]) return levels.length+1;
    else if(areaProportion > levels[levels.length-1]) return 1;

    for (let i = 0; i < levels.length-1; i++)
    {
        if(areaProportion>=levels[i] && areaProportion<=levels[i+1]) return levels.length+1 - (i+2);
    }
}

const minProportion = 0.01;
const maxProportion = 0.25;
let areaProportion = 0.03;

let levels = createProximityLevels(minProportion, maxProportion);

console.log(levels);
console.log(returnProximityLevel(areaProportion, levels));