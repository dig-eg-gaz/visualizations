// Create a string describing the translate property
// translate :: Num a => a -> a -> String
const translate = R.curry((x,y) => {
    return "translate(" + x + "," + y + ")"
})

const translateToCentroid = R.curry((offset,d) => {
    let p = arc.centroid(d)
    return translate(p[0]+offset[0],p[1]+offset[1])
})

const join = (x,y) => x + ' ' + y
const prettyPrintArray = (xs) => R.reduce(join,'[',xs) + ' ]'

// [{label:String, count:Int}]
const dataset =
    [ { category: 'Agents'     , count: 46, topicWords: ['agent']}
    , { category: 'Beverage'   , count: 7 , topicWords: ['beverage','whiskey','alcohol','wine']}
    , { category: 'Casino'     , count: 2 , topicWords: ['casino']}
    , { category: 'Hotel'      , count: 18, topicWords: ['hotel']}
    , { category: 'Manufacture', count: 16, topicWords: ['manufacture','machine','factory']}
    , { category: 'Steamers'   , count: 24, topicWords: ['steamer','line','ship']}
    , { category: 'Store'      , count: 10, topicWords: ['store','magasin']}
    ]

const dataSum = R.sum(R.map(R.prop('count'), dataset))


// Sort data based upon the count property in ascending order.
// sortData :: [a] -> [a]
const sortData = R.sortBy(R.prop('count'))


// Calculate properties for the Pie Chart
const width  = d3.select("#d3-pie-chart").node()
    .parentNode
    .getBoundingClientRect()
    .width
const height = Math.max(width/3, 256)        // Height of the pie chart
const radius = 0.8*Math.min(width, height)/2 // Width of the pie chart


// Bind pie chart SVG element and sets the
var chart = d3.select("#d3-pie-chart")
    .attr("width", width)
    .attr("height", height)
    .append('g')
    .attr('transform', translate(width/2,height/2))


// Set properties on the generator functions
const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius)

const pie = d3.pie()
    .value((d) => d.count)
    .sort(null)


// Used to calculate the color of each slice of the pie chart
const color = "#a82c5d"
const transparency = d3.scaleLinear()
    .domain([0,dataset.length])
    .range([0.2,1])


// Create the pie chart
// First create groups that can hold the path and text
let slices = chart.selectAll('path.pie-slice')
    .data(pie(sortData(dataset)))
    .enter()
    .append('path')
    .attr('class','pie-slice')
    .attr('fill', color)
    .attr('d', arc)
    .attr('opacity', (d,i) => transparency(i))


// Create the legend
let legend = d3.select('#d3-pie-chart')
    .append('g')
    .attr('class', 'legend')
    .attr('transform', translate(width/2+radius*1.3,height/2))

legend.append('text')
    .attr('class', 'legend__title')
    .attr('transform', translate(0,-height/8))

legend.append('text')
    .attr('class', 'legend__count')

legend.append('text')
    .attr('class', 'legend__topic-words')
    .attr('transform', translate(0,height/8))

legend.append('text')
    .attr('class', 'legend__percent')

const makeLegend = (d) => {
    legend.attr('class', 'legend legend--visible')
    legend.select('.legend__title').text(d.data.category)
    legend.select('.legend__count').text('Count: ' + d.data.count)
    legend.select('.legend__topic-words').text(prettyPrintArray(d.data.topicWords))
    legend.select('.legend__percent').text(Math.floor(100 * d.value / dataSum) + '%')
        .attr('transform', translateToCentroid([-radius*1.3,0],d))
        .attr('text-anchor','middle')
}

const hideLegend = (d) => {
    legend.attr('class', 'legend')
}

slices
    .on('mouseover', makeLegend)
    .on('mouseout' , hideLegend)
