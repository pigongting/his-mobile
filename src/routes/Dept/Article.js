import cs from 'classnames';
import update from 'immutability-helper';
import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Picker from 'antd-mobile/lib/picker';
import List from 'antd-mobile/lib/list';
import Flex from 'antd-mobile/lib/flex';
import ActivityIndicator from 'antd-mobile/lib/activity-indicator';
import styles from './Article.less';

const pagespace = 'deptarticle';

class DeptArticle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      floor: [''],
    };
  }

  componentWillReceiveProps(nextProps) {
    const { res: nextres } = nextProps.pagedata;
    const { res } = this.props.pagedata;

    if (nextres.idTypeArray && nextres.idTypeArray[0] && (nextres.idTypeArray !== res.idTypeArray)) {
      this.setState(update(this.state, {
        floor: { $set: [nextres.idTypeArray[0].value] },
      }));
    }
  }

  changeFloor = (v) => {
    this.setState(update(this.state, {
      floor: { $set: v },
    }));
  }

  render() {
    const { idTypeArray, rows } = this.props.pagedata.res;
    const { floor } = this.state;

    return (
      <div>
        {rows ?
          <div>
            <List className={styles.chooseFloor}>
              <Picker data={idTypeArray} cols={1} value={floor} onChange={this.changeFloor}>
                <List.Item arrow={'down'} />
              </Picker>
            </List>
            <Flex className={cs(styles.tableItem, styles.tableHeader)}>
              <Flex.Item>楼层</Flex.Item>
              <Flex.Item>科室</Flex.Item>
            </Flex>
            {rows.map((item, index) => {
              return (
                <div key={index}>
                  {(floor && item.deptAddress === floor[0]) ?
                    <Flex className={styles.tableItem}>
                      <Flex.Item>{item.deptFloor}</Flex.Item>
                      <Flex.Item>{item.deptName}</Flex.Item>
                    </Flex>
                  : null}
                </div>
              );
            })}
            <div className={styles.dataOver}>数据加载完毕</div>
          </div>
        :
          <ActivityIndicator text="Loading..." className={styles.detailLoading} />
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

export default connect(mapStateToProps, mapDispatchToProps)(DeptArticle);
