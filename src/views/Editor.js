/*
 * @Author: lijunwei
 * @Date: 2022-01-07 15:10:15
 * @LastEditTime: 2022-01-17 20:02:11
 * @LastEditors: lijunwei
 * @Description: 
 */

import { Form, TextField } from "@shopify/polaris";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
// import { io } from "socket.io-client";




function Editor(props) {

  const [socket, setSocket] = useState(null);
  const [color, setColor] = useState("");

  let [searchParams] = useSearchParams();


  const [code, setCode] = useState(searchParams.get("code"));
  const [token, setToken] = useState("");


  // useEffect(() => {
  //   const payload = {
  //     client_id: "b523ef94f70673c1ce904310d923918d",
  //     client_secret: "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",
  //     code,
  //   }

  //   axios.post("http://192.168.8.55:8001/access_token",
  //   payload)
  //   .then(r=>{
  //     console.log(r.data);
  //     const {access_token} = r.data;
  //     setToken(access_token);
  //   })
  // },[])
  

  useEffect(() => {
    const ws = new WebSocket("ws://192.168.11.113:8002/");
    console.log(ws)
    ws.onopen = (e) => {
      console.log("socket opened");
    }

    ws.onmessage = (e) => {
      console.log(e.data);
      console.log('客户端 接受 message');
    }

    setSocket(ws);
  }, [])

  const ioChangeColor = useCallback(
    () => {
      if (!socket) return;
      console.log(2)
      socket.send(JSON.stringify({ colorChange: color }));
    },
    [color, socket],
  );


  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      {/* <a href={`https://fastlane-sections.myshopify.com/admin/oauth/authorize?client_id=b523ef94f70673c1ce904310d923918d&scope=write_products,write_customers,write_draft_orders&redirect_uri=http://192.168.8.55:3010&state=${new Date().getTime()}`}>New Code Link</a> */}
      <div style={{ width: "300px", margin: "0px auto" }}>
        <Form

          onSubmit={ioChangeColor}
        >
          <br />
          <TextField
            value={color}
            label="Input a color and press ENTER. e.g. #333, red"
            onChange={val => setColor(val)}
          />

          {/* <Button
          fullWidth
          primary
          onClick={ ioChangeColor }
        >Submit</Button> */}
        </Form>
      </div>

      <div style={{ flex: 1, position: "relative", padding: "20px" }}>
      {
        true && 
        <iframe
          title="server"
          style={{ border: "none" }}
          height="100%"
          width="100%"
          src={`http://192.168.11.113:8002/`}
        />
      }
      </div>

    </div>
  );
}
export { Editor }

