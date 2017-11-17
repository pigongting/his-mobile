import cs from 'classnames';
import React from 'react';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import Icon from 'antd-mobile/lib/icon';
import Button from 'antd-mobile/lib/button';
import List from 'antd-mobile/lib/list';
import Flex from 'antd-mobile/lib/flex';
import Result from 'antd-mobile/lib/result';
import InputItem from 'antd-mobile/lib/input-item';
import ActivityIndicator from 'antd-mobile/lib/activity-indicator';
import styles from './Recharge.less';

const pagespace = 'visitcardrecharge';

const myImg = src => <img src={src} className="am-icon am-icon-md" alt="" style={{ width: 60, height: 60 }} />;

class VisitCardRecharge extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.pagedata.dispatch = this._reactInternalInstance._context.store.dispatch;
    this.props.pagedata.pagespace = pagespace;
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
    const { no, notips, chooseMoney, visitmen } = this.props.pagedata.set;
    const { visitcardinfo } = this.props.pagedata.res;
    const { getFieldProps } = this.props.form;

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
            {visitcardinfo ?
              <div>
                <List className={cs(styles.commonList, styles.visitmenList)}>
                  <List.Item multipleLine extra={<ul><li>{visitcardinfo.userName}</li><li>{visitcardinfo.visitNo}</li></ul>}>就诊人</List.Item>
                </List>

                <List className={cs(styles.commonList, styles.hospitalList)}>
                  <List.Item extra={visitcardinfo.hospitalName}>医院名称</List.Item>
                </List>

                <List className={cs(styles.commonList, styles.hospitalList)}>
                  <List.Item extra={`￥${visitcardinfo.fee || 0}`}>就诊卡余额</List.Item>
                </List>

                <List className={cs(styles.commonList, styles.inputMoneyList)}>
                  <InputItem {...getFieldProps('inputmoney')} labelNumber={7} type="number" placeholder="请输入整数充值金额">输入充值金额</InputItem>
                </List>

                <List className={cs(styles.commonList, styles.chooseMoneyList)}>
                  <List.Item>
                    <div>或者选择充值金额</div>
                    <Flex className={styles.moneyOneList}>
                      <Flex.Item>
                        <Button size="small" type={(chooseMoney === 100) ? 'primary' : 'default'} onClick={() => this.props.handleChooseMoney(100)}>100</Button>
                      </Flex.Item>
                      <Flex.Item>
                        <Button size="small" type={(chooseMoney === 200) ? 'primary' : 'default'} onClick={() => this.props.handleChooseMoney(200)}>200</Button>
                      </Flex.Item>
                      <Flex.Item>
                        <Button size="small" type={(chooseMoney === 500) ? 'primary' : 'default'} onClick={() => this.props.handleChooseMoney(500)}>500</Button>
                      </Flex.Item>
                    </Flex>
                    <Flex className={styles.moneyTwoList}>
                      <Flex.Item>
                        <Button size="small" type={(chooseMoney === 1000) ? 'primary' : 'default'} onClick={() => this.props.handleChooseMoney(1000)}>1000</Button>
                      </Flex.Item>
                      <Flex.Item className={styles.inputMoney} />
                    </Flex>
                  </List.Item>
                </List>

                <div className={styles.submitButton}>
                  <Button type="primary" disabled={!chooseMoney && (!visitmen || !visitmen.inputmoney || !visitmen.inputmoney.value)} onClick={() => this.props.handleRecharge(this)}>立即充值</Button>
                </div>
              </div>
            :
              <ActivityIndicator text="Loading..." className={styles.visitcardinfoLoading} />
            }
          </div>
        }
      </div>
    );
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleChooseMoney: (v) => {
      dispatch({
        type: `${pagespace}/changeChooseMoney`,
        payload: v,
      });
    },
    handleRecharge: (t) => {
      const { no, chooseMoney, visitmen } = t.props.pagedata.set;
      const { visitcardinfo } = t.props.pagedata.res;

      dispatch({
        type: `${pagespace}/fetchInsertRow`,
        that: t,
        payload: {
          userId: visitcardinfo.userId,
          visitNo: no,
          fee: chooseMoney || visitmen.inputmoney.value,
        },
      });
    },
  };
}

function mapStateToProps(state, ownProps) {
  return {
    loading: state.loading.effects[`${pagespace}/fetchs`],
    pagedata: state[pagespace],
    locale: state.ssr.locale,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createForm({
  mapPropsToFields(props) {
    const { visitmen } = props.pagedata.set;
    return visitmen;
  },
  onFieldsChange(props, fields) {
    props.pagedata.dispatch({
      type: `${pagespace}/saveFields`,
      payload: fields,
    });
  },
})(VisitCardRecharge));
