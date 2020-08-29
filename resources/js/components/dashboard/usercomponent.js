import React, { useState, Component } from 'react'

import Modal, { Application_list, ModalContent, List } from '../modal'
import Loader, { Network, Head } from '../loader';
import {TableWorker} from '../table'








export function ApplicationComponent(props) {
   



        return (
            <>
           <Head crumb={[{ route: '/dashboard/in', title: 'Home' }, { route: `/dashboard/in/${props.routeType}/application`, title: `${props.routeTitle} Application` }]} />
                <TableWorker
                 keys={{ first_name: 0, other_name: 1, last_name: 2, email: 3, phone: 4 }} 
                 user={{ email: '', phone: '', first_name: '', other_name: '', last_name: '' }} 
                 col={col} modalTitle={`'${props.routeTitle} Information'`}
                 ModalContent={ModalContent} 
                 modal_child={Application_list}
                 modalurl={{'userUrl':`/api/${props.routeType}/application/`,'approval':`/api/${props.routeType}/application/approve`}} 
                 tableTitle="Application List"
                 tableUrl={`/api/${props.routeType}/application`} />

 
            </>
        )

}




const col = [
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



export function  ListComponent(props){

 
        return (
            <>

                <Head crumb={[{ route: '/dashboard/in', title: 'Home' }, { route: `/dashboard/in/${props.routeType}/application/list`, title: `${props.routeTitle} List` }]} />
                <TableWorker
                 keys={{ first_name: 0, other_name: 1, last_name: 2, email: 3, phone: 4 }} 
                 user={{ email: '', phone: '', first_name: '', other_name: '', last_name: '' }} 
                 col={col} modalTitle={`${props.routeTitle} Information`}
                 ModalContent={ModalContent} 
                 modal_child={List}
                 modalurl={{'userUrl':`/api/${props.routeType}/list/`,'revoke':`/api/${props.routeType}/revoke`,'update':`/api/${props.routeType}/update`}} 
                 tableTitle="Volunteers List"
                 tableUrl={`/api/${props.routeType}/list`} />
            </>
        )
    
}









