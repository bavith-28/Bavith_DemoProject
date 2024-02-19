import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import '../styles/login.css'
import { Button, Form, Input,Col, Row ,Checkbox } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import ProductComponet from './products'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [responseData, setReponseData] =useState({})
  const[productData, setProductData] =useState({})

  const [loggedIn, setLoggedIn] = useState(true);
  const navigate = useNavigate ();
   

  // user login 
  const handleSubmit = async (e) => {
    fetch('https://dummyjson.com/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username,
    password
    
  })
})
.then(res => res.json())
.then(data =>{setReponseData(data)
 console.log(data.token)
 handleProduct1(data.token)
setLoggedIn(false)
}).catch(error=>console.log(error));
// setLoggedIn(true)
  }
  // get product 
  const handleProduct1 = async (token) => {
    fetch('https://dummyjson.com/auth/products', {
  method: 'GET',
  headers: { 'Authorization': 'Bearer ' + token },
})
.then(res => res.json())
.then(data =>{setProductData(data
  )
 console.log(data)
}).catch(error=>console.log(error));

  }
  return (<>
   {loggedIn ? <div className='LoginForm'>
         <Row>
      <Col span={12} offset={6}>
         <Form name="basic"
         className='custom_form'
    labelCol={{ span: 6,}}
    wrapperCol={{span: 12,}}
    initialValues={{  remember: true, }}
    onFinish={handleSubmit}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="username"
      onChange = {(e)=>{setUsername(e.target.value)}}
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
       <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      onChange = {(e)=>{setPassword(e.target.value)}}
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
     <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
    </Form.Item>
    
     <Form.Item  wrapperCol={{
        offset: 6,
        span: 12,
      }}>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="/registration">register now!</a>
      </Form.Item>
  </Form> </Col>
    </Row>
    </div>: <>
    <ProductComponet data={productData}/></>}</>
  );
};

export default Login;
