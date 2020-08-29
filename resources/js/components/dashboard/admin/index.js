import React, { useState } from 'react'
import ReactDom from 'react-dom'
import Sidebar from '../sidebar'

import Donate from '../../donate'
import { faUsers, faEye, faPaperclip, faArrowCircleDown, faUserFriends, faBriefcase, faEdit, faCheck, faHamburger } from '@fortawesome/free-solid-svg-icons'
import { Switch, Route, history, withRouter, useLocation, useHistory, Router } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Application, MemberList } from '../members'
import { Volunteer_Application, VolunteerList } from '../volunteer'
import {ApplicationComponent, ListComponent} from '../usercomponent'


function Admin(props) {
    const [open, setOpen] = useState(true)



    const menu = [
        {
            title: 'Members',
            icon: faArrowCircleDown,
            item: [
                {
                    title: 'View Application',
                    route: '/dashboard/in/members/application',
                    icon: faPaperclip,

                },
                {
                    title: 'View Members',
                    route: '/dashboard/in/members/list',
                    icon: faEye,

                },
                {
                    title: 'Chat',
                    route: '/dashboard/in/members/chat',
                    icon: faUserFriends,

                }
            ]
        },
        {
            title: 'Volunteers',
            icon: faArrowCircleDown,
            item: [
                {
                    title: 'View Application',
                    route: '/dashboard/in/volunteers/application',
                    icon: faPaperclip,

                },
                {
                    title: 'View Members',
                    route: '/dashboard/in/volunteers/list',
                    icon: faEye,

                },
                {
                    title: 'Chat',
                    route: '/dashboard/in/volunteers/chat',
                    icon: faUserFriends,

                }
            ]
        },
        {
            title: 'Sponsors',
            icon: faArrowCircleDown,
            item: [

                {
                    title: 'View Sponsors',
                    route: '/dashboard/in/sponsors/list',
                    icon: faEye,

                },
                {
                    title: 'Chat/Report',
                    route: '/dashboard/in/members/chat',
                    icon: faBriefcase,

                }
            ]
        },
        {
            title: 'Admin',
            icon: faArrowCircleDown,
            item: [

                {
                    title: 'View Admin',
                    route: '/dashboard/in/admin/list',
                    icon: faEye,

                },
                {
                    title: 'Chat/Report',
                    route: '/dashboard/in/admin/chat',
                    icon: faBriefcase,

                }
            ]
        },
        {
            title: 'Projects',
            icon: faArrowCircleDown,
            item: [

                {
                    title: 'Create',
                    route: '/dashboard/in/projects/create',
                    icon: faEye,

                },
                {
                    title: 'Chat/Report',
                    route: '/dashboard/in/members/chat',
                    icon: faBriefcase,

                }
            ]
        },
        {
            title: 'News',
            icon: faArrowCircleDown,
            item: [
                {
                    title: 'Create',
                    route: '/dashboard/in/news/create',
                    icon: faEdit,

                },
                {
                    title: 'View Active',
                    route: '/dashboard/in/news/active/list',
                    icon: faEye,

                },
                {
                    title: 'Approve',
                    route: '/dashboard/in/news/new/list',
                    icon: faCheck,

                }
            ]
        }
    ]

    let routes = () => {
        const array = [];
        menu.map((data) => {
            data.item.map((newData) => {
                array.push(newData)
            }
            )
        })
        return array;
    }
    const route = [
        {
            path: "/dashboard/in/members/application",
            main: () => <ApplicationComponent routeType='members' routeTitle="Members" />
        },
        {
            path: "/dashboard/in/members/list",

            main: () => <ListComponent routeType='members' routeTitle="Members" />
        },
        {
            path: "/dashboard/in/members/chat",

            main: () => <div>chat</div>
        },
        {
            path: "/dashboard/in/volunteers/application",
            main: () => <ApplicationComponent routeType='volunteers' routeTitle="Volunteers" />
        },
        {
            path: "/dashboard/in/volunteers/list",

            main: () => <ListComponent routeType='volunteers' routeTitle="Volunteers" />
        },
        {
            path: "/dashboard/in/volunteers/chat",

            main: () => <div>chat</div>
        },
      
        {
            path: "/dashboard/in/sponsors/list",

            main: () => <ListComponent routeType='sponsors' routeTitle="Sponsor" />
        },
        {
            path: "/dashboard/in/sponsors/chat",

            main: () => <div>chat</div>
        },
        {
            path: "/dashboard/in/admin/list",

            main: () => <ListComponent routeType='admin' routeTitle="Admin" />
        },
        {
            path: "/dashboard/in/admin/chat",

            main: () => <div>chat</div>
        },
        
        {
            path: "/shoelaces",
            sidebar: () => <div>shoelaces!</div>,
            main: () => <h2>Shoelaces</h2>
        }
    ];
    let r = routes();
    return (
        <>
            <div id='c' className="page-holder">

                <Sidebar menu={menu} open={open} />
                <div className="content ">
                    <div className="nav-head">
                        <a className="open menu-slider" onClick={() => {
                            setOpen(!open)

                        }

                        }><FontAwesomeIcon icon={faHamburger} /></a>
                        <div className="profile-holder" >
                            <span className="username">{props.user.first_name + '  ' + props.user.last_name}</span>
                            <img src={props.user.photo || '/images/default.png'} className="profile-pix" />
                        </div>
                    </div>
                    <Router history={props.history}>
                        <Switch>
                            <Route

                                path='/dashboard/in/'
                                exact
                                component={() => <h2>Weelcome</h2>}
                            />

                            {route.map((rout, index) => (
                                // Render more <Route>s with the same paths as
                                // above, but different components this time.
                                <Route
                                    key={index}
                                    path={rout.path}
                                    exact={rout.exact}
                                    children={rout.main}
                                />
                            ))}

                            <Route path="*" component={() => <h2> Not Found</h2>} />

                        </Switch>
                    </Router>
                </div>

            </div>

        </>


    )

}
export default withRouter(Admin)
