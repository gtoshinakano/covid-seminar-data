import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import React from 'react'
import { AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, Dot } from 'recharts';
import moment from 'moment'
import _ from 'lodash'
import {readRemoteFile} from 'react-papaparse'
import {StyledTooltip} from '../src/StyledTooltip'

const points = {
  "01/04/20": {
    XAxis: "01/04/20",
    image: "teste",
    dataArea: "casesHokkaido"
  }
}

export default function Home() {

  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [hokkaido, setHkData] = React.useState([])

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
      setData(Object.values(_.merge(_.keyBy(data, 'XAxis'), _.keyBy(hokkaido, 'XAxis'))))
      setLoading(false)
    }
  }, [hokkaido])

  if(!loading)
  return (
    <div className={styles.container}>
      <Head>
        <title>Dados do Brasil</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Novos casos Brasil X Japão COVID19 
        </h1>
        <div>
          <AreaChart width={1900} height={300} data={data} syncId="anyId">
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
            <Area type="monotone" dataKey="casesBr" stroke="#0066cc" fillOpacity={1} fill="url(#colorBr)" dot={CustomDot}/>
            <Area type="monotone" dataKey="casesJp" stroke="#0066cc" fillOpacity={1} fill="url(#colorJp)" dot={CustomDot}/>
          </AreaChart>
          <AreaChart width={1900} height={300} data={data} syncId="anyId">
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
            <Area type="monotone" dataKey="casesJp" stroke="#0066cc" fillOpacity={1} fill="url(#colorJp2)" dot={CustomDot}/>
            <Area type="monotone" dataKey="casesHokkaido" stroke="#0066cc" fillOpacity={1} fill="url(#colorHk)" dot={CustomDot}/>
          </AreaChart>

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
                ? "Brasil" 
                : i.name === "casesJp"
                ? "Japão"
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

  if(Object.keys(points).includes(payload.XAxis) && points[payload.XAxis].dataArea === dataKey)
    return <circle {...props} stroke="black" stroke-width="2" r="6" fill="pink"  />
  
    return null
}

