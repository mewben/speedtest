import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export class ResultItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
    };
  }

  componentDidMount() {
    this.timer = setInterval(this.progressTimer, 20);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progressTimer = () => {
    const { score } = this.state;
    const { value } = this.props;

    if (score >= value) {
      clearInterval(this.timer);
    } else {
      this.setState({ score: score >= 100 ? 100 : score + 1 });
    }
  };

  render() {
    const { score } = this.state;
    const { label } = this.props;

    let color = '#dc3545';
    if (score >= 50) {
      color = '#ffc107';
    }
    if (score >= 90) {
      color = '#28a745';
    }

    return (
      <div className="mt-5 mr-4 results-item">
        <CircularProgress
          variant="determinate"
          size={100}
          thickness={0.5}
          value={score}
          style={{ color }}
        />
        <div className="results-value">{score}</div>
        <div className="results-label">{label}</div>
      </div>
    );
  }
}

ResultItem.defaultProps = {
  score: 0,
  label: '',
};

export default ResultItem;
