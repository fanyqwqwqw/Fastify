import Fastify from 'fastify';
import fetch from 'node-fetch';

const fastify = Fastify({ logger: true });

// Ruta para consumir y retornar datos de la API externa
fastify.get('/categorias', async (request, reply) => {
  try {
    const response = await fetch('https://riccospyp.somee.com/api/categoria/active');
    const data = await response.json();
    reply.send({ servidor:"Render",link:"https://fastify-q4ag.onrender.com/categorias" ,mensaje: "Categorías obtenidas correctamente", estado: "éxito", datos: data });
  } catch (error) {
    fastify.log.error(error);
    reply.status(500).send({ error: "Ocurrió un error al intentar obtener los datos" });
  }
});

// Inicia el servidor
const start = async () => {
  try {
    await fastify.listen({ port: 4000, host: '0.0.0.0' });
    console.log('Fastify server running on port 4000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
