import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import InputText from '../input'
import { SelectInput } from '../input'
import apiClient from '../axios'
import axios from 'axios'
import Toast from '../toast'
import Loader, { Head, Network, NotFound } from '../loader'
import Activity from '../reactact'
import { getValues } from '../cleantoast'
import { faFileUpload, faTruckMonster, faMoneyCheckAlt, faMoneyCheck, faUserEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MUIDataTable from "mui-datatables";
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css'; // import styles
//import 'react-summernote/lang/'; // you can import any other locale
import Provider from './usercontext';
import { Switch, Route, history, withRouter, useLocation, useHistory, Router, Link, useRouteMatch, useParams } from 'react-router-dom'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
let cancel
class CreateNews extends React.Component {
    static contextType = Provider;
    constructor(props) {

        super(props)
        this.activity = new Activity(this)
        this.state = {
            loader: false,
            invalid: false,

            category: [

            ],
            catloading: true,
            toast: {
                show: false,
                color: '',
                title: '',
                message: '',

            },
            config: {

                title: {
                    value: '',
                    state: false
                },
                news: {
                    value: '',
                    state: false
                },
                image_1: {
                    value: '',
                    state: false
                },
                image_2: {
                    value: '',
                    state: true
                },
                category: {
                    value: '',
                    state: false
                },


            },
            imgerr: false,
            imgerrmsg: '',
            image_1: null,
            imgerr_2: false,
            imgerrmsg_2: '',
            image_2: null,
            status: null,
            newserr: null,
            gamt: 0,
            edit: false,
            data: [],
            loading: ''
        }
        this.default = this.state.config

    }


    image;


    async componentDidMount() {
        console.log(this.context)
        let { match: { params: { id } } } = this.props;
        if (id !== undefined) {
            this.setState({ edit: true, loading: true })


            let r = await apiClient.get('/api/news/list/' + id, {
                cancelToken: new axios.CancelToken(function (c) {
                    cancel = c
                })
            })
            if (r.code == undefined) return
            if (r.code == 1) {
                let cat = r.message;
                let config = {

                    title: {
                        value: cat.title,
                        state: cat.title ? true : false
                    },
                    news: {
                        value: cat.news,
                        state: cat.news ? true : false
                    },
                    category: {
                        value: cat.category,
                        state: cat.category ? true : false
                    },
                    image_1: {
                        value: cat.image_1,
                        state: cat.image_1 ? true : false
                    },
                    image_2: {
                        value: cat.image_2,
                        state: true
                    },

                }

                //    let amt = Object.values(cat.donations).map(e => e.donation_amount)
                //   var sum = amt.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)

                var status = cat.status
                this.setState({ config: config, image_1: cat.image_1, image_2: cat.image_2, loading: false, network: false, notfound: false, status: status, author: cat.author })
            } else {
                if (r.code == 2) {

                    this.setState({ notfound: true, loading: false, network: false })
                } else {
                    this.setState({ notfound: false, loading: false, network: true })
                }
            }

        }

        let response = await apiClient.get('/api/category', {
            cancelToken: new axios.CancelToken(function (c) {
                cancel = c
            })
        });

        if (response.code == undefined) return

        if (response.code == 1) {
            let cat = response.message;

            this.setState(prev => ({
                ...prev, catloading: false, category: cat,
            }))
        }
    }




    register = async (e) => {
        await this.setState({ loader: true, invalid: true })
        let { title, news, category, image_1, image_2 } = this.state.config
        let form = new FormData();
        let { match: { params: { id } } } = this.props
        form.append('title', title.value);
        form.append('news', news.value);
        form.append('category', category.value)
        form.append('image_1', image_1.value)
        form.append('image_2', image_2.value)
        form.append('id', id)
        let url = '/api/news/create'
        if (this.state.edit) {
            url = '/api/news/update'
        }
        let register = await apiClient.sendPost(url, form, {
            Accept: 'multipart/form-data'
        })


        if (this.state.edit) {
            this.setState({
                toast: {
                    show: true,
                    color: register.code == 1 ? 'toastGreen' : 'toastRed',
                    title: register.code == 1 ? 'Success' : 'Failure',
                    message: register.message,

                },
                loader: false,
                invalid:false
            })
        } else {

            await this.activity.formend(register);
            this.setState({ image_1: null, image_2: null })
        }
    }


    approve = async (status) => {
        this.setState({ approval: true })

        let { match: { params: { id } } } = this.props
        let response = await apiClient.sendPost('/api/news/approve/' + id + '/' + status, {
            id: id,
            status: status
        }, {
            cancelToken: new axios.CancelToken(function (e) {
                cancel = e
            })
        })


        this.setState({
            approval: false,
            toast: {
                show: true,
                color: response.code == 1 ? 'toastGreen' : 'toastRed',
                title: response.code == 1 ? 'Success' : 'Failure',
                message: response.message,

            },
        })
        response.code == 1 && this.setState({ status: status })
    }


    render() {
        return (
            <>

                {this.state.loading ? <Loader /> : this.state.notfound ? <NotFound action={() => null} /> : this.state.network ? <Network />
                    :
                    <>
                        {this.state.edit ?
                            <Head crumb={[{ route: '/dashboard/in', title: 'Home' }, { route: this.props.geturl, title: this.props.title }, { route: this.props.location.pathname, title: this.state.config.title.value }]} /> :
                            <Head crumb={[{ route: '/dashboard/in', title: 'Home' }, { route: `/dashboard/in/projects/create`, title: `Create News` }]} />}

                        <div className="create-cont">

                            <div className='create-cont-inner'>
                                {this.state.edit ?
                                    <div className="d-flex p-3 justify-content-around text-white" style={{ background: 'rgba(250, 119, 11,10.5)' }}>
                                        <span><FontAwesomeIcon icon={faUserEdit} /> Created By  {this.state.author}</span>

                                        {this.context.role_id == 4 ?
                                            <div disabled={this.state.approval}>

                                                {this.state.status == 0 || this.state.status == 2 ?
                                                    <span className="btn btn-success" onClick={() => this.approve(1)} style={{ cursor: 'pointer' }}>Approve </span>
                                                    : null}
                                                {this.state.status == 0 || this.state.status == 1 ?
                                                    <span className="btn btn-danger" onClick={() => this.approve(2)} style={{ cursor: 'pointer' }}>Disapprove</span>
                                                    : null}</div> : null}
                                    </div> : null}
                                <div className="project-cont" style={{ borderRadius: '0px', padding: '2%' }}>

                                    <Toast

                                        show={this.state.toast.show ? "show" : ''}
                                        color={this.state.toast.color}
                                        title={this.state.toast.title}
                                        message={this.state.toast.message}
                                        cleanToast={this.activity.cleanToast}
                                    />


                                    <div className="p-form">
                                        <form  >


                                            <InputText
                                                type="text"
                                                id="title"
                                                label="News Title"
                                                value={this.state.config.title.value}

                                                getValues={this.activity.getValues}
                                                constraint={{ required: true }}
                                                reset={this.state.reset}
                                                disabled={this.state.edit}
                                            />
                                            <SelectInput
                                                id="category"
                                                isLoading={this.state.catloading}
                                                data={this.state.category}
                                                label="Category"
                                                disabled={this.state.edit && this.context.email != this.state.author}
                                                valueKeys={{ "value": "id", "label": "category" }}
                                                value={this.state.config.category.value}
                                                getValues={this.activity.getValues}
                                                reset={this.state.reset}
                                            />
                                            {this.state.edit && this.context.email != this.state.author ?
                                                <div style={{minHeight:'500px', height:'500px', border:'2px solid #ccc'}} dangerouslySetInnerHTML={{ __html: this.state.config.news.value }}></div> :
                                                <CKEditor

                                                    editor={ClassicEditor}
                                                    data={this.state.config.news.value}
                                                    onInit={editor => {
                                                        // You can store the "editor" and use when it is needed.
                                                        console.log('Editor is ready to use!', editor);
                                                    }}
                                                    onChange={(event, editor) => {
                                                        const data = editor.getData();
                                                        this.setState(prev => ({
                                                            ...prev,
                                                            config: {
                                                                ...prev.config,

                                                                news: {
                                                                    value: data,
                                                                    state: data ? true : false
                                                                }
                                                            }
                                                        }))
                                                        console.log({ event, editor, data });
                                                    }}
                                                    onBlur={(event, editor) => {
                                                        console.log('Blur.', editor);
                                                    }}
                                                    onFocus={(event, editor) => {
                                                        console.log('Focus.', editor);
                                                    }}
                                                />
                                            }

                                            {this.state.newserr != null ?
                                                <span className="invalid" id=""  >
                                                    <span>{this.state.newserr}</span> <span className="fa fa-times "></span>
                                                </span> : null
                                            }





                                        </form>
                                        {this.state.edit && this.context.email != this.state.author ? null :
                                        <button onClick={(e) => { e.preventDefault(); this.register() }} className={`bbhf_btn  ${this.state.edit ? 'bbhf_btn_orange' : 'bbhf_btn_green'} mb-4`} disabled={this.activity.inputState() || this.state.invalid}>
                                            {this.state.loader ? <span style={{ display: "flex" }}><Loader />Processing</span> :
                                                this.state.edit ? "Update" : "Create"}</button>
                                        }
                                    </div>
                                    <div className="p-image">
                                        <span><strong> Main Image Must be 1000 x 500 px (Required) </strong> {this.state.imgerr ? <span className="text-danger">{this.state.imgerrmsg}</span> : null} </span>

                                        <img src={this.state.image_1 || null} style={{ width: '100%', height: '300px' }} placeholder="Project Image" onClick={() => this.state.edit && this.context.email != this.state.author ? null : this.image.click() } disabled={this.context.email === this.state.author} />
                                        <input ref={e => this.image = e} type='file' hidden onChange={(event) => {
                                            event.persist()

                                            if (!event.target.files[0].type.includes('image')) {
                                                this.setState({ imgerr: true, imgerrmsg: "invalid picture format" })
                                                return
                                            }
                                            if (event.target.files && event.target.files[0]) {
                                                let image = new Image();
                                                image.src = URL.createObjectURL(event.target.files[0])

                                                this.setState(prev => ({
                                                    ...prev, config: { ...prev.config, image_1: { value: event.target.files[0], state: true } }, image_1: URL.createObjectURL(event.target.files[0]), imgerr: false
                                                }
                                                ))

                                            }
                                        }
                                        }
                                        />
                                        <span><strong> Second Image Must be 500 x 500 px (optional) </strong> {this.state.imgerr ? <span className="text-danger">{this.state.imgerrmsg}</span> : null} </span>

                                        <img src={this.state.image_2 || null} style={{ width: '100%', height: '300px' }} placeholder="Project Image" onClick={() => this.state.edit && this.context.email != this.state.author ? null : this.image_2.click()} disabled={this.context.email !== this.state.author} />
                                        <input ref={e => this.image_2 = e} type='file' hidden onChange={(event) => {
                                            event.persist()

                                            if (!event.target.files[0].type.includes('image')) {
                                                this.setState({ imgerr_2: true, imgerrmsg_2: "invalid picture format" })
                                                return
                                            }
                                            if (event.target.files && event.target.files[0]) {
                                                let image = new Image();
                                                image.src = URL.createObjectURL(event.target.files[0])

                                                this.setState(prev => ({
                                                    ...prev, config: { ...prev.config, image_2: { value: event.target.files[0], state: true } }, image_2: URL.createObjectURL(event.target.files[0]), imgerr_2: false
                                                }
                                                ))

                                            }
                                        }
                                        }
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </>
                }
            </>
        )
    }


    componentWillUnmount() {
        cancel()
    }
}

export function NewsList({ geturl, title, posturl }) {
    const [loader, setLoader] = useState(true)
    const [network, setNetwork] = useState(false)
    const [data, setData] = useState([])
    let history = useHistory()
    let { path, url } = useRouteMatch();
    let cancel = null
    const options = {
        filterType: 'checkbox',
        search: true,
        selectableRows: 'none',
        onRowClick: async (i, v) => {


            history.push(url + '/' + i[1], { 't': i[0] })
            //  setState({open:true})
        },


    };
    const h = async () => {
        let response = await apiClient.get(posturl, {
            cancelToken: new axios.CancelToken(e => cancel = e),
            timeout: 100000

        });
        if (response.code == 1) {
            setData(response.message);
            setLoader(false)
            setNetwork(false)

        } else {
            setLoader(false)
            setNetwork(true)
        }
    }

    useEffect(() => {
        h()

        return function cleanup() {
            console.log('clean')
            cancel('list')
        }
    }, [])



    return (
        <>




            <Head crumb={[{ route: '/dashboard/in', title: 'Home' }, { route: geturl, title: title }]} />
            <div className="scroll-content">
                {loader ? <Loader /> : network ? <Network action={h} /> :

                    <MUIDataTable
                        title={title}
                        data={data}
                        columns={col}
                        options={options}
                    />

                }

            </div>



        </>
    )



}



export default withRouter(CreateNews)


const col = [
    {
        name: "title",
        label: 'News Title',
        options: {
            filter: true,
            sort: true,
            searchable: true
        }
    },
    {
        name: "id",
        label: 'id',
        options: {
            display: false
        }
    },



    {
        name: "created_at",
        label: 'Date Created',
        options: {
            filter: true,
            sort: true
        }
    },
    {
        name: "author",
        label: 'Author',
        options: {
            filter: true,
            sort: true
        }
    },
    {
        name: "status",
        label: 'Status',
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                return value == 0 ? 'InActive' : 'Active'
            }
        }
    },

];



