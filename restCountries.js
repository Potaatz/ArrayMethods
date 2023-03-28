const url = 'https://restcountries.com/v3.1/all'
var countries = [];
var asianCountries = []
var lowPopulation = []
var dollarUsingCountries = []
var NCF=[]
totalPopulation=0



const isAsian=(element) => {
    if(element.continents[0] === 'Asia')
        asianCountries.push(element.name.common)
}

const lowPopulationCountries = (element) => {
    if (element.population < 200000)
        lowPopulation.push(element.name.common)
}

function printNCF(element) {
    let indNCF = {
        'name': element.name.common,
        'capital': element.capital,
        'flag':element.flags.svg
    }
    NCF.push(indNCF)
    // console.log(element.name.common)
    // console.log(element.capital)
    // console.log(element.flags.svg)
}

function dollarCountries(element) {
    if(Object.keys(element.currencies)[0] === 'USD')
        dollarUsingCountries.push(element.name.common)
}


fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        asianCountries=data.filter(isAsian)
        lowPopulation=data.filter(lowPopulationCountries)
        data.forEach(country => printNCF(country))
        const sum1 = data.reduce((sum, element) => { if (element.population) { return sum + element.population } else { return sum } }, 0)
        totalPopulation += sum1
        console.log("The total population is:",totalPopulation)
        dollarUsingCountries = data.filter(dollarCountries)        
    })
        

console.log(" Asian Countries", asianCountries)
console.log("Low population countries", lowPopulation)
console.log("Dollar using Countries",dollarUsingCountries)
console.log("NCF:", NCF)


