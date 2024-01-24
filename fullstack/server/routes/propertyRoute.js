import express from 'express'
import { createProperty, deleteProperty, editProperty, getAllProperties, getProperty } from '../controllers/propertyController.js'
import jwtCheck from '../config/auth0Config.js'
import { updateResidency } from '../../client/src/utils/api.js'
const router = express.Router()

router.post("/create", jwtCheck ,createProperty)
router.post("/update",jwtCheck,editProperty)
router.post("/delete",jwtCheck,deleteProperty)

router.get("/allprops",getAllProperties)
router.get("/:id",getProperty)

export {router as propertyRoute}