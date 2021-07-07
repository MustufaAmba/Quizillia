import React,{useState,useEffect} from 'react'
import {Button} from 'react-bootstrap'
import './quizsectioncss.css';
 const QuestionSection = (props) => {
   const [score,setscore]=useState(0);
   const [selectedoption,setselectedoption]=useState();
    useEffect(()=>
    {
        //here we are checking if the prevoius button is clicked then disable the buttons user can no longer select the options
        // or if the next button is clicked then set the selectedoption to null this helps us in validating answer
        if(props.number)
        setselectedoption('');
        if(props.check==='clicked')
        {
            setselectedoption('set');           
        }
    },[props.number,props.check])
    const correctans=(temp)=>
    {
        //here we are changing option color based on answer validation
            if(temp===props.correct_ans)
            {
            return "bg-success";
            }
    }
    const validate=(temp)=>
    { 
         //here we are incrementing score answer validation
        setselectedoption(temp);
        if(temp===props.correct_ans)
        setscore(score+1);
    };
        const handleselect=(temp)=>
        {
            //here we are changing option color based on answer validation
            if(selectedoption===temp&&selectedoption===props.correct_ans)
            {
                return "bg-success";
            }
            else if(selectedoption===temp&&selectedoption!==props.correct_ans)
            {
                return "bg-danger";
            }
            
        }

    return (
        <div className="container1" >

        <div >
            {props.number===9?(sessionStorage.setItem("score",score)):('')}
            <center><h3 className="question" dangerouslySetInnerHTML={{ __html: `Q${props.number+1}. ${props.question}`}}/></center>
                
                <div>
                    {props.option && props.option.map((temp)=>
                    (
                  <div>
                        <center><Button onClick={()=>validate(temp) } 
                        className={` options m-3 ${selectedoption && handleselect(temp)} ${props.check==='clicked'&&correctans(temp)}`}
                        disabled={selectedoption} 
                        key={temp}
                        value={temp}
                        dangerouslySetInnerHTML={{ __html: temp}}/></center>
</div>
                    ))}

                </div>

            </div>
        </div>
    )
}
export default QuestionSection;