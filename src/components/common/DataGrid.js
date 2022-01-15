import React from 'react'
import {
    DataGrid,
    GridColDef,
    GridApi,
    GridCellValue,
  } from "@material-ui/data-grid";
  import PropTypes from "prop-types";
  
  import TextField from "@material-ui/core/TextField";
  import { makeStyles } from "@material-ui/core/styles";
  import ClearIcon from "@material-ui/icons/Clear";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import { createTheme } from "@material-ui/core/styles";
const defaultTheme = createTheme();
  
  const useStyles = makeStyles(
    (theme) => ({
      root: {
        padding: theme.spacing(0.5, 0.5, 0),
        justifyContent: "space-between",
        display: "flex",
        alignContent: "center",
        flexWrap: "wrap",
        marginLeft:"75%"
        
        

      },
      root1:{
      "& .MuiDataGrid-columnHeaderWrapper":{
        backgroundColor:"rgb(1, 41, 113)",
        color:"white"
      },
      "& .MuiDataGrid-cell":{
        border:"0.2px ridge grey"
      }
    },
      textField: {
        [theme.breakpoints.down("xs")]: {
          width: "100%",
        },
        margin: theme.spacing(1, 0.5, 1.5),
        "& .MuiSvgIcon-root": {
          marginRight: theme.spacing(0.5),
        },
        "& .MuiInput-underline:before": {
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
        "& .MuiDataGrid-columnHeaderCheckbox": {
            display: "block",
            pointerEvents: "none",
            disabled: "disabled",
          }
          ,
          
      },
    }),
    { defaultTheme }
  );
  const Moment = require("moment");
function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

function QuickSearchToolbar(props) {
    const classes = useStyles();
    return (
      <div className={classes.root}>
        <TextField
          variant="outlined"
          value={props.value}
          onChange={props.onChange}
          placeholder="Search…"
          InputProps={{
            startAdornment: <SearchIcon fontSize="small" />,
            endAdornment: (
              <IconButton
                title="Clear"
                aria-label="Clear"
                size="small"
                style={{ visibility: props.value ? "visible" : "hidden" }}
                onClick={props.clearSearch}>
                <ClearIcon fontSize="small" />
              </IconButton>
            ),
          }}
        />
      </div>
    );
  }
  QuickSearchToolbar.propTypes = {
    clearSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  };
  
  
const DataGridTable = ({columns,rows}) => {
    const classes = useStyles();
    const [rows1, setRows1] = React.useState(rows);
    const [searchText, setSearchText] = React.useState("");
    const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
        const filteredRows = rows.filter((row) => {
          return Object.keys(row).some((field) => {
            return searchRegex.test((row[field])?row[field].toString():"");
          });
        });
        setRows1(filteredRows);
      };
      React.useEffect(() => {
        setRows1(rows);
      }, [rows]);
    
    return (
        <div style={{ height: 900, width: "100%" }}>
        <DataGrid
          className={classes.root1}
          components={{ Toolbar: QuickSearchToolbar }}
          rows={rows1}
          columns={columns}
          pageSize={10}
          sortingOrder={["desc", "asc"]}
          componentsProps={{
            toolbar: {
              value: searchText,
              onChange: (event) => requestSearch(event.target.value),
              clearSearch: () => requestSearch(""),
            },
          }}
          //             checkboxSelection

          // onSelectionModelChange={(selection) => {
          //   const newSelectionModel = selection.selectionModel;

          //   if (newSelectionModel.length > 1) {
          //     const selectionSet = new Set(selectionModel);
          //     const result = newSelectionModel.filter(
          //       (s) => !selectionSet.has(s)
          //     );

          //     setSelectionModel(result);
          //   } else {
          //     setSelectionModel(newSelectionModel);
          //   }
          // }}
          // selectionModel={selectionModel}
        />
        
       
        
      </div>
    )
}

export default DataGridTable

