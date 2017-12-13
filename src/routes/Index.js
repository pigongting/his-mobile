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
      <div className={styles.aaa}>
        <Link to={`/${this.props.locale}/dept/list`}>预约挂号</Link>
        <Link to={`/${this.props.locale}/visitmen/list?from=guahao`}>挂号列表</Link>
        <Link to={`/${this.props.locale}/visitmen/list`}>就诊人列表</Link>
        <Link to={`/${this.props.locale}/visitmen/list?from=recharge`}>就诊卡充值</Link>
        <Link to={`/${this.props.locale}/visitcard/rechargerecord`}>就诊卡充值记录</Link>
        <Link to={`/${this.props.locale}/visitmen/list?from=report`}>报告列表</Link>
        <Link to={`/${this.props.locale}/dept/article`}>医院导航</Link>
        <Link to={`/${this.props.locale}/hospital/article?id=1`}>医院介绍</Link>
        <Link to={`/${this.props.locale}/visitmen/list?from=outpatientwaitpay`}>门诊缴费</Link>
        <Link to={`/${this.props.locale}/visitmen/list?from=outpatienthavepay`}>门诊缴费记录</Link>
        <Link to={`/${this.props.locale}/inpatientpay/inputnumber`}>住院缴费</Link>
        <Link to={`/${this.props.locale}/user/homepage`}>个人中心</Link>
      </div>
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
