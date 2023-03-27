import { v4 as uuidv4 } from 'uuid'

/**
 * Gera um UUID (Universally Unique Identifier) aleatório.
 * @returns {string} Uma string contendo um UUID no formato "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",
 * onde x é um caractere hexadecimal e y é 4, 5, 6 ou 7.
 */
export const generateUUID = () => uuidv4()
