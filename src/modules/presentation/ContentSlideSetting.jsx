/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import ClickToShowInput from "../../components/input/ClickToShowInput";
import Input from "../../components/input/Input";
import TextAreaAutoResize from "../../components/textarea/TextAreaAutoResize";
import OptionSlide from "./OptionSlide";

function ContentSlideSetting() {
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
            label="The meta field that add context to your slide."
          />
        </ClickToShowInput>
        <Input placeholder="Multiple choice" limit={150} name="question" label="Your question?" />
        <ClickToShowInput title="Add longer description">
          <div>
            <label className="text-sm font-thin text-gray-400 mb-4">
              Longer description shown in your audience's phones and if you hover the question while presenting.
            </label>
            <TextAreaAutoResize />
          </div>
        </ClickToShowInput>
        <OptionSlide />
      </div>
    </div>
  );
}

export default ContentSlideSetting;
