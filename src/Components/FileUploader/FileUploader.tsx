import styles from "./FileUploader.module.scss";
import React, { useRef } from "react";
import { FiUpload } from "react-icons/fi";
import { colorNeutralMedium } from "../../styles/settings/styles";
import classNames from "classnames";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

interface Props {
  image?: string;
  isUploading?: boolean;
  onFileSelect: (file: File) => void;
}

export default function FileUploader({
  image,
  isUploading,
  onFileSelect,
}: Props) {
  const handleFileInput = (e) => {
    onFileSelect(e.target.files[0]);
  };

  const uploadingLabel = (
    <>
      <LoadingSpinner />
      {!image && (
        <p className={styles["c-upload__label-text"]}>Selecione um arquivo</p>
      )}
    </>
  );

  const label = (
    <>
      <FiUpload
        className={styles["c-upload__label-icon"]}
        size={20}
        color={colorNeutralMedium}
      />
      {!image && (
        <p className={styles["c-upload__label-text"]}>Selecione um arquivo</p>
      )}
    </>
  );

  return (
    <div
      className={classNames(styles["c-upload"], {
        [styles["c-upload--has-image"]]: image,
      })}
      title="Clique para selecionar um arquivo"
    >
      <div className={styles["c-upload__background"]}></div>
      {image && (
        <img
          className={styles["c-upload__preview"]}
          src={image}
          alt="Arquivo upado"
        />
      )}

      <div
        className={classNames(styles["c-upload__label"], {
          [styles["c-upload__label--has-image"]]: image,
        })}
      >
        {isUploading ? uploadingLabel : label}
      </div>

      <input
        className={styles["c-upload__input"]}
        type="file"
        onChange={handleFileInput}
      />
    </div>
  );
}
