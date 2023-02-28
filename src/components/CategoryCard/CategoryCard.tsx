import React from 'react';
import {CategoryApi} from "../../types";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import {Button, CardActions, Grid, styled, Typography} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Link } from '../../styledComponents';
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
    <>
      <Card  sx={{width: '80%', mb: 3}}>
        <Grid container display="flex"  justifyContent="space-between" alignItems="center" >
          <Grid item container justifyContent={{xs: 'center', md: 'space-between'}} alignItems="center" width="50%" xs={12} md={6}>
            <CardContent sx={{width: '100%', display: 'flex', justifyContent: 'space-between'}} >
              <Typography sx={{flexGrow: 2, fontSize: 18, mb: 0}} gutterBottom>
                {category.name}
              </Typography>
              <CategoryType variant="subtitle1" textAlign="left" p={0}>
                {category.type}
              </CategoryType>
            </CardContent>
          </Grid>
          <Grid item container xs={12} md={6}>
            <CardActions  sx={{width: '100%', padding: 2, display: 'flex', justifyContent: 'end', paddingBottom: '24px'}}>
              <Button
                variant="outlined"
                color="primary"
              >
                <Link to={"/categories/edit-category/" + category.id}>Edit</Link>
                <ModeEditIcon sx={{ml: 2}}/>
              </Button>
                <Button
                  variant="outlined"
                  color="error"
                  disabled={loading ? loading === category.id : false}
                  onClick={onClick}
                >
                  Delete
                  <DeleteOutlineOutlinedIcon sx={{ml: 2}}/>
                </Button>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default CategoryCard;