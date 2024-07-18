"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import styles from "./ThemeModeToggle.module.css";
export function ThemeModeToggle() {
  const { setTheme } = useTheme();
  function changeTheme(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }
  return (
    <label className={styles.uiSwitch}>
      <input type="checkbox" onChange={(e) => changeTheme(e)} />
      <div className={styles.slider}>
        <div className={styles.circle}></div>
      </div>
    </label>
  );
}
