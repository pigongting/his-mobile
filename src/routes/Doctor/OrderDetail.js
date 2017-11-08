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
import styles from './OrderDetail.less';

moment.locale('zh-cn');

class DoctorOrderDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    const { res: nextres } = nextProps.pagedata;
    const { res } = this.props.pagedata;
    const router = this._reactInternalInstance._context.router;

    if (nextres.orderid) {
      router.push(`/${nextProps.locale}/doctor/orderDetail?id=${nextres.orderid}`);
    }
  }

  render() {
    const { orderdetail } = this.props.pagedata.res;

    return (
      <div>
        {orderdetail ?
          <div>
            <Flex className={styles.stateBar}>
              <div className={styles.iconSide}><Icon type="check-circle" color="#108ee9" /></div>
              <Flex.Item>
                {orderdetail.dealwithStatus === 1 && '待就诊'}
                {orderdetail.dealwithStatus === 2 && '已取消'}
              </Flex.Item>
            </Flex>
            <List renderHeader={() => '预约信息'} className={styles.infoList}>
              <List.Item extra={orderdetail.hospitalName}>医院</List.Item>
              <List.Item extra={orderdetail.deptName}>科室</List.Item>
              <List.Item extra={orderdetail.doctorName}>医生</List.Item>
              <List.Item extra={`${moment(orderdetail.toDate).format('YYYY-MM-DD')} ${moment(orderdetail.beginTime).format('HH:mm')}-${moment(orderdetail.endTime).format('HH:mm')}`}>时间</List.Item>
              <List.Item extra={`￥${orderdetail.guaHaoFee}`}>挂号费</List.Item>
            </List>
            <List renderHeader={() => '就诊人信息'} className={styles.infoList}>
              <List.Item extra={orderdetail.userName}>就诊人</List.Item>
              <List.Item extra={orderdetail.mobile}>手机号</List.Item>
            </List>
            <dl className={styles.tips}>
              <dt>就诊贴士</dt>
              <dd>
                <p>1.请凭订单号，就诊时间前到医院各科室楼层的护士台取号处取号。若超时未取号，不保留取号权利。</p>
                <p>2.如需取消预约，请在就诊日前一天16:30，就诊当天上午11:30前可取消下午的预约号前操作。</p>
              </dd>
            </dl>
            <div className={styles.actionBar}>
              <Button inline size="small" onClick={() => this.props.handleCancel(this)}>取消预约</Button>
            </div>
          </div>
        : null}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleCancel: (t) => {
      console.log(t);
    },
  };
}

function mapStateToProps(state, ownProps) {
  return {
    loading: state.loading.effects['doctororderdetail/fetchs'],
    pagedata: state.doctororderdetail,
    locale: state.ssr.locale,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorOrderDetail);
