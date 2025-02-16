import clsx from "clsx";
import React, {useCallback, useEffect, useRef, useState} from "react";

import styles from "./window.module.css";
import {Vector} from "@/types/vector";
import {Direction} from "@/types/direction";

export interface WindowProps {
  title: string;
  size?: {
    width: number;
    height: number;
  };
  children: React.ReactNode;
  unmaximizable?: boolean;
  unminimizable?: boolean;
  uncloseable?: boolean;
}

interface WindowExtendedProps extends WindowProps {
  order: number;
  onClick: () => void;
  onMinimizeClick: () => void;
  onMaximizeClick: () => void;
  onCloseClick: () => void;
}

export default function Window(props: WindowExtendedProps) {
  const [size, setSize] = useState(props.size || {width: 500, height: 300});
  const [position, setPosition] = useState({x: 0, y: 0});

  const dragging = useRef<{
    type: "move" | "resize";
    direction?: Direction;
    pos: Vector;
  } | null>(null);

  const onTitleBarMousedown = useCallback((e: React.MouseEvent) => {
    dragging.current = {type: "move", pos: {x: e.clientX, y: e.clientY}};
  }, []);

  const onResizeMousedown = useCallback((e: React.MouseEvent, direction: Direction) => {
    if (e.buttons !== 1) return;
    e.preventDefault();

    dragging.current = {type: "resize", direction: direction, pos: {x: e.clientX, y: e.clientY}};
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (e.buttons !== 1 || !dragging.current) {
      dragging.current = null;
      return;
    }

    e.preventDefault();

    const x = e.clientX - dragging.current.pos.x;
    const y = e.clientY - dragging.current.pos.y;

    if (dragging.current.type === "move") {
      setPosition((prev) => ({x: prev.x + x, y: prev.y + y}));
    } else if (dragging.current.type === "resize") {
      const d = dragging.current.direction || Direction.None;

      if ((d & Direction.Left) === Direction.Left) {
        setPosition((prev) => ({x: prev.x + x, y: prev.y}));
        setSize((prev) => ({width: Math.max(prev.width - x, 300), height: prev.height}));
      }

      if ((d & Direction.Right) === Direction.Right) {
        setSize((prev) => ({width: Math.max(prev.width + x, 300), height: prev.height}));
      }

      if ((d & Direction.Up) === Direction.Up) {
        setPosition((prev) => ({x: prev.x, y: prev.y + y}));
        setSize((prev) => ({width: prev.width, height: Math.max(prev.height - y, 300)}));
      }

      if ((d & Direction.Down) === Direction.Down) {
        setSize((prev) => ({width: prev.width, height: Math.max(prev.height + y, 300)}));
      }
    }

    dragging.current.pos = {x: e.clientX, y: e.clientY};
  }, []);

  useEffect(() => {
    window?.addEventListener("mousemove", onMouseMove);
    return () => window?.removeEventListener("mousemove", onMouseMove);
  }, [onMouseMove]);

  return (
    <div
      className={styles.windowWrapper}
      style={{
        width: size.width,
        height: size.height,
        left: position.x,
        top: position.y,
        zIndex: props.order
      }}
      onMouseDown={props.onClick}
    >
      <div className={styles.resizeTop} onMouseDownCapture={(e) => onResizeMousedown(e, Direction.Up)} />
      <div className={styles.resizeBottom} onMouseDownCapture={(e) => onResizeMousedown(e, Direction.Down)} />
      <div className={styles.resizeLeft} onMouseDownCapture={(e) => onResizeMousedown(e, Direction.Left)} />
      <div className={styles.resizeRight} onMouseDownCapture={(e) => onResizeMousedown(e, Direction.Right)} />

      <div className={styles.resizeTopLeft} onMouseDownCapture={(e) => onResizeMousedown(e, Direction.LeftUp)} />
      <div className={styles.resizeTopRight} onMouseDownCapture={(e) => onResizeMousedown(e, Direction.RightUp)} />
      <div className={styles.resizeBottomLeft} onMouseDownCapture={(e) => onResizeMousedown(e, Direction.LeftDown)} />
      <div className={styles.resizeBottomRight} onMouseDownCapture={(e) => onResizeMousedown(e, Direction.RightDown)} />

      <div className={clsx("window", styles.windowContainer)}>
        <div className="title-bar" onMouseDownCapture={onTitleBarMousedown}>
          <div className="title-bar-text">{props.title}</div>
          <div className="title-bar-controls">
            {!props.unminimizable && <button aria-label="Minimize" onClick={props.onMinimizeClick}></button>}
            {!props.unmaximizable && <button aria-label="Maximize" onClick={props.onMaximizeClick}></button>}
            {!props.uncloseable && <button aria-label="Close" onClick={props.onCloseClick}></button>}
          </div>
        </div>
        <div className="window-body">{props.children}</div>
      </div>
    </div>
  );
}
