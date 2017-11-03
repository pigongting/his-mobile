import React from 'react';
import cs from 'classnames';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Flex from 'antd-mobile/lib/flex';
import Icon from 'antd-mobile/lib/icon';
import Grid from 'antd-mobile/lib/grid';
import Drawer from 'antd-mobile/lib/drawer';
import styles from './HomePage.less';

moment.locale('zh-cn');

class DoctorHomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    const { res: nextres } = nextProps.pagedata;
    const { res } = this.props.pagedata;

    if (nextres.rows && nextres.rows !== res.rows) {
      // this.setState({
      //   dataSource: this.state.dataSource.cloneWithRows(nextres.rows),
      // });
    }
  }

  render() {
    const { doctorId } = this.props.pagedata.req;
    const { chosedate } = this.props.pagedata.set;
    const { doctor, datelist, nextNumber, timeslot } = this.props.pagedata.res;

    return (
      <div>
        {doctor ?
          <div className={styles.docterItem}>
            <Flex align="start">
              <div className={styles.docterPhotoSide}>
                <i style={{ backgroundImage: (doctor.imageUrl) ? `url(${doctor.imageUrl})` : 'url(/assets/img/doctorPhoto.png)' }} />
              </div>
              <Flex.Item>
                <Flex>
                  <Flex.Item>
                    <div className={styles.doctorName}>{doctor.doctorName}</div>
                    <div className={styles.doctorLead}>
                      <div>{doctor.title} {doctor.deptName}</div>
                      <div>{doctor.hospitalName}</div>
                    </div>
                  </Flex.Item>
                </Flex>
              </Flex.Item>
            </Flex>
            <div className={styles.doctorIntro}>{doctor.intro}</div>
          </div>
        : null}
        <div className={styles.orderNo}>
          <div className={styles.orderNoTitle}>预约挂号</div>
          {datelist && datelist.length > 0 ?
            <div className={styles.orderNoList}>
              <Grid
                data={datelist}
                columnNum={5}
                hasLine={false}
                square={false}
                renderItem={dataItem => (
                  <div className={cs(styles.orderNoItem, dataItem.text ? styles.activeDate : '')} onClick={() => { this.props.handleTimeSlot(doctorId, dataItem.date, dataItem.text); }}>
                    <div className={styles.orderNoDate}>{moment(dataItem.date).format('MM/DD')}</div>
                    <div className={styles.orderNoWeek}>{moment(dataItem.date).format('dd')}</div>
                    <div className={styles.orderNoText}>{dataItem.text}</div>
                  </div>
                )}
              />
            </div>
          :
            <div className={styles.orderNoNoneData}>
              <div className={styles.sorry}>抱歉，医生暂无号源~</div>
              <div className={styles.nextNoTime}>下轮放号时间为：{nextNumber ? moment(nextNumber.outNoTime).format('YYYY/MM/DD HH:mm') : '查询中...'}</div>
            </div>
          }
        </div>
        {timeslot ?
          <div>
            <Drawer
              className={styles.timeSlotDrawer}
              position="right"
              style={{ minHeight: document.documentElement.clientHeight }}
              enableDragHandle
              contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
              sidebar={
                <div className={styles.timeSlot}>
                  <div className={styles.timeSlotTitle}>{moment(chosedate).format('MM/DD')}</div>
                  {timeslot.am ?
                    <div>
                      <div className={styles.timeSlotSubTitle}>上午</div>
                      {timeslot.am.map((item, index) => {
                        return (
                          <div key={index} className={styles.timeSlotItem}>{item.startTime}</div>
                        );
                      })}
                    </div>
                  : null}
                </div>
              }
              open
            >0</Drawer>
          </div>
        : null}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleTimeSlot: (id, date, text) => {
      if (text) {
        dispatch({
          type: 'doctorhomepage/updateChoseDate',
          payload: date,
        });
        dispatch({
          type: 'doctorhomepage/fetchNoTimeSlot',
          payload: {
            doctorId: id,
            schDate: date,
          },
        });
      }
    },
  };
}

function mapStateToProps(state, ownProps) {
  return {
    loading: state.loading.effects['doctorhomepage/fetchs'],
    pagedata: state.doctorhomepage,
    locale: state.ssr.locale,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorHomePage);
