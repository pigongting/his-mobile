import cs from 'classnames';
import moment from 'moment';
import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import ActivityIndicator from 'antd-mobile/lib/activity-indicator';
import ListView from 'antd-mobile/lib/list-view';
import List from 'antd-mobile/lib/list';
import styles from './RechargeRecord.less';

const pagespace = 'visitcardrechargerecord';

class VisitCardRechargeRecord extends React.Component {
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
    const { rows } = this.props.pagedata.res;

    const row = (rowData, sectionID, rowID) => {
      console.log(rowData);
      return (
        <Link key={rowID} className={styles.recordItem} to={`/${this.props.locale}/visitcard/rechargedetail?id=${rowData.visitNoRecId}`}>
          <List>
            <List.Item arrow="horizontal" multipleLine onClick={() => {}} extra={`+${rowData.fee}`}>
              <div>{rowData.userName} {rowData.visitNo}</div>
              <List.Item.Brief>{moment(rowData.updateDt).format('YYYY/MM/DD HH:mm')}</List.Item.Brief>
            </List.Item>
          </List>
        </Link>
      );
    };

    return (
      <div>
        {rows ?
          <div>
            <ListView
              className={styles.recordList}
              dataSource={this.state.dataSource}
              renderRow={row}
              useBodyScroll={this.state.useBodyScroll}
              pageSize={4}
              onEndReached={this.onEndReached}
            />
            <div className={styles.dataOver}>数据加载完毕</div>
          </div>
        :
          <ActivityIndicator text="Loading..." className={styles.visitcardinfoLoading} />
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

export default connect(mapStateToProps, mapDispatchToProps)(VisitCardRechargeRecord);
