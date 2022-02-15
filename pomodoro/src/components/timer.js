import React, {useState, useRef, useEffect, useLayoutEffect} from "react";
import './timer.css';
function Timer(){
    const intervalRef = useRef(null);
    const [timer, setTimer] = useState('25:00');
    //This is the calculations for the timer.
    function getTimeRemaining(endtime){
        const total = Date.parse(endtime) - Date.parse(new Date());
        const seconds = Math.floor( (total/1000) % 60);
        const minutes = Math.floor( (total/1000/60) % 60);
        const hours = Math.floor ( (total*60*60) % 24);
        const days = Math.floor ( ( total*60*60*24));
        return{
            total, days, hours, minutes, seconds
        };
    }
    //This code sets the maximum number for each position
    function startTimer(deadline) {
        let {total, hours, minutes, seconds } = getTimeRemaining(deadline);
        console.log('deadline', deadline);
        if (total >=0){
            setTimer(
                // (hours > 9 ? hours : '0' + hours) + ':' +
                (minutes > 9 ? minutes : '0' + minutes) + ':' +
                (seconds > 9 ? seconds : '0' + seconds)
            )
        }else{
            clearInterval(intervalRef.current);
        }
    }
    //This code sets the initial timer and counts down at (1000ms) 1 second

    function clearTimer(endtime){
        setTimer('25:00');
        if (intervalRef.current) clearInterval(intervalRef.current);
        const id = setInterval(()=>{
            startTimer(endtime);
        }, 1000)
        intervalRef.current = id;
        console.log('endtime', endtime);
    }
    //This code grabs the time and date that the time will end
    function getDeadlineTime(){
        let deadline = new Date ();
        deadline.setSeconds(deadline.getSeconds()+0);
        deadline.setMinutes(deadline.getMinutes()+25)
        return deadline;
    }

    function getBreakTime(){
        let deadline = new Date ();
        deadline.setSeconds(deadline.getSeconds()+0);
        deadline.setMinutes(deadline.getMinutes()+15)
        return deadline;
    }

    function getFiveMinuteBreakTime(){
        let deadline = new Date ();
        deadline.setSeconds(deadline.getSeconds()+0);
        deadline.setMinutes(deadline.getMinutes()+5)
        return deadline;
    }

    function fiveMinuteBreakTimer(endtime){
        setTimer('5:00');
        if (intervalRef.current) clearInterval(intervalRef.current);
        const id = setInterval(()=>{
            startTimer(endtime);
        }, 1000)
        intervalRef.current = id;
        console.log('endtime', endtime);
    }

    function fifteenMinuteBreakTimer(endtime){
        setTimer('15:00');
        if (intervalRef.current) clearInterval(intervalRef.current);
        const id = setInterval(()=>{
            startTimer(endtime);
        }, 1000)
        intervalRef.current = id;
        console.log('endtime', endtime);
    }
    // Using LayoutEffect and this code stops the timer from running on initial load, which useEffect does. 
    // This code also allows it to update every second just as useEffect would.
    
    const firstUpdate = useRef(true);
    useLayoutEffect(() => {
        if (firstUpdate.current) {
          firstUpdate.current = false;
          return;
        }
    //This else statement allows the restart button to function properly.
        else console.log('useEffect used')
        clearTimer(getDeadlineTime());
            return() => {if(intervalRef.current) clearInterval(intervalRef.current)}
    }, []);

    // Add a line to automatically go to breakTimer function when timer hits 00:00

    function onClickResetBtn(){
        if(intervalRef.current) clearInterval(intervalRef.current);
        clearTimer(getDeadlineTime());
    }

    function onClickStartBtn(){
        if(intervalRef.current) clearInterval(intervalRef.current);
        clearTimer(getDeadlineTime());
    }

    function onClickFifteenMinuteBreakBtn(){
        if (intervalRef.current) fifteenMinuteBreakTimer(intervalRef.current);
        fifteenMinuteBreakTimer(getBreakTime());
    }

    function onClickFiveMinuteBreakBtn(){
        if (intervalRef.current) fiveMinuteBreakTimer(intervalRef.current);
        fiveMinuteBreakTimer(getFiveMinuteBreakTime());
    }

    return ( 
    <div className = 'app'>
        <div className = 'timerFace'>
            <h2> {timer} </h2>
            <div className = 'buttons'>
                <button className  = 'btn' onClick = {onClickStartBtn}> Start </button>
                <br></br>
                <button className = 'btn' onClick = {onClickResetBtn}> Reset </button>
            </div>
            <div className = 'btnPadding'>
                <button className = 'breakBtn' onClick = {onClickFiveMinuteBreakBtn}> 5 Min Break </button>
                <button className = 'breakBtn' onClick = {onClickFifteenMinuteBreakBtn}> 15 Min Break </button>
            </div>
        </div>
    </div>
    );
}
export default Timer;