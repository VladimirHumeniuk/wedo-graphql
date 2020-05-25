import { ApolloError } from 'apollo-server';

export const tryCatchWithApolloErrorAsync = async <T>(bodyFnAsync: () => Promise<T>) => {
  try {
    return await bodyFnAsync();
  } catch (error) {
    throw new ApolloError(error)
  }
}

export const tryCatchWithApolloError = <T>(bodyFn: () => Promise<T>) => {
  try {
    return bodyFn();
  } catch (error) {
    throw new ApolloError(error)
  }
}