import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tab,
  Tabs,
  Typography,
} from "@mui/material"
import Header from "./Header"
import { Fragment, useState } from "react"
import PersonIcon from "@mui/icons-material/Person"
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline"
import axios from "axios"
import { useEffect } from "react"
const SideBar = ({ user, onlineUsers, roomData, setRoomData, setAllMsg }) => {
  // console.log(onlineUsers, "sidebar");

  const [currentUser, setCurrentUser] = useState()

  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem("user"))
    setCurrentUser(currentUser)
  }, [])
  const [value, setValue] = useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const handleChatRoom = async (user) => {
    setRoomData({
      ...roomData,
      room: "test",
      receiver: user,
    })

    const currentUserId = currentUser?._id
    const otherUserId = user._id

    try {
      const response = await axios.get(
        "http://localhost:5000/message/getChat",
        {
          params: {
            currentUserId,
            otherUserId,
          },
        }
      )

      console.log(response.data)
      setAllMsg(response.data.data)
    } catch (error) {
      console.error("Error fetching chat data:", error)
    }
  }
  return (
    <Box
      sx={{
        width: "25vw",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Header user={user} />
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        variant="fullWidth"
      >
        <Tab
          icon={<ChatBubbleOutlineIcon fontSize="small" />}
          iconPosition="start"
          label="Chat List"
          sx={{ minHeight: "inherit" }}
        />
        <Tab
          icon={<PersonIcon fontSize="medium" />}
          iconPosition="start"
          label="User List"
          sx={{ minHeight: "inherit" }}
        />
      </Tabs>
      {value === 0 && (
        <List sx={{ p: 0, overflowY: "auto", flex: "1 0 0" }}>
          {onlineUsers
            .filter((ele) => ele._id !== user._id)
            .map((item) => (
              <Fragment key={item._id}>
                <ListItem
                  alignItems="flex-start"
                  onClick={() => handleChatRoom(item)}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.name}
                    secondary={
                      <Typography variant="caption">{item.email}</Typography>
                    }
                  />
                </ListItem>
                <Divider component="li" />
              </Fragment>
            ))}
        </List>
      )}
      {value === 1 && <div>1</div>}
    </Box>
  )
}

export default SideBar

