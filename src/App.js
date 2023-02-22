import './App.css';
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState, useMemo } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ReactDatePicker from 'react-datepicker';

function App() {
  // for a selected day, show a simple snapshot of the following data:
    // i. number of sessions
    // ii. average length of session
    // iii. average distance traveled by patient
    // iv. average age of patient
  const [initialSessions, setInitialSessions] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [totalSessions, setTotalSessions] = useState(null);
  const [avgLen, setAvglen] = useState(null);
  const [avgDistance, setAvgDistance] = useState(null);
  const [avgAge, setAvgAge] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://lo-interview.s3.us-west-2.amazonaws.com/health_sessions.json`);
      const data = await response.json();
      setInitialSessions(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  useEffect(() => {
    if (sessions.length > 0) {
      setTotalSessions(sessions.length);
      setAvglen(calcAvgLen(sessions));
      setAvgDistance(calcAvgDis(sessions));
      setAvgAge(calcAvgAge(sessions));
    } else if (initialSessions.length > 0) {
      setTotalSessions(initialSessions.length);
      setAvglen(calcAvgLen(initialSessions));
      setAvgDistance(calcAvgDis(initialSessions));
      setAvgAge(calcAvgAge(initialSessions));
    }
  }, [initialSessions, sessions]);
  
  useEffect(() => {
    setSessions(filteredSessions);
  }, [selectedDate]);
  
  const filteredSessions = useMemo(() => {
    // 86400000 is extra ms to next day
    return initialSessions.filter(session => new Date(session.start_time).getTime() >= new Date(selectedDate).getTime() && new Date(session.start_time).getTime() <= (new Date(selectedDate).getTime() + 86400000));
  }, [sessions, selectedDate]);

  const calcAvgLen = (nums) => {
    const durations = nums.map((num) => num.sessionduration);
    return durations.reduce((a, b) => (a + b)) / nums.length;
  };

  const calcAvgDis = (nums) => {
    const distances = nums.map((num) => num.distance);
    return distances.reduce((a, b) => (a + b)) / nums.length;
  };

  const calcAvgAge = (nums) => {
    const ages = nums.filter((num) => num['birth year'] !== null).map((num) => 2023 - Number(num['birth year']));
    return ages.reduce((a, b) => (a + b)) / nums.length;
  };

  return (
    <div className='App'>
      <div className='container'>
        <Tabs>
          <TabList>
            <Tab>Day-by-day Overview</Tab>
            <Tab>Distributions of Session Timing</Tab>
            <Tab>Custom</Tab>
          </TabList>

          <TabPanel className='tab-panel'>
            <div className='datepicker-container'>
              <ReactDatePicker
                wrapperClassName='date-picker-wrapper'
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                minDate={new Date('2015/02/01')}
                maxDate={new Date('2015/02/28')}
                placeholderText='Select Day'
              />
            </div>
            <div className='overview-container'>
              <h3>Number of sessions: {totalSessions}</h3>
              <h3>Average length of session: {avgLen && avgLen.toFixed(2)}</h3>
              <h3>Average distance traveled by patient: {avgDistance && avgDistance.toFixed(2)}</h3>
              <h3>Average age of patient: {avgAge && avgAge.toFixed()}</h3>
            </div>
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content 3</h2>
          </TabPanel>
        </Tabs>   
      </div>
    </div>
  );
}

export default App;
