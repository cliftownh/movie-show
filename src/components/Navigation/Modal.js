import React, { Fragment, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Modal = props => {
  const { title, name, season_number, episode_number } = props.children.data;
  const { id } = props.children,
    reviewHeadline = useRef(),
    reviewBody = useRef(),
    reviewRating = useRef(),
    closeButton = useRef(),
    history = useHistory(),
    url = `http://localhost:4000/review/${id}`;

  let format = 'movie';
  if (name) format = 'tv';

  const handleSubmit = e => {
    e.preventDefault();

    if (reviewRating.current.value !== '') {
      axios({
        method: 'post',
        url: url,
        withCredentials: true,
        data: {
          format: format,
          title: title || name,
          season: season_number,
          episode: episode_number,
          headline: reviewHeadline.current.value,
          body: reviewBody.current.value,
          rating: reviewRating.current.value
        }
      })
        .then(response => {
          if (response.status === 201) {
            closeButton.current.click();
            history.push(`/review/${response.data.id}`);
          }
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-outline-orange"
        data-toggle="modal"
        data-target="#review-modal"
      >
        Create Review
      </button>

      <div className="modal fade" id="review-modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content review-modal">
            <div className="modal-header">
              <h5 className="modal-title">Review: {title || name}</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                ref={closeButton}
              >
                <span aria-hidden="true" className="close-x">
                  &times;
                </span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                {season_number ? (
                  <div className="form-group row">
                    <label
                      htmlFor="review-season"
                      className="col-sm-2 col-form-label"
                    >
                      Season
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        id="review-season"
                        value={season_number}
                        readOnly
                      />
                    </div>
                  </div>
                ) : null}

                {episode_number ? (
                  <div className="form-group row">
                    <label
                      htmlFor="review-episode"
                      className="col-sm-2 col-form-label"
                    >
                      Episode
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        id="review-episode"
                        value={episode_number}
                        readOnly
                      />
                    </div>
                  </div>
                ) : null}

                <div className="form-group row">
                  <label
                    htmlFor="review-headline"
                    className="col-sm-2 col-form-label"
                  >
                    Headline
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      className="form-control"
                      id="review-headline"
                      ref={reviewHeadline}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label
                    htmlFor="review-body"
                    className="col-sm-2 col-form-label"
                  >
                    Review
                  </label>
                  <div className="col-sm-7">
                    <textarea
                      className="form-control review-textarea"
                      id="review-body"
                      ref={reviewBody}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label
                    htmlFor="review-rating"
                    className="col-sm-2 col-form-label"
                  >
                    Rating
                  </label>
                  <div className="col-sm-7">
                    <select
                      className="form-control"
                      id="review-rating"
                      ref={reviewRating}
                      required
                    >
                      <option value=""></option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-orange"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-orange">
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Modal;
