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
// import styles
//import 'react-summernote/lang/'; // you can import any other locale
import Provider from './usercontext';
import { Switch, Route, history, withRouter, useLocation, useHistory, Router, Link, useRouteMatch, useParams } from 'react-router-dom'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Axios from 'axios'
let cancel
class CreateGrant extends React.Component {
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
                publication: {
                    value: '',
                    state: false
                },
                image: {
                    value: '',
                    state: false
                },
                type: {
                    value: '',
                    state: true
                },



            },
            imgerr: false,
            imgerrmsg: '',
            image: null,


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


            let r = await apiClient.get('/api/grant/list/' + id, {
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
                    publication: {
                        value: cat.publication,
                        state: cat.publication ? true : false
                    },
                    type: {
                        value: cat.type,
                        state: cat.type ? true : false
                    },
                    image: {
                        value: cat.image,
                        state: cat.image ? true : false
                    },


                }

                //    let amt = Object.values(cat.donations).map(e => e.donation_amount)
                //   var sum = amt.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)

                var status = cat.status
                this.setState({ config: config, image: cat.image, loading: false, network: false, notfound: false, status: status })
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
        let { title, publication, type, image } = this.state.config
        let form = new FormData();
        let { match: { params: { id } } } = this.props
        form.append('title', title.value);
        form.append('publication', publication.value);
        form.append('type', type.value)
        form.append('image', image.value)

        form.append('id', id)
        let url = '/api/grant/create'
        if (this.state.edit) {
            url = '/api/grant/update'
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
                invalid: false
            })
        } else {

            await this.activity.formend(register);

            if (register.code == 1) {
                this.setState({ image: null })
            }

        }
    }


    approve = async () => {
        this.setState({ approval: true })
        let status = this.state.status == 1 ? 0 : 1
        let { match: { params: { id } } } = this.props
        let response = await apiClient.sendPost('/api/grant/active/' + id + '/' + status, {
            id: id,

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
                            <Head crumb={[{ route: '/dashboard/in', title: 'Home' }, { route: `/dashboard/in/grant/create`, title: `Create Opportunity` }]} />}

                        <div className="create-cont">

                            <div className='create-cont-inner'>
                                {this.state.edit ?
                                    <div className="d-flex p-3 justify-content-around text-white" style={{ background: 'rgba(250, 119, 11,10.5)' }}>


                                        {this.context.role_id == 4 ?
                                            <div disabled={this.state.approval}>



                                                <span className="btn btn-danger" onClick={() => this.approve()} style={{ cursor: 'pointer' }}>{this.state.status == 1 ? 'Deactivate' : 'Activate'}</span>

                                            </div> : null}
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
                                                id="type"
                                                isLoading={this.state.catloading}
                                                data={['Scholarship', 'Entreprenuership', 'Competition']}
                                                label="Type"

                                                value={this.state.config.type.value}
                                                getValues={this.activity.getValues}
                                                reset={this.state.reset}
                                            />
                                            <CKEditor

                                                editor={ClassicEditor}
                                                data={this.state.config.publication.value}
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

                                                            publication: {
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


                                            {this.state.newserr != null ?
                                                <span className="invalid" id=""  >
                                                    <span>{this.state.newserr}</span> <span className="fa fa-times "></span>
                                                </span> : null
                                            }





                                        </form>

                                        <button onClick={(e) => { e.preventDefault(); this.register() }} className={`bbhf_btn  ${this.state.edit ? 'bbhf_btn_orange' : 'bbhf_btn_green'} mb-4`} disabled={this.activity.inputState() || this.state.invalid}>
                                            {this.state.loader ? <span style={{ display: "flex" }}><Loader />Processing</span> :
                                                this.state.edit ? "Update" : "Create"}</button>

                                    </div>
                                    <div className="p-image">
                                        <span><strong> Main Image must be a designed flyer of  300 x 300 px (Required) </strong> {this.state.imgerr ? <span className="text-danger">{this.state.imgerrmsg}</span> : null} </span>

                                        <img src={this.state.image || null} style={{ width: '100%', height: '300px' }} placeholder="Project Image" onClick={() => this.state.edit && this.context.email != this.state.author ? null : this.image.click()} disabled={this.context.email === this.state.author} />
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
                                                    ...prev, config: { ...prev.config, image: { value: event.target.files[0], state: true } }, image: URL.createObjectURL(event.target.files[0]), imgerr: false
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

export function GrantList({ geturl, title, posturl }) {
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


export function GrantApplication({ posturl, geturl, title }) {
    const [loader, setLoader] = useState(true)
    const [network, setNetwork] = useState(false)
    const [notfound, setNotfound] = useState(false)
    const [data, setData] = useState([])
    const [status, setStatus] = useState([])
    let history = useHistory()
    let params = useParams();
    let { path, url } = useRouteMatch();
    let cancel = null
    const options = {
        filterType: 'checkbox',
        search: true,
        selectableRows: 'none',
    };

    const h = async () => {
        let response = await apiClient.get(posturl + '/' + params.id, {
            cancelToken: new axios.CancelToken(e => cancel = e),
            timeout: 100000

        });
        if (response.code == 1) {
            setData(response.message.data);
            setStatus(response.message.payload)
            setLoader(false)
            setNetwork(false)
            setNotfound(false)
        } else if (response.code == 2) {

            setLoader(false)
            setNetwork(false)
            setNotfound(true)
        } else {
            setLoader(false)
            setNetwork(true)
            setNotfound(false)
        }
    }

    useEffect(() => {
        h()

        return function cleanup() {
            console.log('clean')
            cancel('list')
        }
    }, [])

    const col = [
        {
            name: "fullname",
            label: 'Full Name',
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },

        {
            name: "phone_number",
            label: 'Phone Number',
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "grant",
            label: 'Type',
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },

        {
            name: "id",
            label: 'Type',
            options: {
               display:false
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
            name: "file",
            label: 'Download',
            options: {
                filter: false,
                sort: false,
                download: false,
                print: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    console.log(value, tableMeta, updateValue)
                    return <a href={ value} className='btn btn-success'>Download</a>
                }
            }
        },
        {
            name: "status",
            label: 'Status',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                            let valu = value
                   let { rowData } = tableMeta
                    if (status == 1 && value == 0) {
                        return <a href="javascript:void(0)" onClick={(e) => {
                            e.preventDefault()
                             
                           Axios.post(posturl+'/'+rowData[3]+'/accept',{
                            cancelToken: new axios.CancelToken(e => cancel = e)
                           }).then(resp=>{
                              if(resp.data.code == 1){
                                  setData(resp.data.message)
                              }
                           }).catch(err=>{
                               if(err.isCancel()){
                                   return;
                               }
                           })

                        }

                        } className='btn btn-success'>Accept</a>
                    } else {
                        if (value == 1) {
                            return 'Accepted'
                        } else {
                            return 'Rejected'
                        }
                    }
                }
            },
        }
    ];

    return (
        <>




            <Head crumb={[{ route: '/dashboard/in', title: 'Home' }, { route: geturl, title: title }]} />
            <div className="scroll-content">
                {loader ? <Loader /> : network ? <Network action={h} /> : notfound ? <NotFound /> :

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

export default withRouter(CreateGrant)


const col = [
    {
        name: "title",
        label: 'Title',
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
        name: "type",
        label: 'Type',
        options: {
            filter: true,
            sort: true,
            searchable: true
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



