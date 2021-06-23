import React,{useState,useEffect} from 'react'
import {Button} from 'react-bootstrap'
import './quizsectioncss.css';
 const QuestionSection = (props) => {
   const [score,setscore]=useState(0);
   const [selectedoption,setselectedoption]=useState();
    useEffect(()=>
    {
        if(props.number)
        setselectedoption('');
        if(props.check==='clicked')
        setselectedoption('set');
    },[props.number,props.check])
    const validate=(temp)=>
    {
        setselectedoption(temp);

        if(temp===props.correct_ans)
        setscore(score+1);
    };
        const handleselect=(temp)=>
        {
           
            if(selectedoption===temp&&selectedoption===props.correct_ans)
            {
                return "bg-success";
            }
            else if(selectedoption===temp&&selectedoption!==props.correct_ans)
            {
                return "bg-danger";
            }
            else if(temp===props.correct_ans)
            {
                return "bg-success";
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
                        className={` options m-3 ${selectedoption && handleselect(temp)} `}
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