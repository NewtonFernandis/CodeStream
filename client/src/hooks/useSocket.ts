import { useState, useEffect } from "react";
import { Socket, io } from "socket.io-client";

export const useSocket = (url: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const ws = io(url);
    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [url]);

  return socket;
};
