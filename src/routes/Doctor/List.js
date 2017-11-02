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

  render() {
    const row = (rowData, sectionID, rowID) => {
      console.log(rowData);
      return (
        <div key={rowID} className={styles.docterItem}>
          <Flex align="start">
            <div className={styles.docterPhotoSide}>
              <i style={{ backgroundImage: (rowData.imageUrl) ? `url(${rowData.imageUrl})` : 'url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509623234386&di=e1a632f5fdb290f7b8ef47977e8d7217&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F21%2F63%2F95%2F37e58PICAhF_1024.jpg)' }} />
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
                      <div>{rowData.schDate}</div>
                      <div className={styles.noneNumber}><Badge text="无号" /></div>
                    </div>
                }
              </Flex>
              <div className={styles.doctorIntro}>{rowData.intro}</div>
            </Flex.Item>
          </Flex>
        </div>
      );
    };

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={row}
        useBodyScroll={this.state.useBodyScroll}
      />
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
