import cs from 'classnames';
import moment from 'moment';
import React from 'react';
import { connect } from 'dva';
import Icon from 'antd-mobile/lib/icon';
import List from 'antd-mobile/lib/list';
import Result from 'antd-mobile/lib/result';
import ActivityIndicator from 'antd-mobile/lib/activity-indicator';
import styles from './Article.less';

const pagespace = 'hospitalarticle';

const myImg = src => <img src={src} className="am-icon am-icon-md" alt="" style={{ width: 60, height: 60 }} />;

class HospitalArticle extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    if (this.props.pagedata.res.detail && this.props.pagedata.res.detail.intro) {
      this.introBox.innerHTML = this.props.pagedata.res.detail.intro.replace(/style=".*?"/g, '');
    }
  }

  render() {
    const { id } = this.props.pagedata.set;
    const { detail } = this.props.pagedata.res;

    return (
      <div>
        {id ?
          <div>
            {detail ?
              <div>
                <div className={styles.coverImg}><img src="http://www.pkuszh.com/uploadfiles/2017/06/20170609113004304.jpg" alt="" /></div>

                <List className={cs(styles.commonList)}>
                  <List.Item>{detail.hospitalName}</List.Item>
                  <List.Item>{detail.level}</List.Item>
                  <List.Item extra={<a href={`tel:${detail.phone}`}>拨打电话</a>}>{detail.phone}</List.Item>
                  <List.Item>{detail.address}</List.Item>
                </List>

                <div ref={(child) => { this.introBox = child; return child; }} className={styles.hospitalIntro} />
              </div>
            :
              <ActivityIndicator text="Loading..." className={styles.detailLoading} />
            }
          </div>
        :
          <Result
            img={myImg('https://gw.alipayobjects.com/zos/rmsportal/GIyMDJnuqmcqPLpHCSkj.svg')}
            title="无法完成操作"
            message="医院ID不能为空"
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(HospitalArticle);
