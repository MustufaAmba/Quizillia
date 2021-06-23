import React from 'react'
import './startcss.css'
import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import QuestionSection from './QuestionSection';
import './quizcss.css';
const Quiz = () => {
    const [data, setdata] = useState([]);
    const [ques, setquestion] = useState(0);
    const [ques1,setquestion1]=useState("");
    useEffect(() => {

        fetch(`https://opentdb.com/api.php?amount=10&category=${sessionStorage.getItem('category')}&difficulty=easy&type=multiple`)
            .then(resp => resp.json())
            .then(resp => {
                const newdata = resp.results.map((answers) => {
                    const wrongindex = 3;
                    const randomindex = Math.random() * (wrongindex);
                    answers.incorrect_answers.splice(randomindex, 0, answers.correct_answer);
                    return {
                        ...answers,
                        options: answers.incorrect_answers,
                    };
                });
                setdata(newdata);
            })

    }, []);

    return data.length > 0  ?(
        <div className="parentdiv">
            <div className="startdiv">
                <center><h1 className="welcome m-3">Welcome {sessionStorage.getItem("name")} to Quizillia</h1></center>
                {ques<10?(
                <div className="childdiv">
                    <QuestionSection number={ques} check={ques1}question={data[ques].question}
                        option={data[ques].options}
                        correct_ans={data[ques].correct_answer} />
                </div>):(<center><h1 className="m-5">your score is {sessionStorage.getItem('score')}</h1></center>)}

            </div>
            <div className="navigation">
                <div className="previousdiv" >
                {ques>=1&&ques<=9?(<Button className="text-white"variant="secondary" type="button" onClick={() => {
                    setquestion(ques - 1);
                    setquestion1('clicked');
                }}>previous</Button>):('')}
                </div>
                <div className="nextdiv">
                    { ques<=9?
                (<Button className="text-white" variant="secondary" type="button" onClick={() => {
                    setquestion(ques + 1);
                    setquestion1('');

                }}>next</Button>):('')
            }
</div>
            </div>
            
        </div>
    ) : (<div className="parentdiv"><div className="startdiv"><h1 className="m-5">loading....</h1></div></div>)
        }
export default Quiz;