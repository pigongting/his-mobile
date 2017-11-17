import cs from 'classnames';
import moment from 'moment';
import React from 'react';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import Icon from 'antd-mobile/lib/icon';
import List from 'antd-mobile/lib/list';
import Flex from 'antd-mobile/lib/flex';
import Result from 'antd-mobile/lib/result';
import ActivityIndicator from 'antd-mobile/lib/activity-indicator';
import styles from './Detail.less';

const pagespace = 'reportdetail';

const myImg = src => <img src={src} className="am-icon am-icon-md" alt="" style={{ width: 60, height: 60 }} />;

class ReportDetail extends React.Component {
  constructor(props) {
    super(props);
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
                <div className={styles.titleHeader}>{detail.reportType}</div>

                <Flex className={styles.checkMen}>
                  <Flex.Item>
                    姓名
                    <div className={styles.checkMenValue}>{detail.visitName}</div>
                  </Flex.Item>
                  <Flex.Item>
                    性别
                    <div className={styles.checkMenValue}>{detail.gender === 1 ? '男' : '女' }</div>
                  </Flex.Item>
                  <Flex.Item>
                    年龄
                    <div className={styles.checkMenValue}>{detail.age}</div>
                  </Flex.Item>
                </Flex>

                <List className={cs(styles.commonList)}>
                  <List.Item extra={moment(detail.updateDt).format('YYYY-MM-DD HH:mm:ss')}>报告时间</List.Item>
                  <List.Item extra={detail.reportNo} multipleLine wrap>报告单号</List.Item>
                </List>

                <List className={cs(styles.commonList)}>
                  <List.Item extra={detail.checkPart} multipleLine wrap>检查部位</List.Item>
                  <List.Item extra={detail.checkDetail} multipleLine wrap className="checkDetail">检查所见</List.Item>
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

export default connect(mapStateToProps, mapDispatchToProps)(ReportDetail);
