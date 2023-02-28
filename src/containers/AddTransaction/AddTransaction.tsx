import React, {useEffect} from 'react';
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import {createTransaction, fetchCategories} from "../../features/financeTracker/financeTrackerThunks";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useNavigate} from "react-router-dom";
import {selectCreateLoading} from "../../features/financeTracker/financeTrackerSlice";
import {TransactionPost} from "../../types";

const AddTransaction = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const createLoading = useAppSelector(selectCreateLoading);

  const onSubmit = async (transaction: TransactionPost) => {
    await dispatch(createTransaction(transaction));
    navigate('/');
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  return (<TransactionForm onSubmit={onSubmit} loading={createLoading}/>);
};

export default AddTransaction;