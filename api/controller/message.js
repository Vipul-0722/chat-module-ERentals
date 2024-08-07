const Message = require("../model/Message")
const saveMsg = async (data) => {
  try {
    const msgData = JSON.parse(data)
    console.log(msgData, "data")
    const saveMsg = new Message(msgData)
    await saveMsg.save()
    return saveMsg
  } catch (error) {
    console.log("cant save data in db", error)
    //   res.status(500).send({ msg: "Internal Server Error" })
  }
}

const getMsg = async (req, res) => {
  const currentUserId = req.query.currentUserId // Get current user ID from query parameters
  const otherUserId = req.query.otherUserId
  console.log("Current User ID:", currentUserId)
  console.log("Other User ID:", otherUserId)

  try {
    if (!currentUserId || !otherUserId) {
      return res.status(400).send({ msg: "Both user IDs are required." })
    }

    // Fetch all messages where the other user is either the sender or the receiver
    const allMsg = await Message.find({
      $or: [{ "sender._id": otherUserId }, { "receiver._id": otherUserId }],
    })

    // Filter messages to only include those where the current user is either the sender or the receiver
    const filteredMsg = allMsg.filter(
      (msg) =>
        msg.sender._id.equals(currentUserId) ||
        msg.receiver._id.equals(currentUserId)
    )

    // console.log(filteredMsg, "filtered msg")
    if (filteredMsg.length === 0) {
      return res.send({
        data: [],
        msg: "No messages found for this user.",
      })
    }

    console.log("Filtered Messages found:", filteredMsg)
    return res.send({
      data: filteredMsg,
      msg: "Filtered messages",
    })
  } catch (error) {
    console.log("Error fetching messages:", error)
    // return res.status(500).send({ msg: "Internal Server Error" })
  }
}
// const getMsg = async (req, res) => {
//   const id = req.params.id
//   console.log(id)
//   const currentUserId = "66a1e44d6162545767dde89a"
//   const otherUserId = "66a1e4286162545767dde897"

//   try {
//     if (!otherUserId) {
//       return res.status(400).send({ msg: "Both user IDs are required." })
//     }

//     const allMsg = await Message.find({
//       $or: [{ "sender._id": otherUserId }, { "receiver._id": otherUserId }],
//     })
//   } catch (e) {}
// try {
//   if (!id) {
//     return res.status(400).send({ msg: "User id required." })
//   }
// const allMsg = await Message.find({
//   $or: [{ "sender._id": id }, { "receiver._id": id }],
// })
//   //  console.log(allMsg);
//   return res.send({
//     data: allMsg,
//     msg: "allMSg",
//   })
// } catch (error) {
//   res.status(500).send({ msg: "Internal Server Error" })
// }
// }
const delMsg = async (req, res) => {
  const id = req.params.id
  try {
    if (!id) {
      return res.status(400).send({ msg: "User id required." })
    }
    const delMsg = await Message.findByIdAndDelete(id)
    return res.send({
      data: delMsg,
      msg: "delMsg",
    })
  } catch (error) {
    res.status(500).send({ msg: "Internal Server Error" })
  }
}

module.exports = {
  saveMsg,
  getMsg,
  delMsg,
}

