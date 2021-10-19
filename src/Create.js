import React ,{useState}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Table from './Create/Table'
import { nanoid } from 'nanoid';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '90%',
    },
  },
}));

export default function Form() {
  const classes = useStyles();
  const [positions,setPositions]=useState([]);
  const [addPositionData,setAddPositionData]=useState({
    symbol:'',
    token:'',
    quantity:'25',
    lotSize:'',
  });
  const handleAddPositionChange = (event)=>{
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;
    console.log(addPositionData);
    const newFormData = {...addPositionData}
    newFormData[fieldName]=fieldValue;
    setAddPositionData(newFormData);
  }
  const handleAddButton = (event) =>{
    event.preventDefault();
    const newPosition={
      id:nanoid(),
      symbol:addPositionData.symbol,
      side:addPositionData.side,
      quantity:addPositionData.quantity,
    }
    const newPositions = [...positions,newPosition];
    setPositions(newPositions);

  }
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Grid container spacing={3} style={{width:"60%"}}>
            <Grid item xs={12} sm={8}>
              <TextField
                name="strategyName"
                variant="outlined"
                fullWidth
                id="strategyName"
                label="Strategy Name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="symbol"
                variant="outlined"
                fullWidth
                id="symbol"
                label="Symbol"
                onChange={handleAddPositionChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="token"
                label="Token"
                name="token"
                onChange={handleAddPositionChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="quantity"
                variant="outlined"
                fullWidth
                id="quantity"
                label="Quantity"
                onChange={handleAddPositionChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl  fullWidth variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-lot-native-simple">Lot Size</InputLabel>
                <Select
                  native
                  label="Lot Size"
                  name="lotSize"
                  id='outlined-lot-native-simple'
                  onChange={handleAddPositionChange}
                >
                  <option  value={25}>25</option>
                  <option  value={75}>75</option>
                </Select>
              </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button fullWidth variant="contained" color="primary" onClick={handleAddButton}>Add</Button>
          </Grid>   
    </Grid>
    <Table positions={positions}/>
    </form>
  );
}
