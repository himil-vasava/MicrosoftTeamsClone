import React from 'react';
import SideBarRow from '../SideBarRow/SideBarRow';
import './SideBar.css';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import HistoryIcon from '@material-ui/icons/History';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const SideBar = ({teams}) => {
    console.log(teams);
    return (
        <div className='sidebar'>
            <a href="/createteam" style={{textDecoration: 'none',  color:'inherit'}}><SideBarRow Icon={AddCircleOutlineOutlinedIcon} title='Create' /></a>
            <a href="/jointeam" style={{textDecoration: 'none',  color:'inherit'}}><SideBarRow Icon={GroupAddIcon} title='Join' /></a>
            <hr />
            {teams.map((team) => {
                var url = `/teams/${team.teamId}`
                return(
                    <a href={url} style={{textDecoration: 'none',  color:'inherit'}}>
                        <SideBarRow Icon={MeetingRoomIcon} title={team.name}/>
                    </a>
                )
            })}
        </div>
    )
}

export default SideBar;