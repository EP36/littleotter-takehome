import './App.css';
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ReactDatePicker from 'react-datepicker';

function App() {
  const [selectedDate, setSelectedDate] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://lo-interview.s3.us-west-2.amazonaws.com/health_sessions.json`);
      const data = await response.json();
      console.log('this is data', data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log('useEffect')
    fetchData();
  }, []);

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
