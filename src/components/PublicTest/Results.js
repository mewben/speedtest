import React, { Component } from 'react';
import { Spring, animated } from 'react-spring';
import get from 'lodash/get';

import ResultItem from './ResultItem';

export class Results extends Component {
  render() {
    const {
      onBack,
      url,
      data: { data },
    } = this.props;

    return (
      <Spring
        native
        from={{ opacity: 0, marginTop: 400 }}
        to={{ opacity: 1, marginTop: 0 }}
      >
        {props => (
          <animated.div style={props}>
            <div className="another-link">
              <button type="button" className="btn btn-link" onClick={onBack}>
                &larr; Test another URL
              </button>
            </div>
            <div className="results text-center">
              <h3>Page Result Audit</h3>
              <h6 className="text-primary">{url}</h6>
              <div className="d-flex justify-content-center">
                <ResultItem
                  label="Performance"
                  value={get(data, 'categories.performance.score', 0) * 100}
                />
                <ResultItem
                  label="Progressive Web App"
                  value={get(data, 'categories.pwa.score', 0) * 100}
                />
                <ResultItem
                  label="Accessibility"
                  value={get(data, 'categories.accessibility.score', 0) * 100}
                />
                <ResultItem
                  label="Best Practices"
                  value={get(data, 'categories.best-practices.score', 0) * 100}
                />
                <ResultItem
                  label="Speed Index"
                  value={get(data, 'audits.speed-index.score', 0) * 100}
                />
              </div>
            </div>
          </animated.div>
        )}
      </Spring>
    );
  }
}

export default Results;
