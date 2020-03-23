import React from 'react';
import Filter  from '../Filter';

const Settings = (props) => {
    return(
        <div>
            {<Filter
            label={"Continent"}
            value={props.selectedContinent}
            values={["ALL", ...props.continents]}
            handleChange={props.changeContinentSetting}
            disabled={props.isDisabled}
            />}
            <Filter
            label={"Metric"}
            value={props.selectedMetric}
            values={["ALL", "areaInSqKm", "population"]}
            handleChange={props.changeMetricSetting}
            disabled={props.isDisabled}
            />
            <Filter
            label={"Max results"}
            value={props.selectedChartMaxValue}
            values={[5, 10, 15, 20]}
            handleChange={props.changeChartMaxSetting}
            disabled={props.isDisabled}
            />
        </div>
    );
}

export default Settings;