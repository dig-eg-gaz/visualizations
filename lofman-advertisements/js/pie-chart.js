// Create a string describing the translate property
// translate :: Num a => a -> a -> String
const translate = R.curry((x,y) => {
    return "translate(" + x + "," + y + ")"
})


// [{label:String, count:Int}]
const dataset =
    [ { label: 'Agents'     , count: 46}
    , { label: 'Beverage'   , count: 7}
    , { label: 'Casino'     , count: 2}
    , { label: 'Hotel'      , count: 18}
    , { label: 'Manufacture', count: 16}
    , { label: 'Steamers'   , count: 24}
    , { label: 'Store'      , count: 10}
    ]


// Sort data based upon the count property in ascending order.
// sortData :: [a] -> [a]
const sortData = R.sortBy(R.prop('count'))


// Calculate properties for the Pie Chart
const width  = d3.select("#d3-pie-chart").node()
    .parentNode
    .getBoundingClientRect()
    .width
const height = Math.max(width/3, 256)        // Height of the pie chart
const radius = 0.9*Math.min(width, height)/2 // Width of the pie chart


// Bind pie chart SVG element and sets the
var pieCharts = d3.select("#d3-pie-chart")
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
var path = pieCharts.selectAll("path")
    .data(pie(sortData(dataset)))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', color)
    .attr('opacity', (d,i) => transparency(i))
