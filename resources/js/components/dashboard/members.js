import React, { useState } from 'react'

import Modal, { Application_list, ModalContent, List } from '../modal'
import Loader, { Network, Head } from '../loader';
import {TableWorker} from '../table'








export class Application extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loader: true,
            data: [

            ],
            open: false,
            modalTitle: "Applicant Detail",
            user: {
                name: '',
                email: '',
                phone: ''

            },

        }
    }








    col = [
        {
            name: "first_name",
            label: 'First Name',
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "other_name",
            label: 'Other Name',
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "last_name",
            label: 'Last Name',
            options: {
                filter: true,
                sort: true
            }
        },

        {
            name: "email",
            label: 'Email',
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "phone_number",
            label: 'Phone Number',
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "state_of_residence",
            label: 'State Of Residence',
            options: {
                filter: true,
                sort: true
            }
        },
    ];




    render() {
        return (
            <>
         
                <Head crumb={[{ route: '/dashboard/in', title: 'Home' }, { route: '/dashboard/in/members/application', title: 'Members Application' }]} />
                <TableWorker
                 keys={{ first_name: 0, other_name: 1, last_name: 2, email: 3, phone: 4 }}
                  user={{ email: '', phone: '', first_name: '', other_name: '', last_name: '' }} 
                  options={this.options} col={this.col} modalTitle={this.state.modalTitle}
                   ModalContent={ModalContent} 
                   modal_child={Application_list} 
                   modalurl={{'userUrl':'/api/members/application/','approval':'/api/members/application/approve'}} 
                   tableTitle="Application List" 
                   tableUrl='/api/members/application' />
            </>
        )
    }
}




export class MemberList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loader: true,
            data: [

            ],
            open: false,
            modalTitle: "Member Information",
            user: {
                name: '',
                email: '',
                phone: ''

            },

        }
    }

    col = [
        {
            name: "first_name",
            label: 'First Name',
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "other_name",
            label: 'Other Name',
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "last_name",
            label: 'Last Name',
            options: {
                filter: true,
                sort: true
            }
        },

        {
            name: "email",
            label: 'Email',
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "phone_number",
            label: 'Phone Number',
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "state_of_residence",
            label: 'State Of Residence',
            options: {
                filter: true,
                sort: true
            }
        },
    ];




    render() {
        return (
            <>

                <Head crumb={[{ route: '/dashboard/in', title: 'Home' }, { route: '/dashboard/in/members/application/list', title: 'Member List' }]} />
                
                <TableWorker
                 keys={{ first_name: 0, other_name: 1, last_name: 2, email: 3, phone: 4 }} 
                 user={{ email: '', phone: '', first_name: '', other_name: '', last_name: '' }} 
                 options={this.options} col={this.col} modalTitle={this.state.modalTitle} 
                 ModalContent={ModalContent} 
                 modal_child={List}
                 modalurl={{'userUrl':'/api/members/list/','revoke':'/api/members/revoke','update':'/api/members/update'}} 
                 tableTitle="Members List"
                 tableUrl='/api/members/list' />
            </>
        )
    }
}









