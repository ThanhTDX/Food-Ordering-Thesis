import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelector, fetchUserOrdering } from "../slices/userSlice";


const UserOrderingPage = () => {
  const dispatch = useDispatch()
  const user = useSelector(userSelector)
  const [userOrdering, setUserOrdering] = useState([])

  useEffect(() => {
    dispatch(fetchUserOrdering());
  }, [dispatch])
  

  return (
    <div>UserOrderingPage</div>
  )
}

export default UserOrderingPage