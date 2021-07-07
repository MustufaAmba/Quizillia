import React from "react";
import "./startcss.css";
import { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import QuestionSection from "./QuestionSection";
import "./quizcss.css";
const Quiz = () => {
  const [data, setdata] = useState([]);
  const [ques, setquestion] = useState(0);
  const [ques1, setquestion1] = useState("");
  const [gettime, settime] = useState(`00:00`);
  useEffect(() => {
    // here we are fetching questions based on category stored in session storage from trivia quiz api
    fetch(
      `https://opentdb.com/api.php?amount=10&category=${sessionStorage.getItem(
        "category"
      )}&difficulty=easy&type=multiple`
    )
      .then((resp) => resp.json())
      .then((resp) => {
        //here we are shuffling the option array because correct anwser is a different key value pair so we are append the option array using ... operator placing correct answer at random location in array
        const newdata = resp.results.map((answers) => {
          const wrongindex = 3;
          const randomindex = Math.random() * wrongindex;
          answers.incorrect_answers.splice(
            randomindex,
            0,
            answers.correct_answer
          );
          return {
            ...answers,
            options: answers.incorrect_answers,
          };
        });
        setdata(newdata);
      });
  }, []);
  // this all functions are used to achive the functionality of timer
  /*
        visit the functions in below given order to understand the code
        firt visit the useeffect to start the flow
        1: clearInterval()
        2: deadlinetime()
        3: starttimer()
        4: getremainingtime()
*/
  const intervalref = useRef(null);
  const getremainingtime = (endtime) => {
    //now here we are assign values to total,seconds,minutes using date object in the first line we are assign total =20sec and minusing it from current time
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
      total,
      seconds,
      minutes,
    };
  };
  const starttimer = (deadline) => {
    //get the values from getremainingtime() and set the timer if timer runs out of time i.e 0 sec then disable the option 1.e user can no longer select the option if timer reached 0 sec
    let { total, seconds, minutes } = getremainingtime(deadline);
    if (total >= 0) {
      settime(
        (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    } else {
      clearInterval(intervalref.current);
      setquestion1("clicked");
    }
  };
  const cleartimer = (endtime) => {
    settime(`00:20`);
    //if there is any ongoing timer then claer it
    if (intervalref.current) clearInterval(intervalref.current);
    // start new timer
    const id = setInterval(() => {
      starttimer(endtime);
    }, 1000);
    intervalref.current = id;
  };
  const deadlinetime = () => {
    //here we are setting the counter endtime which is 20 sec you can arrange it as per your requirement
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 20);
    return deadline;
  };
  useEffect(() => {
    cleartimer(deadlinetime());
    return () => {
      if (intervalref.current) clearInterval(intervalref.current);
    };
  }, []);

  // here the most imp thing is we are showing data fetched from api now what happens generally that fetching api is asynchronus process it takes some time so is you directly print the data then it might sometime give you error so here we are return the data only if the length of data is greater than 0 i.e data is not empty else we are showing "loading.."
  return data.length > 0 ? (
    <div className="parentdiv">
      <div className="startdiv">
        <center>
          <h1 className="welcome m-3">
            Welcome {sessionStorage.getItem("name")} to Quizillia
          </h1>
        </center>
        {/* show timer untill 10 questions */}
        {ques < 10 ? <h3 id="timer">{gettime}</h3> : ""}
        {ques < 10 ? (
          <div className="childdiv">
            <QuestionSection
              number={ques}
              check={ques1}
              question={data[ques].question}
              option={data[ques].options}
              correct_ans={data[ques].correct_answer}
            />
          </div>
        ) : (
          <center>
            <h1 className="m-5">
              your score is {sessionStorage.getItem("score")}
            </h1>
          </center>
        )}
      </div>
      <div className="navigation">
        <div className="previousdiv">
          {ques >= 1 && ques <= 9 ? (
            <Button
              className="text-white"
              variant="secondary"
              type="button"
              onClick={() => {
                setquestion(ques - 1);
                setquestion1("clicked");
                if (intervalref.current) clearInterval(intervalref.current);
                settime(`00:20`);
              }}
            >
              previous
            </Button>
          ) : (
            ""
          )}
        </div>
        <div className="nextdiv">
          {ques <= 9 ? (
            <Button
              className="text-white"
              variant="secondary"
              type="button"
              onClick={() => {
                setquestion(ques + 1);
                setquestion1("");
                if (intervalref.current) clearInterval(intervalref.current);
                cleartimer(deadlinetime());
              }}
            >
              next
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="parentdiv">
      <div className="startdiv">
        <h1 className="m-5">loading....</h1>
      </div>
    </div>
  );
};
export default Quiz;
