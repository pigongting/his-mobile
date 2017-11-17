import update from 'immutability-helper';
import moment from 'moment';
import cs from 'classnames';
import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import ListView from 'antd-mobile/lib/list-view';
import Flex from 'antd-mobile/lib/flex';
import List from 'antd-mobile/lib/list';
import Icon from 'antd-mobile/lib/icon';
import styles from './OrderList.less';

const pagespace = 'doctororderlist';

class DoctorOrderList extends React.Component {
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

    if (nextres.orderlist && nextres.orderlist !== res.orderlist) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextres.orderlist),
      });
    }
  }

  onEndReached = (event) => {
    console.log(event);
  }

  render() {
    const { orderlist } = this.props.pagedata.res;

    const row = (rowData, sectionID, rowID) => {
      console.log(rowData);
      return (
        <Link key={rowID} className={styles.orderItem} to={`/${this.props.locale}/doctor/orderdetail?id=${rowData.guaHaoPreId}`}>
          <Flex className={styles.itemHeader}>
            <Flex.Item className={styles.lead}><span>就诊人：</span>{rowData.userName}</Flex.Item>
            <div className={cs((rowData.dealwithStatus === 1) ? styles.wait : '', (rowData.dealwithStatus === 2) ? styles.cancle : '')}>
              {rowData.dealwithStatus === 1 && '待就诊'}
              {rowData.dealwithStatus === 2 && '已取消'}
            </div>
          </Flex>
          <Flex className={styles.itemBody}>
            <Flex.Item>
              <div className={styles.lead}>{rowData.doctorName}</div>
              <div className={styles.vice}>{rowData.hospitalName}{rowData.deptName}</div>
              <div className={styles.vice}>{moment(rowData.toDate).format('YYYY-MM-DD')} {moment(rowData.beginTime).format('HH:mm')}-{moment(rowData.endTime).format('HH:mm')}</div>
            </Flex.Item>
            <div><Icon type="right" color="#bbb" /></div>
          </Flex>
        </Link>
      );
    };

    return (
      <div>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={row}
          useBodyScroll={this.state.useBodyScroll}
          pageSize={4}
          onEndReached={this.onEndReached}
          className={styles.orderListView}
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
    loading: state.loading.effects[`${pagespace}/fetchs`],
    pagedata: state[pagespace],
    locale: state.ssr.locale,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorOrderList);
