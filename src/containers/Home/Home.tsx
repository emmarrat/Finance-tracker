import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchAllTransactions, removeTransaction} from "../../features/financeTracker/financeTrackerThunks";
import {
  selectFetchLoading,
  selectRemoveLoading, selectTotal,
  selectTransactions
} from "../../features/financeTracker/financeTrackerSlice";
import TransactionCard from "../../components/TransactionCard/TransactionCard";
import {Box, Grid, Typography} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const Home = () => {
  const dispatch = useAppDispatch();
  const transactionsState = useAppSelector(selectTransactions);
  const fetchLoading = useAppSelector(selectFetchLoading);
  const removeLoading = useAppSelector(selectRemoveLoading)
  const total = useAppSelector(selectTotal);


  useEffect(() => {
    dispatch(fetchAllTransactions());
  }, [dispatch]);

  const deleteTransaction = async (id: string) => {
    if (window.confirm('Do you really want to remove selected transaction?')) {
      await dispatch(removeTransaction(id));
      await dispatch(fetchAllTransactions());
    }
  };

  return (
    <>
      <Box maxWidth="200px" padding={2}  borderRadius={2} boxShadow={2} mb={5}>
        <Typography component="div" variant="subtitle1">
          Total: <Typography component="span" variant={"subtitle1"} color={total < 0 ? "red" : "green"}>{total} $USD</Typography>
        </Typography>
      </Box>
      <Grid container flexDirection="column" alignItems="center">
        {fetchLoading ? <CircularProgress/> : transactionsState.map(transaction => (
          <TransactionCard
            key={transaction.id}
            transaction={transaction}
            onClick={() => deleteTransaction(transaction.id)}
            loading={removeLoading}
          />
        ))}
      </Grid>
    </>
  );
};

export default Home;