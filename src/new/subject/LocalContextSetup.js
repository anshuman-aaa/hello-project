import React from 'react';
import { LocalContext } from '../../../../src/new/subject/hooks/LocalContext';
import AddExpertise from './AddExpertise';
import AddSubject from './AddSubject';
import AddPackages from './AddPackages';
import LocalLayout from './LocalLayout';
import { createFragmentContainer, graphql } from 'react-relay';

// {
//   start: 'subject',
//   subject: {
//     component: <Subject ready={ready} setReady={setReady} />,
//     help:
//     didyouknow:
//     next: 'packages',
//   },
//   packages: {
//     component: <Packages ready={ready} setReady={setReady} />,
//     help:
//     prev: 'subject',
//     next: 'expertise',
//   },
//   expertise: {
//     component: <Expertise ready={ready} setReady={setReady} />,
//     help:
//     prev: 'packages',
//   },
// };

function NewSubjectContextSetup(props) {
  const children = [<AddSubject />, <AddExpertise />, <AddPackages />];
  const help = [
    ' Keep subject simple Avoid combining multiple subjects into one (e.g., “College essay writing Math Science”) or keeping subject name vague (e.g. “all subjects”).',
    'Please keep the name of subject concise and to the point. Eg: Use Maths or Chess instead of High School Maths or Professional Chess.',
    'Please keep the name of subject concise and to the point. Eg: Use Maths or Chess instead of High School Maths or Professional Chess.',
  ];
  const didyouknow = [
    'Did you know? You can teach multiple subjects on Lessonpal. However, you can add only one at a time. Add all the details for a subject. Then, you can add other subjects.',
  ];
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

  const [curr, setCurr] = React.useState(0);
  const [err, setErr] = React.useState([
    { message: 'Please Add Subject', show: false },
    { message: 'Please Add Expertise', show: false },
    {
      message: 'Please Add at least 1 package with more 3 or less lessons.',
      show: false,
    },
  ]);
  const [subject, setSubject] = React.useState('');
  const [packages, setPackages] = React.useState([{ lessons: 0, price: 0 }]);
  const [expertise, setExpertise] = React.useState('');
  const [status, setStatus] = React.useState({
    subject: false,
    expertise: false,
    packages: false,
  });

  const context = {
    children,
    curr,
    setCurr,
    err,
    setErr,
    help,
    didyouknow,
    suggestedSubjects,
    status,
    setStatus,
    subject,
    setSubject,
    expertise,
    setExpertise,
    packages,
    setPackages,
  };

  return (
    <LocalContext.Provider value={context}>
      <LocalLayout />
    </LocalContext.Provider>
  );
}

export default createFragmentContainer(NewSubjectContextSetup, {
  data: graphql`
    fragment LocalContextSetup_data on Query {
      me {
        ...AppBar_me
        ...AutoUpdater_me
        ...UserSettingsDialog_me
      }
    }
  `,
});
