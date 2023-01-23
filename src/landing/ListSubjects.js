import React from 'react';
import {
  // Avatar,
  Card,
  // useMediaQuery,
  Typography,
  Divider,
  // TextField,
  Box,
  Chip,
  CardContent,
  Button,
  // Dialog,
} from '@mui/material/';
import { createFragmentContainer, graphql } from 'react-relay';

import { useEffect, useState } from 'react';

// function AddSubjectForm(props) {
//   const handleClickOpen = () => {
//     props.setOpen(true);
//   };

//   const handleClose = () => {
//     props.setOpen(false);
//   };
//   return <Dialog open={props.open} onClose={handleClose}></Dialog>;
// }

function Cardless(props) {
  return (
    <Card
      sx={{
        minHeight: 275,
        width: 300,
        margin: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
      // onClick={props.func}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" sx={{ padding: 1 }}>
            {props.name}
          </Typography>
        </Box>
        <Box>{props.description}</Box>
        <Box sx={{ width: 'auto', marginTop: 10 }}>
          {props.isexpert && <Chip label="Expert" variant="outlined" />}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: 'auto',
            marginTop: 2,
          }}
        >
          <Box>
            <Button
              variant="contained"
              color="warning"
              size="small"
              onClick={props.openDialog}
            >
              Update
            </Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={props.del}
            >
              Delete
            </Button>
          </Box>
        </Box>
        <Box sx={{ width: 'auto', marginTop: 2 }}>
          <Divider></Divider>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
          >
            <Box>{props.numlesson + ' lessons'}</Box>
            <Box>{props.duration + ' mins each'}</Box>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ padding: 1 }}>
              {'Price: ' + props.price}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
var data = {
  name: 'Narayan',
  duration: 10,
  numlesson: 10,
  price: 10,
  description: 'Helllo',
  isexpert: true,
};

function ListSubjects(props) {
  console.log(props);
  const [v, setV] = useState(10);
  // const [open, setOpen] = useState(false);
  function deleteHandler() {
    setV(v + 1);
    data.price = data.price - 1;
    data.isexpert = !data.isexpert;
  }
  function updateHandler() {
    setV(v + 1);
    data.price = data.price + 1;
    data.isexpert = !data.isexpert;
  }
  useEffect(() => {}, [data.price]);
  // function openDialog() {
  //   setOpen(true);
  // }
  return (
    <>
      {props.subs.map(sub => Cardless(sub))}
      <Cardless
        {...data}
        upd={updateHandler}
        del={deleteHandler}
        v={v}
        setV={setV}
        openDialog
      />
    </>
  );
}

export default createFragmentContainer(ListSubjects, {
  me: graphql`
    fragment ListSubjects_me on Query {
      me {
        subjects {
          name
          description
          price
          numlesson
          isexpert
        }
      }
    }
  `,
});
