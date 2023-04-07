'use client';

import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'

import { useState, useEffect } from 'react';
import cookies from 'next/headers';
import { stringify } from 'querystring';
import { json } from 'stream/consumers';

import ItemsBtn from "./itemsBtn";
import { debug } from 'console';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {


  const [totalScore, setTotalScore] = useState(0);
  const [score, setScore] = useState(0);
  const [knight, setKnight] = useState(
    {
      amount: 0,
      cost: 10,
      incrementAmount : 1
    }
  );
  const [farm, setFarm] = useState(
    {
      amount: 0,
      cost: 50,
      incrementAmount : 2
    }
  );
  const [village, setVillage] = useState(
    {
      amount: 0,
      cost: 100,
      incrementAmount : 3
    }
  );
  const [kingdom, setKingdom] = useState(
    {
      amount: 0,
      cost: 200,
      incrementAmount : 4
    }
  );

  const [items, setItems] = useState({
    Sword1: false,
    Sword2: false,
    Sword3: false,
    FarmItem1: false,
    FarmItem2: false,
    FarmItem3: false,
    VilItem1: false,
    VilItem2: false,
    VilItem3: false,
    KingdomItem1: false,
    KingdomItem2: false,
    KingdomItem3: false,
  })

  const itemsCost = {
    Sword1: 1000,
    Sword2: 10000,
    Sword3: 100000,
    FarmItem1: 25000,
    FarmItem2: 250000,
    FarmItem3: 1000000,
    VilItem1: 50000,
    VilItem2: 500000,
    VilItem3: 2500000,
    KingdomItem1: 100000,
    KingdomItem2: 1000000,
    KingdomItem3: 10000000,
  }

  const [monster, setMonster] = useState(
    {
      level : 1,
      maxHealth : 100,
      currentHealth : 100,
      cpsMultiplier: 1
    }
  );

  const [ascensionLevel, setAscensionLevel] = useState(0);

  //this const uses states, probably why it works with refreshing the UI?
  const totalCPS = (knight.incrementAmount * knight.amount + farm.incrementAmount * farm.amount + village.incrementAmount * village.amount + kingdom.incrementAmount*kingdom.amount) * monster.cpsMultiplier * (ascensionLevel + 1);
  
  const [timer, setTimer] = useState(0);
  const [saveTimer, setSaveTimer] = useState(0);

  //GameTick
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timer+1);
   }, 100);
   return () => clearInterval(interval);
  },[])

  useEffect(() => {
    if(timer >= 1){
      setTimer(0);
      addScore(totalCPS/10)
      attackMonster(totalCPS/10)
    }
  }, [timer])

  //SAVEGAME
  useEffect(() => {
    const interval2 = setInterval(() => {
      setSaveTimer(saveTimer + 5);
    }, 5000);
    return () => clearInterval(interval2);
}, []);

useEffect(() => {
  if(saveTimer >= 5){
    setSaveTimer(0);
    localStorage.setItem("totalScore", JSON.stringify(totalScore));
    localStorage.setItem("ascension", JSON.stringify(ascensionLevel));
    localStorage.setItem("score", JSON.stringify(score));
    localStorage.setItem("knight", JSON.stringify(knight.amount));
    localStorage.setItem("knightCost", JSON.stringify(knight.cost));
    localStorage.setItem("knightIncrement", JSON.stringify(knight.incrementAmount));
    localStorage.setItem("farm", JSON.stringify(farm.amount));
    localStorage.setItem("farmCost", JSON.stringify(farm.cost));
    localStorage.setItem("farmIncrement", JSON.stringify(farm.incrementAmount));
    localStorage.setItem("village", JSON.stringify(village.amount));
    localStorage.setItem("villageCost", JSON.stringify(village.cost));
    localStorage.setItem("villageIncrement", JSON.stringify(village.incrementAmount));
    localStorage.setItem("kingdom", JSON.stringify(kingdom.amount));
    localStorage.setItem("kingdomCost", JSON.stringify(kingdom.cost));
    localStorage.setItem("kingdomIncrement", JSON.stringify(kingdom.incrementAmount));

    localStorage.setItem("monsterLevel", JSON.stringify(monster.level));
    localStorage.setItem("monsterMaxHealth", JSON.stringify(monster.maxHealth));
    localStorage.setItem("monsterCurrentHealth", JSON.stringify(monster.currentHealth));
    localStorage.setItem("monsterMultiplier", JSON.stringify(monster.cpsMultiplier));


    let itemsArray = [] as boolean[];
    Object.entries(items).map(([key, value]) => {
      // Pretty straightforward - use key for the key and value for the value.
      // Just to clarify: unlike object destructuring, the parameter names don't matter here.
      itemsArray.push(value)
  })
  localStorage.setItem("items", JSON.stringify(itemsArray));
  }
}, [saveTimer])

  function addScore(value:number){
    setScore(score => score + value);
    if(value > 0){
      setTotalScore(totalScore => totalScore + value);
    }
  }

  function addKnight(addValue:number){
    setKnight({...knight,amount: knight.amount + addValue, cost: Math.round(knight.cost * 1.5)});
  }

  function addFarm(addValue:number){
    setFarm({...farm,amount: farm.amount + addValue, cost: Math.round(farm.cost * 2)});
  }

  function addVillage(addValue:number){
    setVillage({...village,amount: village.amount + addValue, cost: Math.round(village.cost * 2.5)});
  }

  function addKingdom(addValue:number){
    setKingdom({...kingdom, amount: kingdom.amount + addValue, cost: Math.round(kingdom.cost * 3)});
  }

  function resetScores(fullReset:boolean = false){
    if(fullReset){
      setTotalScore(0);
      setAscensionLevel(0);
      localStorage.setItem("totalScore", JSON.stringify(0));
      localStorage.setItem("ascension", JSON.stringify(0));
    }
    setScore(0);
    setKnight({...knight,amount: 0, cost: 10, incrementAmount:1});
    setFarm({...farm, amount: 0, cost: 50, incrementAmount:2});
    setVillage({...village, amount: 0, cost: 100, incrementAmount:3});
    setKingdom({...kingdom, amount: 0, cost: 200, incrementAmount:4});
    setItems({Sword1: false, Sword2: false, Sword3: false, FarmItem1: false, FarmItem2: false,FarmItem3: false, VilItem1 : false,VilItem2: false,VilItem3: false,KingdomItem1: false, KingdomItem2: false,KingdomItem3: false})
    
    setMonster({...monster, level: 1, maxHealth: 100, currentHealth:100, cpsMultiplier: 1})

    localStorage.setItem("score", JSON.stringify(0));
    localStorage.setItem("knight", JSON.stringify(0));
    localStorage.setItem("farm", JSON.stringify(0));
    localStorage.setItem("village", JSON.stringify(0));
    localStorage.setItem("kingdom", JSON.stringify(0));
    localStorage.setItem("knightCost", JSON.stringify(10));
    localStorage.setItem("farmCost", JSON.stringify(50));
    localStorage.setItem("villageCost", JSON.stringify(100));
    localStorage.setItem("kingdomCost", JSON.stringify(200));
    localStorage.setItem("knightIncrement", JSON.stringify(1));
    localStorage.setItem("farmIncrement", JSON.stringify(2));
    localStorage.setItem("villageIncrement", JSON.stringify(3));
    localStorage.setItem("kingdomIncrement", JSON.stringify(4));

    localStorage.setItem("monsterLevel", JSON.stringify(1));
    localStorage.setItem("monsterMaxHealth", JSON.stringify(100));
    localStorage.setItem("monsterCurrentHealth", JSON.stringify(100));
    localStorage.setItem("monsterMultiplier", JSON.stringify(1));


    const itemsArray: boolean[] = new Array(12).fill(false);
    localStorage.setItem("items", JSON.stringify(itemsArray))

  }

  function attackMonster(value: number){
    setMonster({...monster, currentHealth: monster.currentHealth - value})
    if(monster.currentHealth - value <= 0){
      setMonster({...monster,level: monster.level + 1, maxHealth: monster.maxHealth * 10, currentHealth: monster.maxHealth * 10, cpsMultiplier: monster.cpsMultiplier * 2})
    }
  }

  function attackButttonClicked(){
    addScore(1);
    attackMonster(1);
  }

  function ascend(){
    setAscensionLevel(calculateAscension)
    resetScores(false)
  }

  function calculateAscension(){
    let tempNumber = 0;
    tempNumber = Math.floor((totalScore - (ascensionLevel * 10000000))  / 10000000)
    if(tempNumber > ascensionLevel){
    return tempNumber;
    }
    else {
      return ascensionLevel;
    }
  }

  function buyKnight(){
    if(score >= knight.cost){
      addKnight(1);
      addScore(-(knight.cost));
    }
  }

  function buyFarm(){
    if(score >= farm.cost){
      addFarm(1);
      addScore(-(farm.cost));
    }
  }

  function buyVillage(){
    if(score >= village.cost){
      addVillage(1);
      addScore(-(village.cost));
    }
  }

  function buyKingdom(){
    if(score >= kingdom.cost){
      addKingdom(1);
      addScore(-(kingdom.cost));
    }
  }

  function buyItem(Value:number){
    switch(Value){
      case 1:
        {
          if (score >= itemsCost.Sword1 && !items.Sword1){
            setItems({...items, Sword1: true})
            setKnight({...knight, incrementAmount: knight.incrementAmount * 2})
            addScore(-itemsCost.Sword1);
          }
          break;
        }
      case 2:
        {
          if (score >= itemsCost.Sword2  && !items.Sword2){
          setItems({...items, Sword2: true})
          setKnight({...knight, incrementAmount: knight.incrementAmount * 2})
          addScore(-itemsCost.Sword2);
          }
          break;
        }
      case 3:
        {
          if (score >= itemsCost.Sword3  && !items.Sword3){
          setItems({...items, Sword3: true})
          setKnight({...knight, incrementAmount: knight.incrementAmount * 3})
          addScore(-itemsCost.Sword3);
          }
          break;
        }
        case 4:
          {
            if (score >= itemsCost.FarmItem1  && !items.FarmItem1){
            setItems({...items, FarmItem1: true})
            setFarm({...farm, incrementAmount: farm.incrementAmount * 2})
            addScore(-itemsCost.FarmItem1);
            }
            break;
          }
        case 5:
          {
            if (score >= itemsCost.FarmItem2  && !items.FarmItem2){
            setItems({...items, FarmItem2: true})
            setFarm({...farm, incrementAmount: farm.incrementAmount * 2})
            addScore(-itemsCost.FarmItem2);
            }
            break;
          }
        case 6:
          {
            if (score >= itemsCost.FarmItem3  && !items.FarmItem3){
            setItems({...items, FarmItem3: true})
            setFarm({...farm, incrementAmount: farm.incrementAmount * 3})
            addScore(-itemsCost.FarmItem3);
            }
            break;
          }
        case 7:
          {
            if (score >= itemsCost.VilItem1  && !items.VilItem1){
            setItems({...items, VilItem1: true})
            setVillage({...village, incrementAmount: village.incrementAmount * 2})
            addScore(-itemsCost.VilItem1);
            }
            break;
          }
        case 8:
          {
            if (score >= itemsCost.VilItem2  && !items.VilItem2){
            setItems({...items, VilItem2: true})
            setVillage({...village, incrementAmount: village.incrementAmount * 2})
            addScore(-itemsCost.VilItem2);
            }
            break;
          }
        case 9:
            {
              if (score >= itemsCost.VilItem3  && !items.VilItem3){
              setItems({...items, VilItem3: true})
              setVillage({...village, incrementAmount: village.incrementAmount * 3})
              addScore(-itemsCost.VilItem3);
              }
              break;
            }
        case 10:
            {
              if (score >= itemsCost.KingdomItem1  && !items.KingdomItem1){
              setItems({...items, KingdomItem1: true})
              setKingdom({...kingdom, incrementAmount: kingdom.incrementAmount * 2})
              addScore(-itemsCost.KingdomItem1);
              }
              break;
            }
        case 11:
            {
              if (score >= itemsCost.KingdomItem2  && !items.KingdomItem2){
              setItems({...items, KingdomItem2: true})
              setKingdom({...kingdom, incrementAmount: kingdom.incrementAmount * 2})
              addScore(-itemsCost.KingdomItem2);
              }
              break;
            }
        case 12:
            {
              if (score >= itemsCost.KingdomItem3  && !items.KingdomItem3){
              setItems({...items, KingdomItem3: true})
              setKingdom({...kingdom, incrementAmount: kingdom.incrementAmount * 3})
              addScore(-itemsCost.KingdomItem3);
              }
              break;
            }
    }
  }

  //LOADGAME
  useEffect(() => {
    const storedTotalScore = localStorage.getItem("totalScore");
    const storedAscension = localStorage.getItem("ascension");
    const storedScore = localStorage.getItem("score");
    const storedKnight = localStorage.getItem("knight")
    const storedKnightCost = localStorage.getItem("knightCost")
    const storedKnightInc = localStorage.getItem("knightIncrement")
    const storedFarm = localStorage.getItem("farm")
    const storedFarmCost = localStorage.getItem("farmCost")
    const storedFarmInc = localStorage.getItem("farmIncrement")
    const storedVillage = localStorage.getItem("village")
    const storedVillageCost = localStorage.getItem("villageCost")
    const storedVillageInc = localStorage.getItem("villageIncrement")
    const storedKingdom = localStorage.getItem("kingdom")
    const storedKingdomCost = localStorage.getItem("kingdomCost")
    const storedKingdomInc = localStorage.getItem("kingdomIncrement")

    const storedMonsterLevel = localStorage.getItem("monsterLevel")
    const storedMonsterMaxHealth = localStorage.getItem("monsterMaxHealth")
    const storedMonsterCurrentHealth = localStorage.getItem("monsterCurrentHealth")
    const storedMonsterMultiplier = localStorage.getItem("monsterMultiplier")


    const storedItems = localStorage.getItem("items")
    const parsedItems = storedItems ? JSON.parse(storedItems) : 0

    
    setTotalScore(storedTotalScore ? JSON.parse(storedTotalScore) : 0);
    setAscensionLevel(storedAscension ? JSON.parse(storedAscension) : 0);
    setScore(storedScore ? JSON.parse(storedScore) : 0);
    setKnight({...knight,amount : storedKnight ? JSON.parse(storedKnight) : 0, cost: storedKnightCost? JSON.parse(storedKnightCost) : 0, incrementAmount: storedKnightInc ? JSON.parse(storedKnightInc) : 0});
    setFarm({...farm, amount : storedFarm ? JSON.parse(storedFarm) : 0, cost: storedFarmCost? JSON.parse(storedFarmCost) : 0,incrementAmount: storedFarmInc ? JSON.parse(storedFarmInc) : 0});
    setVillage({...village,amount : storedVillage ? JSON.parse(storedVillage) : 0, cost: storedVillageCost? JSON.parse(storedVillageCost) : 0, incrementAmount: storedVillageInc ? JSON.parse(storedVillageInc) : 0 });
    setKingdom({...kingdom,amount : storedKingdom ? JSON.parse(storedKingdom) : 0, cost: storedKingdomCost? JSON.parse(storedKingdomCost) : 0, incrementAmount: storedKingdomInc ? JSON.parse(storedKingdomInc) : 0 });

    setMonster({...monster, level: storedMonsterLevel? JSON.parse(storedMonsterLevel) : 0, maxHealth: storedMonsterMaxHealth? JSON.parse(storedMonsterMaxHealth) : 0, currentHealth: storedMonsterCurrentHealth? JSON.parse(storedMonsterCurrentHealth) : 0, cpsMultiplier: storedMonsterMultiplier? JSON.parse(storedMonsterMultiplier) : 0 })

    setItems({Sword1: parsedItems[0], Sword2: parsedItems[1], Sword3: parsedItems[2],FarmItem1: parsedItems[3],FarmItem2: parsedItems[4],FarmItem3: parsedItems[5], VilItem1 : parsedItems[6],VilItem2: parsedItems[7],VilItem3: parsedItems[8],KingdomItem1: parsedItems[9],KingdomItem2: parsedItems[10],KingdomItem3: parsedItems[11]})

  }, [])

  return (
    <main>
      <div className='bg-backgroundMain'>
        
        <div className='flex flex-col min-h-[25vh] items-center'>
          <h1 className='m-4 text-2xl font-bold font-mono'>CONQUEST CLICKER</h1>
          <h1 className='text-2xl font-bold font-mono group'>Total CPS: {totalCPS}
          <div className='absolute  bg-grayish p-2 rounded-sm shadow-md drop-shadow-md italic invisible group-hover:visible'>
            <p>Each Knight: {knight.incrementAmount * monster.cpsMultiplier * (ascensionLevel + 1)}/s</p>
            <p>Each Farm: {farm.incrementAmount * monster.cpsMultiplier * (ascensionLevel + 1)}/s</p>
            <p>Each Village: {village.incrementAmount * monster.cpsMultiplier * (ascensionLevel + 1)}/s</p>
            <p>Each Kingdom: {kingdom.incrementAmount * monster.cpsMultiplier * (ascensionLevel + 1)}/s</p>
            <p>Total Gold Accumulated: {Math.round(totalScore)}</p>
            <p>Ascension level: {ascensionLevel}</p>


          </div>
          </h1>
        </div>  

        <div className='flex flex-row min-h-[50vh]'>
      <div className = "flex flex-col w-1/4">
        <div className='h-1/4'>
        <button onClick={() => attackButttonClicked()} className="border border-purpleish rounded-r-md shadow-md w-1/2 py-1 px-4 text-lg bg-buttonMain text-white hover:bg-buttonClicked transition-colors duration-[250]">
          <span className='flex flex-col'>
            <p>Attack</p>
            <p className='text-lg bg-buttonClicked break-all'>{Math.round(score)}</p>
            </span></button>
        </div>
        <div className='h-3/4 '>
        <div className='flex flex-col'>
              <button onClick={buyKnight} className="text-lg w-1/2 mb-2 bg-buttonMain rounded-r-lg text-white hover:bg-buttonClicked">
              <span className='flex justify-between'>
              <span className='flex flex-col grow p-1'>
                <p>Knight</p>
                <p className='text-lg bg-buttonClicked'>{knight.amount}</p>
              </span>
              <p className='py-4 px-2 text-right text-lg rounded-r-lg bg-buttonClicked'>{knight.cost}</p>
              </span>
              </button>
              <button onClick={buyFarm} className="text-lg mb-2 bg-buttonMain rounded-r-lg text-white hover:bg-buttonClicked w-1/2 ">
              <span className='flex justify-between'>
              <span className='flex flex-col grow p-1'>
                <p>Farm</p>
              <p className='text-lg bg-buttonClicked'>{farm.amount}</p>
              </span>
              <p className='py-4 px-2 text-lg rounded-r-lg bg-buttonClicked'>{farm.cost}</p>
              </span>
              </button>

              <button onClick={buyVillage} className="text-lg mb-2 bg-buttonMain rounded-r-lg text-white hover:bg-buttonClicked w-1/2 ">
              <span className='flex justify-between'>
              <span className='flex flex-col grow p-1'>
                <p>Village</p>
              <p className='text-lg bg-buttonClicked'>{village.amount}</p>
              </span>
              <p className='py-4 px-2 text-lg rounded-r-lg bg-buttonClicked'>{village.cost}</p>
              </span>
              </button>

              <button onClick={buyKingdom} className="text-lg mb-2 bg-buttonMain rounded-r-lg text-white hover:bg-buttonClicked w-1/2 ">
              <span className='flex justify-between'>
              <span className='flex flex-col grow p-1'>
                <p>Kingdom</p>
              <p className='text-lg bg-buttonClicked'>{kingdom.amount}</p>
              </span>
              <p className='py-4 px-2 text-lg rounded-r-lg bg-buttonClicked'>{kingdom.cost}</p>
              </span>
              </button>

        </div>
        </div>

      </div>
      <div className = "flex flex-col justify-center items-center w-1/4">
        <div className="bg-gray-200 w-[128px] h-4 rounded">
          <div className={`bg-red-500 h-full rounded ${monster.currentHealth === 0 ? 'hidden' : ''}`} style={{ width: `${(monster.currentHealth / monster.maxHealth) * 100}%` }} />
        </div>
        <h1 className='mb-2'>{Math.round(monster.currentHealth)}</h1>
        <Image src = "/monster.png" alt="monster" width="128" height ="128"/>
        <h1>Multiplier : {monster.cpsMultiplier}</h1>
        <h1>Level : {monster.level}</h1>
      </div>
      <div className = "flex flex-col m-2 items-center w-1/2">
      <div className = "flex flex-col border items-center p-4">
        <h1 className='mt-2 mx-4'>Shop</h1>
          <div className='grid grid-cols-3 grid-rows-4 mt-6 gap-4 '>

          <ItemsBtn buyItemFunction = {buyItem} itemID = {1} itemFlag = {items.Sword1} itemName = "Iron Sword" itemCost = "1000" tooltipText='Each knight now produces twice as much gold' />
          <ItemsBtn buyItemFunction = {buyItem} itemID = {2} itemFlag = {items.Sword2} itemName = "Gold Sword" itemCost = "10000" tooltipText='Each knight now produces twice as much gold' />
          <ItemsBtn buyItemFunction = {buyItem} itemID = {3} itemFlag = {items.Sword3} itemName = "Rune Sword" itemCost = "100,000" tooltipText='Each knight now produces 3x as much gold' />
          <ItemsBtn buyItemFunction = {buyItem} itemID = {4} itemFlag = {items.FarmItem1} itemName = "Fertilizer" itemCost = "25000" tooltipText='Each farm now produces twice as much gold' />
          <ItemsBtn buyItemFunction = {buyItem} itemID = {5} itemFlag = {items.FarmItem2} itemName = "Horse" itemCost = "250,000" tooltipText='Each farm now produces twice as much gold' />
          <ItemsBtn buyItemFunction = {buyItem} itemID = {6} itemFlag = {items.FarmItem3} itemName = "Tractor" itemCost = "1,000,000" tooltipText='Each farm now produces 3x as much gold' />
          <ItemsBtn buyItemFunction = {buyItem} itemID = {7} itemFlag = {items.VilItem1} itemName = "Community" itemCost = "50000" tooltipText='Each village now produces twice as much gold' />
          <ItemsBtn buyItemFunction = {buyItem} itemID = {8} itemFlag = {items.VilItem2} itemName = "Trading" itemCost = "500,000" tooltipText='Each village now produces twice as much gold' />
          <ItemsBtn buyItemFunction = {buyItem} itemID = {9} itemFlag = {items.VilItem3} itemName = "Education" itemCost = "2,500,000" tooltipText='Each village now produces 3x as much gold' />
          <ItemsBtn buyItemFunction = {buyItem} itemID = {10} itemFlag = {items.KingdomItem1} itemName = "Hospitals" itemCost = "100,000" tooltipText='Each kingdom now produces twice as much gold' />
          <ItemsBtn buyItemFunction = {buyItem} itemID = {11} itemFlag = {items.KingdomItem2} itemName = "Diplomacy" itemCost = "1,000,000" tooltipText='Each kingdom now produces twice as much gold' />
          <ItemsBtn buyItemFunction = {buyItem} itemID = {12} itemFlag = {items.KingdomItem3} itemName = "Expansion" itemCost = "10,000,000" tooltipText='Each kingdom now produces 3x as much gold' />
          </div>
      </div>
      </div>
      </div>
      <div className=''>
      <button onClick={() => resetScores(true)} className="border border-purpleish rounded-md p-1 mx-2 text-lg bg-buttonMain text-white hover:bg-buttonClicked my-4">Reset</button>
      <button onClick={() => addScore(10000000)} className="border border-purpleish rounded-md p-1 mx-2 text-lg bg-buttonMain text-white hover:bg-buttonClicked my-4">Cheat</button>
      <button onClick={() => ascend()} className="border border-purpleish rounded-md p-1 mx-2 text-lg bg-buttonMain text-white hover:bg-buttonClicked group"><h1>Ascend</h1>
      <div className='absolute -mt-[2rem] ml-[4.2rem] bg-grayish p-2 rounded-sm shadow-md drop-shadow-md italic invisible group-hover:visible'><p>Gain {calculateAscension() - ascensionLevel} ascension levels</p>
      <p>Earn a new ascension level every 10 million gold</p>
      <p>Each ascension level gives you a +1x multiplier</p>
      <p>All clickers and upgrades will reset on ascension</p></div>

      </button>
      </div>
      </div>
    </main>
  )
}
