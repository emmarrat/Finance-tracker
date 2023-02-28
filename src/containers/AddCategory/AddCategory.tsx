import React from 'react';
import CategoryForm from "../../components/CategoryForm/CategoryForm";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectCreateLoading} from "../../features/financeTracker/financeTrackerSlice";
import {createCategory} from "../../features/financeTracker/financeTrackerThunks";
import {Category} from "../../types";

const AddCategory = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const createLoading = useAppSelector(selectCreateLoading);

  const onSubmit = async (category: Category) => {
    await dispatch(createCategory(category));
    navigate('/categories');
  }
  return (<CategoryForm onSubmit={onSubmit} loading={createLoading}/>);
};

export default AddCategory;