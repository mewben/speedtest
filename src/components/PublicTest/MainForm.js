import React from 'react';

import Error from './Error';

export default ({
  http,
  url,
  onSubmit,
  onChangeSelect,
  onChangeInput,
  error,
}) => {
  const disabled = !url.trim();
  return (
    <div className="jumbotron align-self-center">
      <div className="text-center">
        <div>Haven't checked your site yet?</div>
        <h2 className="display-4">Test your site now!</h2>
      </div>
      <form
        onSubmit={onSubmit}
        className="form-inline d-flex justify-content-center mb-5"
      >
        <div className="form-group">
          <select
            className="form-control form-control-lg"
            onChange={onChangeSelect}
            value={http}
          >
            <option value="https://">https://</option>
            <option value="http://">http://</option>
          </select>
        </div>
        <div className="ml-2 flex-grow-1 position-relative form-group">
          <input
            type="text"
            className="form-control form-control-lg input-url"
            placeholder="yoursite.com"
            onChange={onChangeInput}
            value={url}
          />
        </div>
        <button disabled={disabled} className="btn btn-outline-primary btn-lg">
          Start Test
        </button>
      </form>
      {error && <Error msg={error} />}
    </div>
  );
};
