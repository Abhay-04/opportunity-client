import React, { useEffect, useState } from 'react';

const OpportunityForm = ({ selected, onSuccess }) => {
  const [formData, setFormData] = useState(getEmptyForm());
  const [message, setMessage] = useState('');

  function getEmptyForm() {
    return {
      title: '',
      description: '',
      duration: '',
      level: '',
      offering: '',
      valueConstructs: '',
      stipend: false,
      stipendAmount: '',
      preplacementOffer: false,
      letterOfRecommendation: false,
      workMode: '',
      workLocation: '',
      workHours: '',
      workHourStart: '',
      workHourEnd: '',
      timeCommitment: '',
      academicAccommodation: false,
    };
  }

  useEffect(() => {
    if (selected) {
      setFormData({
        ...selected,
        valueConstructs: selected.valueConstructs.join(', '),
      });
    } else {
      setFormData(getEmptyForm());
    }
  }, [selected]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      duration: Number(formData.duration),
      level: Number(formData.level),
      stipendAmount: formData.stipend ? Number(formData.stipendAmount) : undefined,
      valueConstructs: formData.valueConstructs.split(',').map((v) => v.trim()),
    };

    try {
      const method = selected ? 'PUT' : 'POST';
      const url = selected
        ? `http://localhost:3000/${selected._id}`
        : 'http://localhost:3000/';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Submission failed');
      }

      setMessage(selected ? '✅ Opportunity updated!' : '✅ Opportunity created!');
      onSuccess();
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto mt-10 bg-white shadow-md border border-gray-200 rounded-lg px-6 py-8 space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800">
        {selected ? 'Edit' : 'Create'} Opportunity
      </h2>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Duration (months)</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Level</label>
          <input
            type="number"
            name="level"
            value={formData.level}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Offering</label>
        <input
          name="offering"
          value={formData.offering}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Value Constructs (comma separated)
        </label>
        <input
          name="valueConstructs"
          value={formData.valueConstructs}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input type="checkbox" name="stipend" checked={formData.stipend} onChange={handleChange} />
        <label className="text-sm">Stipend</label>
      </div>

      {formData.stipend && (
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Stipend Amount</label>
          <input
            type="number"
            name="stipendAmount"
            value={formData.stipendAmount}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="preplacementOffer" checked={formData.preplacementOffer} onChange={handleChange} />
          Pre-placement Offer
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="letterOfRecommendation" checked={formData.letterOfRecommendation} onChange={handleChange} />
          Letter of Recommendation
        </label>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Work Mode</label>
        <select
          name="workMode"
          value={formData.workMode}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select</option>
          <option value="remote">Remote</option>
          <option value="offline">Offline</option>
          <option value="hybrid">Hybrid</option>
        </select>
      </div>

      {(formData.workMode === 'offline' || formData.workMode === 'hybrid') && (
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Work Location</label>
          <input
            name="workLocation"
            value={formData.workLocation}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      )}

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Work Hours</label>
        <input
          name="workHours"
          value={formData.workHours}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Start Time</label>
          <input
            type="time"
            name="workHourStart"
            value={formData.workHourStart}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">End Time</label>
          <input
            type="time"
            name="workHourEnd"
            value={formData.workHourEnd}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Time Commitment</label>
        <input
          name="timeCommitment"
          value={formData.timeCommitment}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="academicAccommodation" checked={formData.academicAccommodation} onChange={handleChange} />
        Academic Accommodation
      </label>

      <button
        type="submit"
        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
      >
        {selected ? 'Update Opportunity' : 'Create Opportunity'}
      </button>

      {message && <p className="text-sm text-gray-600 mt-2">{message}</p>}
    </form>
  );
};

export default OpportunityForm;
