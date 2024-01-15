import { useState, useEffect } from "react";
import Favorite from "./components/favorite";

import {
  Divider,
  burned,
  buyback,
  circulatingSupply,
  coinV2,
  copper,
  halfmoon,
  ip,
  logo,
  marketing,
  reflection,
  totalSupply,
  wallet,
} from "./lib/constant";
import truncatedText from "./lib/trancate";
import LineChart from "./components/lineChart";
import toast from "react-hot-toast";
import { ENVS } from "./helpers/configurations/index";
import {
  getTrimmedToken,
  getMarketingToken,
  getMarketingEth,
  getLpEth,
  getReflections,
  getTokenPrice,
  getEthprice,
  getCurrentTotalSupply,
  getCirculatedSupply,
  getBurnedSupply,
  getTokenName,
  getTokenSymbol,
} from "./helpers/contract";
function App() {
  const [favorite, setFavorite] = useState<string[]>([]);
  const [token, setToken] = useState<string>("");
  const [activeToken, setActiveToken] = useState("");
  const [isLooking, setIsLooking] = useState(false);

  const [tokenName, setTokenName] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [cirSupply, setCirSupply] = useState("");
  const [burnSupply, setBurnSupply] = useState(0);
  const [burnPercent, setBurnPercent] = useState(0);

  const [tokenPrice, setTokenPrice] = useState(0);
  const [ethPrice, setEthPrice] = useState(0);

  const [refections, setReflections] = useState(0);
  const [lpEth, setLpEth] = useState(0);

  const [marketEth, setMarketEth] = useState(0);
  const [marketToken, setMarketToken] = useState(0);

  const [trimAmnt, setTrimAmnt] = useState(0);

  const loadInformation = async () => {
    const _marketEth = await getMarketingEth();
    setMarketEth(_marketEth);

    const _marketToken = await getMarketingToken();
    setMarketToken(_marketToken);

    const _lpEth = await getLpEth();
    setLpEth(_lpEth);

    const _reflections = await getReflections();
    setReflections(_reflections);

    const ePrice = await getEthprice();
    setEthPrice(ePrice);

    const tPrice = await getTokenPrice();
    setTokenPrice(tPrice);

    const supply = await getCurrentTotalSupply();
    setTotalSupply(supply.toLocaleString());

    const cirSupply = await getCirculatedSupply();
    setCirSupply(cirSupply.toLocaleString());

    const burnSupply = await getBurnedSupply();
    setBurnSupply(burnSupply);

    const percent = ((burnSupply / supply) * 100).toFixed(3);
    setBurnPercent(parseFloat(percent));

    const name = await getTokenName();
    setTokenName(name);
  };

  useEffect(() => {
    loadInformation();
  }, []);

  const addFavorite = (token: string) => {
    if (favorite.includes(token)) {
      notify("Already added to favorites", "error");
    } else {
      notify("Added to favorites", "new");

      setFavorite((prev) => {
        const newFavorite = [...prev];
        newFavorite.push(token);
        return newFavorite;
      });
      setToken("");
    }
  };

  const removeFavorite = (targetToken: string) => {
    setFavorite((prev) => {
      const newFavorites = prev.filter((fav) => fav !== targetToken);
      return newFavorites;
    });
    notify("Removed from favorites", "success");
  };

  const lookingUp = async (token: string) => {
    if (token === "") {
      notify("Invalid Address or ENS!", "error");
    } else {
      setIsLooking(true);
      setActiveToken(token);

      setTimeout(async () => {
        setIsLooking(false);
        const tAmnt = await getTrimmedToken(token);
        setTrimAmnt(tAmnt);
      }, 3000);
    }
  };
  const notify = (messesge: string, type: string) => {
    if (type === "success") {
      toast.custom((t: { visible: any; }) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } min-w-[100px] w-full max-w-[250px] bg-transparent pointer-events-auto flex m-h-10 py-3 justify-start bg-green-600 px-2 items-center text-xs text-white border-l-green-700 border-l-4`}
        >
          <div className=" ">{messesge}</div>
        </div>
      ));
    }

    if (type === "new") {
      toast.custom((t: { visible: any; }) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } min-w-[100px] w-full max-w-[250px] bg-transparent pointer-events-auto flex m-h-10 py-3 justify-start bg-blue-400 px-2 items-center text-xs text-white border-l-blue-600 border-l-4`}
        >
          <div className=" ">{messesge}</div>
        </div>
      ));
    }

    if (type === "error") {
      toast.custom((t: { visible: any; }) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } min-w-[100px] w-full max-w-[250px] bg-transparent pointer-events-auto flex m-h-10 py-3 justify-start bg-[#eb473b] px-2 items-center text-xs text-white border-l-red-700 border-l-4`}
        >
          <div className="  ">{messesge}</div>
        </div>
      ));
    }
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <nav className="w-full z-50 bg-transparent">
        <div className="flex items-center justify-between py-5 px-4 md:px-6 w-full">
          <a href="/" className="w-12">
            <img src={logo} alt="" className="w-full h-full object-contain" />
          </a>
          <a
            href={`https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=${ENVS.CONTRACT_ADDRESS}`}
            target="_blank"
            className="button font-bold cursor-pointer whitespace-nowrap items-center flex justify-between bg-main text-white text-base px-4 py-2 sm:flex "
          >
            <h1>Buy ${tokenName}</h1>
            <svg
              width={25}
              height={25}
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.5 19.5L19.5 6.5M19.5 6.5V18.98M19.5 6.5H7.02"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
        <div
          className="mobile-nav fixed top-0 inset-x-0 transition transform origin-top xl:hidden z-50"
          style={{ display: "none" }}
        >
          <div className="rounded-lg shadow-md bg-black bg-opacity-95 ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="py-5 px-8 flex items-center justify-between">
              <a href="/">
                <img
                  src={logo}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </a>
              <button
                type="button"
                className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-600"
              >
                <span className="sr-only">Close menu</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-col lg:flex-row h-full w-full">
        <aside className="w-full lg:max-w-md max-w-none bg-content-3 p-4 md:p-10 flex flex-col gap-5 pb-6">
          <div className="flex flex-col content-block text-white w-full relative content-block--transparent items-start animate__animated animate__zoomIn">
            <img src={copper} alt="" />
            <div className="flex flex-col items-start">
              {/**/}
              <h1 className="text-active uppercase font-bold md:text-3xl text-xl">
                Token Data
              </h1>
              <h2 className="text-active text-opacity-50 md:text-lg text-sm uppercase">
                Enter a wallet address or ENS to see the stats for an individual
                ${tokenName} holder
              </h2>
            </div>
            <p className="text-main-white -mt-5 text-opacity-70" />
          </div>
          <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <img src={wallet} alt="" />
            </div>
            <input
              value={token}
              onChange={(e) => setToken(e.target.value)}
              type="text"
              placeholder="Wallet Address"
              className="w-full bg-input border border-active rounded-xl text-sm p-5 text-white outline-none break-all pl-12"
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <button
              onClick={() => lookingUp(token)}
              className="button font-bold text-base  whitespace-nowrap flex items-center justify-between bg-main text-white  px-7 py-4"
            >
              <h1>Look Up</h1>
              <svg
                width={25}
                height={25}
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.5 19.5L19.5 6.5M19.5 6.5V18.98M19.5 6.5H7.02"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={() => addFavorite(token)}
              className={`button font-bold  whitespace-nowrap flex justify-between text-base px-7 py-4 ${
                token === ""
                  ? "bg-gray-800 text-white cursor-not-allowed"
                  : "border-active border text-active bg-transparent"
              }`}
              disabled={token === "" ? true : false}
            >
              <h1>Add to Favorites</h1>
              <svg
                width={25}
                height={25}
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.5 19.5L19.5 6.5M19.5 6.5V18.98M19.5 6.5H7.02"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <img
            src={Divider}
            alt=""
            className="hidden md:block my-5 md:my-5 w-full object-fill"
          />
          {activeToken !== "" && (
            <div className="flex flex-col items-start w-full gap-5">
              <h1 className="text-active text-lg font-bold uppercase">
                Result:
              </h1>
              <div className="flex items-center gap-5">
                <img src={coinV2} alt="" />
                <div className="flex flex-col items-start">
                  <h1 className="text-active text-opacity-50 uppercase font-medium">
                    {" "}
                    Token Data For:{" "}
                  </h1>
                  <a
                    className="text-active text-lg uppercase font-bold cursor-pointer hover:underline"
                    href="https://etherscan.io/address/0xEEc49df361419c1D69977Ecdb315AED61c65855f"
                    target="_blank"
                  >
                    {truncatedText(activeToken)}
                  </a>
                </div>
              </div>
            </div>
          )}
          {!isLooking && favorite.length !== 0 && (
            <div className="flex flex-col items-start w-full gap-5">
              <h1 className="text-active text-lg font-bold uppercase">
                Favorites
              </h1>
              {favorite.map((favorite, index) => (
                <Favorite
                  key={index}
                  token={favorite}
                  onLookUp={() => lookingUp(favorite)}
                  onDelete={() => removeFavorite(favorite)}
                />
              ))}
            </div>
          )}

          {isLooking && (
            <div className="w-full h-full dashboard-block relative border border-opacity-10 dashboard-block--gradient dashboard-block--nopadding">
              <div className="w-full h-full flex flex-col">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="200px"
                  height="200px"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="xMidYMid"
                  style={{
                    margin: "auto",
                    background: "none",
                    display: "block",
                    shapeRendering: "auto",
                  }}
                >
                  <path
                    fill="none"
                    stroke="#23cee5"
                    strokeWidth="8"
                    strokeDasharray="42.76482137044271 42.76482137044271"
                    d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z"
                    strokeLinecap="round"
                    style={{
                      transform: "scale(0.8)",
                      transformOrigin: "50px 50px",
                    }}
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      repeatCount="indefinite"
                      dur="1s"
                      keyTimes="0;1"
                      values="0;256.58892822265625"
                    ></animate>
                  </path>
                </svg>
              </div>
            </div>
          )}
          <div className="flex flex-col items-start w-full gap-5">
            <h1 className="text-active text-lg font-bold uppercase">
              Token Information
            </h1>
            <div className="w-full h-full dashboard-block relative border border-opacity-10 dashboard-block--gradient">
              <div className="flex items-center gap-3">
                {/**/}
                <h1 className="text-active text-opacity-60 font-bold text-base uppercase">
                  {tokenName}
                </h1>
              </div>
              <h2 className="text-active text-xl font-bold mt-1">
                {Math.ceil(trimAmnt)} {/**/}
              </h2>
              <p className="text-success text-sm"> (${Math.ceil(trimAmnt * tokenPrice * 100)/100}) </p>
            </div>
            {/* <div className="w-full h-full dashboard-block relative border border-opacity-10 dashboard-block--gradient">
              <div className="flex items-center gap-3">
                <h1 className="text-active text-opacity-60 font-bold text-base uppercase">
                  REFLECTIONS ACCRUED
                </h1>
              </div>
              <h2 className="text-active text-xl font-bold mt-1">0.00 </h2>
              <p className="text-success text-sm"> ($0) </p>
            </div> */}
          </div>
        </aside>
        <div className="w-full flex flex-col bg-black md:bg-content-2 container mx-auto p-4 md:p-10 gap-10">
          <div className="flex flex-col content-block text-white w-full relative content-block--transparent items-start">
            {/**/}
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-1.5">
                <img src={halfmoon} alt="" />
                <h1 className="text-active text-opacity-50 font-bold uppercase text-lg">
                  Statistics
                </h1>
              </div>
              <h1 className="text-active uppercase font-bold md:text-5xl text-2xl">
                Token Dashboard
              </h1>
              <h2 className="text-active text-opacity-50 md:text-lg text-sm uppercase" />
            </div>
            <p className="text-main-white -mt-5 text-opacity-70" />
          </div>
          <div className="flex flex-col items-start w-full gap-5">
            <h1 className="text-active text-lg font-bold uppercase">
              Token Information
            </h1>
            <div className="flex md:flex-row flex-col items-start w-full gap-5 relative">
              <div className="global-block w-full h-72 overflow-hidden">
                <div className="flex flex-col items-start p-5 gap-5">
                  <div className="flex items-center gap-3">
                    <img src={logo} alt="" className="h-8 w-8" />
                    <h1 className="text-active uppercase font-bold text-base">
                      {" "}
                      CURRENT PRICE{" "}
                    </h1>
                  </div>
                  <h1 className="text-active font-bold md:text-4xl text-xl z-50">
                    {" "}
                    {Math.ceil(tokenPrice * Math.pow(10, 6)) / Math.pow(10, 6)}
                  </h1>
                </div>
                <div className="absolute h-auto w-full -bottom-6  opacity-80 rounded-2xl overflow-hidden">
                  <div
                    className=""
                    style={{ maxWidth: "100%", position: "relative" }}
                  >
                    <LineChart />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start w-full gap-5 md:h-full">
                <div className="w-full h-full dashboard-block relative border border-gray-50 border-opacity-10 ">
                  <div className="flex items-center gap-3">
                    <img src={totalSupply} alt="" />
                    <h1 className="text-active text-opacity-60 font-bold text-base uppercase">
                      Total Supply
                    </h1>
                  </div>
                  <h2 className="text-active text-xl font-bold mt-1">
                    {totalSupply}{" "}
                    <span className="md:text-base text-sm">${tokenName}</span>
                  </h2>
                  {/**/}
                </div>
                <div className="w-full h-full dashboard-block relative border border-gray-50 border-opacity-10">
                  <div className="flex items-center gap-3">
                    <img src={circulatingSupply} alt="" />
                    <h1 className="text-active text-opacity-60 font-bold text-base uppercase">
                      Circulating Supply
                    </h1>
                  </div>
                  <h2 className="text-active text-xl font-bold mt-1">
                    {cirSupply}{" "}
                    <span className="md:text-base text-sm">${tokenName}</span>
                  </h2>
                  {/**/}
                </div>
              </div>
            </div>
            <div className="flex md:flex-row flex-col items-center w-full gap-5">
              <div className="w-full h-full dashboard-block relative border border-gray-50  border-opacity-10">
                <div className="flex items-center gap-3">
                  <img src={burned} alt="" />
                  <h1 className="text-active text-opacity-60 font-bold text-base uppercase">
                    Burned
                  </h1>
                </div>
                <h2 className="text-active text-xl font-bold mt-1">
                  {burnSupply.toLocaleString()} ({burnPercent}%){" "}
                  <span className="md:text-base text-sm">${tokenName}</span>
                </h2>
                <p className="text-success text-sm">
                  {" "}
                  (${Math.ceil(burnSupply * tokenPrice * 100) / 100}){" "}
                </p>
              </div>
              <div className="w-full h-full dashboard-block relative border border-gray-50 border-opacity-10">
                <div className="flex items-center gap-3">
                  <img src={reflection} alt="" />
                  <h1 className="text-active text-opacity-60 font-bold text-base uppercase">
                    Reflections to date
                  </h1>
                </div>
                <h2 className="text-active text-xl font-bold mt-1">
                  {refections.toLocaleString()}{" "}
                  <span className="md:text-base text-sm">${tokenName}</span>
                </h2>
                <p className="text-success text-sm">
                  {" "}
                  (${Math.ceil(tokenPrice * refections * 100) / 100}){" "}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start w-full gap-5">
            <h1 className="text-active text-lg font-bold uppercase">
              Wallet Information
            </h1>
            <div className="flex md:flex-row flex-col items-center w-full gap-5">
              <a
                href={`https://etherscan.io/address/${ENVS.MARKETING_ADDRESS}`}
                target="_blank"
                className="w-full h-full dashboard-block relative flex items-center gap-8 hover:bg-active hover:bg-opacity-10"
              >
                <div className="bg-content-4 rounded-2xl p-3.5 flex items-center justify-center">
                  <img src={buyback} alt="" className="h-8 w-8" />
                </div>
                <div className="flex flex-col items-start">
                  <h1 className="text-active text-opacity-60 font-bold text-base uppercase">
                    Buyback Wallet
                  </h1>
                  <h2 className="text-active text-xl font-bold mt-2">
                    {Math.ceil(marketToken)} ${tokenName}
                  </h2>
                  <p className="text-success text-sm">
                    {" "}
                    (${Math.ceil(marketToken * tokenPrice * 100) / 100}){" "}
                  </p>
                </div>
              </a>
              <a
                className="w-full h-full dashboard-block relative flex items-center gap-8 hover:bg-active hover:bg-opacity-10"
              >
                <div className="bg-content-4 rounded-2xl p-3.5 flex items-center justify-center">
                  <img src={ip} alt="" className="h-8 w-8" />
                </div>
                <div className="flex flex-col items-start">
                  <h1 className="text-active text-opacity-60 font-bold text-base uppercase">
                    LP Wallet
                  </h1>
                  <h2 className="text-active text-xl font-bold mt-2">
                    {Math.ceil(lpEth * 10000) / 10000} ETH{" "}
                  </h2>
                  <p className="text-success text-sm">
                    {" "}
                    (${Math.ceil(lpEth * ethPrice * 100) / 100}){" "}
                  </p>
                </div>
              </a>
              <a
                href={`https://etherscan.io/address/${ENVS.MARKETING_ADDRESS}`}
                target="_blank"
                className="w-full h-full dashboard-block relative flex items-center gap-8 hover:bg-active hover:bg-opacity-10"
              >
                <div className="bg-content-4 rounded-2xl p-3.5 flex items-center justify-center">
                  <img src={marketing} alt="" className="h-8 w-8" />
                </div>
                <div className="flex flex-col items-start">
                  <h1 className="text-active text-opacity-60 font-bold text-base uppercase">
                    Marketing Wallet
                  </h1>
                  <h2 className="text-active text-xl font-bold mt-2">
                    {Math.ceil(marketEth * 100) / 100} ETH{" "}
                  </h2>
                  <p className="text-success text-sm">
                    {" "}
                    (${Math.ceil(marketEth * 100 * ethPrice) / 100}){" "}
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <footer className="relative sm:fixed bottom-0 left-0 w-full gap-5 items-center px-5 flex flex-wrap py-3 md:justify-between justify-center" />
    </div>
  );
}

export default App;
