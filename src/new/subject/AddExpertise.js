import * as React from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import { ArrowRight } from '@mui/icons-material';
import { useLocalContext } from './hooks/LocalContext';

export default function AddExpertise(props) {
  const { setExpertise, subject, status, setStatus } = useLocalContext();

  React.useEffect(() => () => {
    // send expertise to backend
  });

  const bigScreen = useMediaQuery('(min-width: 600px)');

  return (
    <Container sx={{ my: bigScreen ? 10 : 3, flexBasis: '100%' }}>
      <Typography variant="caption" align="left" sx={{ fontSize: '1rem' }}>
        Expertise
      </Typography>
      <Container maxWidth={'sm'} sx={{ my: 2 }}>
        <Typography variant="h4" align="left">
          Describe your qualifications for teaching {subject}
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <ArrowRight />
            </ListItemIcon>
            <ListItemText
              primary={`Why should students choose you as their ${subject} tutor?`}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <ArrowRight />
            </ListItemIcon>
            <ListItemText
              primary={`Be specific and share details about your ${subject} expertise.`}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <ArrowRight />
            </ListItemIcon>
            <ListItemText
              primary={` We have a separate section later in the application to share about yourself and your overall bio.`}
            />
          </ListItem>
        </List>

        <TextField
          required
          fullWidth
          multiline
          autoFocus
          id="expertise"
          name="expertise"
          margin="normal"
          onChange={e => {
            setExpertise(e.target.value);
            if (e.target.value !== null && e.target.value !== '')
              setStatus({ ...status, expertise: true });
            else setStatus({ ...status, expertise: false });
          }}
          placeholder={`Example: I have studied Spanish for the last six years. The first three were spent at my high school, where I took every advanced Spanish Course and became President of the Spanish Honor Society.

The latter three were spent at The University of Pennsylvania, an ivy-league institution with a phenomenal language department.

I am a member of the dual-degree, world-renowned Huntsman Program of Business & International Studies where I am majoring in Spanish.
        `}
        />
      </Container>
    </Container>
  );
}
