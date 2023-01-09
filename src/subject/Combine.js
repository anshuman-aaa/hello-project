import React, { useState } from 'react';
// import { Card } from '@mui/material';
// import { Typography } from '@mui/material';
// import { TextField } from '@mui/material';
import Subject from './Subject';
import Expertise from './Expertise';
import Confirm from './Confirm';

function Combine() {
  const [data, setData] = useState({
    subject: '',
    price: '',
    lesson: '',
    expertise: [],
  });

  const [page, setPage] = useState(1);
  const handlePage = type => {
    if (type === 'next') {
      setPage(page + 1);
    } else if (type === 'previous') {
      setPage(page - 1);
    } else if (type === 'submit') {
      //API
    }
  };
  return (
    <>
      {page === 1 ? (
        <Subject data={data} setData={setData} handlePage={handlePage} />
      ) : null}
      {page === 2 ? (
        <Expertise data={data} setData={setData} handlePage={handlePage} />
      ) : null}
      {page === 3 ? (
        <Confirm data={data} setData={setData} handlePage={handlePage} />
      ) : null}
    </>
  );
}

export default Combine;
