import React, { useEffect, useState } from 'react';

const OpportunityList = ({ onEdit }) => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchOpportunities = async () => {
    try {
      const res = await fetch('https://inter-3bzj.onrender.com');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setOpportunities(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this opportunity?');
    if (!confirm) return;

    try {
      const res = await fetch(`https://inter-3bzj.onrender.com/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete');
      await fetchOpportunities(); // Refresh list
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p className="text-gray-600 text-center">Loading...</p>;
  if (error) return <p className="text-red-600 text-center">Error: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">All Opportunities</h2>

      {opportunities.length === 0 ? (
        <p className="text-center text-gray-600">No opportunities found.</p>
      ) : (
        <ul className="space-y-4">
          {opportunities.map((op) => (
            <li key={op._id} className="bg-white border border-gray-200 rounded-md p-4 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{op.title}</h3>
                <p className="text-sm text-gray-600">{op.offering} · {op.workMode} · {op.duration} month(s)</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(op)}
                  className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded transition"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(op._id)}
                  className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded transition"
                >
                  🗑 Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OpportunityList;
