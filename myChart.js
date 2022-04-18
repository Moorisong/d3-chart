
const content_width = 800;
const content_height = 220;
const padding_left = 20;
const padding_right = 20;
const padding_top = 20;
const padding_bottom = 20;
const chart_width = content_width - (padding_left + padding_right);
const chart_height = content_height - (padding_top + padding_bottom);
const barWidth = 70;
const myData =[
  {
      "key": "Val-01",
      "values": [{"toolTip":"어쩌고저쩌고"}],
      "accValue": 100,
      "accValues": {
          "sys": 30,
          "user": 40,
          "nice": 20,
          "wait": 10
    },
  },
    {
        "key": "Val-02",
        "values": [{"toolTip":"어쩌고저쩌고"}],
        "accValue": 35,
        "accValues": {
            "sys": 0,
            "user": 25,
            "nice": 0,
            "wait": 10
        },
    },
    {
      "key": "Val-03",
      "values": [{"toolTip":"어쩌고저쩌고"}],
      "accValue": 65,
      "accValues": {
          "sys": 10,
          "user": 15,
          "nice": 5,
          "wait": 35
      },
  },
    {
        "key": "Val-04",
        "values": [{"toolTip":"어쩌고저쩌고"}],
        "accValue": 33,
        "accValues": {
            "sys": 20,
            "user": 13,
            "nice": 0,
            "wait": 0
        },
    },
    {
        "key": "Val-05",
        "values": [{"toolTip":"어쩌고저쩌고"}],
        "accValue": 0,
        "accValues": {
            "sys": 0,
            "user": 0,
            "nice": 0,
            "wait": 0
        },
    }
  ];

const chartContent = document.querySelector(".contents");

const _svg = d3.select(chartContent).append("svg")
    .attr('class', 'chart')
    .attr('width', chart_width)
    .attr('height', chart_height);

const svg = _svg.append("g")
    .attr('transform', `translate(-40, ${padding_top+20})`);

const whiteLineSvgArea =_svg.append('g')
    .attr('class','white-line')
    .attr('width', chart_width)
    .attr('height', chart_height);

const backDashLineArea = _svg.append('g')
    .attr('class','dash-line')
    .attr('width', chart_width)
    .attr('height', chart_height);

  const axisAreaX =_svg.append('g')
  .attr('transform', `translate(${padding_left + 30},${chart_height-(padding_bottom+20)})`);

const axisAreaY = _svg.append('g')
  .attr('transform', `translate(${padding_left + 30},${padding_top+20})`);

const valueTextArea =_svg.append('g').attr('class','value-text').selectAll('text').data(myData).enter().append('text');

const colorArr = ['#E55D5B', '#5D6AB1', '#8DC759', '#6BCBDB'];


window.onload = init;

function init(){
    DrawLabel(myData, colorArr);
    paintXAxis(myData);
    paintYAxis();
    textStyle();
    paintVerticalBar(myData);
    topValueText();
    pathStyle();
    // test();
}

function topValueText() {
    valueTextArea.attr('transform', (d,i) => `translate(${(padding_left+70)*(i+1)},${content_height-(chart_height+d.accValue)+95})`)
        .text((d)=>d.accValue)
        .attr('font-size','8px')
        .transition().duration(2000).ease("sin-in-out");
}

const refreshNow = function (){
  return location.replace(location.href);
}

function test() {
    setInterval(refreshNow, 1000);
}

function DrawLabel(inputData, colorData) {

    const labelArea = d3.select('.right').append('svg')
        .attr('width', chart_width)
        .attr('class','label').attr('transform', `translate(450, 20)`);
    labelArea.selectAll('.label').data(colorData).enter().append('rect')
        .attr('width','10px')
        .attr('height','10px')
        .attr('x',(d,i)=> i*80)
        .attr('y',100)
        .attr('fill',(d)=> d);

    labelArea.selectAll('.label').data(inputData).enter().append('text')
        .data(['Label 01','Label 02','Label 03','Label 04'])
        .text((d)=>d)
        .attr('x',(d,i)=> (i*80)+13)
        .attr('y',108)
        .attr('font-size','9px')
        .attr('font-weight','bold');

}

function textStyle() {
    const text_x = axisAreaX.selectAll('text').attr('class', 'text-x');
    text_x.attr('fill', '#8B8B8B')
        .style('font-size', '13');

    const text_y = axisAreaY.selectAll('text').attr('class', 'text-y');
    text_y.style('font-size','10');
}

function pathStyle() {

    const path_x = axisAreaX.selectAll('path');
    path_x.attr('fill','none').attr('opacity', '0').attr('stroke-width', 0.5);

    const path_y = axisAreaY.selectAll('path');
    path_y.attr('fill','none').attr('stroke', 'black').attr('stroke-width',0.5);
}

function paintXAxis(inputData){

  const xAxisData = inputData.map((d)=>{
      let arr = [];
      arr.push(d.key);
      return arr;
  });

  const xScale = d3.scale.ordinal()
    .domain(xAxisData)
    .rangeRoundBands([0,((inputData.length * 80)+(inputData.length * 10))]);

  let xAxis = d3.svg.axis()
  .scale(xScale)
  .outerTickSize(0)
  .orient('bottom');

    axisAreaX.attr('class', 'x-axis')
    .call(xAxis);
}

  function paintYAxis(){
  const yScale = d3.scale.linear()
      .domain([0,100])
      .range([100,0]);

  let yAxis = d3.svg.axis()
      .scale(yScale)
      .orient('left')
      .outerTickSize(0)
      .ticks(2);

  axisAreaY.attr('class', 'y-axis')
  .call(yAxis);
  }

function paintVerticalBar(inputData) {
    for(let i=0; i<23; i++) {
        whiteLineSvgArea.append('path')
            .attr('transform', `translate(${padding_left},${(i*5)+30})`)
            .attr('fill', 'none')
            .attr('stroke', 'white')
            .attr('stroke-width', '1.5')
            .attr('d', `M0,6V0H950V6`);
    }

    for(let i=1; i<4; i++) {
        backDashLineArea.append('path')
            .attr('transform', `translate(${padding_left + 30},${chart_height - (padding_bottom + (20 + (i * 50)))})`)
            .attr('fill', 'none')
            .attr('stroke', '#2D2D2D')
            .attr('stroke-width', '0.3')
            .attr("stroke-dasharray", "2px 5px")
            .attr('d', `M0,6V0H950V6`);
    }

    // X축 path 선 넣어주기
    backDashLineArea.append('path')
        .attr('transform', `translate(${padding_left + 30},${chart_height - (padding_bottom + (20))})`)
        .attr('fill', 'none')
        .attr('stroke', 'black')
        .attr('stroke-width',0.5)
        .attr('d', `M0,6V0H950V6`);

    const barBase = svg.selectAll('rect');
    barBase.data(inputData).enter().append('g')
    .attr('class', (d)=> `base ${d.key}`)
    .attr('transform', (d,i) => `translate(${(i)*90},0)`);

    const eachBar = d3.selectAll('.base');
    eachBar.append('g')
    .attr('class', (d,i) => `bars bar${i+1}`)
    .attr('width', barWidth)
    .attr('height', '100px');

    const sys = d3.selectAll('.bars').append('rect').attr('fill','white');
    sys.attr('class','sys')
    .attr('x', 100)
    .attr('y', (d) => 100 - d.accValues.sys)
    .attr('width', barWidth)
    .attr('height', (d)=> d.accValues.sys)
    .transition().duration(2000).ease("sin-in-out")
    .attr('fill', '#E55D5B');

    const user = d3.selectAll('.bars').append('rect').attr('fill','white');
    user.attr('class','user')
    .attr('x', 100)
    .attr('y', (d) => 100 - (d.accValues.sys+ d.accValues.user))
    .attr('width', barWidth)
    .attr('height', (d)=> d.accValues.user)
    .transition().duration(2000).ease("sin-in-out")
    .attr('fill', '#5D6AB1');

    const nice = d3.selectAll('.bars').append('rect').attr('fill','white');
    nice.attr('class','nice')
    .attr('x', 100)
    .attr('y', (d) => 100 - (d.accValues.sys + d.accValues.user + d.accValues.nice))
    .attr('width', barWidth)
    .attr('height', (d)=> d.accValues.nice)
    .transition().duration(2000).ease("sin-in-out")
    .attr('fill', '#8DC759');

    const wait = d3.selectAll('.bars').append('rect').attr('fill','white');
    wait.attr('class','wait')
    .attr('x', 100)
    .attr('y', (d) => 100 - (d.accValues.sys + d.accValues.user + d.accValues.nice + d.accValues.wait))
    .attr('width', barWidth)
    .attr('height', (d)=> d.accValues.wait)
    .transition().duration(2000).ease("sin-in-out")
    .attr('fill', '#6BCBDB');
}
