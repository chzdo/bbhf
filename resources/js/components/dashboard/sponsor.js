import React, { useState } from 'react'

import Modal, { Application_list, ModalContent, List } from '../modal'
import Loader, { Network, Head } from '../loader';
import {TableWorker} from '../table'








export class Volunteer_Application extends React.Component {
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
         
                <Head crumb={[{ route: '/dashboard/in', title: 'Home' }, { route: '/dashboard/in/sponsors/application', title: 'Volunteers Application' }]} />
                <TableWorker
                 keys={{ first_name: 0, other_name: 1, last_name: 2, email: 3, phone: 4 }}
                  user={{ email: '', phone: '', first_name: '', other_name: '', last_name: '' }} 
                  options={this.options} col={this.col} modalTitle={this.state.modalTitle}
                   ModalContent={ModalContent} 
                   modal_child={Application_list} 
                   modalurl={{'userUrl':'/api/sponsors/application/','approval':'/api/sponsors/application/approve'}} 
                   tableTitle="Application List" 
                   tableUrl='/api/sponsors/application' />
            </>
        )
    }
}




export class VolunteerList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loader: true,
            data: [

            ],
            open: false,
            modalTitle: "Volunteer Information",
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

                <Head crumb={[{ route: '/dashboard/in', title: 'Home' }, { route: '/dashboard/in/sponsors/application/list', title: 'Volunteer List' }]} />
                <TableWorker
                 keys={{ first_name: 0, other_name: 1, last_name: 2, email: 3, phone: 4 }} 
                 user={{ email: '', phone: '', first_name: '', other_name: '', last_name: '' }} 
                 options={this.options} col={this.col} modalTitle={this.state.modalTitle} 
                 ModalContent={ModalContent} 
                 modal_child={List}
                 modalurl={{'userUrl':'/api/sponsors/list/','revoke':'/api/sponsors/revoke','update':'/api/sponsors/update'}} 
                 tableTitle="Volunteers List"
                 tableUrl='/api/sponsors/list' />
            </>
        )
    }
}









