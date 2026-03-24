const DashboardMessage = ({textColor, message}) => {
  return (
    <p className={`${textColor} text-center`} >{message}</p>
  )
}

export default DashboardMessage