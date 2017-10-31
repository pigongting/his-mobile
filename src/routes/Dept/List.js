import React from 'react';
import cs from 'classnames';
import update from 'immutability-helper';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Flex from 'antd-mobile/lib/flex';
import WhiteSpace from 'antd-mobile/lib/white-space';
import styles from './List.less';

class DeptList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      twoLevelList: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    const { res: nextres } = nextProps.pagedata;
    const { res } = this.props.pagedata;

    if (nextres.hospitalDeptId && nextres.hospitalDeptId[0] && (nextres.hospitalDeptId !== res.hospitalDeptId)) {
      this.setState(update(this.state, { twoLevelList: { $set: nextres.hospitalDeptId[0].children } }));
    }
  }

  loadTwoLevel(hospitalDeptId, i) {
    this.setState(update(this.state, { twoLevelList: { $set: hospitalDeptId[i].children } }));
  }

  render() {
    const { twoLevelList } = this.state;
    const { res } = this.props.pagedata;
    const { hospitalDeptId } = res;

    return (
      <div className={styles.pageCommon}>
        <Flex>
          <ul className={styles.oneLevel}>
            {hospitalDeptId && hospitalDeptId.map((item, index) => <li key={index} onClick={() => this.loadTwoLevel(hospitalDeptId, index)}>{item.label}</li>)}
          </ul>
          <Flex.Item>
            <div className={styles.twoLevel}>
              {twoLevelList && twoLevelList.map(item => <Link key={item.value} to={`/${this.props.locale}/doctor/list?id=${item.value}`}>{item.label}</Link>)}
            </div>
          </Flex.Item>
        </Flex>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {};
}

function mapStateToProps(state, ownProps) {
  return {
    loading: state.loading.effects['deptlist/fetchs'],
    pagedata: state.deptlist,
    locale: state.ssr.locale,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeptList);
