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
import LocalLayout from './LocalLayout';

export default function AddExpertise(props) {
  const { subject } = props;
  const next = `/new/${subject}/packages`;
  const help =
    'Please keep the name of subject concise and to the point. Eg: Use Maths or Chess instead of High School Maths or Professional Chess.';
  const didyouknow = false;
  const [status, setStatus] = React.useState(false);
  const [err, setErr] = React.useState({
    message: 'Please add expertise',
    show: false,
  });
  const [expertise, setExpertise] = React.useState('');

  const bigScreen = useMediaQuery('(min-width: 600px)');

  function setReady() {
    setStatus(true);
  }
  function checkReady() {
    return expertise !== null && expertise !== '';
  }

  const addExpertiseLocal = (
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
          value={expertise}
          onChange={e => {
            setExpertise(e.target.value);
            if (checkReady()) setReady();
          }}
          placeholder={`Example: I have studied Spanish for the last six years. The first three were spent at my high school, where I took every advanced Spanish Course and became President of the Spanish Honor Society.

The latter three were spent at The University of Pennsylvania, an ivy-league institution with a phenomenal language department.

I am a member of the dual-degree, world-renowned Huntsman Program of Business & International Studies where I am majoring in Spanish.
        `}
        />
      </Container>
    </Container>
  );

  return (
    <LocalLayout
      data={{ next, help, didyouknow, err, setErr, status, expertise }}
    >
      {addExpertiseLocal}
    </LocalLayout>
  );
}
