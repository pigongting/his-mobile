import cs from 'classnames';
import moment from 'moment';
import React from 'react';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import Result from 'antd-mobile/lib/result';
import ActivityIndicator from 'antd-mobile/lib/activity-indicator';
import List from 'antd-mobile/lib/list';
import Flex from 'antd-mobile/lib/flex';
import Button from 'antd-mobile/lib/button';
import Icon from 'antd-mobile/lib/icon';
import styles from './Detail.less';

const pagespace = 'inpatientpaydetail';

const myImg = src => <img src={src} className="am-icon am-icon-md" alt="" style={{ width: 60, height: 60 }} />;

class InpatientPayDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { id, status } = this.props.pagedata.set;
    const { detail } = this.props.pagedata.res;

    return (
      <div>
        {id ?
          <div>
            {detail ?
              <div>
                <List className={cs(styles.commonList, styles.statusList)}>
                  <List.Item multipleLine wrap align="top" thumb={<Icon type="check-circle" color="#1F90E6" />} extra={moment(detail.orderTime).format('YYYY/MM/DD HH:mm')}>
                    <div>
                      {detail.orderStatus === 1 && '缴费成功'}
                    </div>
                    <List.Item.Brief>
                      {detail.orderStatus === 1 && '已成功缴费，如需打印发票，请到门诊一楼收费窗口补打'}
                    </List.Item.Brief>
                  </List.Item>
                </List>
                <List className={cs(styles.commonList)}>
                  <List.Item extra={detail.deptName}>住院科室</List.Item>
                  <List.Item extra={moment(detail.updateDt).format('YYYY/MM/DD HH:mm')}>缴费时间</List.Item>
                </List>
                <List className={cs(styles.commonList, styles.visitmenList)}>
                  <List.Item multipleLine extra={<ul><li>{detail.userName}</li><li>{detail.visitNo}</li></ul>}>就诊人</List.Item>
                </List>
                <List className={cs(styles.commonList, styles.moneyList)}>
                  <List.Item extra={detail.orderNo}>交易单号</List.Item>
                  <List.Item extra={`¥${detail.totalFee}`} className={styles.money}>缴费金额</List.Item>
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
            message="报告记录ID不能为空"
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

export default connect(mapStateToProps, mapDispatchToProps)(InpatientPayDetail);
