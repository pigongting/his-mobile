import cs from 'classnames';
import moment from 'moment';
import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { createForm } from 'rc-form';
import Flex from 'antd-mobile/lib/flex';
import List from 'antd-mobile/lib/list';
import styles from './HomePage.less';

const pagespace = 'inpatientpayinputnumber';

const myImg = src => <img src={src} className="am-icon am-icon-md" alt="" style={{ width: 60, height: 60 }} />;

class UserHomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  listItemLink = (link) => {
    this._reactInternalInstance._context.router.push(`/${this.props.locale}/${link}`);
  }

  render() {
    return (
      <div>
        <List>
          <List.Item
            className={styles.doorHeader}
            arrow="horizontal"
            thumb="/assets/img/doctorPhoto.png"
            onClick={() => { this.listItemLink('visitmen/detail?id=13'); }}
          >
            <div>皮宫庭</div>
            <List.Item.Brief>454545</List.Item.Brief>
          </List.Item>
        </List>

        <List className={cs(styles.commonList)}>
          <List.Item arrow="horizontal" onClick={() => { this.listItemLink('visitmen/list'); }}>就诊人管理</List.Item>
        </List>

        <List className={cs(styles.commonList)}>
          <List.Item arrow="horizontal" onClick={() => { this.listItemLink('visitmen/list?from=guahao'); }}>我的挂号</List.Item>
          <List.Item arrow="horizontal" onClick={() => { this.listItemLink('visitcard/rechargerecord'); }}>充值记录</List.Item>
          <List.Item arrow="horizontal" onClick={() => { this.listItemLink('visitmen/list?from=outpatienthavepay'); }}>门诊缴费记录</List.Item>
          <List.Item arrow="horizontal" onClick={() => { this.listItemLink('visitmen/list?from=inpatienthavepay'); }}>住院缴费记录</List.Item>
        </List>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {};
}

function mapStateToProps(state, ownProps) {
  return {
    loading: state.loading.effects[`${pagespace}/fetchs`],
    pagedata: state[pagespace],
    locale: state.ssr.locale,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHomePage);
