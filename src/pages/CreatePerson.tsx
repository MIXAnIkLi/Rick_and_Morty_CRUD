import React, { useState } from "react";
import "./CreatePerson.css";
import {
  Button,
  DatePicker,
  Form,
  Input,
} from "antd";
import { useDispatch } from "react-redux";
import { createPerson } from  "../redux/action/PersonsAction";
const { RangePicker } = DatePicker;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const date = new Date()

const emptyPerson = {
  id: date.getTime(),
  name: "",
  species: "",
  gender: "",
  status: "",
  location: { name: "" },
  image: "",
};

const CreatePerson: React.FC = () => {
  const [form] = Form.useForm();
  const variant = Form.useWatch("variant", form);
  const [addPerson, setAddPerson] = useState(emptyPerson);
  const dispatch = useDispatch();

  const handleFinish = () => {
    dispatch(createPerson(addPerson))
  }

  return (
    <Form
      {...formItemLayout}
      form={form}
      variant={variant || "filled"}
      className="form"
      initialValues={{ variant: "filled" }}
      onFinish={handleFinish}
      labelWrap
    >
        
      <Form.Item
        className="form__item"
        label="Имя"
        name="name_q"
        rules={[{ required: true, message: "Please input!" }]}
      >
        <Input
        placeholder="Имя"
          onChange={(e) =>
            setAddPerson({ ...addPerson, name: e.target.value })
          }
          className="form__input"
        />
      </Form.Item>

      <Form.Item
        className="form__item"
        label="Статус"
        name="status"
        rules={[{ required: true, message: "Please input!" }]}
      >
        <Input
        placeholder="Статус"
          onChange={(e) =>
            setAddPerson({ ...addPerson, status: e.target.value })
          }
          className="form__input"
        />
      </Form.Item>

      <Form.Item
        className="form__item"
        label="Класс"
        name="species"
        rules={[{ required: true, message: "Please input!" }]}
      >
        <Input
        placeholder="Класс"
          onChange={(e) =>
            setAddPerson({ ...addPerson, species: e.target.value })
          }
          className="form__input"
        />
      </Form.Item>

      <Form.Item
        className="form__item"
        label="Гендер"
        name="gender"
        rules={[{ required: true, message: "Please input!" }]}
      >
        <Input
        placeholder="Гендер"
          onChange={(e) =>
            setAddPerson({ ...addPerson, gender: e.target.value })
          }
          className="form__input"
        />
      </Form.Item>

      <Form.Item
        className="form__item"
        label="Фото"
        name="image"
        rules={[{ required: true, message: "Please input!" }]}
      >
        <Input
        placeholder="Ссылка на фото"
          onChange={(e) =>
            setAddPerson({ ...addPerson, image: e.target.value })
          }
          className="form__input"
        />
      </Form.Item>

      <Form.Item
        className="form__item"
        name="location"
        label="Локация"
        rules={[{ required: true, message: "Please input!" }]}
      >
        <Input
        placeholder="Локация"
          onChange={(e) =>
            setAddPerson({ ...addPerson, location: {...location, name: e.target.value }})
          }
          className="form__input"
        />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreatePerson;
