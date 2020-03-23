import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const SimpleTable = (props) => {
    const { selectedChartMaxValue, data, metric } = props;
    data.sort(function (a, b) {
        return Number(b[metric]) - Number(a[metric]);
    });

    let rows = []
    let metricValue = metric;
    if (metric === "ALL") metricValue = "population";
    for (let i = 0; i < selectedChartMaxValue; i++) {
        if (data[i]) {
            rows.push({ 
                countryCode: data[i].countryCode,
                continent: data[i].continent,
                countryName: data[i].countryName,
                [metric]: Number(data[i][metricValue])
            });
        }
    }
    
    let totalMetric = 0;
    rows.forEach((row) => {
        totalMetric += row[metric];
    });

    return (
        <TableContainer>
        <Table>
            <TableHead>
            <TableRow>
                <TableCell>continentName</TableCell>
                <TableCell>countryName</TableCell>
                <TableCell>{metric}</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map(row => (
                <TableRow key={row.countryCode}>
                    <TableCell>{row.continent}</TableCell>
                    <TableCell>{row.countryName}</TableCell>
                    <TableCell>{row[metric]}</TableCell>
                </TableRow>
            ))}
            <TableRow>
                <TableCell></TableCell>
                <TableCell>TOTAL</TableCell>
                <TableCell>{totalMetric}</TableCell>
            </TableRow>
            </TableBody>
        </Table>
        </TableContainer>
    );
}

export default SimpleTable;