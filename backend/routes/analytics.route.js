import express from 'express';
import { protectRoute, adminRoute } from '../middleware/auth.middleware.js';
import { getAnalyticsData, getDailySalesData } from '../controllers/analytics.controller.js';

const router = express.Router();

router.get("/", protectRoute, adminRoute, async (req,res) => {
    try {
        const analyticsData = await getAnalyticsData();

        const endDate = new Date();
        const startDate = new Date(endDate);
        startDate.setUTCHours(0, 0, 0, 0);
        startDate.setUTCDate(startDate.getUTCDate() - 6);

        const dailySalesData = await getDailySalesData(startDate, endDate);

        res.json({
            analyticsData,
            dailySalesData
        });
    } catch (error) {
        console.error("Error in getAnalyticsData", error);
        res.status(500).json({message: "Error in getAnalyticsData", error: error.message});
    }
    
});

export default router;