import React from 'react';
import cs from 'classnames';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { createForm } from 'rc-form';
import Flex from 'antd-mobile/lib/flex';
import Drawer from 'antd-mobile/lib/drawer';
import Button from 'antd-mobile/lib/button';
import List from 'antd-mobile/lib/list';
import Icon from 'antd-mobile/lib/icon';
import styles from './List.less';

moment.locale('zh-cn');

class VisitMenList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { visitmenlist } = this.props.pagedata.res;

    return (
      <div>
        {visitmenlist ?
          <div>
            jk;
          </div>
        : null}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {};
}

function mapStateToProps(state, ownProps) {
  return {
    loading: state.loading.effects['visitmenlist/fetchs'],
    pagedata: state.visitmenlist,
    locale: state.ssr.locale,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VisitMenList);
