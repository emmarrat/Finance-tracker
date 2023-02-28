import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {
  selectAllCategories,
  selectFetchLoading,
  selectRemoveLoading
} from "../../features/financeTracker/financeTrackerSlice";
import {fetchCategories, removeCategory} from "../../features/financeTracker/financeTrackerThunks";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import {Button, Grid, Typography} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from '../../styledComponents';

const Categories = () => {
  const dispatch = useAppDispatch();
  const categoriesState = useAppSelector(selectAllCategories);
  const removeLoading = useAppSelector(selectRemoveLoading);
  const fetchLoading = useAppSelector(selectFetchLoading);

  const deleteCategory = async (id: string) => {
    if (window.confirm('Do you really want to remove selected category?')) {
      await dispatch(removeCategory(id));
      await dispatch(fetchCategories());
    }
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center" mb={4}>
        <Grid item>
          <Typography variant="h5" >Categories:</Typography>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="success">
            <Link to="/categories/add-category">Add Category</Link>
          </Button>
        </Grid>
      </Grid>
      <Grid container flexDirection="column" alignItems="center">
        {fetchLoading ? <CircularProgress/> : categoriesState.map(category => (
          <CategoryCard
            key={category.id}
            category={category}
            onClick={() => deleteCategory(category.id)}
            loading={removeLoading}
          />
        ))}
      </Grid>
    </>
  );
};

export default Categories;