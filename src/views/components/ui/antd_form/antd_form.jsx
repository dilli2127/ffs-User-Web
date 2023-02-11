import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import "antd/dist/antd.min.css";
import _grid from "./grid";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Card,
  Switch,
  Spin,
  TimePicker,
} from "antd";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import lodash from "lodash";
import { useEffect, useState, useRef } from "react";
import moment from "moment";
import dayjs from "dayjs";
import { useCallback } from "react";

const { TextArea } = Input;
const { Option } = Select;

const TextBox = (props) => {
  let rules = props.rules;
  let name = props.field;
  if (props.fields && props.field_key) {
    let field = props.fields.find((x) => x.name === props.field_key);
    name = field.id;
    if (field.is_mandatory) {
      rules = [
        {
          required: true,
          message: "Field cannot be empty",
        },
      ];
    }
  }
  return (
    <Form.Item
      style={props.style}
      label={props.label}
      name={name}
      rules={rules}
    >
      <Input
        disabled={props.disabled}
        onKeyDown={(e) => (e.keyCode == 13 ? e.preventDefault() : "")}
      />
    </Form.Item>
  );
};

const TagBox = (props) => {
  let rules = props.rules;
  let name = props.field;
  let validationRegex = props.validationRegex || /.*/;
  if (props.fields && props.field_key) {
    let field = props.fields.find((x) => x.name === props.field_key);
    name = field.id;
    if (field.is_mandatory) {
      rules = [
        {
          required: true,
          message: "Field cannot be empty",
        },
      ];
    }
  }
  const _TagInput = (tag_props) => {
    let value = [];

    function hasJsonStructure(str) {
      if (typeof str !== "string") return false;
      try {
        const result = JSON.parse(str);
        const type = Object.prototype.toString.call(result);
        return type === "[object Object]" || type === "[object Array]";
      } catch (err) {
        return false;
      }
    }

    if (hasJsonStructure(tag_props.value) && tag_props.format === "string") {
      try {
        value = JSON.parse(tag_props.value);
      } catch (e) {
        value = [];
      }
    }

    const handleValueChange = (values) => {
      if (values && values.length === 0) {
        tag_props.onChange(null);
      } else {
        if (tag_props.format === "string") {
          tag_props.onChange(JSON.stringify(values));
        } else {
          tag_props.onChange(values);
        }
      }
    };
    return (
      <TagsInput
        {...tag_props}
        inputProps={{
          placeholder: tag_props.placeholder || "",
          style: { width: "150px" },
        }}
        value={value}
        onChange={handleValueChange}
      />
    );
  };
  return (
    <Form.Item
      style={props.style}
      label={props.label}
      name={name}
      rules={rules}
    >
      <_TagInput
        placeholder={props.placeholder}
        format={props.format}
        validationRegex={validationRegex}
      />
    </Form.Item>
  );
};
const Number = (props) => {
  return (
    <Form.Item
      label={props.label}
      name={props.field}
      rules={props.rules}
      //  style={{ display: "none" }}
    >
      <InputNumber />
    </Form.Item>
  );
};
const FormTextArea = (props) => {
  return (
    <Form.Item label={props.label} name={props.field} rules={props.rules}>
      <TextArea />
    </Form.Item>
  );
};
const FormSelect = (props) => {
  let options = props.options;
  return (
    <Form.Item
      label={props.label}
      name={props.field}
      rules={props.rules}
      // style={props.style}
      // hidden={true}
    >
      <Select
        disabled={props.disabled}
        mode={props.isMulti ? "multiple" : "single"}
        loading={props.loading}
        showSearch={props.showSearch}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        placeholder={props.form_type === "profile" ? "" : "Any"}
      >
        {options?.map((item, index) => {
          let newObj = {};
          newObj["value"] = lodash.get(item, props.valueField || "id", null);
          newObj["label"] = lodash.get(item, props.labelField || "name", null);

          return (
            <Option
              // notFoundContent={<Spin size="small" />}
              key={index}
              value={newObj["value"]}
            >
              {newObj["label"]}
            </Option>
          );
        })}
      </Select>
    </Form.Item>
  );
};
const FormGroupSelect = (props) => {
  let options = props.options;
  return (
    <Form.Item
      label={props.label}
      name={props.field}
      rules={props.rules}
      // style={props.style}
      // hidden={true}
    >
      <Select
        placeholder="Any"
        mode={props.isMulti ? "multiple" : "single"}
        loading={props.loading}
        showSearch={props.showSearch}
        filterOption={useCallback((search, optionOrGroup) => {
          const isGroup = Array.isArray(optionOrGroup.options);
          if (isGroup) {
            return false;
          }
          return optionOrGroup.label
            .toLowerCase()
            .includes(search.toLowerCase());
        }, [])}
        options={props.options}
      />
    </Form.Item>
  );
};
const Password = (props) => {
  return (
    <Form.Item label={props.label} name={props.field} rules={props.rules}>
      <Input.Password />
    </Form.Item>
  );
};
const Date = (props) => {
  return (
    <Form.Item label={props.label} name={props.field} rules={props.rules}>
      <DatePicker
        disabledDate={props.disabledDate}
        defaultValue={props.defaultValue}
        defaultPickerValue={props.defaultPickerValue}
        disabledTime={props.disabledTime}
        showTime={props.showTime}
      />
    </Form.Item>
  );
};
const Time = (props) => {
  return (
    <Form.Item label={props.label} name={props.field} rules={props.rules}>
      <TimePicker format="HH:mm" />
    </Form.Item>
  );
};
const FormRadio = (props) => {
  {
    let options = props.options.map((item) => {
      return (
        <Radio
          key={item["id"]}
          value={item["id"]}
          disabled={props.disabled}
          defaultChecked={item.defaultChecked}
        >
          {item["name"]}
        </Radio>
      );
    });
    return props.type === "button" ? (
      <Form.Item label={props.label} name={props.field} rules={props.rules}>
        <Radio.Group>
          {props?.options?.map((item) => {
            return (
              <Radio.Button key={item["id"]} value={item["id"]}>
                {item["name"]}
              </Radio.Button>
            );
          })}
        </Radio.Group>
      </Form.Item>
    ) : (
      <Form.Item label={props.label} name={props.field} rules={props.rules}>
        <Radio.Group>
          {props.direction === "row"
            ? props?.options?.map((item) => {
                return (
                  <Row justify="space-between">
                    <Radio value={item["id"]} disabled={true}>
                      {item["name"]}
                    </Radio>
                  </Row>
                );
              })
            : options}
        </Radio.Group>
      </Form.Item>
    );
  }
};
const CheckBox = (props) => {
  let options = props.options.map((item) => {
    return <Checkbox value={item["id"]} disabled={props.disabled}></Checkbox>;
  });
  return (
    <Form.Item label={props.label} name={props.field}>
      <Checkbox.Group>
        {props.direction === "row"
          ? props?.options?.map((item) => {
              return (
                <Row justify="space-between">
                  <Checkbox
                    value={item["id"]}
                    style={{
                      lineHeight: "32px",
                    }}
                  ></Checkbox>
                </Row>
              );
            })
          : options}
      </Checkbox.Group>
    </Form.Item>
  );
};
const FormSwitch = (props) => {
  return (
    <Form.Item label={props.label} name={props.field} valuePropName="checked">
      <Switch />
    </Form.Item>
  );
};

const FormButton = (props) => {
  return (
    <Form.Item>
      <Button
        style={props.style}
        type="primary"
        htmlType="submit"
        loading={props.isLoading}
        disabled={props.isDisabled}
      >
        {props.buttonText ? props.buttonText : "Submit"}
      </Button>
    </Form.Item>
  );
};
const Grid = (props) => {
  return <_grid {...props} />;
};

const List = (props) => {
  return (
    <Form.List name={props.field_name}>
      {(fields, { add, remove }) => {
        return (
          <div>
            {fields?.map((field, index) => {
              return (
                <Card
                  bordered={false}
                  mt={4}
                  style={{ background: "transparent" }}
                >
                  <Row gutter={16}>
                    {props?.children?.map((item, fieldIndex) => {
                      let listItem = props.children[fieldIndex];
                      let on_item = {
                        ...item,
                        props: {
                          ...item.props,
                          field: [index, `${item?.props?.field}`],
                        },
                      };

                      return <Col span={8}>{on_item}</Col>;
                    })}
                    <Button
                      type="danger"
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                      style={{ marginLeft: "20px" }}
                      icon={<MinusCircleOutlined />}
                    >
                      Remove
                    </Button>
                  </Row>
                </Card>
              );
            })}
            <Form.Item>
              <Button
                type="solid"
                onClick={() => add()}
                style={{ width: "32%", float: "right" }}
              >
                <PlusOutlined /> {props?.add_label}
              </Button>
            </Form.Item>
          </div>
        );
      }}
    </Form.List>
  );
};
const VForm = (props) => {
  const { children } = props;
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState(props.initialValues);
  useEffect(() => {
    form.setFieldsValue(props.initialValues);
    setInitialValues(props.initialValues);
  }, [form, props.initialValues]);

  const handleOnValueChange = (value, values) => {
    if (props.onValueChange) {
      props.onValueChange(value, values);
    }
  };

  const handleOnFinish = (values) => {
    if (props.onFinish) {
      props.onFinish(values);
    }
  };
  return (
    <Form
      form={form}
      name={props.id}
      layout={"vertical"}
      onFinish={handleOnFinish}
      onValuesChange={handleOnValueChange}
      initialValues={initialValues}
    >
      {children}
    </Form>
  );
};
VForm.Grid = Grid;
VForm.List = List;
VForm.TextBox = TextBox;
VForm.TagBox = TagBox;
VForm.Number = Number;
VForm.TextArea = FormTextArea;
VForm.Password = Password;
// VForm.IntlPhone = IntlPhone;
VForm.Phone = Number;
VForm.Select = FormSelect;
// VForm.Cascade = Cascade;
// VForm.FormFile = FormFile;
VForm.Date = Date;
VForm.Time = Time;
VForm.Radio = FormRadio;
VForm.CheckBox = CheckBox;
VForm.Button = FormButton;
VForm.Switch = FormSwitch;
VForm.FormGroupSelect = FormGroupSelect;
export default VForm;
