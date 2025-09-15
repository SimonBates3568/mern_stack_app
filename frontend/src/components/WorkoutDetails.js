import { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { FaEdit, FaTrash } from 'react-icons/fa';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(workout.title);
  const [load, setLoad] = useState(workout.load);
  const [reps, setReps] = useState(workout.reps);
  const [notes, setNotes] = useState(workout.notes || '');
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    if (!user) return;
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json });
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setError(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTitle(workout.title);
    setLoad(workout.load);
    setReps(workout.reps);
    setNotes(workout.notes || '');
    setError(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user) return;
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({ title, load, reps, notes })
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: 'UPDATE_WORKOUT', payload: json });
      setIsEditing(false);
    } else {
      setError(json.error || 'Update failed');
    }
  };

  return (
    <div className="workout-details" style={{ position: 'relative' }}>
      {isEditing ? (
        <form onSubmit={handleUpdate} className="edit-form">
          <div className="form-group">
            <label htmlFor="edit-title">Title</label>
            <input
              id="edit-title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="form-group">
            <label htmlFor="edit-load">Load (kg)</label>
            <input
              id="edit-load"
              type="number"
              value={load}
              onChange={e => setLoad(Number(e.target.value))}
              min="0"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="edit-reps">Reps</label>
            <input
              id="edit-reps"
              type="number"
              value={reps}
              onChange={e => setReps(Number(e.target.value))}
              min="0"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="edit-notes">Notes</label>
            <textarea
              id="edit-notes"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={3}
              placeholder="Notes/Comments"
            />
          </div>
          <div className="edit-actions" style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="submit" className="btn-save">Save</button>
            <button type="button" onClick={handleCancel} className="btn-cancel">Cancel</button>
            <button
              type="button"
              onClick={handleDelete}
              className="btn-delete"
              title="Delete workout"
              style={{ marginLeft: 'auto', background: 'none', border: 'none' }}
            >
              <FaTrash style={{ color: 'red', cursor: 'pointer'}} />
            </button>
          </div>
          {error && <div className="error">{error}</div>}
        </form>
      ) : (
        <div style={{ position: 'relative' }}>
          <button
            className="icon-btn"
            onClick={handleEdit}
            title="Edit workout"
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              zIndex: 1,
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <FaEdit size="1.2rem" />
          </button>
          <div className="workout-header">
            <h4 style={{ marginRight: '2rem' }}>{workout.title}</h4>
          </div>
          <p><strong>Load (kg):</strong> {workout.load}</p>
          <p><strong>Reps:</strong> {workout.reps}</p>
          {workout.notes && <p><strong>Notes:</strong> {workout.notes}</p>}
          <p className="workout-date">
            {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
          </p>
        </div>
      )}
    </div>
  );
};

export default WorkoutDetails