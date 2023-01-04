import * as React from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {
  Autocomplete,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import { ArrowRight } from '@mui/icons-material';
import { useLocalContext } from '../../../../src/new/subject/hooks/LocalContext';

export default function AddSubject(props) {
  const {
    suggestedSubjects,
    setSubject,
    status,
    setStatus,
  } = useLocalContext();

  return (
    <Container
      sx={{
        my: useMediaQuery('(min-width:600px)') ? 10 : 3,
        flexBasis: '100%',
      }}
    >
      <Typography variant="caption" align="left" sx={{ fontSize: '1rem' }}>
        Subject
      </Typography>
      <Container maxWidth={'sm'} sx={{ my: 2 }}>
        <Typography variant="h4" align="left">
          What do you want to teach?
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <ArrowRight />
            </ListItemIcon>
            <ListItemText primary="Type the first three letters of the subject you want to teach to view our list of suggested subjects." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <ArrowRight />
            </ListItemIcon>
            <ListItemText primary="If you don't find the subject you want to teach in the suggested subjects list - just go ahead and add it. You can teach what you love." />
          </ListItem>
        </List>

        <Autocomplete
          required
          autoFocus
          freeSolo
          autoComplete
          options={suggestedSubjects}
          id="subject"
          name="subject"
          onSelect={e => {
            setSubject(e.target.value);
            if (e.target.value !== null && e.target.value !== '')
              setStatus({ ...status, subject: true });
            else setStatus({ ...status, subject: false });
          }}
          renderInput={params => (
            <TextField
              {...params}
              label="Subject Name"
              onChange={e => {
                setSubject(e.target.value);
                if (e.target.value !== null && e.target.value !== '')
                  setStatus({ ...status, subject: true });
                else setStatus({ ...status, subject: false });
              }}
            />
          )}
        />
      </Container>
    </Container>
  );
}
