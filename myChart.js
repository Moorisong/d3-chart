
  const content_width = 500;
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
        "key": "CPU1",
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
          "key": "CPU2",
          "values": [{"toolTip":"어쩌고저쩌고"}],
          "accValue": 76,
          "accValues": {
              "sys": 6,
              "user": 15,
              "nice": 22,
              "wait": 33
          },
      },
      {
        "key": "CPU3",
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
          "key": "EGOV154",
          "values": [{"toolTip":"어쩌고저쩌고"}],
          "accValue": 88,
          "accValues": {
              "sys": 8,
              "user": 36,
              "nice": 26,
              "wait": 18
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
    .attr('class', 'chart')
    .attr('width', chart_width)
    .attr('height', chart_height);

  const axisAreaX =_svg.append('g')
    .attr('transform', `translate(${padding_left + 30},${chart_height-(padding_bottom+20)})`);

  const axisAreaY = _svg.append('g')
    .attr('transform', `translate(${padding_left + 30},${padding_top+20})`);

  const valueTextArea =_svg.append('g').selectAll('text').data(myData).enter().append('text');
    valueTextArea.attr('transform', (d,i) => `translate(${(padding_left+70)*(i+1)},${content_height-(chart_height+d.accValue)+95})`)
    .text((d)=>d.accValue)
    .attr('font-size','8px');

    init();

  function init(){
      paintXAxis();
      paintYAxis();
      paintVerticalBar(myData);
      textStyle();
      pathStyle();
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
      path_x.attr('fill','none').attr('stroke', 'black').attr('stroke-width', 0.5);

      const path_y = axisAreaY.selectAll('path');
      path_y.attr('fill','none').attr('stroke', 'black').attr('stroke-width',0.5);
  }

  function paintXAxis(){

    const xAxisData = myData.map((d)=>{
        let arr = [];
        arr.push(d.key);
        return arr;
    });

    const xScale = d3.scale.ordinal()
      .domain(xAxisData)
      .rangeRoundBands([0,((myData.length * 80)+(myData.length * 10))]);

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
        .ticks(4);

    axisAreaY.attr('class', 'y-axis')
    .call(yAxis);
    }

  function paintVerticalBar(inputData) {

      for(let i=0; i<15; i++) {
          whiteLineSvgArea.append('path')
              .attr('transform', `translate(${padding_left + 37},${chart_height - (padding_bottom + (20 + (i * 7.2)))})`)
              .attr('fill', 'none')
              .attr('stroke', 'white')
              .attr('stroke-width', '1.8')
              .attr('d', 'M0,6V0H360V6');
      }

    const barBase = svg.selectAll('rect').data(inputData);
      barBase.data(inputData).enter().append('g')
      .attr('class', (d, i)=> `base ${d.key}`)
      .attr('transform', (d,i) => `translate(${(i)*90},0)`);

      const eachBar = d3.selectAll('.base');
      eachBar.append('g')
      .attr('class', (d,i) => `bars bar${i+1}`)
      .attr('width', barWidth)
      .attr('height', '100px')
      .attr('fill', 'white');

      const sys = d3.selectAll('.bars').append('rect');
      sys.attr('class','sys')
      .attr('x', 100)
      .attr('y', (d) => 100 - d.accValues.sys)
      .attr('width', barWidth)
      .attr('height', (d)=> d.accValues.sys)
      .transition()
      .attr('fill', '#E55D5B');

      const user = d3.selectAll('.bars').append('rect')
      user.attr('class','user')
      .attr('x', 100)
      .attr('y', (d) => 100 - (d.accValues.sys+ d.accValues.user))
      .attr('width', barWidth)
      .attr('height', (d)=> d.accValues.user)
      .transition()
      .attr('fill', '#5D6AB1');

      const nice = d3.selectAll('.bars').append('rect')
      nice.attr('class','nice')
      .attr('x', 100)
      .attr('y', (d) => 100 - (d.accValues.sys + d.accValues.user + d.accValues.nice))
      .attr('width', barWidth)
      .attr('height', (d)=> d.accValues.nice)
      .transition()
      .attr('fill', '#8DC759');

      const wait = d3.selectAll('.bars').append('rect')
      wait.attr('class','wait')
      .attr('x', 100)
      .attr('y', (d) => 100 - (d.accValues.sys + d.accValues.user + d.accValues.nice + d.accValues.wait))
      .attr('width', barWidth)
      .attr('height', (d)=> d.accValues.wait)
      .transition()
      .attr('fill', '#6BCBDB');
  }
