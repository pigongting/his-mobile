import cs from 'classnames';
import moment from 'moment';
import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Result from 'antd-mobile/lib/result';
import ActivityIndicator from 'antd-mobile/lib/activity-indicator';
import List from 'antd-mobile/lib/list';
import Flex from 'antd-mobile/lib/flex';
import Button from 'antd-mobile/lib/button';
import styles from './Info.less';

const pagespace = 'inpatientpayinfo';

const myImg = src => <img src={src} className="am-icon am-icon-md" alt="" style={{ width: 60, height: 60 }} />;

class InpatientPayInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { no, notips } = this.props.pagedata.set;
    const { detail } = this.props.pagedata.res;
    console.log(detail);

    return (
      <div>
        {notips ?
          <Result
            img={myImg('https://gw.alipayobjects.com/zos/rmsportal/GIyMDJnuqmcqPLpHCSkj.svg')}
            title="无法完成操作"
            message={notips}
          />
        :
          <div>
            {detail ?
              <div>
                <List className={cs(styles.commonList)}>
                  <List.Item extra={detail.userName}>姓名</List.Item>
                  <List.Item extra={detail.inpatientNo}>住院号</List.Item>
                  <List.Item extra={detail.deptName}>住院科室</List.Item>
                  <List.Item extra={moment(detail.inDate).format('YYYY-MM-DD')}>入院日期</List.Item>
                  <List.Item extra={`¥${detail.depositTotalFee.toFixed(2)}`} className="money">押金总额</List.Item>
                  <List.Item extra={`¥${detail.depositLeftFee.toFixed(2)}`} className="money">押金余额</List.Item>
                  <List.Item extra={`¥${detail.inpatientFee.toFixed(2)}`} className="money">住院费用</List.Item>
                </List>
              </div>
            :
              <ActivityIndicator text="Loading..." className={styles.detailLoading} />
            }
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(InpatientPayInfo);
