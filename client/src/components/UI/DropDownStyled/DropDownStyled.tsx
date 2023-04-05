import React, { useEffect, useRef } from "react";
import styles from "./DropDown.module.css";

const DropDownStyled = (props: any) => {
  const dropDownRef = useRef<HTMLDivElement>(null);
  const dropDownItemRef = useRef<any>([]);

  useEffect(() => {
    if (dropDownRef.current !== null) {
      dropDownRef.current.style.marginLeft = props.marginLeft;
      dropDownRef.current.style.width = props.width;
      dropDownRef.current.style.marginTop = props.marginTop;
      dropDownRef.current.style.borderRadius = props.borderRadius
        ? props.borderRadius
        : "30px";

      if (props.direction === "up") {
        dropDownRef.current.style.transform = `translateY(${
          -50 * dropDownItemRef.current.length
        }%)`;
      }
    }
    
  }, [dropDownRef.current]);

  const setDropDownState = () => {
    props.setDropDownState(false);
  };

  useEffect(() => {
    props.setDropDownState(false);
  }, [props.conditionalRender]);

  useEffect(() => {
    if (props.dropDownState) {
      window.addEventListener("mouseup", setDropDownState);
    } else {
      window.removeEventListener("mouseup", setDropDownState);
    }
  }, [props.dropDownState]);

  useEffect(() => {
    if (dropDownRef.current) {
      if (props.dropDownState) {
        dropDownRef.current.style.height =
          dropDownItemRef.current[0].clientHeight *
            dropDownItemRef.current.length +
          "px";
        dropDownRef.current.style.boxShadow =
          "0px 0px 10px 1px rgba(0, 0, 0, 0.15)";
      } else {
        dropDownRef.current.style.height = "0px";
        dropDownRef.current.style.boxShadow = "none";
      }
    }
    
  }, [dropDownRef?.current?.clientHeight, props.dropDownState]);

  const dropDownItems = props.dropDownItems.label.map((el:any, idx: number) => {
    return (
      <div
        key={`drop-down-${idx}`}
        ref={(el) => (dropDownItemRef.current[idx] = el)}
        onClick={(event) => {
          event.stopPropagation();
          props.dropDownItems.function[idx]();
          props.setDropDownState(false);
        }}
        className={styles["dropdown-item"]}
        style={{
          height: `${props.itemHeight ? `${props.itemHeight}` : "53px"}`,
        }}
      >
        {props.noLiTag === true ? null : <li className={styles["li-tag"]} />}
        <div
          className={styles["text-wrapper"]}
          style={{ marginLeft: `${props.noLiTag === true ? "0px" : "-10px"}` }}
        >
          <div
            className={styles["item-label"]}
            style={{
              justifyContent: `${props.noLiTag === true ? "center" : "left"}`,
            }}
          >
            {el}
          </div>

          <div className={styles["item-description"]}>
            {props.dropDownItems.description
              ? props.dropDownItems.description[idx]
              : null}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className={styles["dropdown-wrapper"]}>
      <div ref={dropDownRef} className={styles["dropdown"]}>
        {dropDownItems}
      </div>
    </div>
  );
};

export default DropDownStyled;
