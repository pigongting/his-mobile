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

const pagespace = 'outpatientpaydetail';

const myImg = src => <img src={src} className="am-icon am-icon-md" alt="" style={{ width: 60, height: 60 }} />;

class OutpatientPayDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { id, status } = this.props.pagedata.set;
    const { detail, detaillist } = this.props.pagedata.res;

    return (
      <div>
        {id ?
          <div>
            {detail ?
              <div>
                {status === 'have' ?
                  <div>
                    <List className={cs(styles.commonList, styles.statusList)}>
                      <List.Item multipleLine wrap align="top" thumb={<Icon type="check-circle" color="#1F90E6" />} extra={moment(detail.orderTime).format('YYYY/MM/DD HH:mm')}>
                        <div>
                          {detail.orderStatus === 1 && '缴费成功'}
                        </div>
                        <List.Item.Brief>
                          {detail.orderStatus === 1 && '已成功缴费，请您携带就诊卡前往药房取药或者到检查/检验/治疗等科室执行项目，如需打印发票，请到门诊一楼收费窗口补打'}
                        </List.Item.Brief>
                      </List.Item>
                    </List>
                    <List className={cs(styles.commonList)}>
                      <List.Item extra={detail.deptName}>科室</List.Item>
                      <List.Item extra={detail.doctorName}>医生</List.Item>
                      <List.Item extra={detail.updateDt}>缴费时间</List.Item>
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
                  <div>
                    <List className={cs(styles.commonList)}>
                      <List.Item extra={detail.doctorName}>医生</List.Item>
                      <List.Item extra={detail.visitNo} multipleLine wrap>就诊卡号</List.Item>
                    </List>

                    <Flex className={styles.tableHead}>
                      <Flex.Item>项目名称</Flex.Item>
                      <Flex.Item>单价</Flex.Item>
                      <Flex.Item>数量</Flex.Item>
                      <Flex.Item>金额</Flex.Item>
                    </Flex>

                    <Flex className={styles.tableNeck}>
                      <Flex.Item>门诊药房(总额)：</Flex.Item>
                      <Flex.Item>{`¥${detail.totalFee}`}</Flex.Item>
                    </Flex>

                    {detaillist && detaillist.map((item, index) => <Flex key={index} className={styles.tableBody}>
                      <Flex.Item>{item.projectName}</Flex.Item>
                      <Flex.Item>{item.price}</Flex.Item>
                      <Flex.Item>{item.qty}</Flex.Item>
                      <Flex.Item>{`¥${item.fee}`}</Flex.Item>
                    </Flex>)}

                    <Flex className={styles.submitBar}>
                      <Flex.Item>缴费金额：<span>{`¥${detail.totalFee}`}</span></Flex.Item>
                      <div className={styles.submitButton}><Button type="primary">&emsp;确认支付&emsp;</Button></div>
                    </Flex>
                  </div>
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(OutpatientPayDetail);
