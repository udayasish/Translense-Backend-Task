import express from 'express';
import { createOwner, getOwner, getOwnerById, updateOwner, deleteOwner, verifyOwnerByEmail } from '../controllers/owner.controller.js';
import validateRequest from '../middlewares/validateRequest.middleware.js';
import {ownerValidation, updateOwnerValidation} from '../schemas/owner.schema.js';
import {upload} from '../middlewares/multer.middleware.js';
import { verificationCodeSchema } from '../schemas/verificationCode.schema.js';

const router = express.Router();

router.post('/', upload.single('image'), validateRequest(ownerValidation), createOwner);
router.get('/', getOwner);
router.get('/:id', getOwnerById);
router.put('/:id', validateRequest(updateOwnerValidation), updateOwner);
router.delete('/:id', deleteOwner);
router.post('/verify', validateRequest(verificationCodeSchema), verifyOwnerByEmail);

export default router;