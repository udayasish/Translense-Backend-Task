import express from 'express';
import { createBusiness, getBusinesses, getBusinessById, updateBusiness, deleteBusiness, verifyBusiness } from '../controllers/business.controller.js';
import validateRequest from '../middlewares/validateRequest.middleware.js';
import {businessValidation, updateBusinessValidation} from '../schemas/business.schema.js';
import {upload} from '../middlewares/multer.middleware.js';
import { verificationCodeSchema } from '../schemas/verificationCode.schema.js';

const router = express.Router();

router.post('/', upload.single('image'), validateRequest(businessValidation), createBusiness);
router.get('/', getBusinesses);
router.get('/:id', getBusinessById);
router.put('/:id', validateRequest(updateBusinessValidation), updateBusiness);
router.delete('/:id', deleteBusiness);
router.post('/verify', validateRequest(verificationCodeSchema), verifyBusiness);

export default router;