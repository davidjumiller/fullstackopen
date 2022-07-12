const Notification = ({ message }) => {
    if (message === null){
        return null
    }

    const notificationStyle = {
        color: 'grey',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }
    notificationStyle.color = message.success? 'green' : 'red'

    return (
        <div style={notificationStyle}>
            {message.text}
        </div>
    )
}

export default Notification