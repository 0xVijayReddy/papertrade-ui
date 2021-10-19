import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';


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
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'symbol', numeric: false, disablePadding: true, label:"Symbol"},
  { id: 'side', numeric: true, disablePadding: false, label: 'Side' },
  { id: 'avgPrice', numeric: true, disablePadding: false, label: 'Average Price' },
  { id: 'pnl', numeric: true, disablePadding: false, label: 'P/L' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          {props.title}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Square Off">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('side');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props.data.map((n) => n.symbol);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.data.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} title={props.title}/>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size= 'small' 
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={props.data.length}
            />
            <TableBody>
              {stableSort(props.data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.symbol);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.symbol)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.symbol}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">{row.symbol}</TableCell>
                      <TableCell align="right">{row.side}</TableCell>
                      <TableCell align="right">{row.avgPrice}</TableCell>
                      <TableCell align="right">{row.pnl}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height:33 *emptyRows}}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5,10]}
          component="div"
          count={props.data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      
    </div>
  );
}



// import * as React from 'react';
// import PropTypes from 'prop-types';
// import IconButton from '@material-ui/core/IconButton';
// import TextField from '@material-ui/core/TextField';
// import {
//   DataGrid,
//   GridToolbarDensitySelector,
//   GridToolbarFilterButton,
// } from '@mui/x-data-grid';
// import ClearIcon from '@material-ui/icons/Clear';
// import SearchIcon from '@material-ui/icons/Search';
// import { createTheme } from '@material-ui/core/styles';
// import { makeStyles } from '@material-ui/styles';

// function escapeRegExp(value) {
//   return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
// }

// const defaultTheme = createTheme();
// const useStyles = makeStyles(
//   (theme) => ({
//     root: {
//       padding: theme.spacing(0.5, 0.5, 0),
//       justifyContent: 'space-between',
//       display: 'flex',
//       alignItems: 'flex-start',
//       flexWrap: 'wrap',
//     },
//     textField: {
//       [theme.breakpoints.down('xs')]: {
//         width: '100%',
//       },
//       margin: theme.spacing(1, 0.5, 1.5),
//       '& .MuiSvgIcon-root': {
//         marginRight: theme.spacing(0.5),
//       },
//       '& .MuiInput-underline:before': {
//         borderBottom: `1px solid ${theme.palette.divider}`,
//       },
//     },
//   }),
//   { defaultTheme },
// );

// function QuickSearchToolbar(props) {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <div>
//         <GridToolbarFilterButton />
//         <GridToolbarDensitySelector />
//       </div>
//       <TextField
//         variant="standard"
//         value={props.value}
//         onChange={props.onChange}
//         placeholder="Search…"
//         className={classes.textField}
//         InputProps={{
//           startAdornment: <SearchIcon fontSize="small" />,
//           endAdornment: (
//             <IconButton
//               title="Clear"
//               aria-label="Clear"
//               size="small"
//               style={{ visibility: props.value ? 'visible' : 'hidden' }}
//               onClick={props.clearSearch}
//             >
//               <ClearIcon fontSize="small" />
//             </IconButton>
//           ),
//         }}
//       />
//     </div>
//   );
// }

// QuickSearchToolbar.propTypes = {
//   clearSearch: PropTypes.func.isRequired,
//   onChange: PropTypes.func.isRequired,
//   value: PropTypes.string.isRequired,
// };

// export default function QuickFilteringGrid() {
//   const data = {
//     rows:[{id:1,name:"vijay",age:20},{id:2,name:"john",age:26}]
//   };

//   const [searchText, setSearchText] = React.useState('');
//   const [rows, setRows] = React.useState(data.rows);

//   const requestSearch = (searchValue) => {
//     setSearchText(searchValue);
//     const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
//     const filteredRows = data.rows.filter((row) => {
//       return Object.keys(row).some((field) => {
//         return searchRegex.test(row[field].toString());
//       });
//     });
//     setRows(filteredRows);
//   };

//   React.useEffect(() => {
//     setRows(data.rows);
//   }, [data.rows]);

//   return (
//     <div style={{ height: 400, width: '100%' }}>
//       <DataGrid
//         components={{ Toolbar: QuickSearchToolbar }}
//         rows={rows}
//         columns={data.columns}
//         componentsProps={{
//           toolbar: {
//             value: searchText,
//             onChange: (event) => requestSearch(event.target.value),
//             clearSearch: () => requestSearch(''),
//           },
//         }}
//       />
//     </div>
//   );
// }
