import express from 'express';

const healthRoute = express.Router();

const healthcheck = {
	uptime: process.uptime(),
	responseTime: process.hrtime(),
	message: 'OK',
	timestamp: Date.now()
};

healthRoute.get("/", (req, res) => {
	try {
        res.send(healthcheck);
    } catch (error) {
        healthcheck.message = error;
        res.status(503).send();
    }
})


export { healthRoute };
