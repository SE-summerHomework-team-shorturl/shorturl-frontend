import React from 'react';
import {Table, Popconfirm, Typography, Modal, message} from 'antd';
import {backendUrl} from "../Service/UrlConfig";
import {deleteShortUrl} from "../Service/UrlService";

const { Link } = Typography;

class UrlList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        };

        this.columns = [
            {
                title: '编号', key:'id',dataIndex: 'id', width: 100, align: 'center',
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
        this.setState({dataSource: this.props.data},()=>console.log(this.state.dataSource));
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let newData = nextProps.data;
        this.setState({dataSource:newData},()=>console.log(this.state.dataSource));
    }

    handleDelete = key => {
        let callback = () => {
            let newData = this.state.dataSource;
            newData = newData.filter(item => item.id !== key);
            this.setState({dataSource: newData});
        }

        deleteShortUrl(key,callback);

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

export default UrlList
