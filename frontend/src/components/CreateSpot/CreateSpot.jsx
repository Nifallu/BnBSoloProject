import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import './CreateSpot.css'
import { useDispatch } from "react-redux";
import { csrfFetch } from "../../store/csrf";
import { createImages } from "../../store/images";
import { addSpot } from "../../store/spots"
import { useLocation } from "react-router-dom";

const CreateSpotForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { state } = useLocation();
    const spotId = state?.spotId || null;

    const [formData, setFormData] = useState({
        address: "",
        city: "",
        state: "",
        country: "",
        lat: '0',
        lng: '0',
        name: "",
        description: "",
        price: '',
        images: ['','','','','']
    });

    const [validation, setValidations] = useState({});
    const [isUpdating, setIsUpdating] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        const validationObj = {};

        if (!formData.address) {
            validationObj.address = 'Street address is required';
        }
        if (!formData.city) {
            validationObj.city = 'City is required';
        }
        if (!formData.state) {
            validationObj.state = 'State is required';
        }

        if (!formData.country) {
            validationObj.country = 'Country is required';
        }

        if (!formData.name) {
            validationObj.name = 'Name is required';
        } else if (formData.name.length > 50) {
            validationObj.name = 'Name must be less than 50 characters';
        }

        if (!formData.description) {
            validationObj.description = 'Description is required';
        }
        if (!formData.price || isNaN(parseFloat(formData.price))) {
            validationObj.price = 'Price per day is required and must be a number greater than zero';
        }

        const hasNonEmptyPreview = formData.images.some(image => image.trim() !== '');
        if (!hasNonEmptyPreview) {
            validationObj.previewImage = 'Preview image is required';
        }

        const nonEmptyUrls = formData.images.filter(image => image.trim() !== '');
        const UrlsHaveCorrectFormat = nonEmptyUrls.every(image => /(.png|.jpg|.jpeg)$/i.test(image));
        if (!UrlsHaveCorrectFormat) {
            validationObj.imageFormat = 'Image URL must end in .png, .jpg, or .jpeg';
        }

        setValidations(validationObj);
    }, [formData]);

    useEffect(() => {
        if (spotId) {
            const fetchSpotData = async () => {
                const response = await fetch(`/api/spots/${spotId}`);
                if (response.ok) {
                    const spotData = await response.json();
                    setFormData({
                        ...formData,
                        address: spotData.spot.address || '',
                        city: spotData.spot.city || '',
                        state: spotData.spot.state || '',
                        country: spotData.spot.country || '',
                        lat: spotData.spot.lat || '0',
                        lng: spotData.spot.lng || '0',
                        name: spotData.spot.name || '',
                        description: spotData.spot.description || '',
                        price: spotData.spot.price || '',
                    });
                    setIsUpdating(true);
                }
            };

            fetchSpotData();
        }
    }, [spotId, formData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitted(true);

        if (Object.keys(validation).length === 0) {
            const endpoint = isUpdating ? `/api/spots/${spotId}` : '/api/spots';

            const response = await csrfFetch(endpoint, {
                method: isUpdating ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            if (response.ok) {

                const updateSpotId = result.id || spotId;

                dispatch(createImages(formData.images, updateSpotId));
                dispatch(addSpot(result));

                navigate(`/spot/${updateSpotId}`);
            } else {
                window.alert(result.errors);
            }
        } else {
            console.log('Validation Failed');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageInputChange = (index, e) => {
        const newImages = [...formData.images];
        newImages[index] = e.target.value;
        setFormData({
            ...formData,
            images: newImages,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <h1>{isUpdating ? 'Update Spot' : 'Create a New Spot'}</h1>
            <h2>Where&apos;s your place located?</h2>
            <p>Guests will only get your exact address once they booked a reservation.</p>
            <div>
                <label>
                    Country:
                    <input
                        name='country'
                        type='text'
                        value={formData.country}
                        onChange={handleInputChange}
                        placeholder="Country"
                    />
                    {formSubmitted && 'country' in validation && (
                        <p className="errors">{validation.country}</p>
                    )}
                </label>
                <label>
                    Street Address:
                    <input 
                        name='address'
                        type='text'
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Address"
                    />
                    {formSubmitted && 'address' in validation && (
                        <p className="errors">{validation.address}</p>
                    )}
                </label>
                <div className="cityState">
                    <label className="city">
                        City:
                        <input
                            name='city'
                            type='text'
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="City"
                        />
                        {formSubmitted && 'city' in validation && (
                            <p className="errors">{validation.city}</p>
                        )}
                    </label>
                    <label>
                        State:
                        <input 
                            name='state'
                            type='text'
                            value={formData.state}
                            onChange={handleInputChange}
                            placeholder="STATE"
                        />
                        {formSubmitted && 'state' in validation && (
                            <p className="errors">{validation.state}</p>
                        )}
                    </label>
                </div>
                <hr></hr>
                <h2>Describe your place to guests</h2>
                <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
                <label>
                    <input
                        className="description"
                        name='description'
                        type='textarea'
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Pleas write at least 30 characters"
                    />
                    {formSubmitted &&  'description' in validation && (<p className="errors">{validation.description}</p>)}
                </label>
                <hr></hr>
                <h2>Create a title for your spot</h2>
                <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
                <input 
                    name='name'
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Name of your spot"
                />
                    {formSubmitted && 'name' in validation && (<p className="errors">{validation.name}</p>)}
                <hr></hr>
                <h2>Set a base price for your spot</h2>
                <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                <label>
                    <input
                        name='price'
                        type='float'
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="Price per night (USD)"
                    />
                    {formSubmitted && 'price' in validation && (<p className="errors">{validation.price}</p>)}
                </label>
                <hr></hr>
                <h2>Liven up your spot with photos</h2>
                <p>Submit a link to at least one photo to publish your spot.</p>
                {formData.images.slice(0, 5).map((image, index) => (
                    <div key={index}>
                        <label >
                            <p >
                                <input
                                    placeholder={index === 0 ?'Preview Image URL' :'Image URL'}
                                    value={image || ''}
                                    onChange={(e) => handleImageInputChange(index, e)}
                                />
                            </p>
                        </label>
                            {index === 0 && formSubmitted && 'previewImage' in validation && (
                                <p className="errors">{validation.previewImage}</p>
                            )}
                            {index >= 0 && formSubmitted &&  'imageFormat' in validation && (
                                <p className="errors">{validation.imageFormat}</p>
                            )}
                    </div>
                ))}               
            </div>
            <button
            type="submit"
            // disabled={Object.values(validation).length > 0 || !formSubmitted}
        >
            {isUpdating ? 'Update Spot' : 'Create Spot'}
        </button>
        </form>
    )
}

export  default CreateSpotForm;
