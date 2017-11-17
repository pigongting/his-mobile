import cs from 'classnames';
import moment from 'moment';
import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { createForm } from 'rc-form';
import Result from 'antd-mobile/lib/result';
import ActivityIndicator from 'antd-mobile/lib/activity-indicator';
import ListView from 'antd-mobile/lib/list-view';
import List from 'antd-mobile/lib/list';
import styles from './List.less';

const pagespace = 'reportlist';

const myImg = src => <img src={src} className="am-icon am-icon-md" alt="" style={{ width: 60, height: 60 }} />;

class ReportList extends React.Component {
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
    const { no, notips } = this.props.pagedata.set;
    const { rows } = this.props.pagedata.res;

    const row = (rowData, sectionID, rowID) => {
      console.log(rowData);
      return (
        <Link key={rowID} className={styles.recordItem} to={`/${this.props.locale}/report/detail?id=${rowData.reportId}`}>
          <List>
            <List.Item arrow="horizontal" multipleLine onClick={() => {}}>
              <div>{rowData.checkPart} {rowData.reportType}</div>
              <List.Item.Brief>{moment(rowData.updateDt).format('YYYY/MM/DD HH:mm')}</List.Item.Brief>
            </List.Item>
          </List>
        </Link>
      );
    };

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

export default connect(mapStateToProps, mapDispatchToProps)(ReportList);
