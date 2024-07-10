import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import RangeSlider from "./RangeSlider";
const JobLeftSideBar = () => {
  return (
    <div className="min-w-[25%]  px-8 py-6 custom-scrollbar h-full overflow-y-scroll pb-24">
      <div className="flex justify-between">
        <p className="font-bold text-lg text-gray-500">Filters</p>
        <p className="font-semibold">Clear All</p>
      </div>
      {/* Search Description Component */}
      <div>
        <h4 className="mt-4 mb-2">Search Description</h4>
        <Input type="text" placeholder="Eg. Software Developer" />
      </div>
      {/* Price Range */}
      <h4 className="mt-4 mb-2">Price Range</h4>
      <div className="flex gap-2">
        <Input type="text" placeholder="Min" />
        <Input type="text" placeholder="Max" />
      </div>
      <h4 className="mt-4 mb-2">Annual Expectations</h4>
      <div className="flex gap-2">
        <RangeSlider />
      </div>
      <div className="flex gap-2  mt-4 mb-2">
        <input type="checkbox" id="wfh" aria-label="Work from home" />
        <Label htmlFor="wfh"> Work From Home</Label>
        <input id="wfo" type="checkbox" aria-label="Work from office" />
        <Label htmlFor="wfo"> Work From Office</Label>
      </div>
    </div>
  );
};

export default JobLeftSideBar;
