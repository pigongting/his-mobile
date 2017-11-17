import React from 'react';
import cs from 'classnames';
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
import Toast from 'antd-mobile/lib/toast';
import { handleCascadAddr } from '../../actions/CascadAddr';
import styles from './Detail.less';

const pagespace = 'visitmendetail';

class VisitMenDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 0,
      childrenIdNumber: true,
    };
    console.log(this);
  }

  componentDidMount() {
    this.props.pagedata.dispatch = this._reactInternalInstance._context.store.dispatch;
    this.props.pagedata.pagespace = pagespace;
    this.props.handleCascadAddr();
  }

  componentWillReceiveProps(nextProps) {
    const { visitmen, visitmenid } = nextProps.pagedata.req;

    if (visitmen && visitmenid) {
      this.setState(update(this.state, {
        type: {
          $set: (() => { if (visitmen.guardianId && visitmen.guardianId.value) { return 1; } else { return 0; } })(),
        },
        childrenIdNumber: {
          $set: (() => { if (visitmen.idNumber && visitmen.idNumber.value) { return true; } else { return false; } })(),
        },
      }));
    }
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
    const { visitmenid, visitmen } = this.props.pagedata.req;
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
      <div>
        {(visitmen || !visitmenid) ?
          <div>

            {visitmenid ? null : <Tabs tabs={tabs} page={type} onChange={this.tabsOnChange} />}

            <NoticeBar>{visitmenid ? '就诊人资料已归档，如有误，请删除后重新添加。' : '互联网就医实行实名制，请准确填写就诊人信息。'}</NoticeBar>

            {visitmenid ?
              <List renderHeader={() => '就诊卡'}>
                {(visitmen && visitmen.visitNo && visitmen.visitNo.value) ?
                  <List.Item className={styles.visitcardBind}>
                    <div className={styles.visitNo}>{visitmen.visitNo.value}</div>
                    <div className={styles.buttonWarp}>
                      <Button type="ghost" size="small" inline onClick={() => this.props.handleUnBind(this)}>解除绑定</Button>
                    </div>
                  </List.Item>
                :
                  <List.Item className={styles.visitcardNoBind}>
                    <Flex>
                      <Flex.Item>
                        <InputItem ref={(child) => { this.visitNo = child; return child; }} placeholder="请输入就诊卡号" />
                      </Flex.Item>
                      <div className={styles.buttonWarp}><Button type="primary" onClick={() => this.props.handleBind(this)}>绑定</Button></div>
                    </Flex>
                    <div className={styles.tips}>请输入在 <span>导诊服务台（不要去窗口）</span>领取的空白就诊卡号。</div>
                  </List.Item>
                }
              </List>
            : null}

            <div className={styles.visitmen}>
              <List renderHeader={() => '就诊人'}>
                <InputItem
                  {...getFieldProps('userName', { rules: [{ required: true, message: '必须输入真实姓名' }] })}
                  className={cs((visitmen && visitmen.userName && visitmen.userName.errors) ? 'error' : '')}
                  placeholder="请输入真实姓名" disabled={visitmenid}
                >真实姓名</InputItem>

                {(type === 0) ?
                  <Picker
                    {...getFieldProps('idType', { rules: [{ required: true, message: '必须选择证件类型' }] })}
                    data={idTypeArray} cols={1} extra="请选择" disabled={visitmenid}
                  >
                    <List.Item
                      arrow={visitmenid ? '' : 'horizontal'}
                      className={cs((visitmen && visitmen.idType && visitmen.idType.value) ? '' : 'nochoose', (visitmen && visitmen.idType && visitmen.idType.errors) ? 'error' : '', visitmenid ? 'disabled' : '')}
                    >证件类型</List.Item>
                  </Picker>
                : null}

                {(type === 1 && !visitmenid) ?
                  <List.Item extra={<Switch checked={childrenIdNumber} onClick={this.switchChange} />} disabled={visitmenid}>儿童身份证</List.Item>
                : null}

                {(type === 0 || childrenIdNumber) ?
                  <InputItem
                    {...getFieldProps('idNumber', { rules: [{ required: true, message: '必须输入证件号码' }] })}
                    className={cs((visitmen && visitmen.idNumber && visitmen.idNumber.errors) ? 'error' : '')}
                    placeholder="请输入证件号码" disabled={visitmenid}
                  >证件号码</InputItem>
                : null}

                <Picker
                  {...getFieldProps('gender', { rules: [{ required: true, message: '必须选择性别' }] })}
                  data={genderArray} cols={1} extra="请选择" disabled={visitmenid}
                >
                  <List.Item
                    arrow={visitmenid ? '' : 'horizontal'}
                    className={cs(visitmen && visitmen.gender && visitmen.gender.value ? '' : 'nochoose', (visitmen && visitmen.gender && visitmen.gender.errors) ? 'error' : '', visitmenid ? 'disabled' : '')}
                  >性别</List.Item>
                </Picker>

                <DatePicker
                  {...getFieldProps('birthday', { rules: [{ required: true, message: '必须选择出生日期' }] })}
                  mode="date" extra="请选择" title="请选择出生日期" disabled={visitmenid}
                  minDate={new Date('1900/01/01 00:00:00')} maxDate={new Date(Date.now())}
                >
                  <List.Item
                    arrow={visitmenid ? '' : 'horizontal'}
                    className={cs(visitmen && visitmen.birthday && visitmen.birthday.value ? '' : 'nochoose', (visitmen && visitmen.birthday && visitmen.birthday.errors) ? 'error' : '', visitmenid ? 'disabled' : '')}
                  >出生日期</List.Item>
                </DatePicker>
              </List>

              <List renderHeader={() => '其他信息'}>

                {(type === 1) ?
                  <InputItem
                    {...getFieldProps('guardianName', { rules: [{ required: true, message: '必须输入监护人姓名' }] })}
                    className={cs((visitmen && visitmen.guardianName && visitmen.guardianName.errors) ? 'error' : '')}
                    labelNumber={7} placeholder="请输入监护人姓名" disabled={visitmenid}
                  >监护人姓名</InputItem>
                : null}

                {(type === 1) ?
                  <InputItem
                    {...getFieldProps('guardianId', { rules: [{ required: true, message: '必须输入监护人身份证号' }] })}
                    labelNumber={7} placeholder="请输入监护人身份证号" disabled={visitmenid}
                    className={cs((visitmen && visitmen.guardianId && visitmen.guardianId.errors) ? 'error' : '')}
                  >监护人身份证号</InputItem>
                : null}

                <InputItem
                  {...getFieldProps('mobile', {
                    validateTrigger: 'onBlur',
                    rules: [
                      { pattern: /^1[34578][0-9] \d{4} \d{4}$/, message: '手机号格式不正确' },
                    ],
                  })}
                  placeholder={(visitmenid) ? '未设置' : '请输入手机号'}
                  labelNumber={7} type="phone" disabled={visitmenid}
                  className={cs((visitmen && visitmen.mobile && visitmen.mobile.errors) ? 'error' : '')}
                >
                  手机号（选填）
                </InputItem>

                <Picker
                  {...getFieldProps('pcaCode')}
                  data={addrData} cols={2} disabled={visitmenid}
                  extra={(visitmenid) ? '未设置' : '请选择'}
                >
                  <List.Item
                    arrow={visitmenid ? '' : 'horizontal'} onClick={addrData ? () => {} : this.props.handleCascadAddr}
                    className={cs(visitmen && visitmen.pcaCode && visitmen.pcaCode.value ? '' : 'nochoose', visitmenid ? 'disabled' : '')}
                  >居住城市（选填）</List.Item>
                </Picker>

              </List>

              <div className={styles.submitButton}>
                {visitmenid ?
                  <Button onClick={() => this.props.handleDelete(this)}>删除就诊人</Button>
                :
                  <Button type="primary" onClick={() => this.props.handleSubmit(this)}>提交</Button>
                }
              </div>
            </div>
          </div>
        : null}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleCascadAddr: () => handleCascadAddr(dispatch, pagespace, 'pcaCode'),
    handleSubmit: (t) => {
      const { form, pagedata } = t.props;
      const { req } = pagedata;

      form.validateFields((error, value) => {
        if (!error) {
          const fields = form.getFieldsValue();
          dispatch({
            type: `${pagespace}/fetchInsertRow`,
            that: t,
            payload: {
              sysUserId: 1,
              userName: fields.userName,
              idType: fields.idType && fields.idType[fields.idType.length - 1],
              idNumber: fields.idNumber,
              gender: fields.gender && fields.gender[0],
              birthday: fields.birthday,
              mobile: fields.mobile,
              pcaCode: fields.pcaCode && fields.pcaCode[fields.pcaCode.length - 1],
              guardianName: fields.guardianName,
              guardianId: fields.guardianId,
            },
          });
        } else {
          Toast.fail('填写有误，请核对后提交！', 3);
        }
      });
    },
    handleBind: (t) => {
      const { req } = t.props.pagedata;

      dispatch({
        type: `${pagespace}/fetchVisitCardInsertRow`,
        that: t,
        payload: {
          userId: req.visitmenid,
          visitNo: t.visitNo.state.value,
        },
      });
    },
    handleUnBind: (t) => {
      const { req } = t.props.pagedata;

      dispatch({
        type: `${pagespace}/fetchVisitCardDeleteRow`,
        that: t,
        payload: {
          userId: req.visitmenid,
          visitNo: req.visitmen.visitNo.value,
        },
      });
    },
    handleDelete: (t) => {
      dispatch({
        type: `${pagespace}/fetchDeleteRow`,
        that: t,
        payload: t.props.pagedata.req.visitmenid,
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
    const { visitmen } = props.pagedata.req;
    // console.log(visitmen);
    return visitmen;
  },
  onFieldsChange(props, fields) {
    props.pagedata.dispatch({
      type: `${pagespace}/saveFields`,
      payload: fields,
    });
  },
})(VisitMenDetail));
