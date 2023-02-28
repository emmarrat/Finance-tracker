import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectOneTransaction, selectUpdateLoading} from "../../features/financeTracker/financeTrackerSlice";
import {
  fetchCategories,
  fetchOneTransaction,
  updateTransaction
} from "../../features/financeTracker/financeTrackerThunks";
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import {TransactionPost} from "../../types";

const EditTransaction = () => {
  const {id} = useParams() as { id: string };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const updateLoading = useAppSelector(selectUpdateLoading);
  const oneTransaction = useAppSelector(selectOneTransaction);

  useEffect(() => {
    dispatch(fetchOneTransaction(id))
    dispatch(fetchCategories());
  }, [dispatch, id]);

  const onSubmit = async (transaction: TransactionPost) => {
    await dispatch(updateTransaction({id, transaction}));
    navigate('/');
  }

  const editingTransaction = oneTransaction && {
    ...oneTransaction,
    amount: oneTransaction.amount.toString(),
  };

  return (<>{editingTransaction && <TransactionForm onSubmit={onSubmit} loading={updateLoading} editingTransaction={editingTransaction}/>}</>);
};

export default EditTransaction;