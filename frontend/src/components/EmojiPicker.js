import React from "react";
import { Picker } from "emoji-mart";

const EmojiPicker = ({ onSelectEmoji }) => {
  return (
    <div className="emoji-picker">
      <Picker set="emojione" onSelect={onSelectEmoji} />
    </div>
  );
};

export default EmojiPicker;
