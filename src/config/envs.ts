import { get } from 'env-var'; 
import 'dotenv/config';

// Exporta las variables de entorno con validación
export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  MONGO_URL: get('MONGO_URL').required().asString(),
  MONGO_DB_NAME:get('MONGO_DB_NAME').required().asString(),
  JWT_SEED:get('JWT_SEED').required().asString(),
  GOOGLE_AI_API_KEY:get('GOOGLE_AI_API_KEY').required().asString(),
  OPEN_AI_API_KEY:get('OPEN_AI_API_KEY').required().asString(),
  CLAUDE_AI_API_KEY:get('CLAUDE_AI_API_KEY').required().asString(),
  ELEVEN_LABS_API_KEY:get('ELEVEN_LABS_API_KEY').required().asString()
};