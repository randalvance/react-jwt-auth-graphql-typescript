import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const App: React.FC = () => {
  const { data, loading } = useQuery(gql`{
    hello
  }`);

  if (loading) {
    return <div>Loading data...</div>;
  }
  return (
    <div>{JSON.stringify(data)}</div>
  )
};

export default App;