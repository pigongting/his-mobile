import cs from 'classnames';
import moment from 'moment';
import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { createForm } from 'rc-form';
import List from 'antd-mobile/lib/list';
import InputItem from 'antd-mobile/lib/input-item';
import Icon from 'antd-mobile/lib/icon';
import Button from 'antd-mobile/lib/button';
import Toast from 'antd-mobile/lib/toast';
import styles from './InputNumber.less';

const pagespace = 'inpatientpayinputnumber';

const myImg = src => <img src={src} className="am-icon am-icon-md" alt="" style={{ width: 60, height: 60 }} />;

class InpatientPayInputNumber extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.pagedata.dispatch = this._reactInternalInstance._context.store.dispatch;
    this.props.pagedata.pagespace = pagespace;
  }

  render() {
    const { getFieldProps } = this.props.form;
    const { req } = this.props.pagedata;

    return (
      <div>
        <List className={styles.inputList}>
          <InputItem
            {...getFieldProps('realName', { rules: [{ required: true, message: '必须输入住院号' }] })}
            placeholder="请输入您的姓名"
            labelNumber={4}
            className={cs((req.realName && req.realName.errors) ? 'error' : '')}
          >姓&emsp;名</InputItem>
          <InputItem
            {...getFieldProps('inpatientNo', { rules: [{ required: true, message: '必须输入住院号' }] })}
            placeholder="请输入您的住院号"
            labelNumber={4}
            className={cs((req.inpatientNo && req.inpatientNo.errors) ? 'error' : '')}
          >住院号</InputItem>
        </List>
        <div className={styles.submitButton}>
          <Button type="primary" onClick={() => this.props.handleSubmit(this)}>确定</Button>
        </div>
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
          console.log(fields);
          t._reactInternalInstance._context.router.push(`/${t.props.locale}/inpatientpay/homepage?no=${fields.inpatientNo}`);
        } else {
          Toast.fail('填写有误，请核对后提交！', 3);
        }
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
    console.log(props);
    const { req } = props.pagedata;
    return {
      realName: {
        value: req.realName.value,
      },
      inpatientNo: {
        value: req.inpatientNo.value,
      },
    };
  },
  onFieldsChange(props, fields) {
    props.pagedata.dispatch({
      type: `${pagespace}/saveFields`,
      payload: fields,
    });
  },
})(InpatientPayInputNumber));
