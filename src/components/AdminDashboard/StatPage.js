import React from 'react'
import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import Calendar from 'react-calendar';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import 'react-calendar/dist/Calendar.css';
import './StatPage.scss'
import { getMessage } from '../../APIs/MessageAPIs';
import { getMessagebyID } from '../../APIs/MessageAPIs';
import { deleteMessage } from '../../APIs/MessageAPIs';
import { getOrder } from '../../APIs/OrderAPIs';
import { useStoreWeeklySale } from '../../store/weeklySale-store';

function StatPage() {

  const[OrdersList, setOrdersList] = useState([]);
  const[MessagesList, setMessagesList] = useState([]);
  const[selectedMsgDetails, setselectedMsgDetails] = useState([]);
  const[MessageViewStatus, setMessageViewStatus] = useState(false);
  const[NoMessagesStatus, setNoMessagesStatus] = useState(false);
  const [date, setDate] = useState(new Date());
  const { totalSales, days } = useStoreWeeklySale((state) => ({
    totalSales: state.totalSales,
    days: state.weekDaysSale
  }))

  const[chart, setChart] = useState({
    series: [
      {
        name: 'Series 1',
        data: [1, 2, 3, 4, 5, 6, 7]
      }
    ],
    options: {
      chart: {
        id: 'line-chart',
        toolbar: {
          show: false 
        },
        zoom: {
          enabled: false 
        },
        selection: {
          enabled: false
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '#ffffff' 
          }
        }
      },
      xaxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        labels: {
          style: {
            colors: ['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff']
          }
        }
      },
      colors: ['#7979b7'],

      dataLabels: {
        enabled: true
      }
    }
  })

  useEffect(() => {
    const newData = {
      series: [
        {
          name: 'Sales',
          data: [days.Mon, days.Tue, days.Wed, days.Thu,
          days.Fri, days.Sat, days.Sun]
        }
      ],
      options: {
        chart: {
          id: 'line-chart'
        },
        xaxis: {
          categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        }
      }
    }
    setChart(newData);
  },[days])
  
  useEffect(() => {
    const fetchData = async () => {
      const responseMsg = await getMessage()
      setMessagesList(responseMsg.data);
      if(responseMsg.data.length === 0){
        setNoMessagesStatus(true);
      }
      const responseOrd = await getOrder()
      setOrdersList(responseOrd.data.slice(-4));
    }
    fetchData();
  },[])

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  async function MessageClicked(id){
    const response = await getMessagebyID(id)
    setselectedMsgDetails(response.data)
    setMessageViewStatus(true);
  } 

  async function deleteHandler(id){
    const response = await deleteMessage(id)
    console.log(response.data);
    window.location.assign('/AdminDashboardRoute')   
  }

  return (
    <div className='StDiv'>
      <div className='LineGraphSt'>
        <p><b>Total Sales: </b>Rs, {totalSales}</p>
        <h3>Weekly Sales Graph</h3>
        <ReactApexChart
          options={chart.options}
          series={chart.series}
          type="line"
          height={320}
        />
      </div>
      <div className='DAInvoiceDiv'>
        <h3>Recent Orders Invoice List</h3>
        <div className='DATTST'>
          <div className='DASTHHH'>
            <p>OrderNo</p>
            <p>Billing Customer Name</p>
            <p>Shipping Customer Name</p>
            <p>Order Date</p>
            <p>Order Total</p>
          </div>
          <div className='DASTDATA'>
            {
              OrdersList.map((OrderData, index) => (
                <div key={index} className='DATADETAILS'>
                  <p className='DAOrdNo'>{OrderData.OrderNo}</p>
                  <p className='DAOrdBN'>{OrderData.FirstName[0]} {OrderData.LastName[0]}</p>
                  <p style={{display: OrderData.ShippingStatus === true && 'none'}} className='DAOrdSN'>
                  {OrderData.FirstName[0]} {OrderData.LastName[0]}</p>
                  <p style={{display: OrderData.ShippingStatus === false && 'none'}} className='DAOrdSN'>
                  {OrderData.FirstName[1]} {OrderData.LastName[1]}</p>
                  <p className='DAOrdD'>{OrderData.OrderDate}</p>
                  <p className='DAOrdT'>Rs, {OrderData.CartSubtotal}</p> 
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <div className='Msg-Cal-Div' style={{display: MessageViewStatus === true && 'none'}}>
        <div className='Msg-Div'>
          <div className="text-container">
            {
              MessagesList.map((MsgData, index) => (
                <div key={index} onClick={() => MessageClicked(MsgData._id)}>
                  <p className='MsgSenderName'>{MsgData.Name}</p>
                  <p className='MsgText'>{MsgData.Message}</p>
                </div>
              ))
            }
          </div>
          <p className='NoMsg' style={{display: NoMessagesStatus === false && 'none'}}>No Messages</p>
        </div>
        <Calendar className='Calender' value={date} onChange={handleDateChange} />
      </div>
      <div className='MessageDetailsDiv' style={{display: MessageViewStatus === false && 'none'}}>
        <h4>Message Details</h4>
        <p className='MsgCD'>{selectedMsgDetails.MessageDate}</p>
        <p className='MsgSN'>{selectedMsgDetails.Name}</p>
        <p className='MsgT'>{selectedMsgDetails.Message}</p>
        <p className='MsgCD'>{selectedMsgDetails.Email}</p>
        <p className='MsgCD'>0{selectedMsgDetails.PHNum}</p>
        <div className='MsgBTN-Div'>
            <button onClick={() =>  deleteHandler(selectedMsgDetails._id)} className='MsgBtns'> <DeleteIcon /> Delete Message </button>
            <button onClick={() =>  setMessageViewStatus(false)} className='MsgBtns'><ArrowBackIosIcon /> Back</button>
        </div>
      </div>
    </div>
  )
}

export default StatPage