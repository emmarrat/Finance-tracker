import React, {useState} from 'react';
import {TransactionPost} from "../../types";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../app/hooks";
import {selectAllCategories} from "../../features/financeTracker/financeTrackerSlice";
import {Button, Grid, InputAdornment, MenuItem, TextField, Typography} from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

interface Props {
  onSubmit: (category: TransactionPost) => void;
  loading: boolean;
}

const TransactionForm: React.FC<Props> = ({onSubmit, loading}) => {
  const navigate = useNavigate();
  const categoriesState = useAppSelector(selectAllCategories);

  const [transaction, setTransaction] = useState({
    type: '',
    name: '',
    amount: '',
    createdAt: '',
  });

  const sortCategory = () => {
    return categoriesState.filter(category => {
      if (category.type === transaction.type) {
        return category.name;
      }
      return null;
    });
  };

  const sortedCategories = sortCategory();

  const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setTransaction(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let key: string = '';
    const id = categoriesState.find((category) => {
      if (transaction.name === category.name) {
        key = category.id;
      }
      return key;
    });

    const now = new Date();
    const createdAt = now.toISOString();

    if (id) {
      onSubmit({
        amount: parseFloat(transaction.amount),
        category: key,
        createdAt: createdAt ,
      });
    }
  };
  return (
    <>
      <Typography
        variant="h4"
        textAlign="center"
      >Add Transaction
      </Typography>
      <form
        autoComplete="off"
        onSubmit={onFormSubmit}
      >
        <Grid container flexDirection="row-reverse" mb={3}>
          <Button onClick={() => navigate('/')} type="button" variant="outlined" color="warning">Cancel</Button>
        </Grid>
        <Grid container flexDirection="column" alignItems="center" spacing={3}>
          <Grid item container justifyContent="center" >
            <TextField
              sx={{width: '70%'}}
              select
              label="Type"
              name="type"
              value={transaction.type}
              onChange={onChangeForm}
              required
              id="type"
            >
              <MenuItem value="" disabled>Select type</MenuItem>
              <MenuItem value="income">Income</MenuItem>
              <MenuItem value="expense">Expense</MenuItem>
            </TextField>
          </Grid>
            <Grid item container justifyContent="center" >
              <TextField
                sx={{width: '70%'}}
                select
                label="Category"
                name="name"
                value={transaction.name}
                onChange={onChangeForm}
                required
                id="name"
              >
                <MenuItem value="" disabled>Select category</MenuItem>
                {sortedCategories.map(category => (
                  <MenuItem key={category.id} value={category.name}>{category.name}</MenuItem>
                ))}
              </TextField>
            </Grid>
          <Grid item container justifyContent="center" >
            <TextField
              sx={{width: '70%'}}
              label="Enter amount of money"
              value={transaction.amount}
              onChange={onChangeForm}
              type="number"
              name="amount"
              id="amount"
              required
              InputProps={{
                startAdornment: <InputAdornment position="start">
                  <AttachMoneyIcon/>
                </InputAdornment>,
              }}
            />
          </Grid>
          <Grid item container justifyContent="center" >
            <Button sx={{width: '70%'}} type="submit" variant="outlined" color="success" disabled={loading}>
             Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default TransactionForm;