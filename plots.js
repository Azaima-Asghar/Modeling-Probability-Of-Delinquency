var data

d3.csv('cleaned_merged_data.csv').then(d => {
  data = d.slice(0, 500)
  init();

})



function init() {
  var selector = d3.select("#selDataset");  
    console.log(data);

    unique_names = [...new Set(data.map(d => d.seller_name))]
      
    var sampleSeller = unique_names.forEach(val => {
      selector.append('option').text(val);
    });
  }

function optionChanged(newSeller) {
  buildCharts(newSeller);
  buildBubble(newSeller);
  buildDonut(newSeller);
};

function buildCharts(sampleSeller) {
  
    graphData = data.filter(d => d.seller_name === sampleSeller);

    let x = graphData.map(d => d.property_state) //location of the property
    let y = graphData.map(d => d.original_upb) //upb is the unpaid principal balance 

    var barData = [
      {
        x: x,
        y: y,
        type: 'bar',
      }
    ];

    var barLayout = {
      title: 'Remaining Principal Balance Based on Location',
      xaxis: {title: 'State'},
      yaxis: {title: 'Unpaid Principal Balance'},
      margin: {t:30}
        };

    Plotly.newPlot('bar',barData,barLayout);

};



function buildBubble(sampleSeller) {

      graphData = data.filter(d => d.seller_name === sampleSeller);

      let x = graphData.map(d => d.original_dir) // original debt to income ratio
      let y = graphData.map(d => d.borrower_credit_score_at_origination)
        
        var bubbleData = [
           {
            x: x,
            y: y,
             text: graphData.map(d => d.loan_purpose),
             mode: 'markers',
             marker: {
             size: graphData.map(d => d.original_dir), // original debt to income ratio
             color: graphData.map(d => d.original_upb), //original unpaid principal balance 
             colorScale: 'Earth',
             symbol: 'diamond'
                     }
           }
      ];

       var bubbleLayout = {
         title: 'Borrowers Financial Stance',
         hovermode: 'closest',
         xaxis: {title: 'Original Debt to Income Ratio'},
         yaxis: {title: 'Credit Score'},
         margin: {t:30}
       };

       Plotly.newPlot('bubble',bubbleData, bubbleLayout);

    };


    function buildDonut(sampleSeller) {

      graphData = data.filter(d => d.seller_name === sampleSeller);

      var donutData = [{
        values: graphData.map(d => d.original_interest_rate),
        labels: graphData.map(d => d.original_interest_rate),
        domain: {column: 0},
        name: 'Original Rate',
        hoverinfo: 'label+name',
        hole: .4,
        type: 'pie'
      },{
        values: graphData.map(d => d.current_interest_rate),
        labels:  graphData.map(d => d.current_interest_rate),
        textposition: 'inside',
        domain: {column: 1},
        name: 'Current Rate',
        hoverinfo: 'label+name',
        hole: .4,
        type: 'pie'
      }];
      
      var layout = {
        title: 'Comparison of Interest Rates',
        annotations: [
          {
            font: {
              size: 14
            },
            showarrow: false,
            text: 'Original<br>Interest<br>Rate',
            x: 0.16,
            y: 0.5
          },
          {
            font: {
              size: 14
            },
            showarrow: false,
            text: 'Current <br> Interest <br> Rate',
            x: 0.85,
            y: 0.5
          }
        ],
        height: 400,
        width: 600,
        showlegend: false,
        grid: {rows: 1, columns: 2}
      };
      
      Plotly.newPlot('donut', donutData, layout)};

