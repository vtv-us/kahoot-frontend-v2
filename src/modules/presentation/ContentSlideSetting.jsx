/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import ClickToShowInput from "../../components/input/ClickToShowInput";
import Input from "../../components/input/Input";
import TextAreaAutoResize from "../../components/textarea/TextAreaAutoResize";
import OptionSlide from "./OptionSlide";
import { getQuestionById, updateQuestion } from "../../handleApi";
import { getCurrentUser, QUESTION_TYPE } from "../../utils/constants";
import ReactionQuestion from "./ReactionQuestion";

function ContentSlideSetting({ data }) {
  const { idQuestion } = useParams();
  const user = getCurrentUser();

  return (
    <div className="p-4">
      <h3 className="text-md font-semibold mb-2">Content</h3>
      <div className="flex flex-col gap-4">
        <ClickToShowInput title="Add meta description">
          <Input
            labelClassName="text-sm !font-thin !text-gray-400"
            placeholder="Meta"
            limit={80}
            name="meta"
            setText={data.setMeta}
            value={data.meta}
            label="The meta field that add context to your slide."
          />
        </ClickToShowInput>
        <Input
          placeholder="Multiple choice"
          value={data.question}
          setText={data.setQuestion}
          onChange={() => {}}
          limit={150}
          name="question"
          label={data.type === QUESTION_TYPE["multiple-choice"] ? "Your question?" : "Heading"}
        />
        <ClickToShowInput title="Add longer description">
          <div>
            <label className="text-sm font-thin text-gray-400 mb-4">
              {data.type === QUESTION_TYPE.heading && (
                <div className="text-[16px] text-gray-800 font-bold">Subheading</div>
              )}
              {data.type === QUESTION_TYPE.paragraph && (
                <div className="text-[16px] text-gray-800 font-bold">Paragraph</div>
              )}
              {data.type === QUESTION_TYPE["multiple-choice"] &&
                "Longer description shown in your audience's phones and if you hover the question while presenting."}
            </label>
            <TextAreaAutoResize text={data.description} setText={data.setDescription} />
          </div>
        </ClickToShowInput>
        {data.type === QUESTION_TYPE["multiple-choice"] ? <OptionSlide /> : <ReactionQuestion />}
      </div>
    </div>
  );
}
ContentSlideSetting.propTypes = {
  data: PropTypes.object,
};

export default ContentSlideSetting;
