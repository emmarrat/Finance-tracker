import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Category} from "../../types";
import {Button, Grid, MenuItem, TextField, Typography} from "@mui/material";
import {LoadingButton} from "@mui/lab";

interface Props {
  onSubmit: (category: Category) => void;
  loading: boolean;
  editingCategory?: Category;
}

const CategoryForm: React.FC<Props> = ({onSubmit, loading, editingCategory}) => {
  const navigate = useNavigate();

  const [category, setCategory] = useState<Category>(editingCategory ? editingCategory : {
    type: '',
    name: '',
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setCategory(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(category);
  };

  return (
    <>
      <Typography variant="h4" textAlign="center" mb={5}> {editingCategory ? 'Edit selected category' : 'Please add new finance category'}</Typography>
      <form
        autoComplete="off"
        onSubmit={onFormSubmit}
      >
        <Grid container flexDirection="row-reverse" mb={3}>
          <Button variant="contained" type="button" color="warning" onClick={() => navigate('/categories')}>Cancel</Button>
        </Grid>
        <Grid container flexDirection="column" alignItems="center" spacing={3} px={10}>
          <Grid item container justifyContent="center" >
            <TextField
              sx={{width: '70%'}}
              select
              label="Select type"
              name="type"
              value={category.type}
              onChange={onInputChange}
              required
              id="type"
            >
              <MenuItem value="income">Income</MenuItem>
              <MenuItem value="expense">Expense</MenuItem>
            </TextField>
          </Grid>
          <Grid item container justifyContent="center" >
            <TextField
              sx={{width: '70%'}}
              label="Category name"
              value={category.name}
              onChange={onInputChange}
              name="name"
              id="name"
              type="text"
              required
            />
          </Grid>
          <Grid item container justifyContent="center" >
            <LoadingButton
              sx={{width: '70%'}}
              type="submit"
              variant="contained"
              color="success"
              disabled={loading}
              loading={loading}
            >
              {editingCategory ? 'Update' : 'Add'}
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default CategoryForm;