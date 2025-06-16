import React, { useState } from 'react';
import OpportunityForm from './opportunityForm';
import OpportunityList from './opportunityList';


function App() {
  const [selected, setSelected] = useState(null);
  const [refreshToggle, setRefreshToggle] = useState(false);

  const handleEdit = (opportunity) => {
    setSelected(opportunity);
  };

  const handleSuccess = () => {
    setSelected(null);
    setRefreshToggle(prev => !prev); // trigger re-fetch
  };

  return (
    <div style={{ padding: '2rem'  }}>
      <OpportunityForm selected={selected} onSuccess={handleSuccess} />
      <hr />
      <OpportunityList key={refreshToggle} onEdit={handleEdit} />
    </div>
  );
}

export default App;
