import {Cancelled, Rescheduled, NewFlight, Quarantine, ArriveJica, CancelEmergency, GoToStarts, GoToSuspended, HokkaidoAlert, HokkaidoAlertRaise, SapporoAlertRaise, TokyoEmergency} from "./Contents/SingleContents"

const DisplayContent = (props) => {
  const {content} = props

  switch(content) {
    case "cancelled":
      return <Cancelled />;
    case "rescheduled":
      return <Rescheduled />;
    case "newFlight":
      return <NewFlight />;
    case "quarantine":
      return <Quarantine />;
    case "arriveJica":
      return <ArriveJica />
    case "cancelEmergencyState":
      return <CancelEmergency />
    case "gotoStarts":
      return <GoToStarts />
    case "gotoSuspended":
      return <GoToSuspended />
    case "hokkaidoAlert":
      return <HokkaidoAlert />
    case "hokkaidoAlertRaise":
      return <HokkaidoAlertRaise />
    case "sapporoAlertRaise":
      return <SapporoAlertRaise />
    case "tokyoEmergency":
      return <TokyoEmergency />
    default :
      return "Content"
  }
}

export default DisplayContent