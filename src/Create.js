import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function BasicTextFields() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Grid container spacing={2} style={{width:"60%"}}>
            <Grid item xs={12} sm={8}>
              <TextField
                name="strategyName"
                variant="outlined"
                required
                fullWidth
                id="strategyName"
                label="Strategy Name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="symbol"
                variant="outlined"
                required
                fullWidth
                id="symbol"
                label="Symbol"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="token"
                label="Token"
                name="token"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="qunatity"
                variant="outlined"
                required
                fullWidth
                id="quantity"
                label="Quantity"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl  fullWidth variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">Lot Size</InputLabel>
                <Select
                  native
                  label="Lot Size"
                  inputProps={{
                    name: 'age',
                    id: 'outlined-age-native-simple',
                  }}
                >
                  <option  value={25}>25</option>
                  <option  value={75}>75</option>
                </Select>
              </FormControl>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button fullWidth variant="contained" color="primary">Add</Button>
          </Grid>
          
    </Grid>
    </form>
  );
}
