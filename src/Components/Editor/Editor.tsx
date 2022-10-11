import { useEffect, useState } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  ContentState,
  convertFromHTML,
} from "draft-js";
import "draft-js/dist/Draft.css";
import styles from "./Editor.module.scss";
import { FiBold, FiItalic } from "react-icons/fi";
import { colorNeutralDarkest } from "../../styles/settings/styles";
import { stateToHTML } from "draft-js-export-html";

interface Props {
  onChangeValue?: (value: string) => void;
  text: string;
}

export default function PxEditor({ text, onChangeValue }: Props) {
  const [alreadySetText, setAlreadySetText] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (!alreadySetText && text) {
      const contentDataState = ContentState.createFromBlockArray(
        convertFromHTML(text)
      );

      setEditorState(EditorState.createWithContent(contentDataState));
      setAlreadySetText(true);
    }
  }, [text]);

  const onChange = (editorState) => {
    if (onChangeValue) {
      onChangeValue(stateToHTML(editorState.getCurrentContent()));
    }

    setEditorState(editorState);
  };

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      onChange(newState);
      return "handled";
    }

    return "not-handled";
  };

  const onBoldClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const onItalicClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  return (
    <div className={styles["c-editor"]}>
      {alreadySetText}
      <div className={styles["c-editor__header"]}>
        <div
          className={styles["c-editor__header-item"]}
          onClick={onBoldClick.bind(this)}
        >
          <FiBold size={20} color={colorNeutralDarkest} />
        </div>
        <div
          className={styles["c-editor__header-item"]}
          onClick={onItalicClick.bind(this)}
        >
          <FiItalic size={20} color={colorNeutralDarkest} />
        </div>
      </div>

      <div className={styles["c-editor__editor"]}>
        <Editor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
