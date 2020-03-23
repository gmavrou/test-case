import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

export default function EnhancedTable(props) {
    const { selectedChartMaxValue, data, metric } = props;
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState();
    const [selected, setSelected] = React.useState([]);

    data.sort(function (a, b) {
        return Number(b[metric]) - Number(a[metric]);
    });

    let rows = []
    let metricValue = metric;
    if (metric === "ALL") metricValue = "population"; // I didnt understand from the description so if the metric is "ALL" I set it to population
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
  
    const headCells = [
        { id: 'continent', numeric: true, disablePadding: false, label: 'CONTINENT' },
        { id: 'countryName', numeric: true, disablePadding: false, label: 'COUNTRYNAME' },
        { id: metric, numeric: true, disablePadding: false, label: metric.toUpperCase() },
    ];

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const createSortHandler = property => event => {
        handleRequestSort(event, property);
        };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
        );
        }

        setSelected(newSelected);
    };

    const isSelected = name => selected.indexOf(name) !== -1;

    return (
        <div>
        <Paper>
            <TableContainer>
            <Table
                aria-labelledby="tableTitle"
                size='medium'
                aria-label="enhanced table"
            >
                <TableHead>
                    <TableRow>
                        {headCells.map(headCell => (
                        <TableCell
                            key={headCell.id}
                            padding={headCell.disablePadding ? 'none' : 'default'}
                            sortDirection={orderBy === headCell.id ? order : false}
                            style={{fontWeight: "bold"}}
                        >
                            <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                            >
                            {headCell.label}
                            
                            </TableSortLabel>
                        </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                    .map((row) => {
                    const isItemSelected = isSelected(row.name);

                    return (
                        <TableRow
                        hover
                        onClick={event => handleClick(event, row.countryName)}
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.countryCode}
                        selected={isItemSelected}
                        >
                        <TableCell>{row.continent}</TableCell>
                        <TableCell>{row.countryName}</TableCell>
                        <TableCell align="right">{row[metric]}</TableCell>
                        </TableRow>
                    );
                    })}
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell style={{fontWeight: "bold"}}>TOTAL</TableCell>
                        <TableCell align="right">{totalMetric}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            </TableContainer>
        </Paper>
        </div>
    );
}
