import { qaTemplate } from "../../../modelQuestionaire/Questionare-static-content";
import React from "react";
import Slider from "@material-ui/core/Slider";
import "./Question.css";
const QuestionSlider = (props: { question: qaTemplate; index: number }) => {
  return (
    <div className="container">
      <div className="question">
        <h1 className="questionheading">
          {props.question.sl_no}. {props.question.question}
        </h1>
        <ol>
          <ul>{props.question.options.a}</ul>
          <ul>{props.question.options.b}</ul>
          <ul>{props.question.options.c}</ul>
          <ul>{props.question.options.d}</ul>
        </ol>
      </div>
    </div>
  );
};

export default QuestionSlider;
