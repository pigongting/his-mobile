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
import InputItem from 'antd-mobile/lib/input-item';
import styles from './OrderConfirm.less';

moment.locale('zh-cn');

class DoctorOrderConfirm extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    const { res: nextres } = nextProps.pagedata;
    const { res } = this.props.pagedata;
    const router = this._reactInternalInstance._context.router;

    if (nextres.orderid) {
      router.push(`/${nextProps.locale}/doctor/orderdetail?id=${nextres.orderid}`);
    }
  }

  render() {
    const { getFieldProps } = this.props.form;
    const { confirminfo } = this.props.pagedata.res;

    console.log(...getFieldProps('money3'));

    return (
      <div>
        {confirminfo ?
          <div>
            <div className={styles.confirmInfo}>
              <div className={styles.docterItem}>
                <Flex align="start">
                  <div className={styles.docterPhotoSide}>
                    <i style={{ backgroundImage: (confirminfo.imageUrl) ? `url(${confirminfo.imageUrl})` : 'url(/assets/img/doctorPhoto.png)' }} />
                  </div>
                  <Flex.Item>
                    <Flex>
                      <Flex.Item>
                        <div className={styles.doctorName}>{confirminfo.doctorName}</div>
                        <div className={styles.doctorLead}>
                          <div>{confirminfo.title} {confirminfo.deptName}</div>
                          <div>{confirminfo.hospitalName}</div>
                        </div>
                      </Flex.Item>
                    </Flex>
                  </Flex.Item>
                </Flex>
              </div>
              <ul className={styles.orderInfo}>
                <li>
                  <Flex>
                    <div className={styles.propName}>预约日期：</div>
                    <Flex.Item>{moment(confirminfo.schDate).format('YYYY-MM-DD')}</Flex.Item>
                  </Flex>
                </li>
                <li>
                  <Flex>
                    <div className={styles.propName}>就诊时段：</div>
                    <Flex.Item>{moment(confirminfo.startTime).format('HH:mm')}-{moment(confirminfo.endTime).format('HH:mm')}</Flex.Item>
                  </Flex>
                </li>
                <li>
                  <Flex>
                    <div className={styles.propName}>挂号费用：</div>
                    <Flex.Item>&yen;{confirminfo.ghFee}</Flex.Item>
                  </Flex>
                </li>
                <li>
                  <Flex align="start">
                    <div className={styles.propName}>就诊地址：</div>
                    <Flex.Item>{confirminfo.deptAddress}{confirminfo.deptFloor}</Flex.Item>
                  </Flex>
                </li>
              </ul>
              <List>
                <List.Item extra="皮宫庭" arrow="horizontal" onClick={() => {}}>就诊人</List.Item>
                <InputItem
                  {...getFieldProps('visitNo')}
                  type="money"
                  placeholder="可不填"
                  clear
                >就诊卡</InputItem>
              </List>
            </div>
            <div className={styles.submitButton}>
              <Button type="primary" onClick={() => this.props.handleSubmit(this)}>提交</Button>
            </div>
          </div>
        : null}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleSubmit: (t) => {
      const { form, pagedata } = t.props;
      const { req } = pagedata;

      form.validateFields((error, value) => {
        if (!error) {
          const fields = form.getFieldsValue();

          dispatch({
            type: 'doctororderconfirm/submitOrderConfirm',
            payload: {
              doctorSchId: req.doctorSchId,
              userId: req.userId,
              visitNo: fields.visitNo,
              noType: 'wechat',
            },
          });
        }
      });
    },
  };
}

function mapStateToProps(state, ownProps) {
  return {
    loading: state.loading.effects['doctororderconfirm/fetchs'],
    pagedata: state.doctororderconfirm,
    locale: state.ssr.locale,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createForm({
  mapPropsToFields(props) {
    const { req } = props.pagedata;
    return {
      visitNo: {
        value: req.visitNo,
      },
    };
  },
})(DoctorOrderConfirm));
