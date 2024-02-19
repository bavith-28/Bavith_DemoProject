import React from 'react';
import { Layout, Flex } from 'antd';
import HeaderComponent from './header';
import RouterComponent from './router'
const { Header, Footer, Sider, Content } = Layout;
const headerStyle = {
  
  color: '#fff',
  height: '64px',
  lineHeight: '60px',
  backgroundColor: '#000000',
};
const contentStyle = {
  textAlign: 'center',
  minHeight: '80vh',
  marginTop:'16px',
  padding:'20px'
};
const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#000000',
};
const LayoutComponent = () => (
    <Layout >
      <Header style={headerStyle}>
        <HeaderComponent/>
      </Header>
      <Content style={contentStyle}>
      <RouterComponent/>
      </Content>
      
      {/* <Footer style={footerStyle}>Footer</Footer> */}
    </Layout>
 
);
export default LayoutComponent;