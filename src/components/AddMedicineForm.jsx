import React, { useState, useEffect } from 'react';

function AddMedicineForm({ addMedicine, editingMedicine, updateMedicine }) {
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [time, setTime] = useState('08:00');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (editingMedicine) {
      setName(editingMedicine.name || '');
      setDosage(editingMedicine.dosage || '');
      setFrequency(editingMedicine.frequency || 'daily');
      setTime(editingMedicine.time || '08:00');
      setNotes(editingMedicine.notes || '');
    } else {
      resetForm();
    }
  }, [editingMedicine]);

  const resetForm = () => {
    setName('');
    setDosage('');
    setFrequency('daily');
    setTime('08:00');
    setNotes('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const medicineData = {
      name,
      dosage,
      frequency,
      time,
      notes
    };
    
    if (editingMedicine) {
      updateMedicine({
        ...editingMedicine,
        ...medicineData
      });
    } else {
      addMedicine(medicineData);
    }
    
    resetForm();
  };

  return (
    <div className="form-container">
      <h2>{editingMedicine ? 'Edit Medicine' : 'Add New Medicine'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Medicine Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Aspirin"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="dosage">Dosage</label>
          <input
            type="text"
            id="dosage"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            placeholder="e.g., 1 tablet"
            required
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="frequency">Frequency</label>
            <select
              id="frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              required
            >
              <option value="daily">Daily</option>
              <option value="twice-daily">Twice Daily</option>
              <option value="every-other-day">Every Other Day</option>
              <option value="weekly">Weekly</option>
              <option value="as-needed">As Needed</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="time">Time</label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="notes">Notes (Optional)</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Additional instructions or notes"
            rows={3}
          />
        </div>
        
        <button type="submit" className="submit-button">
          {editingMedicine ? 'Update Medicine' : 'Add Medicine'}
        </button>
      </form>
    </div>
  );
}

export default AddMedicineForm;
