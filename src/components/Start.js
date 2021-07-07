import React, { useState, useEffect } from 'react'
import './startcss.css'
import { Button } from 'react-bootstrap';
import Select from 'react-select';
import { Link } from 'react-router-dom';
const Start = () => {
    const [name, setname] = useState();

    const [category, setcategory] = useState();
    useEffect(() => {
        //here we are storing username and category of quiz to session storage for furthur use
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("category", category);
    }, [name,category]);
    const options = [
        { value: 15, label: 'Video Games' },
        { value:12, label: 'Music' },
        { value: 27, label: 'Animals' },
        { value: 23, label: 'History' },
        { value: 9, label: 'General Knowledge' },
        { value: 21, label: 'Sports' },

      ];
    return (
        <div className="parentdiv">
            <div className="startdiv">
                <center><h1 className="m-4">Welcome to Quizillia</h1></center>
                <div className="childdiv">
                    <center><input type="text" className="inputstyle m-3 mt-4" placeholder="Enter your name" value={name} onChange={(event) => setname(event.target.value)}></input></center>
                    <center><Select
                        className="m-3 selectinput"
                        placeholder="Select A Category"
                        onChange={(event)=>setcategory(event.value)}
                        options={options}
                    /></center>
                    <Link to="/Quiz"><center><Button className="m-4" type="button" >Start</Button></center></Link>
                </div>
            </div>
        </div>
    )
}
export default Start;