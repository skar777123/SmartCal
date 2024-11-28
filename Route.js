import {analyzeCalories} from './Controller';
import express from 'express'
const router = express.Router();

router.post('/analyze',analyzeCalories)

export default router;