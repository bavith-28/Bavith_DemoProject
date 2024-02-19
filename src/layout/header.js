import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import '../styles/header.css'
const HeaderComponent = () => {
  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return <div className='custom_header'>
    <p> Bavith - Demo Project</p>
  </div>
  // return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
export default HeaderComponent;