import React, { useState } from 'react'

import apiClient from './axios'
import MUIDataTable from "mui-datatables";
import Loader, { Network, Head } from './loader';
import Modal, { Application_list, ModalContent, List } from './modal'
import Axios from 'axios';









let cancel


export class TableWorker extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loader: true,
            data: [

            ],
            open: false,
            modalTitle: this.props.modalTitle,
            user: this.props.user,
            toast: {
                show: false,
                color: '',
                title: '',
                message: ''
            }

        }
        this.defaults = this.state.user;
    }
    async componentDidUpdate(props, state) {

        if (!this.state.open && state.open != this.state.open) {
            await this.setState({ user: this.defaults });
        }
    }
    reloadTable = async () => {
        await this.setState({ loader: true })
        let response = await apiClient.get(this.props.tableUrl,  { 
            
            cancelToken: new Axios.CancelToken(c=>cancel = c),
            timeout: 50000 });
            if (response == null) return;
        if (response.code == 1) {
            await this.setState({ loader: false, data: response.message, open: false, network: false })
        } else {
            await this.setState({ loader: false, data: response.message, open: false, network: true })
        }
    }
    async componentDidMount() {

        await this.reloadTable();
    }

    options = {
        filterType: 'checkbox',
        search: true,
        selectableRows: 'none',
        onRowClick: async (i, v) => {
          
            let user = {}
            Object.keys(this.defaults).map(data => {

                user[data] = i[this.props.keys[data]]
            })
           
            await this.setState({
                open: true,
                user: user
            })
         
            //  setState({open:true})
        },
      

    };
    render() {
        return (
            <>
                <Modal parent={this} child={<this.props.ModalContent {...this.state} parent={this} modalurl={this.props.modalurl} modal_child={this.props.modal_child} />} />

                {this.state.loader ? <Loader /> : this.state.network ? <Network action={this.reloadTable} /> :
                    <MUIDataTable
                        title={this.props.tableTitle}
                        data={this.state.data}
                        columns={this.props.col}
                        options={this.options}
                    />}
            </>
        )
    }
componentWillUnmount(){
    cancel()
}

}