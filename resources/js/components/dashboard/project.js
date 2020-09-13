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
import { faFileUpload, faTruckMonster, faMoneyCheckAlt, faMoneyCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MUIDataTable from "mui-datatables";


import { Switch, Route, history, withRouter, useLocation, useHistory, Router, Link, useRouteMatch, useParams } from 'react-router-dom'


let cancel
class CreateProject extends React.Component {

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
                description: {
                    value: '',
                    state: false
                },
                amount: {
                    value: '',
                    state: false
                },
                category: {
                    value: '',
                    state: false
                },
                image: {
                    value: '',
                    state: false
                },


            },
            imgerr: false,
            imgerrmsg: '',
            image: null,
            status: null,
            gamt: 0,
            edit: false,
            data: [],
            loading: ''
        }
        this.default = this.state.config
    }


    image;


    async componentDidMount() {

        let { match: { params: { id } } } = this.props;
        if (id !== undefined) {
            this.setState({ edit: true, loading: true })

         
            let r = await apiClient.get('/api/projects/list/' + id, {
                cancelToken: new axios.CancelToken(function (c) {
                    cancel = c
                })
            })
       
            if (r.code == 1) {
                let cat = r.message;
                let config = {

                    title: {
                        value: cat.project,
                        state: cat.project ? true : false
                    },
                    description: {
                        value: cat.description,
                        state: cat.description ? true : false
                    },
                    amount: {
                        value: cat.amount,
                        state: cat.amount ? true : false
                    },
                    category: {
                        value: cat.category,
                        state: cat.category ? true : false
                    },
                    image: {
                        value: '',
                        state: cat.image ? true : false
                    }
                }

                let amt = Object.values(cat.donations).map(e => e.donation_amount)
                var sum = amt.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)

                var status = cat.status
                this.setState({ config: config, image: cat.image, loading: false, network: false, notfound: false, gamt: sum, status: status, data: cat.donations })
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

        if (response.code == 1) {
            let cat = response.message;

            this.setState(prev => ({
                ...prev, catloading: false, category: cat,
            }))
        }
    }




    register = async (e) => {
        await this.setState({ loader: true, invalid: true })
        let { title, description, amount, image, category } = this.state.config
        let form = new FormData();
        form.append('project', title.value);
        form.append('description', description.value);
        form.append('amount', amount.value)
        form.append('image', image.value)
        form.append('category', category.value)

        let register = await apiClient.sendPost('/api/projects/create', form, {
            Accept: 'multipart/form-data'
        })


        if (this.state.edit) {
            this.setState({ loading: false })
        } else {
            await this.activity.formend(register);

            this.setState({ image: '' })
        }
    }
    active = async () => {
        let status;
        let { match: { params: { id } } } = this.props
        let response = await apiClient.sendPost('/api/projects/active', {
            id: id,
            status: this.state.status == 0 ? 1 : 0
        }, {
            cancelToken: new axios.CancelToken(function (e) {
                cancel = e
            })
        })


        this.setState({
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
                            <Head crumb={[{ route: '/dashboard/in', title: 'Home' }, { route: `/dashboard/in/projects/list`, title: `Create Project` }, { route: this.props.location.pathname, title: this.state.config.title.value }]} /> :
                            <Head crumb={[{ route: '/dashboard/in', title: 'Home' }, { route: `/dashboard/in/projects/create`, title: `Create Project` }]} />}

                        <div className="create-cont">

                            <div className='create-cont-inner'>
                                {this.state.edit ?
                                    <div className="d-flex p-3 justify-content-around text-white" style={{ background: 'rgba(250, 119, 11,10.5)' }}>
                                        <span><FontAwesomeIcon icon={faMoneyCheckAlt} /> Target  {this.state.config.amount.value}</span>
                                        <span><FontAwesomeIcon icon={faMoneyCheck} /> Generated {this.state.gamt}</span>
                                        <span onClick={this.active} style={{ cursor: 'pointer' }}>{this.state.status == 1 ? 'Deactivate?' : 'Activate?'} </span>
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
                                                label="Project Title"
                                                value={this.state.config.title.value}

                                                getValues={this.activity.getValues}
                                                constraint={{ required: true }}
                                                reset={this.state.reset}
                                                disabled={this.state.edit}
                                            />
                                            <InputText
                                                type="text"
                                                id="description"
                                                label="Project Description"
                                                value={this.state.config.description.value}
                                                getValues={this.activity.getValues}
                                                constraint={{ required: true }}
                                                reset={this.state.reset}
                                            />
                                            <InputText
                                                type="number"
                                                id="amount"
                                                label="Project Budget"
                                                value={this.state.config.amount.value}
                                                getValues={this.activity.getValues}
                                                constraint={{ required: true, min: 1 }}
                                                reset={this.state.reset}
                                            />
                                            <SelectInput
                                                id="category"
                                                isLoading={this.state.catloading}
                                                data={this.state.category}
                                                label="Category"
                                                valueKeys={{ "value": "id", "label": "category" }}
                                                value={this.state.config.category.value}
                                                getValues={this.activity.getValues}
                                                reset={this.state.reset}
                                            />






                                        </form>
                                        {!this.state.edit ?
                                            <button onClick={(e) => { e.preventDefault(); this.register() }} className="bbhf_btn bbhf_btn_green mb-4" disabled={this.activity.inputState() || this.state.invalid}>
                                                {this.state.loader ? <span style={{ display: "flex" }}><Loader />Processing</span> :
                                                    "Create"}</button>
                                            :
                                            <button onClick={(e) => { e.preventDefault(); this.register() }} className="bbhf_btn bbhf_btn_orange" disabled={this.activity.inputState() || this.state.invalid}>
                                                {this.state.loader ? <span style={{ display: "flex" }}><Loader />Processing</span> :
                                                    "Update"}</button>
                                        }
                                    </div>
                                    <div className="p-image">
                                        <span><strong> Image Must be 1000 x 500 px </strong> {this.state.imgerr ? <span className="text-danger">{this.state.imgerrmsg}</span> : null} </span>

                                        <img src={this.state.image || null} style={{ width: '100%', height: '300px' }} placeholder="Project Image" onClick={() => this.image.click()} />
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
                                {this.state.edit ?
                                    <MUIDataTable
                                        title={'Donation History'}
                                        data={this.state.data}
                                        columns={[
                                            {
                                                name: 'name',
                                                label: 'Donor'
                                            },
                                            {
                                                name: 'donation_amount',
                                                label: 'Amount'
                                            },
                                            {
                                                name: 'donation_reference',
                                                label: 'Payment Reference'
                                            },

                                            {
                                                name: 'date_donated',
                                                label: 'Date'
                                            },



                                        ]}
                                        options={{
                                            selectableRows: 'none'
                                        }
                                        }
                                    />
                                    : null}

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

export function ProjectList() {
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
        let response = await apiClient.get('/api/projects/list', {
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

        return function cleanup(){ 
            console.log('clean')
            cancel('list')}
    }, [])



    return (
        <>




            <Head crumb={[{ route: '/dashboard/in', title: 'Home' }, { route: `/dashboard/in/projects/list`, title: `Project List` }]} />
            <div className="scroll-content">
                {loader ? <Loader /> : network ? <Network action={h} /> :

                    <MUIDataTable
                        title={'Project List'}
                        data={data}
                        columns={col}
                        options={options}
                    />

                }

            </div>



        </>
    )



}



export default withRouter(CreateProject)


const col = [
    {
        name: "project",
        label: 'Project Title',
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
        name: "description",
        label: 'Description',
        options: {
            filter: true,
            sort: true
        }
    },
    {
        name: "amount",
        label: 'Project Budget',
        options: {
            filter: true,
            sort: true
        }
    },

    {
        name: "amount_raised",
        label: 'Amount Raised',
        options: {
            filter: true,
            sort: true
        }
    },
    {
        name: "status",
        label: 'Project Status',
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                return value == 0 ? 'InActive' : 'Active'
            }
        }
    },

];




export function DonateList() {
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



    };
    const col = [
        {
            name: "donation_reference",
            label: 'Payment Reference',
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "name",
            label: 'Name',
            options: {
                display: false
            }
        },
        {
            name: "project",
            label: 'Project',
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "category",
            label: 'Category',
            options: {
                filter: true,
                sort: true
            }
        },

        {
            name: "donation_amount",
            label: 'Amount',
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "date_donated",
            label: 'Date',
            options: {
                filter: true,
                sort: true,

            }
        },

    ];
    const h = async () => {
        let response = await apiClient.get('/api/donate/list', {
            cancelToken: new axios.CancelToken(e => cancel = e),
            timeout: 100000

        });
        if (response.code == 1) {
          let a =  Object.values(response.message).filter(e=>{
                e.project = e.projects.project; e.category = e.category.category})

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

        return () => cancel()
    }, [])



    return (
        <>

            <Head crumb={[{ route: '/dashboard/in', title: 'Home' }, { route: `/dashboard/in/donate/list`, title: `Donation List` }]} />
            <div className="scroll-content">
                {loader ? <Loader /> : network ? <Network action={h} /> :

                    <MUIDataTable
                        title={'Donation List'}
                        data={data}
                        columns={col}
                        options={options}
                    />

                }

            </div>



        </>
    )



}

