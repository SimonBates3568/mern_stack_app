import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { FaTrash } from 'react-icons/fa';
//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const WorkoutDetails = ({ workout }) => {

    const { dispatch } = useWorkoutsContext();

    const handleDelete = async (id) => {
        const response = await fetch('/api/workouts/' + id, {
            method: 'DELETE'
        });
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: 'DELETE_WORKOUT', payload: json });
        }
    };
    return (
        <div className="workout-details">
            <h4><strong>{workout.title}</strong></h4>
            <p><strong>{workout.load}kg</strong></p>
            <p><strong>{workout.reps} reps</strong></p>
            <p><strong>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</strong></p>
            <span onClick={() => handleDelete(workout._id)} className="material-symbols-outlined"><FaTrash /></span>
        </div>
    );
}
export default WorkoutDetails;