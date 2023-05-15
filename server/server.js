const io = require("socket.io")(4000, {
  cors: {
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join-room", (docId) => {
    socket.join(docId);
    socket.on("code-change", (data) => {
      socket.broadcast.to(docId).emit("receive-change", data);
    });
  });
});
