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
    <div className="workout-details">
      {isEditing ? (
        <form onSubmit={handleUpdate} className="edit-form">
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <input
            type="number"
            value={load}
            onChange={e => setLoad(e.target.value)}
            required
          />
          <input
            type="number"
            value={reps}
            onChange={e => setReps(e.target.value)}
            required
          />
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={3}
            placeholder="Notes/Comments"
          />
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
          <button
            type="button"
            onClick={handleDelete}
            style={{ color: 'white', backgroundColor: 'red', }}
          >
            <FaTrash />
          </button>
          {error && <div className="error">{error}</div>}
        </form>
      ) : (
        <>
          <h4>{workout.title}</h4>
          <p><strong>Load (kg): </strong>{workout.load}</p>
          <p><strong>Reps: </strong>{workout.reps}</p>
          {workout.notes && <p><strong>Notes: </strong>{workout.notes}</p>}
          <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleEdit} style={{ marginLeft: '100px', cursor: 'pointer' }}><FaEdit /></span>
        </>
      )}
    </div>
  );
};

export default WorkoutDetails