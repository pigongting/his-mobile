import React from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';

class PageFrame extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {};
}

function mapStateToProps(state, ownProps) {
  return {
    pagedata: state.pageframe,
    loading: state.loading,
    locale: state.ssr.locale,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PageFrame);
