
let selYears = d3.select("#selYears")

function init() {
    let html = "<option>all-time</option>"
    for (let i = 2023; i >= 1996; i--) {
        html += `<option>${i}</option>`
    }

    selYears.html(html)
    plotTop10('all-time')
}

function plotTop10(year) {
    d3.json(`http://localhost:5000/api/top10/${year}`)
        .then(function(apiData) {
            console.log(apiData)
            let trace = {
                x: apiData.map(company => `<a href="company.html?company_id=${company.company_id}">${company.company}</a>`),
                y: apiData.map(company => company.revenue),
                type: 'bar'
            }

            let layout = {
                title: `Top 10: ${year}`
            }

            Plotly.newPlot('plot', [trace], layout)
        })
}

selYears.on('change', function() {
    plotTop10(selYears.property('value'))
})


init()