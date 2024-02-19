
import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table,Row,Col,Tooltip,Modal } from 'antd';
import Highlighter from 'react-highlight-words';
import "../styles/login.css"
import { Typography } from 'antd';
const { Text ,Title} = Typography;


const ProductComponet = ({ data }) => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [modal, setModal] = useState(false);
    const[selectObj, setSelectObj] =useState()
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const handleModel = () => {
        setModal(true)

    }
    const handleCancel =()=>{
        setModal(false)
    }
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: '25%',
             ...getColumnSearchProps('title'),
            render: (text) => <a onClick={() => handleModel()}>{text}</a>,
            sorter: (a, b) => a.title.localeCompare(b.title),
            sortDirections: ['descend', 'ascend'],
            
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            width: '25%',

            ...getColumnSearchProps('price'),
            sorter: (a, b) => a.price - b.price,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            ...getColumnSearchProps('description'),
            sorter: (a, b) => a.description.length - b.description.length,
            sortDirections: ['descend', 'ascend'],
        },
    ];
    
    return (<>
    {/* display products */}
    <Table className='custom_table'
       
          onRow={(record, index) => {
            return {
              onClick: (event) => {
                console.log(record)
                setSelectObj(record)
                 handleModel()
              }
            }}}
        columns={columns} dataSource={data.products} ></Table>
        {/* display Details product */}
        <Modal
            title="Product Details"
            open={modal}
            closeIcon={<Tooltip title="Close"><span className="icon md x" onClick={handleCancel} >X</span></Tooltip>}
            footer={null}
            width={1000}
            centered
        >
            <div className="custom_modal">
                    <Row gutter={24} className="mb-24 pb-24 border-bottom">
                        <Col xs={24} sm={24} md={12} >
                       {selectObj && 
                        selectObj.images.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={image}
                              className={index === 0 ? 'full-width' : 'small-width'}
                            />
                          ))}  
                       
                        </Col>
                        <Col xs={24} sm={24} md={12}>
                        {selectObj && <div><Title level={4}>{selectObj.title} - {selectObj.brand}</Title>
                        <Title level={5}>{selectObj.description}</Title>
                        <Text ><b>Category : </b>{selectObj.category}</Text>
                        <p>
                        <Text > <b className='f-20 text-red'>-</b> <span className='f-20 text-red'>{selectObj.discountPercentage}</span><b className='f-16'>%</b> <span className='custom_font' >₹</span><span className='custom_font'>{selectObj.price}</span></Text></p>

                    
                        </div>
                        }
                        </Col>
                    </Row>
            </div>
        </Modal></>)
};
export default ProductComponet;
