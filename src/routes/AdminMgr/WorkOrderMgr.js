import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Checkbox,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
} from 'antd';
const ButtonGroup = Button.Group;
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './WorkOrderMgr.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      title="新建规则"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
        {form.getFieldDecorator('desc', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
    </Modal>
  );
});

@connect(({ loading, workorders }) => ({
  workorders,
  loading: loading.models.workorders,
}))
@Form.create()
export default class WorkOrderMgr extends PureComponent {
  state = {
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'workorders/fetchWorkOrders',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'workorders/fetchWorkOrders',
      payload: params,
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'rule/fetch',
        payload: values,
      });
    });
  };

  renderQueryForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch}>
        <Row gutter={10}>
          <Col span={5}>
            <FormItem label="工单号">
              {getFieldDecorator('ordrNo')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col span={5}>
            <FormItem label="工单类型">
              {getFieldDecorator('status')(
                <Select placeholder="请选择">
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={5}>
            <FormItem label="关键信息">
              {getFieldDecorator('status')(
                <Select placeholder="请选择">
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={5}>
            <FormItem label="紧急程度">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={5}>
            <FormItem label="建立者">
              {getFieldDecorator('status')(
                <Select placeholder="请选择">
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={5}>
            <FormItem label="建立时间">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={5}>
            <FormItem label="临时角色">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={2}>
            <FormItem label="升序">{getFieldDecorator('queryDesc')(<Checkbox />)}</FormItem>
          </Col>
          <Col span={5}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} />
      </Form>
    );
  }

  render() {
    const {
      workorders: { data },
      loading,
    } = this.props;
    const { selectedRows, modalVisible } = this.state;

    const columns = [
      {
        title: '紧急程度',
        dataIndex: 'urgencyType',
        //sorter: true,
        render: val => <span>{val.name}</span>,
      },
      {
        title: '工单号',
        dataIndex: 'orderNo',
      },
      {
        title: '工单大类',
        dataIndex: 'category',
        align: 'left',
        render: val => <span>{val.name}</span>,
      },
      {
        title: '工单类型',
        dataIndex: 'type',
        render: val => <span>{val.name}</span>,
      },
      // {
      //   title: '更新时间',
      //   dataIndex: 'updateTime',
      //   sorter: true,
      // },
      {
        title: '工单说明',
        dataIndex: 'desc',
      },
      {
        title: '工单状态',
        dataIndex: 'status',
        //sorter: true,
        render: val => <span>{val.name}</span>,
      },
      {
        title: '建立者',
        dataIndex: 'createUser',
      },
      {
        title: '建立时间',
        dataIndex: 'createTime',
        //sorter: true,
      },
      {
        title: '业务操作',
      },
      {
        title: '工单操作',
      },
    ];

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderQueryForm()}</div>
            <div className={styles.tableListOperator}>
              <Row gutter={100}>
                <Col span={12}>
                  <Button>全部</Button>
                  <Button>新建</Button>
                  <Button>执行中</Button>
                  <Button>完成</Button>
                  <Button>结束</Button>
                  <Button>挂起</Button>
                </Col>
                <Col span={12}>
                  <Button type="primary">新建工单</Button>
                  <Button>导出工单</Button>
                  <Button>打印</Button>
                  <Button>打印全部</Button>
                </Col>
              </Row>
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
              expandedRowRender={record => <p style={{ margin: 0 }}>ssssssss</p>}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
      </PageHeaderLayout>
    );
  }
}
