const centerTranslate = (x,y) => {
    return "translate(" + x/2 + "," + y/2 + ")"
}

const centerOfNode = (node) => {
    n = d3.select(node).node().getBoundingClientRect
    return {x: 0, y:0}
}

const dataset =
    [ { label: 'Abulia'    , count: 10 }
    , { label: 'Betelgeuse', count: 20 }
    , { label: 'Cantaloupe', count: 30 }
    , { label: 'Dijkstra'  , count: 40 }
    ]

const width  = d3.select("#d3-pie-chart").node()
    .parentNode
    .getBoundingClientRect()
    .width
const height = Math.max(width/3, 300)

const radius = 0.9*Math.min(width, height)/2

const color = "#a82c5d"
const transparency = d3.scaleLinear()
    .domain([0,40])

var pieCharts = d3.select("#d3-pie-chart")
    .attr("width", width)
    .attr("height", height)
    .append('g')
    .attr('transform', centerTranslate(width,height))

const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius)

const pie = d3.pie()
    .value((d) => d.count)
    .sort(null)

var path = pieCharts.selectAll("path")
    .data(pie(dataset))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', color)
    .attr('opacity', (d) => transparency(d.value))
