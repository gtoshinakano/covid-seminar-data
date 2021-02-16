import styled from "styled-components"

const Cancelled = () => {

  return <Container>
    Cancelado o vôo do dia 5 de maio
  </Container>
}

const Rescheduled = () => {
  return <Container>
    Vôo remarcado para dia 31 Maio
  </Container>
}

const NewFlight = () => {
  return <Container>
    Vôo para Paris
  </Container>
}

const Quarantine = () => {
  return <Container>
    Exame PCR e Quarentena
  </Container>
}

const ArriveJica = () => {
  return <Container>
    Cheguei na Jica
  </Container>
}

const CancelEmergency = () => {
  return <Container>
    <img src="/japan-ends-emergency.png" />
  </Container>
}

const GoToStarts = () => {
  return <Container>
    Japao inicia GoToTravel
    <img src="https://www.manyo.co.jp/kobe/wp2/wp-content/uploads/2020/09/%E5%9C%B0%E5%9F%9F%E5%85%B1%E9%80%9AC%E3%82%B9%E3%83%86%E3%83%83%E3%82%AB%E3%83%BC%E9%A4%A8%E5%86%85%E3%83%BB%E9%A4%A8%E5%A4%96%EF%BC%B0%EF%BC%AF%EF%BC%B0%EF%BC%89.jpg" />
  </Container>
}

const GoToSuspended = () => {
  return <Container>
    Japao suspende GoToTravel
  </Container>
}

const HokkaidoAlert = () => {
  return <Container>
    Alerta em Hokkaido estagio 2
  </Container>
}

const HokkaidoAlertRaise = () => {
  return <Container>
    Alerta em Hokkaido estagio 3
  </Container>
}

const SapporoAlertRaise = () => {
  return <Container>
    Alerta em Sapporo estagio 4
  </Container>
}

const TokyoEmergency = () => {
  return <Container>
    Tokyo Kanagawa Saitama e Chiba entram em estado de emergencia
  </Container>
}

const Container = styled.div`
  text-align: center;
  img{
    max-width: 100%;
    max-height: 89vh;
  }
`



export {Cancelled, Rescheduled, NewFlight, Quarantine, ArriveJica, CancelEmergency, GoToStarts, GoToSuspended, HokkaidoAlert, HokkaidoAlertRaise, SapporoAlertRaise, TokyoEmergency}