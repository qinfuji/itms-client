import React, { PureComponent } from 'react';
import { TreeSelect, Card, Row, Col } from 'antd';
import { connect } from 'dva';
import styles from './style.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

@connect(({ global, loading }) => ({
  categories: global.entryOrderTypes,
}))
export default class CreateOrderLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
    };
  }

  handCategoryChange = (value, label, extra) => {};

  render() {
    let { categories, match } = this.props;
    return (
      <Card bodyStyle={{ padding: 5 }}>
        <Row>
          <Col span={5}>
            <h3>创建工单</h3>
          </Col>
          <Col>
            <label style={{ marginLeft: 10 }}>请选择工单类型：</label>
            <TreeSelect
              treeData={categories}
              style={{ width: 200 }}
              placeholder="请选择工单类型"
              onChange={this.handCategoryChange}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeDefaultExpandAll
              size="small"
              treeCheckStrictly={true}
            />
          </Col>
        </Row>
      </Card>
    );
  }
}
