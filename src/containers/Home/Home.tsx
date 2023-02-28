import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchAllTransactions, removeTransaction} from "../../features/financeTracker/financeTrackerThunks";
import {
  selectFetchLoading,
  selectRemoveLoading,
  selectTransactions
} from "../../features/financeTracker/financeTrackerSlice";
import TransactionCard from "../../components/TransactionCard/TransactionCard";
import {Grid} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const Home = () => {
  const dispatch = useAppDispatch();
  const transactionsState = useAppSelector(selectTransactions);
  const fetchLoading = useAppSelector(selectFetchLoading);
  const removeLoading = useAppSelector(selectRemoveLoading)

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