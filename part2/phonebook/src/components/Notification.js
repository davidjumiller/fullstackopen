const Notification = ({ message }) => {
    if (message === null){
        return null
    }

    const notificationStyle = {
        'color': 'grey',
        'background': 'lightgrey',
        'font-size': '20px',
        'border-style': 'solid',
        'border-radius': '5px',
        'padding': '10px',
        'margin-bottom': '10px'
    }
    notificationStyle.color = message.success? 'green' : 'red'

    return (
        <div style={notificationStyle}>
            {message.text}
        </div>
    )
}

export default Notification