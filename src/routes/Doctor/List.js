import React from 'react';
import cs from 'classnames';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import PullToRefresh from 'antd-mobile/lib/pull-to-refresh';
import ListView from 'antd-mobile/lib/list-view';
import Flex from 'antd-mobile/lib/flex';
import Badge from 'antd-mobile/lib/badge';
import styles from './List.less';

class DoctorList extends React.Component {
  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => {
        console.log(row1);
        console.log(row2);
        return row1 !== row2;
      },
    });

    this.state = {
      dataSource,
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight,
      useBodyScroll: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { res: nextres } = nextProps.pagedata;
    const { res } = this.props.pagedata;

    if (nextres.rows && nextres.rows !== res.rows) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextres.rows),
      });
    }
  }

  onEndReached = (event) => {
    console.log(event);
  }

  render() {
    const { deptid } = this.props.pagedata.req;
    const { nextNumber } = this.props.pagedata.res;

    const row = (rowData, sectionID, rowID) => {
      console.log(rowData);
      return (
        <Link key={rowID} className={styles.docterItem} to={`/${this.props.locale}/doctor/homepage?id=${rowData.doctorId}&deptid=${deptid}`}>
          <Flex align="start">
            <div className={styles.docterPhotoSide}>
              <i style={{ backgroundImage: (rowData.imageUrl) ? `url(${rowData.imageUrl})` : 'url(/assets/img/doctorPhoto.png)' }} />
            </div>
            <Flex.Item>
              <Flex>
                <Flex.Item>
                  <div className={styles.doctorName}>{rowData.doctorName}</div>
                  <div className={styles.doctorTitle}>{rowData.title}</div>
                </Flex.Item>
                {
                  (rowData.okGhStatus)
                  ?
                    <div>
                      <div className={styles.schDate}><span>最近有号：</span>{moment(rowData.schDate).format('MM/DD')}</div>
                      <div className={styles.haveNumber}><Badge text="有号" /></div>
                    </div>
                  :
                    <div>
                      <div className={styles.schDate}><span>下轮放号：</span>{nextNumber.outNoTime ? moment(nextNumber.outNoTime).format('MM/DD HH:mm') : '查询中...'}</div>
                      <div className={styles.noneNumber}><Badge text="无号" /></div>
                    </div>
                }
              </Flex>
              <div className={styles.doctorIntro}>{rowData.intro}</div>
            </Flex.Item>
          </Flex>
        </Link>
      );
    };

    return (
      <div>
        <div className={styles.nextNumber}>下轮放号{nextNumber.outNoTime ? `(${moment(nextNumber.outNoTime).format('YYYY年MM月DD日')}号源)：${moment(nextNumber.nextNoTime).format('MM/DD HH:mm')}` : '(查询中...)'}</div>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={row}
          useBodyScroll={this.state.useBodyScroll}
          pageSize={4}
          onEndReached={this.onEndReached}
        />
        <div className={styles.dataOver}>数据加载完毕</div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {};
}

function mapStateToProps(state, ownProps) {
  return {
    loading: state.loading.effects['doctorlist/fetchs'],
    pagedata: state.doctorlist,
    locale: state.ssr.locale,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorList);
