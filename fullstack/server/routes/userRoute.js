import express from 'express'
import { allBookings, bookVisit, cancelBooking, createUser, getAllFavorites, toFav } from '../controllers/useController.js'
import jwtCheck from '../config/auth0Config.js'
const router = express.Router()

router.post("/register", jwtCheck, createUser)
router.post("/bookVisit/:id", jwtCheck,bookVisit)
router.post("/allBookings", allBookings)
router.post("/cancelBooking/:id", jwtCheck,cancelBooking)
router.post("/toFav/:rid", jwtCheck,toFav)
router.post("/allFav", jwtCheck,getAllFavorites)

export {router as userRoute}        