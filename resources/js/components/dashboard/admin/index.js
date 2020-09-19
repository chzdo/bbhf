import React, { useState, useContext, useEffect } from 'react'
import ReactDom from 'react-dom'
import Sidebar from '../sidebar'

import Donate from '../../donate'
import { faUsers, faEye, faPaperclip, faArrowCircleDown, faUserFriends, faBriefcase, faEdit, faCheck, faHamburger, faMoneyCheck, faPlusCircle, faUserLock, faUserEdit } from '@fortawesome/free-solid-svg-icons'
import { Switch, Route, history, withRouter, useLocation, useHistory, Router } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Application, MemberList } from '../members'
import { Volunteer_Application, VolunteerList } from '../volunteer'
import ChatComponent, { ApplicationComponent, ListComponent } from '../usercomponent'
import Provider from '../usercontext'
import CreateProject, { ProjectList, DonateList } from '../project'
import CreateGrant, { GrantList, GrantApplication } from '../scholarship'
import CreateNews, { NewsList, ApproveList } from '../news'
import { UserPassword, UserProfile } from '../settings'
import {Home} from '../home'
import Axios from 'axios'
function Admin(props) {

    const context = useContext(Provider)
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
                    route: '/dashboard/in/sponsors/chat',
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
                    icon: faEdit,

                },
                {
                    title: 'Project List',
                    route: '/dashboard/in/projects/list',
                    icon: faPaperclip,

                }
                ,
                {
                    title: 'Donation',
                    route: '/dashboard/in/donate/list',
                    icon: faMoneyCheck,

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
                    title: 'View News',
                    route: '/dashboard/in/news/list',
                    icon: faEye,

                },
                {
                    title: 'Approve',
                    route: '/dashboard/in/news/new/list',
                    icon: faCheck,

                }
                ,
                {
                    title: 'Others',
                    route: '/dashboard/in/news/others',
                    icon: faCheck,

                }
            ]
        },

        {
            title: 'Scholarship and Entreprenuership',
            icon: faArrowCircleDown,
            item: [
                {
                    title: 'Create',
                    route: '/dashboard/in/grant/create',
                    icon: faEdit,

                },
                {
                    title: 'View Grants',
                    route: '/dashboard/in/grant/list',
                    icon: faEye,

                },
                {
                    title: 'View Applications',
                    route: '/dashboard/in/grant/application',
                    icon: faCheck,

                }
                ,
                {
                    title: 'View Winners',
                    route: '/dashboard/in/grant/application/winners',
                    icon: faCheck,

                }
            ]
        },
        {
            title: 'Settings',
            icon: faArrowCircleDown,
            item: [
                {
                    title: 'Change Password',
                    route: '/dashboard/in/users/password',
                    icon: faUserLock,

                },
                {
                    title: 'Profile',
                    route: '/dashboard/in/users/profile',
                    icon: faUserEdit,

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

            main: () => <ChatComponent group='2' />
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

            main: () => <ChatComponent group='1' />
        },

        {
            path: "/dashboard/in/sponsors/list",

            main: () => <ListComponent routeType='sponsors' routeTitle="Sponsor" />
        },
        {
            path: "/dashboard/in/sponsors/chat",

            main: () => <ChatComponent group='3' />
        },
        {
            path: "/dashboard/in/admin/list",

            main: () => <ListComponent routeType='admin' routeTitle="Admin" />
        },
        {
            path: "/dashboard/in/admin/chat",

            main: () => <ChatComponent group='4' />
        },
        {
            path: "/dashboard/in/projects/create",

            main: () => <CreateProject />
        },
        {
            path: '/dashboard/in/projects/list/:id',

            main: () => <CreateProject />
        },
        {
            path: "/dashboard/in/projects/list",

            main: () => <ProjectList />
        },
        {
            path: "/dashboard/in/donate/list",

            main: () => <DonateList />
        },
        {
            path: "/dashboard/in/news/create",

            main: () => <CreateNews />
        },
        {
            path: '/dashboard/in/news/list/:id',

            main: () => <CreateNews geturl='/dashboard/in/news/list' title="News List" />
        },
        {
            path: '/dashboard/in/news/new/list/:id',

            main: () => <CreateNews geturl='/dashboard/in/news/new/list' title="New News List" />
        },
        {
            path: '/dashboard/in/news/others/:id',

            main: () => <CreateNews geturl='/dashboard/in/news/others' title="Disapproved List" />
        },
        {
            path: "/dashboard/in/news/list",

            main: () => <NewsList posturl="/api/news/list" title="News List" geturl='/dashboard/in/news/list' />
        },
        {
            path: "/dashboard/in/news/new/list",

            main: () => <NewsList posturl="/api/news/list/new" title="New News List" geturl='/dashboard/in/news/new/list' />
        },
        {
            path: "/dashboard/in/news/others",

            main: () => <NewsList posturl="/api/news/list/other" title="Disapproved List" geturl='/dashboard/in/news/others' />
        },
        {
            path: "/dashboard/in/grant/create",

            main: () => <CreateGrant posturl="/api/news/list/other" title="Grant List" geturl='/dashboard/in/grant/list' />
        },
        {
            path: "/dashboard/in/grant/list/:id",

            main: () => <CreateGrant posturl="/api/grant/list" title="Grant  List" geturl='/dashboard/in/grant/list' />
        },
        {
            path: "/dashboard/in/grant/list",

            main: () => <GrantList posturl="/api/grant/list" title="Grant  List" geturl='/dashboard/in/grant/list' />
        },
        {
            path: "/dashboard/in/grant/application/winners/:id",

            main: () => <GrantApplication posturl="/api/grant/application/winners" title="Application  List" geturl='/dashboard/in/grant/application/winners' />
        },
        {
            path: "/dashboard/in/grant/application/winners",

            main: () => <GrantList posturl="/api/grant/list/winners" title="Grant  List" geturl='/dashboard/in/grant/list' />
        },
        {
            path: "/dashboard/in/grant/application/winners/:id",

            main: () => <GrantApplication posturl="/api/grant/application/winners" title="Application  List" geturl='/dashboard/in/grant/application/winners' />
        },
        {
            path: "/dashboard/in/grant/application/:id",

            main: () => <GrantApplication posturl="/api/grant/application" title="Application  List" geturl='/dashboard/in/grant/application' />
        },
        {
            path: "/dashboard/in/grant/application",

            main: () => <GrantList posturl="/api/grant/list" title="Grant List" geturl='/dashboard/in/grant/list' />
        },

        {
            path: "/dashboard/in/users/password",

            main: () => <UserPassword />
        },
        {
            path: "/dashboard/in/users/profile",

            main: () => <UserProfile />
        },

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
                            <span className="username">{context.first_name + '  ' + context.last_name}</span>
                            <img src={context.photo || '/images/default.png'} className="profile-pix" />
                        </div>
                    </div>

                    <>
                        <div className='main-content'>
                            <Router history={props.history}>
                                <Switch>
                                    <Route

                                        path='/dashboard/in/'
                                        exact
                                        component={Home}
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
                    </>

                </div>

            </div>


        </>


    )

}


export default withRouter(Admin)
