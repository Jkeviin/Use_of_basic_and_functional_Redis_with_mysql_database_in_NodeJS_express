const express = require("express");
const responseTime = require("response-time");
const conectarMySqlDB = require("./conexionMySql");
const conectarRedis = require("./conexionRedis");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(responseTime());

(async () => {
  const db = await conectarMySqlDB();
  const redisClient = conectarRedis();

  app.get("/data/:id", async (req, res) => {
    const { id } = req.params;

    try {
      // Consulta en Redis
      const cachedData = await redisClient.getAsync(id);
      if (cachedData) {
        console.log("Datos desde Redis");
        return res.json(JSON.parse(cachedData));
      }

      // Consulta en MySQL
      const [rows] = await db.execute("SELECT * FROM usuarios WHERE id = ?", [id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: "No data found" });
      }

      // Almacena en Redis
      await redisClient.setAsync(id, JSON.stringify(rows[0]));
      // await redisClient.setAsync(id, JSON.stringify(rows[0]), 'EX', 300); Esto es para que expire en 5 minutos
      console.log("Datos desde MySQL");
      res.json(rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})();