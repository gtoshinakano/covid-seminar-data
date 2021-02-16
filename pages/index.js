import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import React from 'react'
import { AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, LabelList } from 'recharts';
import moment from 'moment'
import _ from 'lodash'
import {readRemoteFile} from 'react-papaparse'
import {StyledTooltip} from '../src/StyledTooltip'
import Modal from '../src/Modal'

const points = {
  "17/04/20": {
    XAxis: "17/04/20",
    content: "cancelled",
    dataArea: "casesBr",
    pointFill: "red"
  },
  "16/05/20": {
    XAxis: "16/05/20",
    content: "rescheduled",
    dataArea: "casesBr",
    pointFill: "red"
  },
  "25/05/20": {
    XAxis: "25/05/20",
    content: "cancelEmergencyState",
    dataArea: "casesJp",
    pointFill: "pink"
  },
  "31/05/20": {
    XAxis: "31/05/20",
    content: "newFlight",
    dataArea: "casesBr",
    pointFill: "green"
  },
  "02/06/20": {
    XAxis: "02/06/20",
    content: "quarantine",
    dataArea: "casesBr",
    pointFill: "gold"
  },
  "16/06/20": {
    XAxis: "16/06/20",
    content: "arriveJica",
    dataArea: "casesBr",
    pointFill: "green"
  },
  "22/07/20": {
    XAxis: "22/07/20",
    content: "gotoStarts",
    dataArea: "casesJp",
    pointFill: "blue"
  },
  "28/12/20": {
    XAxis: "28/12/20",
    content: "gotoSuspended",
    dataArea: "casesJp",
    pointFill: "red"
  },
  "28/10/20": {
    XAxis: "28/10/20",
    content: "hokkaidoAlert",
    dataArea: "casesHokkaido",
    pointFill: "red"
  },
  "07/11/20": {
    XAxis: "07/11/20",
    content: "hokkaidoAlertRaise",
    dataArea: "casesHokkaido",
    pointFill: "red"
  },
  "17/11/20": {
    XAxis: "17/11/20",
    content: "sapporoAlertRaise",
    dataArea: "casesHokkaido",
    pointFill: "red"
  },
  "07/01/21": {
    XAxis: "07/01/21",
    content: "tokyoEmergency",
    dataArea: "casesJp",
    pointFill: "red"
  },

}

const Home = (props) => {

  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [hokkaido, setHkData] = React.useState([])
  const [displayContent, setContent] = React.useState("")

  const onOpen = (open, payload) => {
    props.setOpen(open)
    setContent(payload.content)
  }

  React.useState( async () => {
    const br = await axios.get('https://covid-193.p.rapidapi.com/history', {
      params: {
        country: 'brazil'
      },
      headers: {
        "x-rapidapi-key": "c3de1f0f9cmshc02adada5afc0bcp14e5d4jsna44df0edc8c2",
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
        "useQueryString": true
      }
    }).then((res) => {
      return _.uniqBy(res.data.response
        .filter((i) => moment(i.day, 'YYYY-MM-DD') > moment('2020-03-25', 'YYYY-MM-DD'))
        .map(i => {
          return {
            XAxis: moment(i.day, 'YYYY-MM-DD').format('DD/MM/YY'),
            casesBr: parseInt(i.cases.new)
          }
        })
        .reverse(),'XAxis')
    })
    const jp = await axios.get('https://covid-193.p.rapidapi.com/history', {
      params: {
        country: 'japan'
      },
      headers: {
        "x-rapidapi-key": "c3de1f0f9cmshc02adada5afc0bcp14e5d4jsna44df0edc8c2",
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
        "useQueryString": true
      }
    }).then((res) => {
      return _.uniqBy(res.data.response
        .filter((i) => moment(i.day, 'YYYY-MM-DD') > moment('2020-03-25', 'YYYY-MM-DD'))
        .map(i => {
          return {
            XAxis: moment(i.day, 'YYYY-MM-DD').format('DD/MM/YY'),
            casesJp: parseInt(i.cases.new)
          }
        })
        .reverse(),'XAxis')
    })
    setData(Object.values(_.merge(_.keyBy(br, 'XAxis'), _.keyBy(jp, 'XAxis'), points)))

    readRemoteFile("https://www.harp.lg.jp/opendata/dataset/1369/resource/2853/covid19_data.csv", {
      complete: (res) => {
        const {data} = res
        const hokkaido =data.map((i, index) => {
          if(index > 0) return {
            XAxis: moment(`${i[1]}-${i[2]}-${i[3]}`, 'YYYY-M-DD').format('YYYY-MM-DD'),
            casesHokkaido: parseInt(i[6])
          }
          else return {
            XAxis: null, casesHokkaido: 0
          }
        }).filter((i) => moment(i.XAxis, 'YYYY-MM-DD') > moment('2020-03-25', 'YYYY-MM-DD'))
        .map((i) => {
          return {
            ...i,
            XAxis: moment(i.XAxis, 'YYYY-MM-DD').format('DD/MM/YY')
          }
        })
        console.log(Object.values(_.merge(_.keyBy(data, 'XAxis'), _.keyBy(hokkaido, 'XAxis'))))
        setHkData(hokkaido)
      }
    })

  }, [])
  React.useEffect(() => {
    if(hokkaido.length > 0){
      let newData = Object.values(_.merge(_.keyBy(data, 'XAxis'), _.keyBy(hokkaido, 'XAxis')))
      setData(_.filter(newData, i => XAxis != "30/05/20"))
      setLoading(false)
    }
  }, [hokkaido])

  if(!loading)
  return (
    <div className={styles.container}>
      <Head>
        <title>COVID19 History - Brazil VS Japan VS Hokkaido</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          COVID19 New Cases Brazil X Japan  
        </h1>
        <div>
          <AreaChart width={1900} height={340} data={data} syncId="anyId">
            <defs>
              <linearGradient id="colorBr" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorJp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            <XAxis dataKey="XAxis" />
            <YAxis />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="casesBr" stroke="#0066cc" fillOpacity={1} fill="url(#colorBr)" dot={<CustomDot onOpen={onOpen} />}>
              <LabelList dataKey="XAxis" position="top" content={CustomDateLabel} />
            </Area>
            <Area type="monotone" dataKey="casesJp" stroke="#0066cc" fillOpacity={1} fill="url(#colorJp)" dot={<CustomDot onOpen={onOpen} />} />
          </AreaChart>
          <AreaChart width={1900} height={340} data={data} syncId="anyId">
            <defs>
              <linearGradient id="colorJp2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorHk" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            <XAxis dataKey="XAxis" />
            <YAxis />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="casesJp" stroke="#0066cc" fillOpacity={1} fill="url(#colorJp2)" dot={<CustomDot onOpen={onOpen} />}>
              <LabelList dataKey="XAxis" position="top" content={CustomDateLabel} />
            </Area>
            <Area type="monotone" dataKey="casesHokkaido" stroke="#0066cc" fillOpacity={1} fill="url(#colorHk)" dot={<CustomDot onOpen={onOpen} />}/>
          </AreaChart>
          {props.modalOpen && 
            <Modal 
              onClose={props.setOpen}
              content={displayContent}
            />
          }
        </div>
      </main>
    </div>
  )
  else
  return (<h1>Loading!!</h1>)
}

const CustomTooltip = ({active, payload,label}) => {

  if(active && payload){
    return (
      <StyledTooltip>
        <strong>{label}</strong>
        <ul>
          {payload && payload.map((i, index) => {
            return(
              <li key={index}>
                <b>{i.name === "casesBr" 
                ? "Brazil" 
                : i.name === "casesJp"
                ? "Japan"
                : "Hokkaido"}</b> : {i.value}
              </li>
            )
          })}
        </ul>
      </StyledTooltip>
    )
  }
  return null
}

const CustomDot = (props) => {
  const {payload, dataKey} = props
  const open = () => {
    props.onOpen(true, payload)
  }

  if(Object.keys(points).includes(payload.XAxis) && points[payload.XAxis].dataArea === dataKey)
    return (
      <circle {...props} stroke="black" stroke-width="2" r="6" fill={payload.pointFill} onClick={open} />
    )
  
    return null
}

const CustomDateLabel = (props) => {
  const { x, y, width, height, value } = props

  if(Object.keys(points).includes(value))
    return (
      <g>
        <text x={x} y={y-15} fill="#000" textAnchor="middle" dominantBaseline="middle" font-size="10">
          {value}
        </text>
      </g>
    )
  return null
}

export default Home