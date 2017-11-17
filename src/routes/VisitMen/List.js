import React from 'react';
import cs from 'classnames';
import { connect } from 'dva';
import Button from 'antd-mobile/lib/button';
import List from 'antd-mobile/lib/list';
import styles from './List.less';

const pagespace = 'visitmenlist';

class VisitMenList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { visitmenlist } = this.props.pagedata.res;

    return (
      <div>
        {visitmenlist ?
          <div>
            <List className="my-list">
              {visitmenlist.map((item, index) => {
                return (
                  <List.Item key={index} arrow="horizontal" onClick={() => this.props.handleDetail(this, item.userId, item.visitNo)}>
                    {item.userName}
                    <List.Item.Brief>{item.visitNo ? item.visitNo : '未绑定'}</List.Item.Brief>
                  </List.Item>
                );
              })}
            </List>
            <div className={styles.submitButton}>
              <Button type="primary" onClick={() => this.props.handleAdd(this)}>添加就诊人</Button>
            </div>
          </div>
        : null}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleDetail: (t, id, no) => {
      const { router } = t._reactInternalInstance._context;

      switch (t.props.pagedata.set.from) {
        case 'recharge':
          router.push(`/${t.props.locale}/visitcard/recharge?no=${no || ''}`);
          break;
        case 'report':
          router.push(`/${t.props.locale}/report/list?no=${no || ''}`);
          break;
        case 'getnumber':
          router.push(`/${t.props.locale}/getnumber/list?no=${no || ''}`);
          break;
        case 'lineup':
          router.push(`/${t.props.locale}/lineup/list?no=${no || ''}`);
          break;
        case 'outpatientpay':
          router.push(`/${t.props.locale}/outpatientpay/list?no=${no || ''}`);
          break;
        case 'inpatientpay':
          router.push(`/${t.props.locale}/inpatientpay/list?no=${no || ''}`);
          break;
        case 'account':
          router.push(`/${t.props.locale}/account/list?no=${no || ''}`);
          break;
        default:
          router.push(`/${t.props.locale}/visitmen/detail?id=${id}`);
          break;
      }
    },
    handleAdd: (t) => {
      t._reactInternalInstance._context.router.push(`/${t.props.locale}/visitmen/detail`);
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

export default connect(mapStateToProps, mapDispatchToProps)(VisitMenList);
