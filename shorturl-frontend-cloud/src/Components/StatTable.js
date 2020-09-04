import React from 'react';
import {Table, Popconfirm, Typography, Modal, message} from 'antd';
import {backendUrl} from "../Service/UrlConfig";
import {deleteShortUrl} from "../Service/UrlService";

const { Link } = Typography;

class StatTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        };

        this.columns = [
            {
                title: '日期', key:'data',dataIndex: 'date', width: 100, align: 'center',
                render: (text) => text.split("T")[0]
            },
            {
                title: '点击量', key:'clicks',dataIndex: 'clicks', width: 100, align: 'center',
            },
        ];
    }

    componentDidMount() {
        let data = this.props.data;
        this.setState({dataSource: data},()=>console.log(this.state.dataSource));
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let newData = nextProps.data;
        this.setState({dataSource:newData},()=>console.log(this.state.dataSource));
    }
    render() {
        return (
            <Table
                rowClassName={() => 'editable-row'}
                dataSource={this.state.dataSource}
                columns={this.columns}
                pagination={{pageSize: 10}}
            />
        );
    }
}

export default StatTable
