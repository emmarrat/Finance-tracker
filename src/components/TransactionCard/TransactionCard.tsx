import React from 'react';
import {TransactionsApi} from "../../types";
import dayjs from 'dayjs';
import {Box, Button, Grid, styled, Typography} from "@mui/material";
import { Link } from '../../styledComponents';

interface Props {
  transaction: TransactionsApi;
  loading: false | string;
  onClick: React.MouseEventHandler;
}



const TransactionCard: React.FC<Props> = ({transaction, loading, onClick}) => {
  const TextMui = styled(Box)({
    color: transaction.type === 'expense' ? "red" : "green",
  });

  return (
    <>
      <Grid
        container
        flexDirection={{xs: 'column', md: 'row'}}
        justifyContent="space-between"
        alignItems="center"
        boxShadow={2}
        padding={3}
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
          spacing={2} xs={12} md={6}
        >
          <Grid item width={{xs: "100%", md:"30%"}} >
            <Typography variant="subtitle1" textAlign={{xs: "center", md: "start"}}>
              {dayjs(transaction.createdAt).format('DD.MM.YYYY HH:mm:ss')}
            </Typography>
          </Grid>
          <Grid
            item container
            justifyContent={{xs: "center", md: "space-between"}}
            alignItems="center"
            width={{xs: "100%", md:"70%"}}
            mb={{xs: "15px", md: "0"}}
          >
            <Typography variant="body1" ml={2}>{transaction.name}</Typography>
            <TextMui textAlign="center">
             <span> {transaction.type === 'expense' ? '-' : '+'}</span>
             <span>{transaction.amount} USD</span>
            </TextMui>
          </Grid>
        </Grid>
        <Grid
          item container
          justifyContent={{xs: "center", md: "end"}}
          alignItems="center"
          width={{xs: "100%", md:"50%"}}
          spacing={1}
          xs
        >
          <Grid item>
            <Button  variant="outlined" color="primary">
              <Link to={"/edit-transaction/" + transaction.id}>Edit</Link>
            </Button>
          </Grid>
          <Grid item>
            <Button
              disabled={loading ? loading === transaction.id : false}
              variant="outlined"
              color="error"
              onClick={onClick}
            >
              Remove
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>

  );
};

export default TransactionCard;