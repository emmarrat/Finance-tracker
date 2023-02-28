import React from 'react';
import {CategoryApi} from "../../types";
import {Button, Grid, styled, Typography} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {Link} from '../../styledComponents';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

interface Props {
  category: CategoryApi;
  loading: false | string;
  onClick: React.MouseEventHandler;
}


const CategoryCard: React.FC<Props> = ({category, onClick, loading}) => {
  const CategoryType = styled(Typography)({
    color: category.type === 'expense' ? '#eb2d38' : '#229c28',
  });
  return (
      <Grid
        container
        flexDirection={{xs: 'column', md: 'row'}}
        justifyContent="space-between"
        alignItems="center"
        boxShadow={2}
        padding={2}
        borderRadius={3}
        mb={1}
        width={{xs: '100%', md: '600px'}}
      >
        <Grid
          item container
          flexDirection={{xs: 'column', md: 'row'}}
          justifyContent={{xs: "center", md: "space-between"}}
          alignItems="center"
          width="50%"
          spacing={1} xs={12} md={6}
        >
          <Grid item>
            <Typography sx={{fontSize: 18, mb: 0}} gutterBottom>
              {category.name}
            </Typography>
          </Grid>
          <Grid item>
            <CategoryType variant="subtitle1" p={0}>
              {category.type}
            </CategoryType>
          </Grid>
        </Grid>
        <Grid
          item
          container
          justifyContent={{xs: "center", md: "end"}}
          alignItems="center"
          width={{xs: "100%", md: "50%"}}
          spacing={1}
          xs
        >
          <Grid item>
            <Button variant="outlined" color="primary">
              <Link to={"/categories/edit-category/" + category.id}>Edit</Link>
              <ModeEditIcon sx={{ml: 2}}/>
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="error"
              disabled={loading ? loading === category.id : false}
              onClick={onClick}
            >
              Delete
              <DeleteOutlineOutlinedIcon sx={{ml: 2}}/>
            </Button>
          </Grid>
        </Grid>
      </Grid>
  );
};

export default CategoryCard;