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
import styles from './HomePage.less';

const pagespace = 'inpatientpayhomepage';

const myImg = src => <img src={src} className="am-icon am-icon-md" alt="" style={{ width: 60, height: 60 }} />;

class InpatientPayHomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  listItemLink = (link) => {
    this._reactInternalInstance._context.router.push(`/${this.props.locale}/${link}`);
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
                <List>
                  <List.Item
                    className={styles.doorHeader}
                    arrow="horizontal"
                    thumb="/assets/img/doctorPhoto.png"
                    onClick={() => { this.listItemLink(`inpatientpay/info?no=${no}`); }}
                  >
                    <div>{detail.userName}</div>
                    <List.Item.Brief>{detail.visitNo}</List.Item.Brief>
                    <List.Item.Brief>押金余额：¥{(detail.depositLeftFee).toFixed(2)}</List.Item.Brief>
                  </List.Item>
                </List>

                <List className={cs(styles.commonList)}>
                  <List.Item arrow="horizontal" onClick={() => { this.listItemLink(`inpatientpay/deposit?no=${no}`); }}>押金补缴</List.Item>
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

export default connect(mapStateToProps, mapDispatchToProps)(InpatientPayHomePage);
