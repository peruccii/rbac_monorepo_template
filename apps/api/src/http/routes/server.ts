import fastifyCors = require('@fastify/cors')
import { fastify } from 'fastify'
import { ZodTypeProvider, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors)

app.listen({ port: 3333 }).then(() => {
 console.log('SERVER RUNNING')
})