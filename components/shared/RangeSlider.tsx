"use client";
import React, { useState } from "react";
import "./RangeSlider.css";
const RangeSlider = () => {
  const [range, setRange] = useState({ min: 1, max: 20 });
  return (
    <div className="card-conteiner">
      <div className="card-content">
        <small className="current-range !text-black ">
          Current Range:&nbsp;
          <div>
            <span id="third">
              {range.min} - {range.max} Lakhs
            </span>
          </div>
        </small>
        <div
          data-range="#third"
          data-value-1="#second"
          data-value-0="#first"
          className="slider"
        >
          <label className="label-min-value">1</label>
          <label className="label-max-value">20 Lakhs</label>
        </div>
        <div className="rangeslider">
          <input
            className="min input-ranges"
            name="range_1"
            type="range"
            min="1"
            max="20"
            defaultValue="1"
            onChange={(e) =>
              setRange({ ...range, min: parseInt(e.target.value) })
            }
          />
          <input
            className="max input-ranges"
            name="range_1"
            type="range"
            min="1"
            max="20"
            defaultValue="10"
            onChange={(e) =>
              setRange({ ...range, max: parseInt(e.target.value) })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
