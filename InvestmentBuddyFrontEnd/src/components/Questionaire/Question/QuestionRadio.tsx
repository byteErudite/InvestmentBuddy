import {
  qaTemplate,
  intialSelection,
  SCORES
} from "../../../model-chakresh/Questionare-static-content";
import "./Question.css";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import React, { useState } from "react";
import { COLORS } from "../../../constants/NewColorScheme";

const QuestionRadio = (props: {
  question: qaTemplate;
  index: number;
  setCountHandler: () => void;
  setScoreHandler: (questionNumber: number, optionScore: number) => void;
}) => {
  const [state, setState] = useState<boolean[]>(intialSelection);
  const [value, setValue] = React.useState("");
  const [currentQuestion, setCurrentQuestion] = React.useState(props.question);

  const handleChange = (event: any) => {
    let checkBoxName = event.target.value;
    updateSelection(checkBoxName);
    setValue(event.target.value);
  };

  const updateSelection = (optionName: string) => {
    let optionIndex = parseInt(optionName) - 1;
    const updatedState = [...intialSelection];
    updatedState[optionIndex] = true;
    setState(updatedState);
    updateCount(optionIndex);
  };

  const updateCount = (optionIndex: number) => {
    const questionNumber = currentQuestion.sl_no;
    props.setScoreHandler(questionNumber, SCORES[questionNumber - 1].options[optionIndex]);
    if (!(state.filter((s) => s === true).length === 0)) {
      return;
    }
    props.setCountHandler();

  };
  return (
    <div className="question-container" style={{ backgroundColor: COLORS.orangeLight }}>
      <div className="question">
        <FormControl>
          <FormLabel>
            <h1 className="questionheading" style={{ color: COLORS.textPrimary }}>
              {props.question.sl_no}. {props.question.question}
            </h1>
          </FormLabel>
          <div className="question-options">
            <RadioGroup
              aria-label="options"
              name="options"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="1"
                control={<Radio />}
                label={
                  props.question.descriptions ? (
                    <div className="optionwithdescription">
                      <label className="optionofdescription">
                        {props.question.options.a}
                      </label>
                      <label className="description">
                        {props.question.descriptions?.a}
                      </label>
                    </div>
                  ) : (
                    <div className="optionwithoutdescription">
                      {props.question.options.a}
                    </div>
                  )
                }
              />
              <FormControlLabel
                value="2"
                control={<Radio />}
                label={
                  props.question.descriptions ? (
                    <div className="optionwithdescription">
                      <label className="optionofdescription">
                        {props.question.options.b}
                      </label>
                      <label className="description">
                        {props.question.descriptions?.b}
                      </label>
                    </div>
                  ) : (
                    <div className="optionwithoutdescription">
                      {props.question.options.b}
                    </div>
                  )
                }
              />
              <FormControlLabel
                value="3"
                control={<Radio />}
                label={
                  props.question.descriptions ? (
                    <div className="optionwithdescription">
                      <label className="optionofdescription">
                        {props.question.options.c}
                      </label>
                      <label className="description">
                        {props.question.descriptions?.c}
                      </label>
                    </div>
                  ) : (
                    <div className="optionwithoutdescription">
                      {props.question.options.c}
                    </div>
                  )
                }
              />
              <FormControlLabel
                value="4"
                control={<Radio />}
                label={
                  props.question.descriptions ? (
                    <div className="optionwithdescription">
                      <label className="optionofdescription">
                        {props.question.options.d}
                      </label>
                      <label className="description">
                        {props.question.descriptions?.d}
                      </label>
                    </div>
                  ) : (
                    <div className="optionwithoutdescription">
                      {props.question.options.d}
                    </div>
                  )
                }
              />
              {props.question.options.e && <FormControlLabel
                value="5"
                control={<Radio />}
                label={
                  props.question.descriptions ? (
                    <div className="optionwithdescription">
                      <label className="optionofdescription">
                        {props.question.options.e}
                      </label>
                      <label className="description">
                        {props.question.descriptions?.e}
                      </label>
                    </div>
                  ) : (
                    <div className="optionwithoutdescription">
                      {props.question.options.e}
                    </div>
                  )
                }
              />}
              {props.question.options.f && <FormControlLabel
                value="6"
                control={<Radio />}
                label={
                  props.question.descriptions ? (
                    <div className="optionwithdescription">
                      <label className="optionofdescription">
                        {props.question.options.f}
                      </label>
                      <label className="description">
                        {props.question.descriptions?.f}
                      </label>
                    </div>
                  ) : (
                    <div className="optionwithoutdescription">
                      {props.question.options.f}
                    </div>
                  )
                }
              />}
            </RadioGroup>
          </div>
        </FormControl>
      </div>
    </div>
  );
}
export default QuestionRadio;
