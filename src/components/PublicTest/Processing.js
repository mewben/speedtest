import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default ({ url, error, onBack }) => {
  if (error) {
    return (
      <div className="text-center">
        <h2>Oops! Something went wrong</h2>
        <p className="text-muted">{error}</p>
        <button onClick={onBack} className="btn btn-link">
          &larr; Back to form
        </button>
      </div>
    );
  }
  return (
    <div className="text-center">
      <CircularProgress size={150} thickness={0.5} color="primary" />
      <div className="text-muted">
        Analyzing <strong>{url}</strong>
      </div>
    </div>
  );
};
