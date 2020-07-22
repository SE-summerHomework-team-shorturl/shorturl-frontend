import React from 'react';
import {Table, Button, Popconfirm, Upload, message, Typography} from 'antd';
import {adminDeletedeleteShortUrl} from "../Service/AdminService";
import {backendUrl} from "../Service/UrlConfig";

const { Link } = Typography;

class UrlEditTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
        };
        this.columns = [
            {
                title: '编号', key:'id',dataIndex: 'id', width: 100, align: 'center',
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: '短链接', key:'token', dataIndex: 'token', width: 100, align: 'center',
                render: (text) => <Link href={backendUrl+`/r/`+text}  target="_blank">
                    {backendUrl+`/r/`+text}
                </Link>
            },
            {
                title: '长链接', key:'url', dataIndex: 'url', width: 200, align: 'center',
                render: (text) => <Link href={text}  target="_blank">
                    {text}
                </Link>
            },
            {
                title: '点击量', key:'clicks',dataIndex: 'clicks', width: 50, align: 'center',
            },
            {
                title: '操作',
                dataIndex: 'operation',
                align: 'center',
                width: 80,
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <Popconfirm title="确定要删除吗？" onConfirm={() => this.handleDelete(record.id)}>
                            <a>删除短链接</a>
                        </Popconfirm>
                    ) : null,
            },
        ];
    }

    componentDidMount() {
        this.setState({dataSource: this.props.data});
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({dataSource: nextProps.data});
    }

    handleDelete = key => {
        let callback = () => {
            let newData = this.state.dataSource;
            newData = newData.filter(item => item.id !== key);
            this.setState({dataSource: newData});
        }
        adminDeletedeleteShortUrl(key,callback);
    };

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

export default UrlEditTable
