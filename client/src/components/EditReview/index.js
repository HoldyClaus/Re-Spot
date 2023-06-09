import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { UPDATE_REVIEW } from '../../utils/mutations';

import { QUERY_REVIEWS, QUERY_ME } from '../../utils/queries';

import './EditReview.css';

import Auth from '../../utils/auth';

const EditReview = () => {
    // //console.log({reviewId: prop?.reviewId})
    /* const { id } = useParams();
     console.log(id);*/

    const [reviewText, setReviewText] = useState('');

    const [characterCount, setCharacterCount] = useState(0);

    const [updateReview, { error }] = useMutation(UPDATE_REVIEW, {
        update(cache, { data: { updateReview: updateReview } }) {
            try {
                const { reviews } = cache.readQuery({ query: QUERY_REVIEWS });

                cache.writeQuery({
                    query: QUERY_REVIEWS,
                    data: { reviews: [updateReview, ...reviews] },
                });
            } catch (e) {
                console.error(e);
            }
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: updateReview },
            });
        },
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await updateReview({
                variables: {
                    reviewText,
                    reviewAuthor: Auth.getProfile().data.username,
                },
            });
            setReviewText('');
        } catch (err) {
            console.error(err);
        }
    };


    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'reviewText' && value.length <= 280) {
            setReviewText(value);
            setCharacterCount(value.length);
        }
    };

    return (
        <div className="review-form">
            <h3>Update Your Review?</h3>

            {Auth.loggedIn() ? (
                <>
                    <p
                        className={`m-0 ${characterCount === 280 || error ? 'text-danger' : ''
                            }`}
                    >
                        Character Count: {characterCount}/280
                    </p>
                    <form
                        className="flex-row justify-center justify-space-between-md align-center"
                        onSubmit={handleFormSubmit}
                    >
                        <div className="review-card col-12 col-lg-9">
                            <textarea
                                name="reviewText"

                                value={reviewText}
                                className="form-input w-100"
                                style={{ lineHeight: '1.5', resize: 'vertical', border: '1px solid grey', backgroundColor: '#f7f7f7' }}
                                onChange={handleChange}
                            ></textarea>
                            <button className="button button-primary button-block py-3 add-review-button button-squared" type="submit">
                                Update Review
                            </button>
                        </div>

                        {error && (
                            <div className="col-12 my-3 bg-danger text-white p-3">
                                {error.message}
                            </div>
                        )}
                    </form>
                </>
            ) : (
                <p>
                    You need to be logged in to share your review. Please{' '}
                    <Link to="/login" style={{ color: 'lightgreen' }}>login</Link>

                    {' '}or{' '}

                    <Link to="/signup" style={{ color: 'lightgreen' }}>signup.</Link>
                </p>
            )}
        </div>
    );
};

export default EditReview;