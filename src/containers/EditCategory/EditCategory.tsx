import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectOneCategory, selectUpdateLoading} from "../../features/financeTracker/financeTrackerSlice";
import {Category} from "../../types";
import {fetchOneCategory, updateCategory} from "../../features/financeTracker/financeTrackerThunks";
import CategoryForm from "../../components/CategoryForm/CategoryForm";

const EditCategory = () => {
  const {id} = useParams() as { id: string };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const updateLoading = useAppSelector(selectUpdateLoading);
  const oneCategory = useAppSelector(selectOneCategory);

  useEffect(() => {
    dispatch(fetchOneCategory(id))
  }, [dispatch, id]);

  const onSubmit = async (category: Category) => {
    await dispatch(updateCategory({id, category}));
    navigate('/categories');
  };


  return (<>{oneCategory && <CategoryForm onSubmit={onSubmit} loading={updateLoading} editingCategory={oneCategory}/>}</>);
};

export default EditCategory;