import { useEffect, useState } from "react";
import axios from 'axios'
import ProfileEmployee from "./ProfileEmployee";
import {baseUrl} from './Url'

function Profile(){
    return <> 
    <ProfileEmployee />
    </>
}

export default Profile