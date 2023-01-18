import React from 'react';

// create the context and export it
export const NewSubjectContext = React.createContext();

// create the provider
export default function NewSubjectProvider({ children }) {
  // creating the state
  const [newSubject, setNewSubject] = React.useState({});

  //   subject: 'Math',
  //   price: 5,
  //   num_of_lessons: 2,
  //   expertise: 'Your Expertise',

  return (
    <NewSubjectContext.Provider value={{ newSubject, setNewSubject }}>
      {children}
    </NewSubjectContext.Provider>
  );
}
