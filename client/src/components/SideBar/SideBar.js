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
            <SideBarRow Icon={AddCircleOutlineOutlinedIcon} title='Create' />
            <SideBarRow Icon={GroupAddIcon} title='Join' />
            <hr />
            {teams.map((team) => {
                return(
                    <SideBarRow Icon={MeetingRoomIcon} title={team.name}/>
                )
            })}
        </div>
    )
}

export default SideBar;