import uuidv4 from 'uuid/v4';

const createUser = ({name = "", socketId = null } = {})=>(
	{
		id:uuidv4(),
		name,
		socketId
		
	}
)

const createMessage = ({message = "", sender = ""} = { })=>(
    {
        id:uuidv4(),
        time:getTime(new Date(Date.now())),
        message,
        sender	
    }
)
