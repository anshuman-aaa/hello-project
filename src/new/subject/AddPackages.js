import { ArrowRight } from '@mui/icons-material';
import {
  Button,
  Container,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React from 'react';
import { useLocalContext } from '../../../../src/new/subject/hooks/LocalContext';
import Package from './SinglePackage';

export default function AddPackages(props) {
  const { packages, setPackages, status, setStatus } = useLocalContext();

  function setPackage(val, index, del = false) {
    let newPackages = [...packages];
    if (!del) {
      while (index >= newPackages.length) {
        newPackages = [...newPackages, { lessons: 0, price: 0 }];
      }
      newPackages[index] = val;
      let newstatus = true;
      let lesson3 = false;
      console.log(newPackages);
      if (newPackages.length)
        for (let pkg of newPackages) {
          newstatus = newstatus && pkg.lessons >= 0 && pkg.price >= 0;
          lesson3 =
            lesson3 || (pkg.lessons <= 3 && pkg.lessons > 0 && pkg.price > 0);
          console.log(pkg, newstatus, lesson3);
        }
      setStatus({ ...status, packages: newstatus && lesson3 });
    } else if (index < newPackages.length) {
      delete newPackages[index];
    }
    setPackages(newPackages);
  }

  const bigScreen = useMediaQuery('(min-width: 600px)');

  return (
    <Container sx={{ my: bigScreen ? 10 : 3, flexBasis: '100%' }}>
      <Typography variant="caption" align="left" sx={{ fontSize: '1rem' }}>
        Packages
      </Typography>
      <Container maxWidth={'sm'} sx={{ my: 2 }}>
        <Typography variant="h4" align="left">
          Add your packages
        </Typography>
        <ListItem>
          <ListItemIcon>
            <ArrowRight />
          </ListItemIcon>
          <ListItemText primary="Note: You can edit packages later but you need to add at least one package with 3 or less lessons now." />
        </ListItem>
        {packages.map((pkg, index) => (
          <Package
            index={index}
            setPackage={setPackage}
            key={index}
            basePackage={packages[index]}
          />
        ))}
        <Button
          type="button"
          fullWidth
          variant="outlined"
          sx={{ my: 2 }}
          onClick={() => {
            setPackage({ lessons: 0, price: 0 }, packages.length);
          }}
        >
          Add Package
        </Button>
      </Container>
    </Container>
  );
}