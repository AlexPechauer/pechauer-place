import { useState, useEffect } from 'react'
import axios from 'axios'

export class UserClient {

  /**
   *
   */
  constructor() {

  }

  GetAll = () => {
    const [resp, setResponse] = useState()

    useEffect(() => {
      axios.get('http://localhost:8085/api/users').then((resp) => {
        setResponse(resp.data);
      })
    }, [])
    return resp
  }
}