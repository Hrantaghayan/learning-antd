import { Form, Input, Typography, Row, Col, Button, Modal } from "antd";
import "./Form.scss";
import { useRef, useState } from "react";
const Forms = () => {
  const formRef = useRef(null);
  const [isModalOpened, setIsmodalOPened] = useState(false);
  const [modalText, setModalText] = useState("");
  const validateName = (_, value) => {
    return new Promise((resolve, reject) => {
      if (/\d/.test(value)) {
        reject("Name cannot contain numeric characters.");
      } else if (/\s/.test(value)) {
        reject("Name cannot contain spaces.");
      } else {
        resolve();
      }
    });
  };
  const validateEmail = (_, value) => {
    return new Promise((resolve, reject) => {
      if (!value || /\S+@\S+\.\S+/.test(value)) {
        return resolve();
      } else {
        reject("please enter valid email");
      }
    });
  };
  const validatePhone = (rule, value) => {
    if (!value || /^[0-9]+$/.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject("Phone number must only contain digits.");
  };
  return (
    <div className="Form">
      <Form
        className="antd-form"
        ref={formRef}
        onFinish={(val) => {
          setIsmodalOPened(true);
          setModalText("you are registered");
        }}
        onFinishFailed={() => {
          setIsmodalOPened(true);
          setModalText("your registering process failed");
        }}
        layout="vertical"
      >
        <Typography.Title
          style={{
            textAlign: "center",
            color: "orange",
          }}
        >
          Learning Form
        </Typography.Title>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              className="item"
              name="name"
              label="Name"
              rules={[
                { required: true, message: "Please input your username!" },
                {
                  validator: validateName,
                },
              ]}
            >
              <Input placeholder="name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              className="item"
              name="surname"
              label="SurName"
              rules={[
                { required: true, message: "Please input your surname!" },
                {
                  validator: validateName,
                },
              ]}
            >
              <Input placeholder="Surname" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              className="item"
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please input your email!" },
                {
                  validator: validateEmail,
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              className="item"
              name="phone"
              label="Phone"
              rules={[
                // { required: true, message: "Please input your email!" },
                {
                  validator: validatePhone,
                },
              ]}
            >
              <Input placeholder="Phone" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          className="item"
          name="websiteUrl"
          label="Social Url"
          rules={[
            {
              validator: (_, val) => {
                return new Promise((resolve, reject) => {
                  if (!val) {
                    reject("please enter url");
                  } else if (
                    !/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(val)
                  ) {
                    reject("please enter a valid url");
                  } else {
                    resolve();
                  }
                });
              },
              required: true,
            },
          ]}
        >
          <Input placeholder="Social Url" />
        </Form.Item>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              className="item"
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
                ({ getFieldValue }) => ({
                  validator: (_, val) => {
                    return new Promise((resolve, reject) => {
                        debugger
                      if (getFieldValue("confirmPassword")) {
                        if (getFieldValue("confirmPassword") !== val) {
                          return reject(
                            "check password or confirm password there are mistake"
                          );
                        }else{
                            resolve()
                        }
                      } else if (val) {
                        if (!/^(?=.*[0-9])(?=.*[\*\#]).+$/.test(val)) {
                          return reject(
                            "passowrd must contain one number and # or *"
                          );
                        }
                      } else {
                        resolve();
                      }
                    });
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              className="item"
              name="confirmPassword"
              label="Confirm-Password"
              rules={[
                ({ getFieldValue }) => ({
                  validator: (_, val) => {
                    return new Promise((resolve, reject) => {
                      if (val) {
                        if (getFieldValue("password")) {
                          if (getFieldValue("password") !== val) {
                            return reject(
                              "check password or confirm password there are mistake"
                            );
                          }else{
                            resolve()
                          }
                        } else if (val) {
                          if (!/^(?=.*[0-9])(?=.*[\*\#]).+$/.test(val)) {
                            return reject(
                              "passowrd must contain one number and # or *"
                            );
                          }
                        } else {
                          resolve();
                        }
                      } else {
                        reject("Please input your confirm Password!");
                      }
                    });
                  },
                }),
              ]}
            >
              <Input.Password placeholder="confirm Password" />
            </Form.Item>
          </Col>
        </Row>
        <Button
          type="primary"
          htmlType="submit"
          block
          style={{
            backgroundColor: "orange",
            color: "white",
          }}
        >
          Submit
        </Button>
      </Form>
      <Modal
          open={isModalOpened}
          onOk={() => {
            setIsmodalOPened(false);
          }}
          onCancel={()=>{
            setIsmodalOPened(false)
          }}
          footer={[
            // Only show the OK button
            <Button
            style={{
                backgroundColor:"orange"
            }}
              key="ok"
              type="primary"
              block
              onClick={() => {
                setIsmodalOPened(false);
              }}
            >
              OK
            </Button>,
          ]}
        >
          <Typography.Text type={modalText==="your registering process failed"?"danger":"success"}>{modalText}</Typography.Text>
        </Modal>
    </div>
  );
};

export default Forms;
