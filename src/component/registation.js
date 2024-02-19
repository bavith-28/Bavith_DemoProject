import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  Input,
  Col,
  Row,
  Select,
  DatePicker,
  message,
} from "antd";
const { Option } = Select;

const RegistrationComp = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    maidenName: "",
    email: "",
    username: "",
    password: "",
    confirm: "",
    phone: "",
    gender: "",
    bloodGroup: "",
    birthDate: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const prnt = () => {
    for (const key in userData) {
      console.log(`${key}: ${userData[key]}`);
    }
  };
  const handleRegistration = async (values) => {
    try {
      const response = await fetch("https://dummyjson.com/users/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("User Registration Success");
        prnt();
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        console.error("Registration failed");
        message.error("User Registration Failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="">
      <Row>
        <Col span={24}>
          <Form
            name="basic"
            className=""
            initialValues={{ remember: true }}
            onFinish={handleRegistration}
            autoComplete="off"
            layout="vertical"
          >
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  label="FirstName"
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your firstname",
                    },
                  ]}
                >
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={userData.firstName}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="LastName"
                  name="lastName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your lastname",
                    },
                  ]}
                >
                  <Input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={userData.lastName}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="maidenName"
                  label="MaidenName"
                  tooltip="What do you want others to call you?"
                  rules={[
                    {
                      required: false,
                      message: "Please input your nickname!",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input
                    type="text"
                    name="maidenName"
                    placeholder="Maiden Name"
                    value={userData.maidenName}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="email"
                  label="E-mail"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!",
                    },
                  ]}
                >
                  <Input
                    type="text"
                    name="email"
                    placeholder="E-mail"
                    value={userData.email}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: false,
                      message: "Please input your gender!",
                    },
                  ]}
                >
                  <Input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={userData.username}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={userData.password}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="confirm"
                  label="Confirm Password"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The new password that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    type="password"
                    name="confirm"
                    placeholder="Confirm Password"
                    value={userData.confirm}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[
                    {
                      required: false,
                      message: "Please input your phone number!",
                    },
                  ]}
                >
                  <Input
                    type="number"
                    name="phone"
                    placeholder="Phone Number"
                    value={userData.phone}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="gender"
                  label="Gender"
                  rules={[
                    {
                      required: true,
                      message: "Please select gender!",
                    },
                  ]}
                >
                  <Select
                    name="gender"
                    value={userData.gender}
                    onChange={(value) =>
                      setUserData((prevState) => ({
                        ...prevState,
                        gender: value,
                      }))
                    }
                  >
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="bloodGroup"
                  label="Blood Group"
                  rules={[
                    {
                      required: false,
                      message: "Please select Group!",
                    },
                  ]}
                >
                  <Select
                    name="bloodGroup"
                    value={userData.bloodGroup}
                    onChange={(value) =>
                      setUserData((prevState) => ({
                        ...prevState,
                        bloodGroup: value,
                      }))
                    }
                  >
                    <Option value="A+">A+</Option>
                    <Option value="A-">A-</Option>
                    <Option value="B+">B+</Option>
                    <Option value="B-">B-</Option>
                    <Option value="O+">O+</Option>
                    <Option value="O-">O-</Option>
                    <Option value="AB+">AB+</Option>
                    <Option value="AB-">AB-</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item name="birthDate" label="Date of Birth">
                  <DatePicker
                    name="birthDate"
                    value={userData.birthDate}
                    onChange={(date) =>
                      setUserData((prevState) => ({
                        ...prevState,
                        birthDate: date,
                      }))
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
            <div>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Registration
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default RegistrationComp;
