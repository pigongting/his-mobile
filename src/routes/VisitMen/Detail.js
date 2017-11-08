import React from 'react';
import cs from 'classnames';
import moment from 'moment';
import update from 'immutability-helper';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { createForm } from 'rc-form';
import Flex from 'antd-mobile/lib/flex';
import Drawer from 'antd-mobile/lib/drawer';
import Button from 'antd-mobile/lib/button';
import List from 'antd-mobile/lib/list';
import Icon from 'antd-mobile/lib/icon';
import Tabs from 'antd-mobile/lib/tabs';
import InputItem from 'antd-mobile/lib/input-item';
import NoticeBar from 'antd-mobile/lib/notice-bar';
import Picker from 'antd-mobile/lib/picker';
import DatePicker from 'antd-mobile/lib/date-picker';
import Switch from 'antd-mobile/lib/switch';
import { handleCascadAddr } from '../../actions/CascadAddr';
import styles from './Detail.less';

moment.locale('zh-cn');

const pagespace = 'visitmendetail';

class VisitMenDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 0,
      childrenIdNumber: true,
    };
  }

  componentDidMount() {
    this.props.pagedata.dispatch = this._reactInternalInstance._context.store.dispatch;
  }

  tabsOnChange = (tab, index) => {
    this.setState(update(this.state, {
      type: { $set: index },
    }));
  }

  switchChange = (checked) => {
    this.setState(update(this.state, {
      childrenIdNumber: { $set: checked },
    }));
  }

  render() {
    const { getFieldProps } = this.props.form;
    const { userName, idType, idNumber, gender, birthday, mobile, pcaCode } = this.props.pagedata.req.visitmen;
    const { pcaCode: addrData } = this.props.pagedata.res;
    const { type, childrenIdNumber } = this.state;

    const tabs = [{ title: '成人' }, { title: '儿童' }];

    const idTypeArray = [
      { value: '1', label: '身份证' },
      { value: '2', label: '护照' },
      { value: '3', label: '军官证' },
      { value: '4', label: '港澳通行证' },
    ];

    const genderArray = [
      { value: '1', label: '男' },
      { value: '2', label: '女' },
    ];

    return (
      <div className={styles.tabsWarp}>
        <Tabs tabs={tabs} initialPage={type} onChange={this.tabsOnChange} />
        <NoticeBar>互联网就医实行实名制，请准确填写就诊人信息。</NoticeBar>
        <List>
          <InputItem {...getFieldProps('userName')} placeholder="请输入真实姓名">真实姓名</InputItem>
          {(type === 0) ?
            <Picker data={idTypeArray} cols={1} {...getFieldProps('idType')}>
              <List.Item arrow="horizontal" className={cs(idType && idType.value ? 'choosed' : 'nochoose')}>证件类型</List.Item>
            </Picker>
            :
            <List.Item extra={<Switch checked={childrenIdNumber} onClick={this.switchChange} />}>儿童身份证</List.Item>
          }
          {(type === 0 || childrenIdNumber) ?
            <InputItem {...getFieldProps('idNumber')} type="phone" placeholder="请输入证件号码">证件号码</InputItem>
          : null}
          <Picker data={genderArray} cols={1} extra="请选择" {...getFieldProps('gender')}>
            <List.Item arrow="horizontal" className={cs(gender && gender.value ? 'choosed' : 'nochoose')}>性别</List.Item>
          </Picker>
          <DatePicker
            mode="date" extra="请选择" title="请选择出生日期"
            minDate={new Date('1900/01/01 00:00:00')} maxDate={new Date(Date.now())}
            {...getFieldProps('birthday', { rules: [{ required: true, message: '必须选择出生日期' }] })}
          >
            <List.Item arrow="horizontal" className={cs(birthday && birthday.value ? 'choosed' : 'nochoose')}>出生日期</List.Item>
          </DatePicker>
        </List>
        <List renderHeader={() => '其他信息'}>
          {(type === 1) ? <InputItem {...getFieldProps('userName')} labelNumber={7} placeholder="请输入监护人姓名">监护人姓名</InputItem> : null}
          {(type === 1) ? <InputItem {...getFieldProps('idNumber')} labelNumber={7} placeholder="请输入监护人身份证号" type="phone">监护人身份证号</InputItem> : null}
          <InputItem {...getFieldProps('mobile')} type="phone" labelNumber={7} placeholder="请输入手机号">手机号（选填）</InputItem>
          <Picker data={addrData} cols={2} {...getFieldProps('pcaCode')}>
            <List.Item arrow="horizontal" onClick={addrData ? () => {} : this.props.handleCascadAddr} className={cs(pcaCode && pcaCode.value ? 'choosed' : 'nochoose')}>居住城市（选填）</List.Item>
          </Picker>
        </List>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleCascadAddr: () => handleCascadAddr(dispatch, pagespace, 'pcaCode'),
    pickerChage: (val) => {
      console.log(val);
    },
  };
}

function mapStateToProps(state, ownProps) {
  return {
    loading: state.loading.effects['visitmendetail/fetchs'],
    pagedata: state.visitmendetail,
    locale: state.ssr.locale,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createForm({
  mapPropsToFields(props) {
    console.log(props);
    const { visitmen } = props.pagedata.req;
    const mapreq = {};

    for (const key in visitmen) {
      if (key) {
        mapreq[key] = {};
        mapreq[key].value = visitmen[key].value;
      }
    }

    return mapreq;
  },
  onFieldsChange(props, fields) {
    props.pagedata.dispatch({
      type: `${pagespace}/saveFields`,
      payload: fields,
    });
  },
})(VisitMenDetail));
