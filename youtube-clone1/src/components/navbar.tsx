import { useForm } from "react-hook-form";
import styled from "@emotion/styled";
import "../assets/navbar.css";
import apps from "../assets/apps.svg";
import bell from "../assets/bell.svg";
import youtubeLogo from "../assets/Logo.svg";
import menu from "../assets/menu icon.svg";
import upload from "../assets/upload.svg";
import searchIcon from "../assets/search.svg";
import { Search } from "lucide-react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";

export default function navbar() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const { register } = useForm();
  const [searchIconState, setSearchIconState] = useState(false);
  return isMobile ? (
    <div className="w-screen h-[7vh] bg-black">
      {searchIconState ? (
        <div className="w-full h-full flex justify-between items-center">
          <div className="w-[10%] h-full flex justify-center items-center">
            <ChevronLeft
              color="white"
              className="youtube-navbar-icons cursor-pointer"
              onClick={() => {
                setSearchIconState(false);
              }}
            />
          </div>
          <form className="w-[85%] h-full flex justify-center items-center">
            <input
              {...register("search")}
              placeholder="Search"
              className="border-1 w-[75%] h-[70%] youtube-search-bar text-white pl-[10px]"
            ></input>
            <button className="w-[15%] h-[70%] youtube-search-bar-icon flex justify-center items-center">
              <Search className="youtube-navbar-icons" color="white" />
            </button>
          </form>
          <div className="w-[5%]"></div>
        </div>
      ) : (
        <div className="w-full h-full flex justify-between items-center">
          {/* Left side of navbar*/}
          <div className="ml-[10px] flex w-[20%] h-full justify-between items-center">
            <img className="youtube-icon" src={youtubeLogo} />
          </div>
          {/* Middle side of navbar*/}
          {/* Right side of navbar*/}
          <div className="rightbox-navbar-icons  h-full flex items-center justify-around">
            <img
              className="youtube-navbar-icons"
              src={searchIcon}
              onClick={() => {
                setSearchIconState(!searchIconState);
              }}
            />
            <img className="youtube-navbar-icons" src={apps} />
            <img className="youtube-navbar-icons" src={bell} />
            <div className="rounded-[50] youtube-navbar-icons bg-white"></div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="w-screen h-[7vh] flex justify-between items-center bg-black">
      {/* Left side of navbar*/}
      <div className="ml-[10px] flex w-[10%] h-full justify-between items-center">
        <img className="youtube-navbar-icons" src={menu} />
        <img className="youtube-navbar-icons" src={youtubeLogo} />
      </div>
      {/* Middle side of navbar*/}
      <div className="w-[40%] h-full flex items-center justify-center">
        <form className="w-full h-full flex justify-center items-center">
          <input
            {...register("search")}
            placeholder="Search"
            className="border-1 w-[75%] h-[70%] youtube-search-bar text-white pl-[10px]"
          ></input>
          <button className="w-[15%] h-[70%] youtube-search-bar-icon flex justify-center items-center">
            <Search className="youtube-navbar-icons" color="white" />
          </button>
        </form>
      </div>
      {/* Right side of navbar*/}
      <div className="w-[18%] h-full flex items-center justify-around">
        <img className="youtube-navbar-icons" src={upload} />
        <img className="youtube-navbar-icons" src={apps} />
        <img className="youtube-navbar-icons" src={bell} />
        <div className="rounded-[50] youtube-navbar-icons bg-white"></div>
      </div>
    </div>
  );
}
