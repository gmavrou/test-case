import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { getFetchData } from '../store/actions';
import Settings from '../components/Settings';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import _ from 'lodash';
import PieChart from '../components/chart/PieChart';
import StatisticsTable from '../components/Table';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedContinent: "ALL",
      selectedMetric: "ALL",
      selectedChartMaxValue: 5,
      continents: [],
      isFilterDisabled: true,
      geoData: []
    }
    this.GoButtonClicked = this.GoButtonClicked.bind(this);
    this.changeContinentSetting = this.changeContinentSetting.bind(this);
    this.changeChartMaxSetting = this.changeChartMaxSetting.bind(this);
    this.changeMetricSetting = this.changeMetricSetting.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.geoData, this.props.geoData)) {
      this.setState({ geoData: this.props.geoData }, () => {
        this.getContinents(this.state.geoData);
      });
    }
  }

  changeContinentSetting(e) {
    const continent = e.target.value;
    const updatedData = this.changeContinentData(continent);
    this.setState({ selectedContinent: continent, geoData: updatedData });
  }

  changeContinentData(selectedContinent) { // we
    const { geoData } = this.props; 
    let updatedData = [];
    if (selectedContinent === "ALL") {
      updatedData = geoData;
    } else {
      geoData.forEach((singleData) => {
        if (singleData.continent === selectedContinent) updatedData.push(singleData);
      });
    } 

    return updatedData;
  }

  changeMetricSetting(e) {
    const metric = e.target.value;
    this.setState({ selectedMetric: metric });
  }

  changeChartMaxSetting(e) {
    const chartMaxValue = e.target.value;
    this.setState({ selectedChartMaxValue: chartMaxValue });
  }

  getContinents(data) {
    const duplicateValuesArray = data.map((d) => d.continent);
    const continents = [...new Set(duplicateValuesArray.sort())];
    this.setState({ continents });
  }

  GoButtonClicked() {
    this.props.getFetchData();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Hydrane ReactJS Frontend Dev CS</h1>
          <Button 
          variant="contained"   
          color="secondary"
          onClick={this.GoButtonClicked}>
            Go
          </Button>
        </header>
        <Settings
        changeContinentSetting={this.changeContinentSetting}
        changeChartMaxSetting={this.changeChartMaxSetting}
        changeMetricSetting={this.changeMetricSetting}
        continents={this.state.continents}
        selectedContinent={this.state.selectedContinent}
        selectedChartMaxValue={this.state.selectedChartMaxValue}
        selectedMetric={this.state.selectedMetric}
        isDisabled={this.state.continents.length === 0}
      />
      {this.props.isPending && <CircularProgress/> }
      {this.state.continents.length !== 0 &&
      <div>
        {this.state.selectedMetric === "ALL" ? 
        <div >
          <PieChart 
          selectedMetric="areaInSqKm"
          data={this.state.geoData}
          selectedChartMaxValue={this.state.selectedChartMaxValue}

          />
          <PieChart 
          selectedMetric="population"
          data={this.state.geoData}
          selectedChartMaxValue={this.state.selectedChartMaxValue}
          />
        </div> : 
        <PieChart 
          selectedMetric={this.state.selectedMetric}
          data={this.state.geoData}
          selectedChartMaxValue={this.state.selectedChartMaxValue}
        />} 
        <StatisticsTable 
          data={this.state.geoData}
          selectedChartMaxValue={this.state.selectedChartMaxValue}
          metric={this.state.selectedMetric}
        />
      </div>}
      
      </div>
    );
  }
  
}

const mapStateToProps = (state) => {
  return {
    geoData: state.geoData,
    isPending: state.isPending
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFetchData: () => dispatch(getFetchData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
