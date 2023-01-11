import { Delete } from '@mui/icons-material';
import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';

export default function Package(props) {
  const { index, setPackage, basePackage } = props;

  const [pkg, setPkg] = React.useState(basePackage);

  return (
    <Box
      style={{
        borderBottom: '1px solid black',
        padding: '2rem 0',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>Package {index + 1}</Typography>
        <Button
          type="button"
          onClick={() => {
            setPackage(null, index, true);
          }}
        >
          <Delete />
        </Button>
      </div>
      <TextField
        required
        fullWidth
        value={pkg.lessons}
        margin="normal"
        label="Number of Lessons"
        type="number"
        InputProps={{ min: 1 }}
        onChange={e => {
          setPkg({ ...pkg, lessons: parseInt(e.target.value) });
          setPackage(pkg, index);
        }}
      />
      <TextField
        required
        fullWidth
        value={pkg.price}
        margin="none"
        label="Price"
        type="number"
        InputProps={{ min: 1 }}
        onChange={e => {
          setPkg({ ...pkg, price: parseInt(e.target.value) });
          setPackage(pkg, index);
        }}
      />
    </Box>
  );
}
