init();

function init() {
  var selector = d3.select("#selDataset");

  d3.csv('cleaned_merged_data.csv').then(data => {
    data = data.slice(0,200);
    
    console.log(data);

    var sampleSeller = data.forEach(val => {
      d3.select('select').append('option').text(val.seller_name);
    });


  buildCharts(sampleSeller[0]);
  buildBubble(sampleSeller[0]);

})
}

function optionChanged(newSeller) {
  buildCharts(newSeller);
  buildBubble(newSeller);
 // buildGauge(newLoan);
};


function buildCharts(sampleSeller) {

  d3.csv('cleaned_merged_data.csv').then(data => {
    data = data.slice(0,200);
  
    console.log(data);

    var barData = [
      {
        x: ['TX',
        'NC',
        'IL',
        'TX',
        'IN',
        'UT'
        ],
        y: [307000,
        256000,
        248000,
        264000,
        174000,
        204000
        ],
        type: 'bar',
        //orientation: 'h'
      }
    ];

    var barLayout = {
      title: 'Interest Rate Based on Credit Score',
      margin: {t:30}
    };

    Plotly.newPlot('bar',barData,barLayout);
  })};



function buildBubble(sampleSeller) {


      d3.csv('cleaned_merged_data.csv').then(data => {
        data = data.slice(0,200);

        console.log(data);
        
        var bubbleData = [
           {
            x: ['TX',
            'NC',
            'IL',
            'TX',
            'IN',
            'UT'
            ],
            y: [307000,
            256000,
            248000,
            264000,
            174000,
            204000
            ],
             text: data.seller_name,
             mode: 'markers',
             marker: {
             size: ['44',
             '41',
             '40',
             '45',
             '37',
             '42'
             ],
             color: ['722',
             '728',
             '730',
             '710',
             '747',
             '717'
             ],
             colorScale: 'Earth'
                     }
           }
      ];

       var bubbleLayout = {
         title: 'Loan Determiners',
         hovermode: 'closest',
         xaxis: {title: 'Loan Description'},
         margin: {t:30}
       };

       Plotly.newPlot('bubble',bubbleData, bubbleLayout);

     })};


// seller_name: "OTHER"
// product_type: "FRM"
// property_state: "TX"
// property_type: "PU"
// borrower_credit_score_at_origination: "722"
// current_loan_delinquency_status: "0"
// number_of_borrowers: "1"
// original_interest_rate: "5"
// original_upb: "307000"
    
//References: http://quabr.com/53211506/calculating-adjusting-the-needle-in-gauge-chart-plotly-js
//https://com2m.de/blog/technology/gauge-charts-with-plotly/
//https://plotly.com/javascript/gauge-charts/

// function buildGauge(sample){
//   d3.json("cleaned_aq.json").then(data => {
//     var metadata = data.metadata;
//     var washMetadata = metadata.filter(washObj => washObj.id == sample);
//     var wFreq = washMetadata[0].wfreq;
//     console.log(wFreq);
        
//     // Washing frequency per week per participant
//     var level = wFreq * 20;

//     // Trig to calc meter point
//     var degrees = 180 - level,
//         radius = .5;
//     var radians = degrees * Math.PI / 180;
//     var x = radius * Math.cos(radians);
//     var y = radius * Math.sin(radians);
//     var path1 = (degrees < 45 || degrees > 135) ? 'M -0.0 -0.025 L 0.0 0.025 L ' : 'M -0.025 -0.0 L 0.025 0.0 L ';
    
//     // Path: may  have to change to create a better triangle
//     var mainPath = path1,
//         pathX = String(x),
//         space = ' ',
//         pathY = String(y),
//         pathEnd = ' Z';
//     var path = mainPath.concat(pathX,space,pathY,pathEnd);

//     var gaugeData = [{ type: 'scatter',
//       x: [0], y:[0],
//         marker: {size: 24, color:'850000'},
//         showlegend: false,
//         name:'times per week',
//         text: wFreq,
//         hoverinfo: 'text+name'},
//       { values: [81/9,81/9,81/9,81/9,81/9,81/9,81/9,81/9,81/9,81],
//       rotation: 90,
//       text: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9', ''],
//       textinfo: 'text',
//       textposition:'inside',
//       direction: 'clockwise',
//       marker: {
//         colors:['#fcf2fa',
//         '#fae6f5',
//         '#f7d9f0',
//         '#f5cceb',
//         '#f2bfe6',
//         '#f0b2e0',
//        '#eda6db',
//         '#eb99d6',
//         '#e88cd1',
//         '#ffffff'
//       ]                   
//       },
      
//       labels: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9', ''],
//       hoverinfo: 'label',
//       hole: .5,
//       type: 'pie',
//       showlegend: false
//     }];

//     var dataLayout = {
//       title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs Per Week", font: { size: 20 } },
//       shapes:[{
//           type: 'path',
//           path: path,
//           fillcolor: '850000',
//           line: {
//             color: '850000'
//           }
//         }],
//       height: 500,
//       width: 500,
//       xaxis: {zeroline:false, showticklabels:false,
//                 showgrid: false, range: [-1, 1]},
//       yaxis: {zeroline:false, showticklabels:false,
//                 showgrid: false, range: [-1, 1]}
//     };
    
//     Plotly.newPlot('gauge', gaugeData, dataLayout);
//   })
// };
