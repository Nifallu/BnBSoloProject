import { useModal } from '../../context/Modal';

const DeleteSpot = ({spotId, onSpotDelete}) =>{
    const { closeModal } = useModal();
    
    const handleDelete = async () =>{
        const response = await csrfFetch(`/api/spots/${spotId}`, {
            method: 'DELETE'
        })
        if(response.ok){
            console.log(response.message)
            onSpotDelete();
            closeModal();
        }
    }
return (
    <div className='DeleteSpotModal'>
    <h1>Confirm Delete</h1>
    <h2>Are you Sure you want to remove this spot?</h2>
    <div className='deleteButtons'>
    <button onClick={handleDelete} className='delete'>Yes (Delete Spot)</button>
    <button onClick={()=> closeModal()} className='keep'>No (Keep Spot)</button>
    </div>
    </div>
)
}



export default DeleteSpot;
