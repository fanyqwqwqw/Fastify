const fastify = require('fastify')({ logger: true });

fastify.get('/fastify', async (request, reply) => {
  return { from_fastify: "Hello from Fastify!" };
});

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
