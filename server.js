const fastify = require('fastify')({ logger: true });
const fetch = require('node-fetch');

// Ruta para consumir y retornar datos de la API externa
fastify.get('/categorias', async (request, reply) => {
  try {
    const response = await fetch('https://riccospyp.somee.com/api/categoria/active');
    
    if (!response.ok) {
      return reply.status(response.status).send({ error: "Error al obtener los datos de la API externa" });
    }
    
    const data = await response.json();
    return { 
      mensaje: "Categorías obtenidas correctamente",
      estado: "éxito",
      datos: data 
    };
  } catch (error) {
    fastify.log.error(error);
    return reply.status(500).send({ error: "Ocurrió un error al intentar obtener los datos" });
  }
});

const start = async () => {
  try {
    const port = process.env.PORT || 4000; // Render usa la variable de entorno PORT
    await fastify.listen({ port, host: '0.0.0.0' });
    console.log(`Servidor Fastify ejecutándose en el puerto ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
