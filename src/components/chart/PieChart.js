import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import _ from 'lodash';
class PieChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {}
        }
    }

    componentDidMount() {
        this.drawChart();
    }

    componentDidUpdate(prevProps) {
      if (!_.isEqual(prevProps, this.props)) {
        this.drawChart();
      }
    }

    /**
     * Create the array of objects for the data of the pie
     * @param {object} data 
     * @param {string} parameter
     * @param {integer} chartMaxValue
     */
    createDataArray(data, metric, chartMaxValue) {
        // First we sort the arrays with the first having the biggest values of the metric
        data.sort(function (a, b) {
          return Number(b[metric]) - Number(a[metric]);
        });
        
        let arrayData = [];
        for (let i = 0; i < chartMaxValue; i++) { // We calculate first the data for the first countries 
          if (data[i]) { // Check just in case we have surpassed the number of existing countries
            arrayData.push({ name: data[i].countryName, y: Number(data[i][metric])});
          }
        } 

        if (chartMaxValue < data.length) { // Control to check if the max value is beyond the number  of existing countries
          let sum = 0;
          for (let i = chartMaxValue; i < data.length; i++) { 
            sum += Number(data[i][metric])
          }
          arrayData.push({ name: "Other", y: sum}); // this is the last item which is the amount of the rest of the coutries
        } 
        
        return arrayData;
    }

    drawChart() {
        const { data, selectedMetric, selectedChartMaxValue } = this.props;
        const dataArray = this.createDataArray(data, selectedMetric, selectedChartMaxValue);
        // dataArray = 
        const options = {
            chart: {
              type: 'pie'
            },
            title: {
              text: selectedMetric
            },
            series: [
              {
                data: dataArray
              }
            ]
        };
        this.setState({ options });
    }

    render() {
        return(
            <div>
                <HighchartsReact highcharts={Highcharts} options={this.state.options} />
            </div>
        );
    }
}

export default PieChart;