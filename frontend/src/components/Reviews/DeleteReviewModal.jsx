import { useModal } from '../../context/Modal';
import { csrfFetch } from '../../store/csrf';


const DeleteReview = ({reviewId, onReviewSubmit}) =>{
    const { closeModal } = useModal();

    const handleDelete = async () =>{
        const response = await csrfFetch(`/api/reviews/${reviewId}`, {
            method: 'DELETE'
        })
        if(response.ok){
            console.log(response.message)
            onReviewSubmit();
            closeModal();
        }
    }

    return (
        <div className='DeleteSpotModal'>
            <h1>Confirm Delete</h1>
            <h2>Are you Sure you want to delete this review?</h2>
            <div className='deleteButtons'>
                <button onClick={handleDelete} className='delete'>Yes (Delete Review)</button>
                <button onClick={()=> closeModal()} className='keep'>No (Keep Review)</button>
            </div>
        </div>
    )
}

export default DeleteReview;
