import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const Filter = (props) => {
    const classes = useStyles();
    const menuItems = props.values.map((value) => {
        return <MenuItem key={value} value={value}>{value}</MenuItem>
    });
    return(
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">{props.label}</InputLabel>
            <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={props.value}
            onChange={props.handleChange}
            label={props.label}
            disabled={props.disabled}
            >
            {menuItems}
            </Select>
        </FormControl>
    );
}

export default Filter;