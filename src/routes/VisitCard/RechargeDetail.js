import cs from 'classnames';
import moment from 'moment';
import React from 'react';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import Icon from 'antd-mobile/lib/icon';
import List from 'antd-mobile/lib/list';
import Result from 'antd-mobile/lib/result';
import ActivityIndicator from 'antd-mobile/lib/activity-indicator';
import styles from './RechargeDetail.less';

const pagespace = 'visitcardrechargedetail';

const myImg = src => <img src={src} className="am-icon am-icon-md" alt="" style={{ width: 60, height: 60 }} />;

class VisitCardRechargeDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    // const { res: nextres } = nextProps.pagedata;
    // const { res } = this.props.pagedata;

    // if (nextres.orderlist && nextres.orderlist !== res.orderlist) {
    //   this.setState({
    //     dataSource: this.state.dataSource.cloneWithRows(nextres.orderlist),
    //   });
    // }
  }

  render() {
    const { id } = this.props.pagedata.set;
    const { detail } = this.props.pagedata.res;

    return (
      <div>
        {id ?
          <div>
            {detail ?
              <div>
                <List className={cs(styles.commonList, styles.statusList)}>
                  <List.Item multipleLine align="top" thumb={<Icon type="check-circle" color="#1F90E6" />} extra={moment(detail.updateDt).format('YYYY/MM/DD HH:mm')}>
                    <div>
                      {detail.visitStatus === null && '待支付'}
                      {detail.visitStatus === 1 && '充值成功'}
                    </div>
                    <List.Item.Brief>
                      {detail.visitStatus === null && '等待您完成付款'}
                      {detail.visitStatus === 1 && '您已充值成功'}
                    </List.Item.Brief>
                  </List.Item>
                </List>

                <List className={cs(styles.commonList, styles.visitmenList)}>
                  <List.Item multipleLine extra={<ul><li>{detail.userName}</li><li>{detail.visitNo}</li></ul>}>就诊人</List.Item>
                </List>

                <List className={cs(styles.commonList, styles.hospitalList)}>
                  <List.Item extra={detail.hospitalName}>医院名称</List.Item>
                </List>

                <List className={cs(styles.commonList, styles.dealList)}>
                  <List.Item extra={detail.visitNoRecId}>交易单号</List.Item>
                  <List.Item extra={'16700470'}>订单号</List.Item>
                  <List.Item extra={`￥${detail.fee}`} className="momey">充值金额</List.Item>
                </List>
              </div>
            :
              <ActivityIndicator text="Loading..." className={styles.detailLoading} />
            }
          </div>
        :
          <Result
            img={myImg('https://gw.alipayobjects.com/zos/rmsportal/GIyMDJnuqmcqPLpHCSkj.svg')}
            title="无法完成操作"
            message="就诊卡充值记录ID不能为空"
          />
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(VisitCardRechargeDetail);
