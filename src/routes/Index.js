import React from 'react';
import moment from 'moment';
import cs from 'classnames';
import { connect } from 'dva';
import { Link } from 'dva/router';

// 本页样式
import styles from './Index.less';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>123</div>
    );
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {};
}

function mapStateToProps(state, ownProps) {
  return {
    loading: state.loading.effects['index/fetch'],
    pagedata: state.index,
    locale: state.ssr.locale,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
