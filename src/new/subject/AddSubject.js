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
import LocalLayout from './LocalLayout';
import { createFragmentContainer, graphql } from 'react-relay';

function AddSubject(props) {
  const { backend_data } = props;
  const help =
    ' Keep subject simple Avoid combining multiple subjects into one (e.g., “College essay writing Math Science”) or keeping subject name vague (e.g. “all subjects”).';
  const didyouknow =
    'Did you know? You can teach multiple subjects on Lessonpal. However, you can add only one at a time. Add all the details for a subject. Then, you can add other subjects.';
  const [subject, setSubject] = React.useState('');
  const [status, setStatus] = React.useState(false);
  const [err, setErr] = React.useState({
    message: 'Please add Subject',
    show: false,
  });
  const suggestedSubjects = [
    'maths',
    'chemistry',
    'physics',
    'vocal music',
    'yoga',
    'guitar',
    'drums',
    'modern art',
    'programming',
    'website development',
  ];

  const next = `/new/${subject}/expertise`;

  const addSubjectLocal = (
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
          value={subject}
          onSelect={e => {
            setSubject(e.target.value);
            if (e.target.value === null || e.target.value === '')
              setStatus(false);
            else setStatus(true);
          }}
          renderInput={params => (
            <TextField
              {...params}
              label="Subject Name"
              onChange={e => {
                setSubject(e.target.value);
                if (e.target.value === null || e.target.value === '')
                  setStatus(false);
                else setStatus(true);
              }}
            />
          )}
        />
      </Container>
    </Container>
  );

  return (
    <LocalLayout
      localdata={{ next, help, didyouknow, err, setErr, status, subject }}
      backend_data={backend_data}
    >
      {addSubjectLocal}
    </LocalLayout>
  );
}

export default createFragmentContainer(AddSubject, {
  backend_data: graphql`
    fragment AddSubject_backend_data on Query {
      ...LocalLayout_backend_data
    }
  `,
});
