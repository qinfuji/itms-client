import React, { PureComponent } from 'react';
import {
  Card,
  Button,
  Form,
  Icon,
  Col,
  Row,
  DatePicker,
  Input,
  Select,
  Checkbox,
  Upload,
} from 'antd';
const { TextArea } = Input;
const InputGroup = Input.Group;
import { connect } from 'dva';
import FooterToolbar from 'components/FooterToolbar';
import styles from '../style.less';

const { Option } = Select;

const uploadProps = {
  name: 'file',
  action: '//jsonplaceholder.typicode.com/posts/',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const fieldLabels = {
  assignUser: '指定完成人',
  orderType: '工单类型',
  orderDesc: '工单说明',
  urgencyType: '紧急程度',
  cause: '事由',
  name: '姓名',
  department: '所属部门',
  contactTelphone: '联系电话',
  sex: '性别',
  nationality: '民族',
  politicalStatus: '政治面貌',
  trustNo: '信任号',
  mobile: '手机',
  officePosition: '办公室',
  innerEmail: '内部邮箱',
  outerEmail: '外部邮箱',
  offlicTel: '座机',
  userDesc: '个人说明',
  remarks: '备注',
  attachment: '附件',
};

const formItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
};

function fromItemLayout(overLayout) {
  return { ...formItemLayout, ...overLayout };
}

@connect(({ global, loading }) => ({
  collapsed: global.collapsed,
  submitting: loading.effects['workorders/createEmployeeWorkOrder'],
  global,
}))
@Form.create()
export default class EmployeeOrder extends PureComponent {
  //处理服务选择
  handServiceSelected = () => {
    const {
      form: { getFieldsValue },
    } = this.props;
    const values = getFieldsValue([
      'consumables',
      'applications',
      'devices',
      'orderType',
      'officePosition',
    ]);
    console.log(values);
  };

  render() {
    const {
      form,
      dispatch,
      submitting,
      global: {
        urgencyTypes,
        departments,
        nationalitys,
        consumables,
        applications,
        devices,
        orderTypes,
      },
      selectedOrderType,
    } = this.props;
    const { getFieldDecorator, validateFieldsAndScroll } = form;
    const validate = () => {
      validateFieldsAndScroll((error, values) => {
        if (!error) {
          dispatch({
            type: 'workorders/createEmployeeWorkOrder',
            payload: values,
          });
        }
      });
    };

    return (
      <div className={styles.advancedForm}>
        <Form>
          <Row gutter={10}>
            <Col span={6}>
              <Form.Item label={fieldLabels.orderType} {...fromItemLayout()}>
                {getFieldDecorator('orderType', {
                  rules: [{ required: true, message: '工单类型' }],
                  initialValue: selectedOrderType,
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label={fieldLabels.assignUser} {...fromItemLayout()}>
                {getFieldDecorator('assignUser', {
                  rules: [{ required: true, message: '请选择' }],
                })(
                  <Select placeholder="请选择">
                    <Option value="1">付晓晓</Option>
                    <Option value="3">周毛毛</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label={fieldLabels.urgencyType} {...fromItemLayout()}>
                {getFieldDecorator('urgencyType', {
                  rules: [{ required: true, message: '请选择级别' }],
                })(
                  <Select placeholder="请选择级别">
                    {urgencyTypes.map(urgencyType => {
                      return (
                        <Option key={urgencyType.value} value={urgencyType.value}>
                          {urgencyType.title}
                        </Option>
                      );
                    })}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label={fieldLabels.cause} {...fromItemLayout()}>
                {getFieldDecorator('cause', {
                  rules: [{ required: true, message: '请选择是由' }],
                })(
                  <Select placeholder="请选择">
                    <Option value="xiao">电话</Option>
                    <Option value="mao12">领导交代</Option>
                    <Option value="mao2">请示件</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Form.Item label={fieldLabels.orderDesc} {...fromItemLayout()}>
                {getFieldDecorator('orderDesc', {
                  rules: [{ required: true, message: '请选择管理员' }],
                })(<TextArea rows={2} />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Card bodyStyle={{ padding: '8px' }}>
          <Form>
            <Row gutter={10}>
              <Col span={6}>
                <Form.Item label={fieldLabels.name} {...fromItemLayout()}>
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请填写姓名' }],
                  })(<Input placeholder="请填写姓名" />)}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={fieldLabels.department} {...fromItemLayout()}>
                  {getFieldDecorator('department', {
                    rules: [{ required: true, message: '请选择部门' }],
                  })(
                    <Select placeholder="请选择部门">
                      {departments.map(department => {
                        return (
                          <Option key={department.code} value={department.code}>
                            {department.title}
                          </Option>
                        );
                      })}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={fieldLabels.contactTelphone} {...fromItemLayout()}>
                  {getFieldDecorator('contactTelphone', {
                    rules: [{ required: true, message: '请填写联系电话' }],
                  })(<Input placeholder="联系电话" />)}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={fieldLabels.sex} {...fromItemLayout()}>
                  {getFieldDecorator('sex', { initialValue: 'man' })(
                    <Select>
                      <Option value="man">男</Option>
                      <Option value="women">女</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={fieldLabels.nationality} {...fromItemLayout()}>
                  {getFieldDecorator('nationality', { initialValue: 1 })(
                    <Select>
                      {nationalitys.map(nationality => {
                        return (
                          <Option key={nationality.code} value={nationality.code}>
                            {nationality.title}
                          </Option>
                        );
                      })}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={fieldLabels.politicalStatus} {...fromItemLayout()}>
                  {getFieldDecorator('politicalStatus', {})(<Input placeholder="政治面貌" />)}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={fieldLabels.trustNo} {...fromItemLayout()}>
                  {getFieldDecorator('trustNo', {})(<Input />)}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={fieldLabels.mobile} {...fromItemLayout()}>
                  {getFieldDecorator('mobile', {})(<Input />)}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={fieldLabels.offlicTel} {...fromItemLayout()}>
                  {getFieldDecorator('offlicTel', {})(<Input />)}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item label={fieldLabels.innerEmail} {...fromItemLayout()}>
                  {getFieldDecorator('innerEmail', {})(<Input style={{ width: '100%' }} />)}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item label={fieldLabels.outerEmail} {...fromItemLayout()}>
                  {getFieldDecorator('outerEmail', {})(<Input />)}
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  label={fieldLabels.officePosition}
                  {...fromItemLayout({ labelCol: { span: 6 }, wrapperCol: { span: 18 } })}
                >
                  {getFieldDecorator('officePosition', {})(
                    <div>
                      <Select defaultValue="Option1-1" style={{ width: 90 }}>
                        <Option value="Option1-1">Option1-1</Option>
                        <Option value="Option1-2">Option1-2</Option>
                      </Select>
                      <Select defaultValue="Option2-2" style={{ width: 90 }}>
                        <Option value="Option2-1">Option2-1</Option>
                        <Option value="Option2-2">Option2-2</Option>
                      </Select>
                      <Input addonAfter="室" style={{ width: '80px' }} />
                    </div>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={10}>
              <Col span={8}>
                <Form.Item
                  label={fieldLabels.userDesc}
                  {...fromItemLayout({ labelCol: { span: 4 }, wrapperCol: { span: 20 } })}
                >
                  {getFieldDecorator('userDesc', {})(<TextArea row={2} />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={fieldLabels.remarks}
                  {...fromItemLayout({ labelCol: { span: 4 }, wrapperCol: { span: 20 } })}
                >
                  {getFieldDecorator('remarks', {})(<TextArea row={2} />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={fieldLabels.attachment} {...fromItemLayout()}>
                  {getFieldDecorator('attachment', {})(
                    <Upload {...uploadProps}>
                      <Button>
                        <Icon type="upload" /> 选择文件
                      </Button>
                      <label style={{ marginLeft: '10px' }} />
                      <label>注:只支持PDF格式</label>
                    </Upload>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="需要的服务" bodyStyle={{ padding: 5 }} headStyle={{ minHeight: 24 }}>
          <Form>
            <Row gutter={10}>
              <Col span={2}>
                <Form.Item
                  label="网络"
                  {...fromItemLayout({ labelCol: { span: 10 }, wrapperCol: { span: 14 } })}
                >
                  {getFieldDecorator('network', {})(<Checkbox />)}
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item
                  label="电话"
                  {...fromItemLayout({ labelCol: { span: 10 }, wrapperCol: { span: 14 } })}
                >
                  {getFieldDecorator('telphone', {})(<Checkbox />)}
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item
                  label="Key"
                  {...fromItemLayout({ labelCol: { span: 10 }, wrapperCol: { span: 14 } })}
                >
                  {getFieldDecorator('key', {})(<Checkbox />)}
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item
                  label="系统"
                  {...fromItemLayout({ labelCol: { span: 10 }, wrapperCol: { span: 14 } })}
                >
                  {getFieldDecorator('system', {})(<Checkbox />)}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  label="设备"
                  {...fromItemLayout({ labelCol: { span: 5 }, wrapperCol: { span: 19 } })}
                >
                  {getFieldDecorator('devices', {
                    rules: [{ required: true, message: '请选择设备' }],
                    onValuesChange: this.handServiceSelected,
                  })(
                    <Select mode="multiple" style={{ width: '100%' }} placeholder="请选择设备">
                      {devices.map(device => {
                        return (
                          <Option key={device.code} value={device.code}>
                            {device.title}
                          </Option>
                        );
                      })}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  label="应用"
                  {...fromItemLayout({ labelCol: { span: 5 }, wrapperCol: { span: 19 } })}
                >
                  {getFieldDecorator('applications', {})(
                    <Select mode="multiple" style={{ width: '100%' }} placeholder="请选择应用">
                      {applications.map(application => {
                        return (
                          <Option key={application.code} value={application.code}>
                            {application.title}
                          </Option>
                        );
                      })}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  label="耗材"
                  {...fromItemLayout({ labelCol: { span: 5 }, wrapperCol: { span: 19 } })}
                >
                  {getFieldDecorator('consumables', { require: true })(
                    <Select mode="multiple" style={{ width: '100%' }} placeholder="请选择耗材">
                      {consumables.map(consumable => {
                        return (
                          <Option key={consumable.code} value={consumable.code}>
                            {consumable.title}
                          </Option>
                        );
                      })}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        {/*<Card title="成员管理" bordered={false}>
          {getFieldDecorator('members', {
            initialValue: tableData,
          })(<TableForm />)}
        </Card>*/}
        <FooterToolbar>
          {/*getErrorInfo()*/}
          <Button type="primary" onClick={validate} loading={submitting}>
            提交
          </Button>
        </FooterToolbar>
      </div>
    );
  }
}
