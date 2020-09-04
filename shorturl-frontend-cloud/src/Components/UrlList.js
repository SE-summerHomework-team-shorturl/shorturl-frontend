import React from 'react';
import {Table, Popconfirm, Typography, Modal, message, Button} from 'antd';
import {backendUrl} from "../Service/UrlConfig";
import {deleteShortUrl} from "../Service/UrlService";
import StatTable from "./StatTable";

const { Link } = Typography;

class UrlList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            visible:false,
            modalInfo:{}
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
                title: '总点击量', key:'totalClicks',dataIndex: 'totalClicks', width: 50, align: 'center',
            },
            {
                title: '点击情况', key:'stat',dataIndex: 'stat',width: 50,align: 'center',
                render: (text,row) => <Button
                    type="primary"
                    onClick={()=>this.handleClick(row)}
                >查看统计</Button>
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
        let data = this.props.data;
        for (var i=0;i<data.length;i++)
        {
            data[i].totalClicks=data[i].shortUrlStat.totalClicks;
        }
        this.setState({dataSource: data},()=>console.log(this.state.dataSource));
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let newData = nextProps.data;
        for (var i=0;i<newData.length;i++)
        {
            newData[i].totalClicks=newData[i].shortUrlStat.totalClicks;
        }
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

    handleClick = row => {
        this.setState({modalInfo:row.shortUrlStat.dailyClicksStats},()=>this.showModal())
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <>
                <Modal
                    title="点击量统计"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={[
                    ]}
                >
                    <StatTable data={this.state.modalInfo}/>
                </Modal>
                <Table
                    rowClassName={() => 'editable-row'}
                    dataSource={this.state.dataSource}
                    columns={this.columns}
                    pagination={{pageSize: 10}}
                />
            </>
        );
    }
}

export default UrlList
